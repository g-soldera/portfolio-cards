const colorsresponse = await fetch("./assets/colors.json")
const colorsdata = await colorsresponse.json()

async function fetchRecentRepos(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    )
    const repos = response.data

    // Classificar os repositórios com base na propriedade "updated_at"
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

    // Obter os 4 primeiros repositórios
    const recentRepos = repos.slice(0, 4)

    return recentRepos
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function fetchRecentCommits(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events`
    )
    const events = response.data

    const pushEvents = events.filter((event) => event.type === "PushEvent")
    const sortedPushEvents = pushEvents.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
    const recentCommits = sortedPushEvents.slice(0, 4).map((event) => ({
      event: event,
      repo: event.repo.name,
      commitMessage: event.payload.commits[0].message,
      commitDate: event.created_at,
    }))

    return recentCommits
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Consumir os 4 commits mais recentes do usuário "g-soldera"
fetchRecentCommits("g-soldera")
  .then((recentCommits) => {
    recentCommits.forEach((commitBase) => {
      let commit = commitBase.event

      console.log(commit)

      // Criar o elemento de avatar
      const avatar = document.createElement("div")
      avatar.className = "post-avatar"

      // Criar a imagem do avatar
      const avatarImage = document.createElement("img")
      avatarImage.src = `${commit.actor.avatar_url}`
      avatarImage.alt = `${commit.actor.display_login}`
      avatar.appendChild(avatarImage)

      // Criar o elemento de conteúdo do post
      const content = document.createElement("div")
      content.className = "post-content"

      // Criar a mensagem do post
      const message = document.createElement("div")
      message.className = "post-message"

      // Criar o link para o commit
      const commitLink = document.createElement("a")
      commitLink.href = commit.payload.commits[0].url.replace("api.github.com/repos", "github.com").replace("/commits/", "/commit/")
      commitLink.target = "_blank"
      commitLink.textContent = `${commit.payload.commits[0].message}`
      message.appendChild(commitLink)

      // Criar a data do post
      const date = document.createElement("div")
      date.className = "post-date"
      date.textContent = formatTimeAgo(commit.created_at)

      // Criar o footer do post
      const footer = document.createElement("div")
      footer.className = "post-footer"

      // Criar o local do post
      const local = document.createElement("div")
      local.className = "post-local"

      // Criar o link para o perfil do usuário
      const userLink = document.createElement("a")
      userLink.href = "https://github.com/" + commit.actor.display_login
      userLink.target = "_blank"
      const committer = document.createElement("div")
      committer.className = "post-committer"
      committer.textContent = `${commit.actor.display_login}`
      userLink.appendChild(committer)
      local.appendChild(userLink)

      // Adicionar o separador "/"
      const separator = document.createElement("span")
      separator.textContent = "/"
      local.appendChild(separator)

      // Criar o link para o repositório
      const repoLink = document.createElement("a")
      repoLink.href = "https://github.com/" + commit.repo.name
      repoLink.target = "_blank"
      const repository = document.createElement("div")
      repository.className = "post-repository"
      repository.textContent = `${commit.repo.name.split("/")[1]}`
      repoLink.appendChild(repository)
      local.appendChild(repoLink)

      // Criar o elemento de "ending"
      const ending = document.createElement("div")
      ending.className = "post-ending"
      ending.textContent = "#neverstoplearning"

      // Adicionar os elementos criados ao elemento principal do post
      content.appendChild(message)
      content.appendChild(date)
      content.appendChild(footer)
      footer.appendChild(local)
      footer.appendChild(ending)

      // Criar o elemento do post principal
      const post = document.createElement("div")
      post.className = "post"
      post.appendChild(avatar)
      post.appendChild(content)

      // Adicionar o post ao elemento pai (por exemplo, um container)
      const container = document.getElementById("postsblock")
      container.appendChild(post)
    })
  })
  .catch((error) => {
    console.error(error)
  })

// Consumir os 4 repositórios mais recentes do usuário "g-soldera"
fetchRecentRepos("g-soldera")
  .then((recentRepos) => {
    recentRepos.forEach((repo) => {
      // Criar o elemento <a> com atributos e classes
      const link = document.createElement("a")
      link.setAttribute("target", "_blank")
      link.setAttribute("href", `${repo.html_url}`)
      link.classList.add("repo-link")

      // Criar o elemento <div> container
      const repoContainer = document.createElement("div")
      repoContainer.classList.add("repo-container")

      // Criar o elemento <div> título
      const repoTitle = document.createElement("div")
      repoTitle.classList.add("repo-title")

      // Criar o elemento <span> ícone
      const icon = document.createElement("span")
      icon.classList.add("icon")

      // Criar o elemento <svg> ícone
      const svgIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      )
      svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg")
      svgIcon.setAttribute("width", "24")
      svgIcon.setAttribute("height", "24")
      svgIcon.setAttribute("viewBox", "0 0 24 24")
      svgIcon.setAttribute("fill", "none")
      svgIcon.setAttribute("stroke", "currentColor")
      svgIcon.setAttribute("stroke-width", "2")
      svgIcon.setAttribute("stroke-linecap", "round")
      svgIcon.setAttribute("stroke-linejoin", "round")
      svgIcon.classList.add("feather", "feather-folder")

      // Criar o elemento <path> para o ícone
      const folderpath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      folderpath.setAttribute(
        "d",
        "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
      )

      // Adicionar o <path> ao <svg>
      svgIcon.appendChild(folderpath)

      // Adicionar o <svg> ao <span>
      icon.appendChild(svgIcon)

      // Criar o elemento <span> nome
      const name = document.createElement("span")
      name.classList.add("name")
      name.textContent = `${repo.name}`

      // Adicionar o ícone e o nome ao título
      repoTitle.appendChild(icon)
      repoTitle.appendChild(name)

      // Criar o elemento <div> descrição
      const repoDescription = document.createElement("div")
      repoDescription.classList.add("repo-description")
      repoDescription.textContent = `${repo.description}`

      // Criar o elemento <div> rodapé
      const repoFooter = document.createElement("div")
      repoFooter.classList.add("repo-footer")

      // Criar o elemento <div> counts
      const counts = document.createElement("div")
      counts.classList.add("counts")

      // Criar o elemento <div> estrelas
      const stars = document.createElement("div")
      stars.classList.add("stars")

      // Criar o elemento <div> counticon para o ícone de estrelas
      const starsCountIcon = document.createElement("div")
      starsCountIcon.classList.add("counticon")

      // Criar o elemento <svg> ícone de estrelas
      const starsSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      )
      starsSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
      starsSvg.setAttribute("width", "24")
      starsSvg.setAttribute("height", "24")
      starsSvg.setAttribute("viewBox", "0 0 24 24")
      starsSvg.setAttribute("fill", "none")
      starsSvg.setAttribute("stroke", "currentColor")
      starsSvg.setAttribute("stroke-width", "2")
      starsSvg.setAttribute("stroke-linecap", "round")
      starsSvg.setAttribute("stroke-linejoin", "round")
      starsSvg.classList.add("feather", "feather-star")

      // Criar o elemento <polygon> para o ícone de estrelas
      const polygon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      )
      polygon.setAttribute(
        "points",
        "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      )

      // Adicionar o <polygon> ao <svg>
      starsSvg.appendChild(polygon)

      // Adicionar o <svg> ao <div> counticon
      starsCountIcon.appendChild(starsSvg)

      // Criar o elemento <div> counttext para o texto do contador de estrelas
      const starsCountText = document.createElement("div")
      starsCountText.classList.add("counttext")
      starsCountText.textContent = `${repo.stargazers_count}`

      // Adicionar o ícone e o texto ao <div> estrelas
      stars.appendChild(starsCountIcon)
      stars.appendChild(starsCountText)

      // Adicionar o <div> estrelas ao <div> counts
      counts.appendChild(stars)

      // Criar o elemento <div> forks
      const forks = document.createElement("div")
      forks.classList.add("forks")

      // Criar o elemento <div> counticon para o ícone de forks
      const forksCountIcon = document.createElement("div")
      forksCountIcon.classList.add("counticon")

      // Criar o elemento <svg> ícone de forks
      const forksSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      )
      forksSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
      forksSvg.setAttribute("width", "24")
      forksSvg.setAttribute("height", "24")
      forksSvg.setAttribute("viewBox", "0 0 24 24")
      forksSvg.setAttribute("fill", "none")
      forksSvg.setAttribute("stroke", "currentColor")
      forksSvg.setAttribute("stroke-width", "2")
      forksSvg.setAttribute("stroke-linecap", "round")
      forksSvg.setAttribute("stroke-linejoin", "round")
      forksSvg.classList.add("feather", "feather-git-branch")

      // Criar os elementos <line> e <circle> para o ícone de forks
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      )
      line.setAttribute("x1", "6")
      line.setAttribute("y1", "3")
      line.setAttribute("x2", "6")
      line.setAttribute("y2", "15")

      const circle1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      )
      circle1.setAttribute("cx", "18")
      circle1.setAttribute("cy", "6")
      circle1.setAttribute("r", "3")

      const circle2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      )
      circle2.setAttribute("cx", "6")
      circle2.setAttribute("cy", "18")
      circle2.setAttribute("r", "3")

      const forkspath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      forkspath.setAttribute("d", "M18 9a9 9 0 0 1-9 9")

      // Adicionar os elementos ao <svg>
      forksSvg.appendChild(line)
      forksSvg.appendChild(circle1)
      forksSvg.appendChild(circle2)
      forksSvg.appendChild(forkspath)

      // Adicionar o <svg> ao <div> counticon
      forksCountIcon.appendChild(forksSvg)

      // Criar o elemento <div> counttext para o texto do contador de forks
      const forksCountText = document.createElement("div")
      forksCountText.classList.add("counttext")
      forksCountText.textContent = `${repo.forks_count}`

      // Adicionar o ícone e o texto ao <div> forks
      forks.appendChild(forksCountIcon)
      forks.appendChild(forksCountText)

      // Adicionar o <div> forks ao <div> counts
      counts.appendChild(forks)

      // Adicionar o <div> languageContainer
      const languageContainer = document.createElement("div")
      languageContainer.classList.add("language")

      // Adicionar o <div> languageColor
      const languageColor = document.createElement("div")
      languageColor.classList.add("languagecolor")
      const language = repo.language
      const colorCheck = colorsdata[language]?.color || "#000000"
      languageColor.style.backgroundColor = colorCheck

      // Adicionar o <div> languageText
      const langTrend =
        colorsdata[language]?.url || "https://github.com/g-soldera"
      const languageText = document.createElement("a")
      languageText.setAttribute("target", "_blank")
      languageText.setAttribute("href", `${langTrend}`)
      languageText.classList.add("languagetext")
      languageText.textContent = `${language}`

      // Adicionar o <div> languageColor e languageText ao <div> languageContainer
      languageContainer.appendChild(languageColor)
      languageContainer.appendChild(languageText)

      // Adicionar o <div> counts ao <div> rodapé
      repoFooter.appendChild(counts)
      repoFooter.appendChild(languageContainer)

      // Adicionar o título, descrição e rodapé ao container
      repoContainer.appendChild(repoTitle)
      repoContainer.appendChild(repoDescription)
      repoContainer.appendChild(repoFooter)

      // Adicionar o container ao link
      link.appendChild(repoContainer)

      // Adicionar o link ao documento
      const containerprojects = document.querySelector(".container-projects")
      containerprojects.appendChild(link)
    })
  })
  .catch((error) => {
    console.error(error)
  })

function formatTimeAgo(timestamp) {
  const currentDate = new Date()
  const pastDate = new Date(timestamp)

  const diff = Math.floor((currentDate - pastDate) / 1000) // Diferença em segundos

  if (diff < 60) {
    return `há ${diff} segundos`
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60)
    return `há ${minutes} minutos`
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600)
    return `há ${hours} horas`
  } else if (diff < 2592000) {
    const days = Math.floor(diff / 86400)
    return `há ${days} dias`
  } else if (diff < 31536000) {
    const months = Math.floor(diff / 2592000)
    return `há ${months} meses`
  } else {
    const years = Math.floor(diff / 31536000)
    return `há ${years} anos`
  }
}

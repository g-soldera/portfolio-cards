const { Octokit } = require("octokit")

async function fetchUserData(username) {
  const octokit = new Octokit()

  // Obter informações do usuário
  const userResponse = await octokit.request(`GET /users/${username}`)
  const user = userResponse.data

  // Obter os repositórios do usuário
  const reposResponse = await octokit.request(`GET /users/${username}/repos`)
  const repos = reposResponse.data

  // Obter os commits globais
  const commitsResponse = await octokit.request(`GET /users/${username}/events`)
  const events = commitsResponse.data

  // Filtrar os commits globais
  const commitEvents = events.filter((event) => event.type === "PushEvent")

  // Obter os últimos 4 commits globais
  const lastCommits = commitEvents.slice(0, 4).map((event) => ({
    repo: event.repo.name,
    commitMessage: event.payload.commits[0].message,
    commitDate: event.created_at,
  }))

  // Obter os 4 primeiros posts pinnados
  const pinnedRepos = repos.filter((repo) => repo.pinned)

  const pinnedPosts = pinnedRepos.slice(0, 4).map((repo) => ({
    repo: repo.name,
    description: repo.description,
    url: repo.html_url,
  }))

  // Retornar os dados
  return {
    user,
    pinnedPosts,
    lastCommits,
  }
}

// Consumir os dados do usuário "g-soldera"
fetchUserData("g-soldera")
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })

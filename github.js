const axios = require("axios")

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
    recentCommits.forEach((commit) => {})
  })
  .catch((error) => {
    console.error(error)
  })

// Consumir os 4 repositórios mais recentes do usuário "g-soldera"
fetchRecentRepos("g-soldera")
  .then((recentRepos) => {
    recentRepos.forEach((repo) => {})
  })
  .catch((error) => {
    console.error(error)
  })

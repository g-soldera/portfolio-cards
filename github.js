// consumir o octokit
const { Octokit } = require("octokit")

const octokit = new Octokit({
  auth: "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",
})

console.log(octokit)

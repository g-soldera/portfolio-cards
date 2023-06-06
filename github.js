// consumir o octokit
import { Octokit } from "./node_modules/@octokit"

const octokit = new Octokit({
  auth: "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",
})

console.log(octokit)

import minimist from "minimist";
import fs from "fs";
import { Octokit } from "@octokit/core";
import BaseExporter from "./baseExporter.js";

const argv = minimist(process.argv.slice(2));
const {githubOwner} = argv;
const {githubRepo} = argv;

export default class GithubCommentExporter extends BaseExporter {
  githubCommit = null;

  commitName = "none";

  octokit = null;

  constructor() {
        super();

    if (process.env.GITHUB_EVENT_PATH) {
            const file = fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8");
      this.githubCommit = JSON.parse(file);

      const object = this.githubCommit;
            if (object.commits) {
                this.commitName = object.commits[object.commits.length - 1].message;
      }
        }
    }

  isEnabled() {
    return !(
      !argv.githubAuth ||
            !this.githubCommit ||
            !argv.githubOwner ||
      !argv.githubRepo
  }

  async send(content, isPeriodic = true) {
        if (!this.octokit) {
            this.octokit = new Octokit({
                auth: argv.githubAuth,
            });
        }

    const baseComment = "**BOT COMMENT!**\n\n";
    const url =
            isPeriodic && this.githubCommit
                ? "PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"
        : "POST /repos/{owner}/{repo}/issues/{issue_number}/comments";
    let body = "";
        if (!isPeriodic) {
            body = baseComment + content;
        } else if (this.githubCommit) {
            body = `${this.githubCommit.data.body}\n${content}`;
    } else {
            body = baseComment + content;
    }

    try {
            const response = await this.octokit.request(url, {
                owner: githubOwner,
                repo: githubRepo,
                issue_number: this.githubCommit.number,
        body,
                comment_id: this.githubCommit ? this.githubCommit.data.id : null,
        headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
        },
            });

      if (isPeriodic && !this.githubCommit) this.githubCommit = response;
    } catch (error) {
            console.log("Failed to send github comment", error);
    }
  }
}

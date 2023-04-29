import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));

import { WebhookClient } from 'discord.js';

const username = argv.discordUsername || "Screeps Performance Server"
const avatarURL = "https://user-images.githubusercontent.com/48334001/189509241-7f04fe66-a5bc-4791-ada7-4f948794ceb0.png"

export default class Exporter {
  static discordMessage = null;
  static githubComment = null;

  static webhookClient = null;
  static octokit = null;

  static commit = null
  static commitName = 'localhost';

  static customConstructor() {
    if (process.env.GITHUB_EVENT_PATH) {
      const file = fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8');
      this.commit = JSON.parse(file);

      const object = this.commit;
      if (object.commits) {
        this.commitName = object.commits[object.commits.length - 1].message;
      }
    }
  }

  static async sendDiscordWebHook(content, isPeriodic = true) {
    if (!argv.discordWebHookUrl) return;

    if (!this.webhookClient) this.webhookClient = new WebhookClient({ url: argv.discordWebHookUrl });

    try {
      const data = {
        username: username + (isPeriodic ? " - Periodic " : " - Final"),
        avatarURL,
        content,
      }

      if (isPeriodic) {
        if (!this.discordMessage) this.discordMessage = await this.webhookClient.send(data)
        else {
          data.content = this.discordMessage.content + "\n" + content
          this.discordMessage.content = data.content
          await this.webhookClient.editMessage(this.discordMessage.id, data);
        }
      }
      else {
        await this.webhookClient.send(data);
      }

    } catch (error) {
      console.log('Failed to send discord webhook', error);
    }
  }

  static async sendGithubComment(content, isPeriodic = true) {
    if (!argv.githubAuth) return;

    if (!this.octokit) this.octokit = new Octokit({
      auth: argv.githubAuth
    })

    const baseComment = "**BOT COMMENT!**\n\n"
    const url = isPeriodic && this.githubComment ? "PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}" : 'POST /repos/{owner}/{repo}/issues/{issue_number}/comments';
    const body = !isPeriodic ? baseComment + content : this.githubComment ? this.githubComment.data.body + "\n" + content : baseComment + content;

    try {
      const response = await octokit.request(url, {
        owner: 'The-International-Screeps-Bot',
        repo: 'The-International-Open-Source',
        issue_number: this.githubComment.number,
        body,
        comment_id: this.githubComment ? this.githubComment.data.id : null,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })

      if (isPeriodic && !this.githubComment) this.githubComment = response
    } catch (error) {
      console.log('Failed to send github comment', error);
    }
  }

  static generatePeriodicMessage(gameTime, milestone) {
    let message = ""
    if (!this.discordMessage) message = `**Performance Test Results**\n` +
      `**Commit:** ${this.commitName}\n`

    message += `\n**Game time:** ${gameTime}\n` +
      `**Result:** ${milestone.success ? "Success :) " : "Fail :( "}\n` +
      `**Milestone:** ${JSON.stringify(milestone)}\n`;

    return message;
  }
  static generateFinalMessage(milestones, fails, status, lastTickNumber, startTime) {
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000 / 60 / 60; // in hours

    return `**Performance Test Results**\n` +
      `**Commit:** ${this.commitName}\n` +
      `**Fails:** ${fails.length === 0 ? "No fails!" : `${fails.length} fails`}\n` +
      `**Time:** ${new Date(startTime).toISOString()} - ${new Date(endTime).toISOString()}\n` +
      `**Time Diff:** ${timeDiff.toFixed(2)} hours\n` +
      `**Last Tick:** ${lastTickNumber}\n\n` +
      `**Milestones:** ${milestones.reduce((a, b) => {
        return typeof a === "String" ? a : JSON.stringify(a) + JSON.stringify(b) + ", "
      })}\n` +
      `**Status:** ${JSON.stringify(status)}\n`;

  }

  static async sendPeriodicResult(gameTime, milestone) {
    const message = this.generatePeriodicMessage(gameTime, milestone);
    await this.sendDiscordWebHook(message);
    await this.sendGithubComment(message);
  }

  static async sendFinalResult(milestones, fails, status, lastTickNumber, startTime) {
    const message = this.generateFinalMessage(milestones, fails, status, lastTickNumber, startTime);
    await this.sendDiscordWebHook(message, false);
    await this.sendGithubComment(message, false);
  }
}
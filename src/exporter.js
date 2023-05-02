import minimist from "minimist";

import fs from "fs";
import { WebhookClient } from "discord.js";
import { PasteClient, Publicity, ExpireDate } from "pastebin-api";
import { Octokit } from "@octokit/core";

const argv = minimist(process.argv.slice(2));

const username = argv.discordUsername || "Screeps Performance Server";
const avatarURL =
  "https://user-images.githubusercontent.com/48334001/189509241-7f04fe66-a5bc-4791-ada7-4f948794ceb0.png";

export default class Exporter {
  static discordMessage = null;

  static githubComment = null;

  static webhookClient = null;

  static octokit = null;

  static commit = null;

  static commitName = "localhost";

  static customConstructor() {
    if (process.env.GITHUB_EVENT_PATH) {
      const file = fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8");
      this.commit = JSON.parse(file);

      const object = this.commit;
      if (object.commits) {
        this.commitName = object.commits[object.commits.length - 1].message;
      }
    }
  }

  static async sendDiscordWebHook(content, isPeriodic = true) {
    if (!argv.discordWebHookUrl) return;

    if (!this.webhookClient)
      this.webhookClient = new WebhookClient({ url: argv.discordWebHookUrl });

    try {
      const data = {
        username: username + (isPeriodic ? " - Periodic " : " - Final"),
        avatarURL,
        content,
      };

      if (isPeriodic) {
        if (!this.discordMessage)
          this.discordMessage = await this.webhookClient.send(data);
        else {
          data.content = `${this.discordMessage.content}\n${content}`;
          this.discordMessage.content = data.content;
          await this.webhookClient.editMessage(this.discordMessage.id, data);
        }
      } else {
        await this.webhookClient.send(data);
      }
    } catch (error) {
      console.log("Failed to send discord webhook", error);
    }
  }

  static async sendGithubComment(content, isPeriodic = true) {
    if (!argv.githubAuth) return;

    if (!this.octokit) {
      this.octokit = new Octokit({
        auth: argv.githubAuth,
      });
    }

    const baseComment = "**BOT COMMENT!**\n\n";
    const url =
      isPeriodic && this.githubComment
        ? "PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"
        : "POST /repos/{owner}/{repo}/issues/{issue_number}/comments";
    let body = "";
    if (!isPeriodic) {
      body = baseComment + content;
    } else if (this.githubComment) {
      body = `${this.githubComment.data.body}\n${content}`;
    } else {
      body = baseComment + content;
    }

    try {
      const response = await this.octokit.request(url, {
        owner: "The-International-Screeps-Bot",
        repo: "The-International-Open-Source",
        issue_number: this.githubComment.number,
        body,
        comment_id: this.githubComment ? this.githubComment.data.id : null,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (isPeriodic && !this.githubComment) this.githubComment = response;
    } catch (error) {
      console.log("Failed to send github comment", error);
    }
  }

  static getLoggerFile() {
    if (fs.existsSync("./logs/logListener.log", "utf8")) {
      const fileText = fs.readFileSync("./logs/logListener.log", "utf8");
      const fileLineCount = fileText.split("\n").length;
      return {success: true, text: fileText, lineCount: fileLineCount}

    }
    return {success:false, text:"No log dump file found"};
  }

  static async createPasteBinUrl(content) {
    const key = argv.pasteBinUrlDevKey;
    if (!key) return "None";

    const client = new PasteClient(key);
    try {
      const url = await client.createPaste({
        code: content,
        expireDate: ExpireDate.OneYear,
        name: this.commitName,
        publicity: Publicity.Unlisted,
      });
      return `<${url}>`;
    }
    catch (error) {
      return "ERROR"
    }

  }

  static generatePeriodicMessage(gameTime, milestone) {
    let message = "";
    if (!this.discordMessage) {
      message = `**Performance Test Results**\n**Commit:** ${this.commitName}\n`;
    }

    message +=
      `\n**Game time:** ${gameTime}\n` +
      `**Result:** ${milestone.success ? "Success :) " : "Fail :( "}\n` +
      `**Milestone:** ${JSON.stringify(milestone)}\n`;

    return message;
  }

  static generateFinalMessage(
    milestones,
    fails,
    status,
    lastTickNumber,
    startTime,
    pasteBinUrl,
    loggerFileLineCount
  ) {
    const endTime = new Date();
    const timeDiff = (endTime - startTime) / 1000 / 60 / 60; // in hours

    return (
      "**Performance Test Results**\n" +
      `**Commit:** ${this.commitName}\n` +
      `**Fails:** ${fails.length === 0 ? "No fails!" : `${fails.length} fails`
      }\n` +
      `**Time:** ${new Date(startTime).toISOString()} - ${new Date(
        endTime
      ).toISOString()}\n` +
      `**Time Diff:** ${timeDiff.toFixed(2)} hours\n` +
      `**Tick Count :** ${lastTickNumber}\n\n` +
      `**Milestones:** ${milestones.reduce((a, b) =>
        typeof a === "string" ? a : `${JSON.stringify(a) + JSON.stringify(b)}, `
      )}\n` +
      `**Status:** ${JSON.stringify(status)}\n\n` +
      `**Filtered Logs:**${pasteBinUrl} ${loggerFileLineCount ? ` (${loggerFileLineCount} logs)` : ""} \n`
    );
  }

  static async sendPeriodicResult(gameTime, milestone) {
    const message = this.generatePeriodicMessage(gameTime, milestone);
    await this.sendDiscordWebHook(message);
    await this.sendGithubComment(message);
  }

  static async sendFinalResult(
    milestones,
    fails,
    status,
    lastTickNumber,
    startTime
  ) {
    const logs = this.getLoggerFile();
    const pasteBinUrl = await this.createPasteBinUrl(logs);

    const message = this.generateFinalMessage(
      milestones,
      fails,
      status,
      lastTickNumber,
      startTime,
      pasteBinUrl
    );
    await this.sendDiscordWebHook(message, false);
    await this.sendGithubComment(message, false);
  }
}

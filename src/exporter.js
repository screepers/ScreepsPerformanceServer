import minimist from "minimist";

import fs from "fs";
import { WebhookClient } from "discord.js";
import { PasteClient, Publicity, ExpireDate } from "pastebin-api";
import { Octokit } from "@octokit/core";
import beautify from "json-beautify";

const argv = minimist(process.argv.slice(2));

const discordUsername = argv.discordUsername || "Screeps Performance Server";
const avatarURL =
  argv.discordAvatarUrl ||
  "https://user-images.githubusercontent.com/48334001/189509241-7f04fe66-a5bc-4791-ada7-4f948794ceb0.png";
const githubOwner = argv.githubOwner || "The-International-Screeps-Bot";
const githubRepo = argv.githubRepo || "The-International-Open-Source";
export default class Exporter {
  static discordMessage = null;

  static githubCommit = null;

  static webhookClient = null;

  static octokit = null;

  static commit = null;

  static commitName = "localhost";

  static customConstructor() {
    if (process.env.GITHUB_EVENT_PATH) {
      const file = fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8");
      this.githubCommit = JSON.parse(file);

      const object = this.githubCommit;
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
        username: discordUsername + (isPeriodic ? " - Periodic " : " - Final"),
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
    if (
      !argv.githubAuth ||
      !this.githubCommit ||
      !argv.githubOwner ||
      !argv.githubRepo
    ) {
      return;
    }

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

  static getLoggerFile() {
    if (fs.existsSync("./logs/logListener.log", "utf8")) {
      const fileText = fs.readFileSync("./logs/logListener.log", "utf8");
      const fileLineCount = fileText.split("\n").length;
      return { success: true, text: fileText, lineCount: fileLineCount };
    }
    return { success: false, text: "No log dump file found" };
  }

  static getHistory() {
    if (fs.existsSync("./logs/history.log", "utf8")) {
      const fileText = fs.readFileSync("./logs/history.log", "utf8");
      const fileLineCount = fileText.split("\n").length;
      return { success: true, text: fileText, lineCount: fileLineCount };
    }
    return { success: false, text: "No history file found" };
  }

  static async createPasteBinUrl(content) {
    const key = argv.pasteBinUrlDevKey;
    if (!key) return "No key provided";

    const client = new PasteClient(key);
    try {
      const url = await client.createPaste({
        code: content,
        expireDate: ExpireDate.OneYear,
        name: this.commitName,
        publicity: Publicity.Unlisted,
      });
      return `<${url}>`;
    } catch (error) {
      if (error.includes("maximum pastes")) {
        return "Rate limit reached";
      }
      return "ERROR";
    }
  }

  static generatePeriodicMessage(gameTime, milestones, startTime) {
    let message = "";
    if (!this.discordMessage) {
      message = `**Performance Test Results**\n**Commit:** ${this.commitName}\n`;
    }

    const endTime = new Date();
    const timeRun = (endTime - startTime) / 1000 / 60 / 60; // in hours

    message +=
      `\n**Game Time:** ${gameTime}\n` +
      `**Result:** ${milestones.success ? "Success :) " : "Fail :( "}\n` +
      `**Time Run:** ${timeRun.toFixed(2)} hours\n\n` +
      `**Milestone:** \n\`\`\`json\n${beautify(milestones, null, 2, 80)}\`\`\``;

    return message;
  }

  static generateFinalMessage(
    milestones,
    fails,
    status,
    lastTickNumber,
    startTime,
    loggerFile,
    historyFile
  ) {
    const endTime = new Date();
    const timeRun = (endTime - startTime) / 1000 / 60 / 60; // in hours

    const loggerText = loggerFile.success
      ? `**Filtered Logs:** ${loggerFile.pasteBinUrl} (${
        loggerFile.lineCount - 1
      } logs)\n`
      : "**Filtered Logs:** No log dump file found\n";
    const historyText = historyFile.success
      ? `**Milestone History:** ${historyFile.pasteBinUrl} (${
        historyFile.lineCount - 1
      } logs)\n`
      : "**Milestone History:** No history file found\n";

    return (
      `**Performance Test Results**\n` +
      `**Commit:** ${this.commitName}\n` +
      `**Fails:** ${
        fails.length === 0 ? "No fails!" : `${fails.length} fails`
      }\n` +
      `**Game Time :** ${lastTickNumber}\n` +
      `**Time:** Start: ${new Date(startTime).toISOString()} - End: ${new Date(
        endTime
      ).toISOString()}\n` +
      `**Time Run:** ${timeRun.toFixed(2)} hours\n\n` +
      `**Milestones:** \n\n\`\`\`json\n${milestones.reduce((a, b) =>
        typeof a === "string"
          ? a
          : `${beautify(a, null, 2, 80) + beautify(b, null, 2, 80)}, `
      )}\`\`\`\n` +
      `**Status:** \n\`\`\`json\n${beautify(
        status,
        null,
        2,
        80
      )}\`\`\`\n\n${loggerText}${historyText}`
    );
  }

  static async sendPeriodicResult(gameTime, milestone, startTime) {
    const message = this.generatePeriodicMessage(
      gameTime,
      milestone,
      startTime
    );
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
    const history = this.getHistory();

    const message = this.generateFinalMessage(
      milestones,
      fails,
      status,
      lastTickNumber,
      startTime,
      {
        pasteBinUrl: await this.createPasteBinUrl(logs.text),
        lineCount: logs.lineCount,
        success: logs.success,
      },
      {
        pasteBinUrl: await this.createPasteBinUrl(history.text),
        lineCount: history.lineCount,
        success: history.success,
      }
    );
    await this.sendDiscordWebHook(message, false);
    await this.sendGithubComment(message, false);
  }
}

import minimist from "minimist";
import fs from "fs";
import { PasteClient, Publicity, ExpireDate } from "pastebin-api";
import beautify from "json-beautify";

const argv = minimist(process.argv.slice(2));

export default class BaseExporter {
  getLoggerFile() {
    if (fs.existsSync("./logs/logListener.log", "utf8")) {
      const fileText = fs.readFileSync("./logs/logListener.log", "utf8");
      const fileLineCount = fileText.split("\n").length;
      return { success: true, text: fileText, lineCount: fileLineCount };
    }
    return { success: false, text: "No log dump file found" };
  }

  getHistory() {
    if (fs.existsSync("./logs/history.log", "utf8")) {
      const fileText = fs.readFileSync("./logs/history.log", "utf8");
      const fileLineCount = fileText.split("\n").length;
      return { success: true, text: fileText, lineCount: fileLineCount };
    }
    return { success: false, text: "No history file found" };
  }

  async createPasteBinUrl(content) {
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

  generatePeriodicMessage(gameTime, milestones, startTime) {
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

  generateFinalMessage(
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
      ? `**Filtered Logs:** ${loggerFile.pasteBinUrl} (${loggerFile.lineCount - 1
      } logs)\n`
      : "**Filtered Logs:** No log dump file found\n";
    const historyText = historyFile.success
      ? `**Milestone History:** ${historyFile.pasteBinUrl} (${historyFile.lineCount - 1
      } logs)\n`
      : "**Milestone History:** No history file found\n";

    return (
      `**Performance Test Results**\n` +
      `**Commit:** ${this.commitName}\n` +
      `**Fails:** ${fails.length === 0 ? "No fails!" : `${fails.length} fails`
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

  getPeriodicResultMessage(gameTime, milestone, startTime) {
    return this.generatePeriodicMessage(
      gameTime,
      milestone,
      startTime
    );
  }

  async getFinalResultMessage(
    milestones,
    fails,
    status,
    lastTickNumber,
    startTime
  ) {
    const logs = this.getLoggerFile();
    const history = this.getHistory();

    return this.generateFinalMessage(
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
  }
}

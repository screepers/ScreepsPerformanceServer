import GithubCommentExporter from "./githubComment.js"
import DiscordWebhookExporter from "./discordWebhook.js"

export default class Exporter {
    githubCommentExporter = new GithubCommentExporter();
    discordWebhookExporter = new DiscordWebhookExporter();

    async sendFinalResult(milestones, fails, status, lastTickNumber, startTime) {
        if (this.githubCommentExporter.isEnabled()) {
            const message = await this.githubCommentExporter.getFinalResultMessage(milestones, fails, status, lastTickNumber, startTime);
            await this.githubCommentExporter.send(message, false);
        }
        if (this.discordWebhookExporter.isEnabled()) {
            const message = await this.discordWebhookExporter.getFinalResultMessage(milestones, fails, status, lastTickNumber, startTime);
            await this.discordWebhookExporter.send(message, false);
        }
    }

    async sendPeriodicResult(gameTime, milestone, startTime) {
        if (this.githubCommentExporter.isEnabled()) {
            const message = this.githubCommentExporter.getPeriodicResultMessage(gameTime, milestone, startTime);
            await this.githubCommentExporter.send(message, true);
        }
        if (this.discordWebhookExporter.isEnabled()) {
            const message = this.discordWebhookExporter.getPeriodicResultMessage(gameTime, milestone, startTime);
            await this.discordWebhookExporter.send(message, true);
        }
    }
}
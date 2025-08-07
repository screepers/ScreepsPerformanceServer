import minimist from "minimist";
import { WebhookClient } from "discord.js";
import BaseExporter from "./baseExporter.js";

const argv = minimist(process.argv.slice(2));
const discordUsername = argv.discordUsername;
const avatarURL = argv.discordAvatarUrl;

export default class DiscordWebhookExporter extends BaseExporter {
    webhookClient = null;
    discordMessage = null;

    constructor() {
        super();
    }

    isEnabled() {
        if (!argv.discordWebHookUrl) return false;
        return true;
    }

    async send(content, isPeriodic = true) {
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
}
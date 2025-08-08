import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { exec, execSync } from "child_process";
import Docker from "dockerode";
import Setup from "../setup.js";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const docker = new Docker({ socketPath: "/var/run/docker.sock" });
const basicCommand = "docker compose";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class DockerHelper {
/**
    * startServer method
    *
    * Starts the private server
    * @return {object}
    */
    static async startServer() {
        const stopCommand = `${basicCommand} down --volumes --remove-orphans --rmi all`;

        const maxTime = new Promise((resolve) => {
            setTimeout(resolve, 30 * 60 * 1000, "Timeout");
        });

        const startServer = new Promise(async (resolve) => {
            console.log("\r\nProcess: Starting server...");
            console.log("Stopping server...");
            execSync(stopCommand, { stdio: argv.debug ? "inherit" : "ignore" });
            Setup.RemoveLogs();

            console.log("Starting server, this will take a while...");
            try {
                const logsPath = join(__dirname, "../logs");
                console.log();
                execSync(`mkdir -p ${logsPath} && chmod 777 ${logsPath}`);
                // eslint-disable-next-line no-empty
            } catch (error) {
                console.log(error);
            }
            const upCommand = `${basicCommand} up -d`;
            execSync(upCommand);
            await this.sleep(10);
            await this.waitForServerStart();
            resolve(true);
        });
        return Promise.race([startServer, maxTime])
        .then((result) => {
            if (result === "Timeout") {
            console.log("Timeout starting server!");
            return false;
            }
            return true;
        })
        .catch((result) => {
            console.error("error", { data: result });
            return false;
        });
    }

    static async restartServer() {
        const restartCommand = `${basicCommand} restart screeps`;

        const maxTime = new Promise((resolve) => {
            setTimeout(resolve, 30 * 60 * 1000, "Timeout");
        });

        const restartServer = new Promise(async (resolve) => {
            console.log("\r\nProcess: Restart server...");
            console.log("Restarting server...\r\n");
            exec(restartCommand);
            await this.sleep(10);
            await this.waitForServerStart();
            resolve(true);
        });
        return Promise.race([restartServer, maxTime])
        .then((result) => {
            if (result === "Timeout") {
            console.log("Timeout starting server!");
            return false;
            }
            return true;
        })
        .catch((result) => {
            console.error("error", { data: result });
            return false;
        });
    }
}
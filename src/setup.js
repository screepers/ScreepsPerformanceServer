import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import getPort, { portNumbers } from "get-port";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
console.dir(argv);

let ports = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getFreePorts() {
  if (argv.serverPort && argv.cliPort) {
    return { serverPort: argv.serverPort, cliPort: argv.cliPort };
  }
  let serverPort = await getPort({ port: 21025 });
  let cliPort = await getPort({ port: 21026 });

  if (serverPort !== 21025 || cliPort !== 21026) {
    let foundNewPorts = false;
    while (!foundNewPorts) {
      // eslint-disable-next-line no-await-in-loop
      const newServerPort = await getPort({ port: portNumbers(50000, 51000) });
      // eslint-disable-next-line no-await-in-loop
      const newCliPort = await getPort({ port: newServerPort + 1 });
      if (newServerPort + 1 === newCliPort) {
        serverPort = newServerPort;
        cliPort = newCliPort;
        foundNewPorts = true;
      }
    }
  }

  return { serverPort, cliPort };
}

function UpdateBotFolder() {
  const botFolder = join(__dirname, "../bots/dist");
  const newBotFolder = argv.botFilePath;
  if (!newBotFolder) return;
  if (!fs.existsSync(newBotFolder)) {
    throw new Error("No folder found at the inputted path, please try again");
  }

  const filesInNewBotFolder = fs.readdirSync(newBotFolder);
  if (filesInNewBotFolder.length === 0) {
    console.log("No bot files found in the provided folder");
    throw new Error("No bot files found");
  }

  filesInNewBotFolder.forEach((fileName) => {
    const file = fs.readFileSync(join(newBotFolder, fileName), "utf8");
    fs.writeFileSync(join(botFolder, fileName), file);
  });

  console.log(
    `Replaced bot folder with an total of ${filesInNewBotFolder.length} files`
  );
}

// eslint-disable-next-line consistent-return
function updateConfigYmlFile() {
  const configFilename = join(__dirname, "../config.yml");

  if (fs.existsSync(configFilename) && !argv.force)
    return console.log(
      "Config.yml file already exists, use --force to overwrite it"
    );
  // Copy config file to non example file
  fs.copyFileSync(join(__dirname, "../config.example.yml"), configFilename);

  // Read and replace config file
  let config = fs.readFileSync(configFilename, { encoding: "utf8" });
  if (argv.steamKey)
    config = config.replace(
      "steamKey: http://steamcommunity.com/dev/apikey",
      `steamKey: ${argv.steamKey}`
    );
  if (argv.relayPort)
    config = config.replace(
      "relayPort: undefined",
      `relayPort: ${argv.relayPort}`
    );
  if (argv.disableMongo)
    config = config.replace("- screepsmod-mongo", "# - screepsmod-mongo");
  fs.writeFileSync(configFilename, config);
  console.log("Config.yml file created");
}

function UpdateEnvFile() {
  const envFile = join(__dirname, "../.env");
  if (fs.existsSync(envFile) && !argv.force)
    return console.log("Env file already exists, use --force to overwrite it");
  const dockerComposePath = join(__dirname, "../docker-compose.yml");

  const exampleEnvFilePath = join(__dirname, "../example.env");
  let exampleEnvText = fs
    .readFileSync(exampleEnvFilePath, "utf8")
    .replace(
      "COMPOSE_FILE=./docker-compose.yml",
      `COMPOSE_FILE=${dockerComposePath}`
    );
  if (ports.serverPort)
    exampleEnvText = exampleEnvText.replaceAll(
      "COMPOSE_PROJECT_NAME=screeps-server",
      `COMPOSE_PROJECT_NAME=screeps-server-${ports.serverPort}`
    );
  fs.writeFileSync(envFile, exampleEnvText);
  console.log("Env file created");
}

async function UpdateDockerComposeFile() {
  const dockerComposeFile = join(__dirname, "../docker-compose.yml");
  if (fs.existsSync(dockerComposeFile) && !argv.force)
    return console.log(
      "Docker-compose file already exists, use --force to overwrite it"
    );

  const exampleDockerComposeFile = join(
    __dirname,
    "../docker-compose.example.yml"
  );
  let exampleDockerComposeText = fs.readFileSync(
    exampleDockerComposeFile,
    "utf8"
  );
  exampleDockerComposeText = exampleDockerComposeText
    .replaceAll("- 21025:21025/tcp", `- ${ports.serverPort}:21025/tcp`)
    .replaceAll("- 21026:21026", `- ${ports.cliPort}:21026`);

  fs.writeFileSync(dockerComposeFile, exampleDockerComposeText);
  console.log("Docker-compose file created");
}

function UpdateConfigJsonFile() {
  const configFile = join(__dirname, "../config.json");
  if (fs.existsSync(configFile) && !argv.force)
    return console.log(
      "Config.json file already exists, use --force to overwrite it"
    );

  const exampleConfigFile = join(__dirname, "../config.example.json");
  let exampleConfigText = fs.readFileSync(exampleConfigFile, "utf8");
  if (argv.tickDuration)
    exampleConfigText = exampleConfigText.replaceAll(
      '"tickDuration": 100',
      `"tickDuration": ${argv.tickDuration}`
    );
  fs.writeFileSync(configFile, exampleConfigText);
  console.log("Config.json file created");
}

export function RemoveLogs() {
  const logsPath = join(__dirname, "../logs");
  let logsExist = fs.existsSync(logsPath);
  if (logsExist && argv.deleteLogs) {
    fs.rmdirSync(logsPath, { recursive: true });
    logsExist = false;
  }
}

export default async function Setup() {
  ports = await getFreePorts();
  UpdateBotFolder();
  UpdateEnvFile();
  await UpdateDockerComposeFile();
  updateConfigYmlFile();
  UpdateConfigJsonFile();

  return {
    ports,
    config: JSON.parse(fs.readFileSync(join(__dirname, "../config.json"))),
  };
}

import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist'
import getPort, {portNumbers} from 'get-port';
import Config from './config.js';

const argv = minimist(process.argv.slice(2));
console.dir(argv);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getFreePorts() {
  let serverPort = await getPort({ port: 21025 });
  let cliPort = await getPort({ port: 21026 });

  if (serverPort !== 21025 || cliPort !== 21026) {
    let foundNewPorts = false;
    while (!foundNewPorts) {
      const newServerPort = await getPort({ port: portNumbers(50000, 51000) });
      const newCliPort = await getPort({ port: newServerPort+1 });
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
  const botFolder = join(__dirname, '../bots/dist');
  const newBotFolder = argv.botFilePath;
  if (!newBotFolder) return;
  if (!fs.existsSync(newBotFolder)) {
    throw 'No folder found at the inputted path, please try again'
  }

  const filesInNewBotFolder = fs.readdirSync(newBotFolder);
  const botFiles = filesInNewBotFolder.filter((file) => file.endsWith('.js'));
  if (botFiles.length === 0) {
    console.log('No bot files found in the provided folder');
    throw new Error('No bot files found');
  }

  botFiles.forEach(fileName => {
    const file = fs.readFileSync(join(newBotFolder, fileName), 'utf8');
    fs.writeFileSync(join(botFolder, fileName), file);
  });

  console.log(`Replaced bot folder with an total of ${botFiles.length} files`);
}

function UpdateEnvFile() {
  const exampleEnvFilePath = join(__dirname, '../.example.env');
  const steamKey = argv.steamKey;
  const exportBaseUrl = argv.exportBaseUrl;
  if (!steamKey) return;

  let exampleEnvText = fs.readFileSync(exampleEnvFilePath, 'utf8');
  exampleEnvText = exampleEnvText.replaceAll('http://steamcommunity.com/dev/apikey', steamKey);
  if (exportBaseUrl) exampleEnvText = exampleEnvText.replaceAll('localhost', exportBaseUrl);
  const envFile = join(__dirname, '../.env');
  fs.writeFileSync(envFile, exampleEnvText);
  console.log('Env file created');
}

async function UpdateDockerComposeFile() {
  const exampleDockerComposeFile = join(__dirname, '../docker-compose.example.yml');
  const ports = await getFreePorts();
  Config.serverPort = ports.serverPort;
  Config.cliPort = ports.cliPort;

  let exampleDockerComposeText = fs.readFileSync(exampleDockerComposeFile, 'utf8');
  exampleDockerComposeText = exampleDockerComposeText.replaceAll('{{ serverPort }}', ports.serverPort).replaceAll('{{ cliPort }}', ports.cliPort);
  const dockerComposeFile = join(__dirname, '../docker-compose.yml');
  fs.writeFileSync(dockerComposeFile, exampleDockerComposeText);
  console.log('Docker-compose file created');
}

export default async function Setup() {
  UpdateBotFolder();
  UpdateEnvFile();
  await UpdateDockerComposeFile()
}

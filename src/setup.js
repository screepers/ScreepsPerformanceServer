import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2));
console.dir(argv);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

function UpdateDockerComposeFile() {
  const exampleDockerComposeFile = join(__dirname, '../docker-compose.example.yml');
  const serverPort = argv.serverPort || 21025
  const cliPort = argv.cliPort || 21026

  let exampleDockerComposeText = fs.readFileSync(exampleDockerComposeFile, 'utf8');
  exampleDockerComposeText = exampleDockerComposeText.replaceAll('{{ serverPort }}', serverPort).replaceAll('{{ cliPort }}', cliPort);
  const dockerComposeFile = join(__dirname, '../docker-compose.yml');
  fs.writeFileSync(dockerComposeFile, exampleDockerComposeText);
  console.log('Docker-compose file created');
}

export default function Setup() {
    UpdateBotFolder();
    UpdateEnvFile();
    UpdateDockerComposeFile()
}

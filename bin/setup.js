#!/usr/bin/env node
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function UpdateBotFolder() {
  const botFolder = join(__dirname, '../bots/sampleBot');
  const newBotFolder = process.argv[3];
  if (!newBotFolder) {
    console.log('Please provide a path to the bot file');
    throw new Error('No bot file provided');
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
  const exampleEnvFilePath = join(__dirname, '../.env.example');
  const steamKey = process.argv[4];
  const exportBaseUrl = process.argv[5];
  if (!steamKey) return;

  let exampleEnvText = fs.readFileSync(exampleEnvFilePath, 'utf8');
  exampleEnvText = exampleEnvText.replace('http://steamcommunity.com/dev/apikey', steamKey);
  if (exportBaseUrl) exampleEnvText = exampleEnvText.replace('localhost', exportBaseUrl);
  const envFile = join(__dirname, '../.env');
  fs.writeFileSync(envFile, exampleEnvText);
  console.log('Env file created');
}

UpdateBotFolder();
UpdateEnvFile();

await import('../src/index.js');

#!/usr/bin/env node
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function UpdateBotFile() {
  const botFile = join(__dirname, '../bots/sampleBot/main.js');
  const newBotFile = process.argv[3];
  if (!newBotFile) {
    console.log('Please provide a path to the bot file');
    throw new Error('No bot file provided');
  }

  const botCode = fs.readFileSync(newBotFile);
  console.log('Replacing bot code with', botFile);
  fs.writeFileSync(botFile, botCode);
  console.log('Bot file updated');
}

function UpdateEnvFile() {
  const exampleEnvFilePath = join(__dirname, '../.env.example');
  const steamKey = process.argv[4];
  if (!steamKey) return;

  let exampleEnvText = fs.readFileSync(exampleEnvFilePath, 'utf8');
  exampleEnvText = exampleEnvText.replace('http://steamcommunity.com/dev/apikey', steamKey);
  const envFile = join(__dirname, '../.env');
  fs.writeFileSync(envFile, exampleEnvText);
  console.log('Env file created');
}

UpdateBotFile();
UpdateEnvFile();

await import('../src/index.js');

import fs from 'fs';
import fetch from 'node-fetch';
import _ from 'lodash';

import { ScreepsAPI } from 'screeps-api';
import { exec, execSync } from 'child_process';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import * as dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '../.env') });

const filter = {
  controller: (o) => {
    if (o && o.type) {
      return o.type === 'controller';
    }
    return false;
  },
  creeps: (o) => {
    if (o && o.type) {
      return o.type === 'creep';
    }
    return false;
  },
  structures: (o) => {
    if (o && o.type) {
      return o.type === 'spawn' || o.type === 'extension';
    }
    return false;
  },
};

export default class Helper {
  static setHostname(hostname) {
    Config.hostname = hostname;
  }

  /**
      * followLog method
      *
      * Connects to the api and reads and prints the console log, if messages
      * are available
      *
      * @param {list} rooms - The rooms
      * @param {function} statusUpdater - Function to handle status updates
      * @return {undefined}
      */
  static async followLog(rooms, statusUpdater) {
    rooms.forEach(async (room) => {
      const api = new ScreepsAPI({
        email: room,
        password: 'password',
        protocol: 'http',
        hostname: Config.hostname,
        port: Config.serverPort,
        path: '/',
      });

      await api.auth();

      api.socket.connect();
      api.socket.on('connected', () => { });
      api.socket.on('auth', () => { });
      api.socket.subscribe(`room:${room}`, statusUpdater);
    });
  }
  /**
   * Spawn bot
   * @param {string} botName
   * @param {string} roomName
   */

  static async spawnBot(botName, roomName, roomsSeen) {
    console.log(`Spawn ${botName} in ${roomName}`);
    await this.executeCliCommand(`bots.spawn('${botName}', '${roomName}', {username: '${roomName}', auto:'true',cpu:'${Config.userCpu}'})\r\n`);
    await this.setPassword(roomName, roomsSeen, Config.playerRooms);
  }

  /**
      * sets password for user
      *
      * @param {string} line
      * @param {object} socket
      * @param {list} rooms
      * @param {object} roomsSeen
      * @param {stringMap} playerRooms
      * @return {boolean}
      */
  static async setPassword(roomName, roomsSeen, playerRooms) {
    // eslint-disable-next-line no-param-reassign
    roomsSeen[roomName] = true;
    console.log(`Set password for ${roomName}`);
    /* eslint max-len: ["error", 1300] */
    await this.executeCliCommand(
      // Password is 'password'
      `storage.db.users.update({username: '${roomName}'}, {$set: {password: 'd0347d74b308e046b399e151c3674297ddd1aba6d6e380c94ea8ec070393d17297a3407e9c17d3d4a308043e3fd219faecc9d0d4c548a6eab87549ec83fd0688197d14b84fa810935f694c14eadd6eac3b36e19405190b1e216b5c3b0b79f03815670ba8c0eb2e23d00f556b8fdfc35eaa6d3f8f734132196c70c921f29160b1f1a0ac1fe4c196c15aa7c2a5d8358ed89fff3ad4ddbe45f7fc5ecb1b4538940f31188a9a65af59b8481f6aa00fecebf4f8e7a91be877ec8610350a06bac16d666f255a73768a96cd1797c25c68aded637f96c7b0e9ad8e9f85997bced58c288f8df06f78b096750fadc128a345c01b76ab4f0feff6f5b89712ddfe6d9b7a713b05add43bd0c4b1c59b4a72d5b81a42570c0b1f7980a969913ba31baf88ef1213e46cb09577e249688e1d10be958e7c5dae4033a5cc174261b837b29134ea090df426ad9a3624fa2be2dbfd47c6a56d7cda99c30d74c05102b1ee05e09eba4cf3f785d40c94f22b24c4e47409f5ba123b98fa30d23498e07ee26d542487b3be480f7b51f23712aef06630d1ea1a057e44e0bb8fcc1709e457544051730140852e7b493b7d3cd23202405f3d81d605be47c792681ce2d548388feddad94f790d58fb887d89358c4c0b8a6d0148e01f7f2cfd613ac371d3e3bdc606189eafba726df2959c2ac6b4780068713cb79a687e65298a4aeee75a3ef47aab3a9b853407be', salt: '8592666ec92a801874b463ea4c0a0da519936246d54bc4c40391f9ac7c5a8000'}})\r\n`,
    );

    if (playerRooms[roomName]) {
      console.log(`Set steam id for ${roomName}`);
      await this.executeCliCommand(
        `storage.db.users.update({username: '${roomName}'}, {$set: {steam: {id: '${playerRooms[roomName]}'}}})\r\n`,
      );
    }
  }

  /**
      * sleep method
      *
      * Helper method to sleep for amount of seconds.
      * @param {number} seconds Amount of seconds to sleep
      * @return {object}
      */
  static sleep(seconds) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  static async initServer() {
    console.log('Initializing server...');
    const configFilename = join(__dirname, '../config.yml');

    // Delete old config file
    if (fs.existsSync(configFilename)) fs.unlinkSync(configFilename);
    // Copy config file to non example file
    fs.copyFileSync(join(__dirname, '../config.example.yml'), configFilename);
    // Read and replace config file
    const config = fs.readFileSync(configFilename, { encoding: 'utf8' }).replace('{{STEAM_KEY}}', process.env.STEAM_API_KEY || 'unknown');
    fs.writeFileSync(configFilename, config);
  }

  /**
      * startServer method
      *
      * Starts the private server
      * @return {object}
      */
  static async startServer() {
    const dockerComposePath = join(__dirname, '../docker-compose.yml');
    console.log('Starting server...');
    const command = `docker-compose -f ${dockerComposePath} down --volumes --remove-orphans`;
    const command2 = `docker-compose -f ${dockerComposePath} up`;
    const maxTime = new Promise((resolve) => {
      setTimeout(resolve, 30 * 60 * 1000, 'Timeout');
    });
    const startServer = new Promise((resolve) => {
      execSync(command);
      const child = exec(command2);
      child.stdout.on('data', (data) => {
        console.log(data);
        if (data.includes('Started')) {
          console.log('Started server');
          resolve();
        }
      });
    });
    return Promise.race([startServer, maxTime])
      .then((result) => {
        if (result === 'Timeout') {
          console.log('Timeout starting server!');
          return false;
        }
        return true;
      })
      .catch((result) => {
        console.error('error', { data: result });
      });
  }

  static initControllerID(event, status, controllerRooms) {
    if (status[event.id].controller === null) {
      // eslint-disable-next-line prefer-destructuring
      status[event.id].controller = _.filter(event.data.objects, filter.controller)[0];
      // eslint-disable-next-line no-underscore-dangle
      status[event.id].controller = status[event.id].controller._id;
      controllerRooms[status[event.id].controller] = event.id;
    }
  }

  static updateCreeps(event, status) {
    const creeps = _.filter(event.data.objects, filter.creeps);
    if (_.size(creeps) > 0) {
      status[event.id].creeps += _.size(creeps);
    }
  }

  static updateStructures(event, status) {
    const structures = _.filter(event.data.objects, filter.structures);
    if (_.size(structures) > 0) {
      status[event.id].structures += _.size(structures);
    }
  }

  static updateController(event, status, controllerRooms) {
    const controllers = _.pick(event.data.objects, Object.keys(controllerRooms));
    Object.keys(controllers).forEach((controllerId) => {
      const controller = controllers[controllerId];
      const roomName = controllerRooms[controllerId];
      if (status[roomName] === undefined) {
        return;
      }
      if (controller.progress >= 0) {
        status[roomName].progress = controller.progress;
      }
      if (controller.level >= 0) {
        status[roomName].level = controller.level;
      }
    });
  }

  static async sendResult(milestones, status, controllerStatus, lastTick, start) {
    if (!process.env.EXPORT_URL) return;
    let commitName = 'localhost';
    if (process.env.GITHUB_EVENT_PATH) {
      const file = fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8');
      const object = JSON.parse(file);
      commitName = object.commits[0].message;
    }
    
    const newControllerStatus = [];
    Object.keys(controllerStatus).forEach((roomName) => {
      const controller = controllerStatus[roomName];
      newControllerStatus.push({roomName, controller});
    });
    controllerStatus = newControllerStatus;

    try {
      await fetch(process.env.EXPORT_URL, {
        method: 'POST',
        body: JSON.stringify({
          milestones, lastTick, status, commitName, startTime: start, endTime: Date.now(), controllerStatus
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log('Failed to end result to export url');
    }
  }

  static async executeCliCommand(command) {
    try {
      const result = await fetch(`http://localhost:${Config.cliPort}/cli`, {
        method: 'POST', body: command, headers: { 'Content-Type': 'text/plain' },
      });
      const text = await result.text();
      console.log(`> ${command}`);
      console.log(text);
      await this.sleep(1)
      return text;
    } catch (error) {
      console.log(error)
      return undefined;
    }
  }
}

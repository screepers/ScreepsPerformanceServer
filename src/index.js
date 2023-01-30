import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import minimist from 'minimist';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Setup from './setup.js';
import Helper from './helper.js';

let Config;
const argv = minimist(process.argv.slice(2));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const controllerRooms = {};
const status = {};
const controllerStatus = {};
let lastTick = 0;

const start = Date.now();

process.once('SIGINT', () => {
  console.log('Stop received...');
  const end = Date.now();
  console.log('Executing docker-compose stop');
  execSync('docker-compose stop', { stdio: 'ignore' });

  console.log(`${lastTick} ticks elapsed, ${Math.floor((end - start) / 1000)} seconds`);
  console.log('Status:');
  console.log(JSON.stringify(status, null, 2));
  console.log('Milestones:');
  console.log(JSON.stringify(Config.milestones, null, 2));
  console.log('Exiting done...');
  process.exit();
});

class Tester {
  roomsSeen = {};

  maxTicks;

  constructor() {
    try {
      this.maxTicks = argv.maxTicks !== 'undefined' ? argv.maxTicks || 50 * 1000 : 50 * 1000;
      const maxBots = Math.max(argv.maxBots, 1) || 5;

      let rooms = Object.entries(Config.rooms);
      if (rooms.length > maxBots) {
        const sortedRooms = rooms.sort(
          (a, b) => Config.trackedRooms.indexOf(b[0]) - Config.trackedRooms.indexOf(a[0]),
        );
        Config.rooms = {};

        for (let i = 0; i < sortedRooms.length && i < maxBots; i += 1) {
          const [roomName, roomConfig] = sortedRooms[i];
          Config.rooms[roomName] = roomConfig;
        }

        const trackedRooms = [];
        rooms = Object.entries(Config.rooms);
        for (let i = 0; i < Config.trackedRooms.length; i += 1) {
          const room = Config.trackedRooms[i];
          if (rooms.find((r) => r[0] === room)) {
            trackedRooms.push(room);
          }
        }
        Config.trackedRooms = trackedRooms;
      }

      for (let i = 0; i < Config.trackedRooms.length; i += 1) {
        const room = Config.trackedRooms[i];
        status[room] = {
          controller: null,
          creeps: 0,
          progress: 0,
          level: 0,
          structures: 0,
        };
        controllerStatus[room] = {};
      }

      setTimeout(() => {
        console.log('Timeout reached!');
        process.exit(1);
      }, Math.min(this.maxTicks + 1000, 20000) * 10000);
    } catch (e) {
      console.log(`Cannot parse runtime argument ${process.argv} ${e}`);
    }
  }

  /**
      *
      * @param {string} line
      * @param {object} resolve
      * @return {undefined}
      */
  async checkForSuccess(resolve, reject) {
    let appendix = '';
    if (this.maxTicks > 0) {
      appendix = ` with runtime ${this.maxTicks} ticks`;
    }
    console.log(`> Start the simulation${appendix} on port: ${Config.serverPort}`);
    if (this.maxTicks > 0) {
      while (lastTick === undefined || lastTick < this.maxTicks) {
        // eslint-disable-next-line no-await-in-loop
        await Helper.sleep(1);
      }
      console.log(`${lastTick} End of simulation`);
      console.log('Executing docker-compose stop');
      execSync('docker-compose stop', { stdio: 'ignore' });

      console.log('Status:');
      console.log(JSON.stringify(status, null, 2));
      console.log('Milestones:');
      console.log(JSON.stringify(Config.milestones, null, 2));

      const fails = Config.milestones.filter(
        (milestone) => milestone.required && milestone.tick < lastTick && !milestone.success,
      );
      await Helper.sendResult(Config.milestones, status, controllerStatus, lastTick, start);

      fails.forEach((fail) => {
        console.log(`${lastTick} Milestone failed ${JSON.stringify(fail)}`);
      });
      if (fails.length > 0) {
        reject('Not all milestones are hit.');
      }

      console.log(`${lastTick} Status check: passed`);
      resolve();
    }
  }

  /**
      * Updates the status object
      *
      * @param {object} event
      */
  static statusUpdater = (event) => {
    if (event.data.gameTime !== lastTick) {
      lastTick = event.data.gameTime || 0;

      Object.keys(status).forEach((room) => {
        const controllerLevel = status[room].level;
        if (controllerLevel >= 1 && controllerStatus[room][controllerLevel] === undefined) {
          controllerStatus[room][controllerLevel] = {
            level: controllerLevel,
            progress: status[room].progress,
            tick: lastTick,
          };
        }
      });

      for (let i = 0; i < Config.milestones.length; i += 1) {
        const milestone = Config.milestones[i];
        const failedRooms = [];
        if (typeof milestone.success === 'undefined' || milestone.success === null) {
          let success = Object.keys(status).length === Config.trackedRooms.length;
          Object.keys(status).forEach((room) => {
            Object.keys(milestone.check).forEach((key) => {
              if (status[room][key] < milestone.check[key]) {
                success = false;
                failedRooms.push(room);
              }
            });
          });

          if (success) {
            milestone.success = event.data.gameTime < milestone.tick;
            milestone.tickReached = event.data.gameTime;
            if (milestone.success) {
              console.log('===============================');
              console.log(`${event.data.gameTime} Milestone: Success ${JSON.stringify(milestone)}`);
            } else {
              console.log('===============================');
              console.log(
                `${event.data.gameTime} Milestone: Reached too late ${JSON.stringify(milestone)}`,
              );
            }
          }
        }

        if (!milestone.success && milestone.tick === event.data.gameTime) {
          milestone.failedRooms = failedRooms;
          console.log('===============================');
          console.log(
            `${event.data.gameTime} Milestone: Failed ${JSON.stringify(
              milestone,
            )} status: ${JSON.stringify(status)}`,
          );
        }
      }
    }

    Helper.initControllerID(event, status, controllerRooms);
    if (Object.keys(event.data.objects).length > 0) {
      Helper.updateCreeps(event, status);
      Helper.updateStructures(event, status);
      Helper.updateController(event, status, controllerRooms);
    }
  };

  /**
      * execute method
      *
      * Connects via cli
      * - Spawn to bot
      * - Sets the password for the user
      * - triggers `followLog`
      * - Starts the simulation
      * - Waits
      * - Reads the controller data and checks controller progress
      * @return {object}
      */
  async execute() {
    // eslint-disable-next-line no-async-promise-executor
    const execute = new Promise(async (resolve, reject) => {
      await Helper.executeCliCommand('system.resetAllData()', Config.cliPort);
      if (!await Helper.restartServer()) process.emit('SIGINT');
      await Helper.sleep(10);

      await Helper.executeCliCommand('system.pauseSimulation()', Config.cliPort);
      await Helper.executeCliCommand(`system.setTickDuration(${Config.tickDuration})`, Config.cliPort);
      await Helper.executeCliCommand('utils.removeBots()', Config.cliPort);
      await Helper.executeCliCommand('utils.setShardName("performanceServer")', Config.cliPort);

      await Helper.executeCliCommand("storage.db['rooms.objects'].insert({ type: 'terminal', room: 'W0N0', x: 0, y:0 })", Config.cliPort);
      await Helper.executeCliCommand("storage.db['rooms.objects'].insert({ type: 'terminal', room: 'W10N10', x: 0, y:0 })", Config.cliPort);
      await Helper.executeCliCommand("storage.db['rooms.objects'].insert({ type: 'terminal', room: 'W10N0', x: 0, y:0 })", Config.cliPort);
      await Helper.executeCliCommand("storage.db['rooms.objects'].insert({ type: 'terminal', room: 'W0N10', x: 0, y:0 })", Config.cliPort);

      const spawnBots = [];
      const rooms = Object.entries(Config.rooms);
      for (let roomCount = 0; roomCount < rooms.length; roomCount += 1) {
        const roomData = rooms[roomCount];
        const roomName = roomData[0];
        const botName = roomData[1];
        spawnBots.push(Helper.spawnBot(botName, roomName, this.roomsSeen, Config.cliPort));
      }
      await Promise.all(spawnBots);

      if (Object.keys(Config.rooms).length === Object.keys(this.roomsSeen).length) {
        Helper.followLog(Config.trackedRooms, Tester.statusUpdater, Config.serverPort);
        await Helper.executeCliCommand('system.resumeSimulation()', Config.cliPort);
        console.log('Server ready!');
      }
      this.checkForSuccess(resolve, reject);
    });
    return execute;
  }

  async run() {
    if (!await Helper.startServer()) process.emit('SIGINT');
    await Helper.sleep(10);

    console.log('Starting... done');
    let exitCode = 0;
    try {
      await this.execute();
      console.log(`${lastTick} Yeah`);
    } catch (e) {
      exitCode = 1;
      console.log(`${lastTick} ${e}`);
    }
    process.exit(exitCode);
  }
}

/**
 * Main method
 *
 * Start the server and connects via cli
 * @return {undefined}
 */
(async () => {
  const { ports, config } = await Setup();
  Config = config;
  Config.serverPort = ports.serverPort;
  Config.cliPort = ports.cliPort;
  dotenv.config({ path: join(__dirname, '../.env') });

  Helper.setConfig(Config);
  const tester = new Tester();
  await tester.run();
  process.emit('SIGINT');
})();

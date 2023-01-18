import Helper from './helper.js';
import Config from './config.js';
import Setup from "./setup.js"

const controllerRooms = {};
const status = {};
const controllerStatus = {};
let lastTick = 0;

const start = Date.now();

process.once('SIGINT', () => {
  console.log('SIGINT received...');
  console.log(`${lastTick} End of simulation`);
  console.log('Status:');
  console.log(JSON.stringify(status, null, 2));
  console.log('Milestones:');
  console.log(JSON.stringify(Config.milestones, null, 2));
  process.exit();
});

class Tester {
  roomsSeen = {};

  maxTicks;

  constructor() {
    try {
      this.maxTicks = Config.argv.maxTicks !== "undefined" ? Config.argv.maxTicks || 50 * 1000 : 50 * 1000;
      let maxBots = Math.max(Config.argv.maxBots, 1) || 5

      let rooms = Object.entries(Config.rooms);
      if (rooms.length > maxBots) {
        const sortedRooms = rooms.sort((a, b) => Config.trackedRooms.indexOf(b[0]) - Config.trackedRooms.indexOf(a[0]));
        Config.rooms = {};

        for (let i = 0; i < sortedRooms.length && i < maxBots; i++) {
          const room = sortedRooms[i];
          Config.rooms[room[0]] = room[1];
        }

        let trackedRooms = [];
        rooms = Object.entries(Config.rooms);
        for (let i = 0; i < Config.trackedRooms.length; i++) {
          const room = Config.trackedRooms[i];
          if (rooms.find((r) => r[0] === room)) {
            trackedRooms.push(room);
          }
        }
        Config.trackedRooms = trackedRooms;
      }

      for (let i = 0; i < Config.trackedRooms.length; i++) {
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

      if (Config.argv.cliPort) Helper.setCliPort(Config.argv.cliPort);
      if (Config.argv.serverPort) Helper.setServerPort(Config.argv.serverPort);

      setTimeout(() => {
        console.log('Timeout reached!');
        process.exit(1);
      }, Math.min(this.maxTicks, 40000) * 5000);
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
        if (controllerLevel >= 1 && controllerStatus[room][controllerLevel] === undefined) controllerStatus[room][controllerLevel] = {
          level: controllerLevel,
          progress: status[room].progress,
          tick: lastTick,
        };
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
      await Helper.executeCliCommand('system.pauseSimulation()');
      await Helper.executeCliCommand(`system.setTickDuration(${Config.tickDuration})`);
      await Helper.executeCliCommand('utils.removeBots()');
      await Helper.executeCliCommand('utils.setShardName("performanceServer")');
      await Helper.executeCliCommand("storage.db['rooms.objects'].insert({ type: 'terminal', room: 'W0N0', x: 0, y:0 })");
      await Helper.executeCliCommand("storage.db['rooms.objects'].insert({ type: 'terminal', room: 'W10N10', x: 0, y:0 })");
      await Helper.executeCliCommand("storage.db['rooms.objects'].insert({ type: 'terminal', room: 'W10N0', x: 0, y:0 })");
      await Helper.executeCliCommand("storage.db['rooms.objects'].insert({ type: 'terminal', room: 'W0N10', x: 0, y:0 })");

      const spawnBots = [];
      const rooms = Object.entries(Config.rooms);
      for (let roomCount = 0; roomCount < rooms.length; roomCount += 1) {
        const roomInfo = rooms[roomCount];
        const roomName = roomInfo[0];
        const botName = roomInfo[1];
        spawnBots.push(Helper.spawnBot(botName, roomName, this.roomsSeen));
      }
      await Promise.all(spawnBots);

      if (Object.keys(Config.rooms).length === Object.keys(this.roomsSeen).length) {
        Helper.followLog(Config.trackedRooms, Tester.statusUpdater);
        await Helper.executeCliCommand('system.resumeSimulation()');
        console.log('Server ready!');
      }
      this.checkForSuccess(resolve, reject);
    });
    return execute;
  }

  async run() {
    await Helper.initServer();
    if (!await Helper.startServer()) return;
    await Helper.sleep(20);
    await Helper.executeCliCommand('mongo.importDB()');
    await Helper.sleep(10);
    await Helper.restartServer();
    await Helper.sleep(15);
    let exitCode = 0;
    try {
      await this.execute();
      console.log(`${lastTick} Yeah`);
    } catch (e) {
      exitCode = 1;
      console.log(`${lastTick} ${e}`);
    }
    const end = Date.now();
    console.log(`${lastTick} ticks elapsed, ${Math.floor((end - start) / 1000)} seconds`);
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
  await Setup();
  const tester = new Tester();
  await tester.run();

})();

# Screeps-Performance-Server

This is a Screeps server setup which has milestones & [Stats mod](https://github.com/The-International-Screeps-Bot/screepsmod-server-stats) build in.

Credits for the original setup and baseplate go to [TooAngel](https://github.com/TooAngel)

This includes data export of the milestones result, it includes the following points:

1. Milestones
2. Status (ControllerId, creeps, level, progress, structures)
3. Tick count
4. Start/end time

## Requirements

- Node 16.x
- Docker-Compose

## Installation

- Clone this repo
- Run `npm install` to install dependencies

## Setup

- Update all .example files to your needs, this is not needed if you use the default setup

### Custom bot

1. Create new folder in `bots`
2. Add your js bot files in it (must have main.js as entry file)
3. Update `config.yml`  bots.bot string to your bot path

### Run commands

- --maxTicks, limit the amount of ticks the server will run
- --maxBots, limit the amount of bots that can be spawned
- --serverPort, change the port the server will run on
- --cliPort, change the port the cli will run on
- --force, force the non .example config files to be overwritten.
- --debug, listen to setup docker logs

## Usage

- Run `npm run server` to start the server

After you see `Start the simulation with runtime (... ticks if chosen limited tick run)` then go to `localhost:21025` (if not changed) and check out the admin utils dashboard.

The default pre spawned user password is `password`.

Its also possible to start using `npx`, to do this you need to do `npm i -g screeps-performance-server`, then `npx screeps-performance-server` with optional parameters (see #Configuration run commands)

## Milestones

Inside the config you can add milestones, these milestones will be checked every tick and if one of them is reached they will be logged. Server should stop after all milestones are reached.

To add an milestone you can just edit or add one and add/update one of the following options:

- level (rcl)
- creeps (count)
- structures (count)

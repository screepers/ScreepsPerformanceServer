# Screeps-Performance-Server

This is a Screeps server setup which has milestones & [Stats mod](https://github.com/The-International-Screeps-Bot/screepsmod-server-stats) build in.

This includes data export of the milestones result, it includes the following points:

1. Milestones
2. Status (ControllerId, creeps, level, progress, structures)
3. Tick count
4. Start/end time

## Requirements

- Node 16.x
- Docker-Compose

## Installation

### Setup

1. Copy .env.example and rename it to .env
a. Change `STEAM_API_KEY` to your key
b. If you want to auto login to one of the users you can change one of the USER Steam ids to yours and choose an room in `config.js`
c. If you want to use the milestone result export integration then you need to possible update the `EXPORT_URL` to your bot api endpoint.

2. Add your js bot to an folder inside the `bots` folder. Then update the `config.example.yml` your code and an `main.js` file should ben in the folder `dist`

### Running

Inside this folder

```bash
npm install
npm run server
```

## Usage

After you see `Start the simulation with runtime (... ticks if choose selected tick run)` then go to `localhost:21025` and check out the progress of your bot
Its also possible to start using `npx`, to do this you need to do `npm i -g screeps-performance-server`, then `npx screeps-performance-server` with optional parameter to limit tick count  `npx screeps-performance-server 1000`

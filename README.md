# Screeps-Performance-Server

This is a Screeps server setup which has milestones & [Stats mod](https://github.com/The-International-Screeps-Bot/screepsmod-server-stats) build in.

## Requirements

- Node 16.x
- Docker-Compose

## Installation

### Setup

1. Copy .env.example and rename it to .env
Change `STEAM_API_KEY` to yours
If you want to auto login to one of the users you can change one of the USER Steam ids to yours and choose an room in `config.js`

2. Add your js bot to an folder inside the `bots` folder. Then update the `config.example.yml` your code and an `main.js` file should ben in the folder `dist`

### Running

Inside this folder

```bash
npm install
npm run server
```

## Usage

After you see `Start the simulation with runtime (... ticks if choose selected tick run)` then go to `localhost:21025` and check out the progress of your bot

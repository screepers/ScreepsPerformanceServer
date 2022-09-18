'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const breakingVersion = 84;
const roomVisuals = false;
const baseVisuals = false;
const mapVisuals = false;
const CPULogging = false;
const roomStats = 1;
const allyList = [
    'MarvinTMB',
    'Q13214',
    'HerrKai',
    'clarkok',
    'PandaMaster',
    'lokenwow',
    'Morningtea',
    'LittleBitBlue',
    'Raggy',
    'DefaultO',
    'Allorrian',
];
const pixelSelling = false;
const pixelGeneration = false;
const tradeBlacklist$1 = [''];
const autoClaim = true;
const publicRamparts = false;
const allyTrading = true;
const simpleAlliesSegment = 90;
const mmoShardNames = new Set(['shard0', 'shard1', 'shard2', 'shard3']);
const roomTypeProperties = {
    source1: true,
    source2: true,
    remotes: true,
    deposits: true,
    powerBanks: true,
    notClaimable: true,
    PC: true,
    MHC: true,
    HU: true,
    commune: true,
    needs: true,
    SE: true,
    RE: true,
    abandoned: true,
    owner: true,
    level: true,
    powerEnabled: true,
    towers: true,
    hasTerminal: true,
    energy: true,
    OT: true,
    DT: true,
    portalsTo: true,
};
const roomTypes = {
    commune: {
        source1: true,
        source2: true,
        remotes: true,
        deposits: true,
        powerBanks: true,
        PC: true,
        MHC: true,
        HU: true,
    },
    remote: {
        commune: true,
        source1: true,
        source2: true,
        needs: true,
        SE: true,
        RE: true,
        abandoned: true,
        notClaimable: true,
        PC: true,
    },
    ally: {
        owner: true,
        level: true,
    },
    allyRemote: {
        owner: true,
    },
    enemy: {
        owner: true,
        level: true,
        powerEnabled: true,
        towers: true,
        hasTerminal: true,
        energy: true,
        notClaimable: true,
        OT: true,
        DT: true,
    },
    enemyRemote: {
        owner: true,
        notClaimable: true,
    },
    neutral: {
        notClaimable: true,
        PC: true,
    },
    keeper: {
        owner: true,
    },
    keeperCenter: {
        owner: true,
    },
    highway: {
        commune: true,
    },
    intersection: {
        portalsTo: true,
    },
};
const roomTypesUsedForStats = ['commune', 'remote'];
const creepRoles = [
    'source1Harvester',
    'source2Harvester',
    'hauler',
    'controllerUpgrader',
    'builder',
    'maintainer',
    'mineralHarvester',
    'hubHauler',
    'fastFiller',
    'meleeDefender',
    'source1RemoteHarvester',
    'source2RemoteHarvester',
    'remoteHauler',
    'remoteReserver',
    'remoteDefender',
    'remoteCoreAttacker',
    'remoteDismantler',
    'scout',
    'claimer',
    'vanguard',
    'allyVanguard',
    'vanguardDefender',
    'antifaAssaulter',
];
var TrafficPriorities;
(function (TrafficPriorities) {
    TrafficPriorities[TrafficPriorities["remoteHauler"] = 0] = "remoteHauler";
    TrafficPriorities[TrafficPriorities["hauler"] = 1] = "hauler";
    TrafficPriorities[TrafficPriorities["scout"] = 2] = "scout";
    TrafficPriorities[TrafficPriorities["hubHauler"] = 3] = "hubHauler";
    TrafficPriorities[TrafficPriorities["fastFiller"] = 4] = "fastFiller";
    TrafficPriorities[TrafficPriorities["source1Harvester"] = 5] = "source1Harvester";
    TrafficPriorities[TrafficPriorities["source2Harvester"] = 6] = "source2Harvester";
    TrafficPriorities[TrafficPriorities["mineralHarvester"] = 7] = "mineralHarvester";
    TrafficPriorities[TrafficPriorities["source1RemoteHarvester"] = 8] = "source1RemoteHarvester";
    TrafficPriorities[TrafficPriorities["source2RemoteHarvester"] = 9] = "source2RemoteHarvester";
    TrafficPriorities[TrafficPriorities["remoteReserver"] = 10] = "remoteReserver";
    TrafficPriorities[TrafficPriorities["remoteDismantler"] = 11] = "remoteDismantler";
    TrafficPriorities[TrafficPriorities["remoteCoreAttacker"] = 12] = "remoteCoreAttacker";
    TrafficPriorities[TrafficPriorities["vanguard"] = 13] = "vanguard";
    TrafficPriorities[TrafficPriorities["allyVanguard"] = 14] = "allyVanguard";
    TrafficPriorities[TrafficPriorities["controllerUpgrader"] = 15] = "controllerUpgrader";
    TrafficPriorities[TrafficPriorities["builder"] = 16] = "builder";
    TrafficPriorities[TrafficPriorities["maintainer"] = 17] = "maintainer";
    TrafficPriorities[TrafficPriorities["claimer"] = 18] = "claimer";
    TrafficPriorities[TrafficPriorities["vanguardDefender"] = 19] = "vanguardDefender";
    TrafficPriorities[TrafficPriorities["remoteDefender"] = 20] = "remoteDefender";
    TrafficPriorities[TrafficPriorities["meleeDefender"] = 21] = "meleeDefender";
    TrafficPriorities[TrafficPriorities["antifaAssaulter"] = 22] = "antifaAssaulter";
})(TrafficPriorities || (TrafficPriorities = {}));
const communeSigns = ['A commune of the proletariat. Bourgeoisie not welcome here!'];
const nonCommuneSigns = [
    'The top 1% have more money than the poorest 4.5 billion',
    'McDonalds workers in the US make $10/hour. In Denmark, as a result of unions, they make $22/hour',
    'We have democracy in our policial system, should we not have it in our companies too?',
    'Workers of the world, unite!',
    'Real democracy requires democracy in the workplace - Richard Wolff',
    'Adults spend a combined 13 years of their life under a dictatorship: the workplace',
    'Socialism is about worker ownership over the workplace',
    'Trans rights.',
    'Advancing the LGBTQ+ agenda <3',
    'Does Jeff Bezos work 56,000 times harder than his average worker? Because he gets paid like it',
];
const roomDimensions = 50;
const allStructureTypes = [
    STRUCTURE_SPAWN,
    STRUCTURE_EXTENSION,
    STRUCTURE_ROAD,
    STRUCTURE_WALL,
    STRUCTURE_RAMPART,
    STRUCTURE_KEEPER_LAIR,
    STRUCTURE_PORTAL,
    STRUCTURE_CONTROLLER,
    STRUCTURE_LINK,
    STRUCTURE_STORAGE,
    STRUCTURE_TOWER,
    STRUCTURE_OBSERVER,
    STRUCTURE_POWER_BANK,
    STRUCTURE_POWER_SPAWN,
    STRUCTURE_EXTRACTOR,
    STRUCTURE_LAB,
    STRUCTURE_TERMINAL,
    STRUCTURE_CONTAINER,
    STRUCTURE_NUKER,
    STRUCTURE_FACTORY,
    STRUCTURE_INVADER_CORE,
];
const impassibleStructureTypes = [
    STRUCTURE_SPAWN,
    STRUCTURE_EXTENSION,
    STRUCTURE_WALL,
    STRUCTURE_KEEPER_LAIR,
    STRUCTURE_CONTROLLER,
    STRUCTURE_LINK,
    STRUCTURE_STORAGE,
    STRUCTURE_TOWER,
    STRUCTURE_OBSERVER,
    STRUCTURE_POWER_BANK,
    STRUCTURE_POWER_SPAWN,
    STRUCTURE_EXTRACTOR,
    STRUCTURE_LAB,
    STRUCTURE_TERMINAL,
    STRUCTURE_NUKER,
    STRUCTURE_FACTORY,
    STRUCTURE_INVADER_CORE,
];
const structureTypesByBuildPriority = [
    STRUCTURE_SPAWN,
    STRUCTURE_EXTENSION,
    STRUCTURE_CONTAINER,
    STRUCTURE_ROAD,
    STRUCTURE_STORAGE,
    STRUCTURE_TOWER,
    STRUCTURE_WALL,
    STRUCTURE_RAMPART,
    STRUCTURE_LINK,
    STRUCTURE_TERMINAL,
    STRUCTURE_EXTRACTOR,
    STRUCTURE_LAB,
    STRUCTURE_FACTORY,
    STRUCTURE_POWER_SPAWN,
    STRUCTURE_NUKER,
    STRUCTURE_OBSERVER,
];
({
    0: 'empty',
    1: STRUCTURE_SPAWN,
    2: STRUCTURE_EXTENSION,
    3: STRUCTURE_CONTAINER,
    4: STRUCTURE_TOWER,
    5: STRUCTURE_STORAGE,
    6: STRUCTURE_ROAD,
    7: STRUCTURE_WALL,
    8: STRUCTURE_RAMPART,
    9: STRUCTURE_TERMINAL,
    10: STRUCTURE_EXTRACTOR,
    11: STRUCTURE_LINK,
    12: STRUCTURE_LAB,
    13: STRUCTURE_FACTORY,
    14: STRUCTURE_POWER_SPAWN,
    15: STRUCTURE_NUKER,
    16: STRUCTURE_OBSERVER,
});
const myColors = {
    white: '#ffffff',
    lightGrey: '#eaeaea',
    midGrey: '#bcbcbc',
    darkGrey: '#5e5e5e',
    lightBlue: '#0f66fc',
    darkBlue: '#02007d',
    black: '#000000',
    yellow: '#d8f100',
    red: '#d10000',
    green: '#00d137',
    brown: '#aa7253',
    purple: '#8b06a3',
    pink: '#d60ef9',
    orange: '#f27602',
    teal: '#02f2e2',
};
const stamps = {
    fastFiller: {
        offset: 3,
        protectionOffset: 6,
        size: 4,
        structures: {
            extension: [
                { x: 1, y: 1 },
                { x: 2, y: 1 },
                { x: 3, y: 1 },
                { x: 3, y: 2 },
                { x: 2, y: 3 },
                { x: 4, y: 1 },
                { x: 5, y: 1 },
                { x: 4, y: 3 },
                { x: 1, y: 4 },
                { x: 3, y: 4 },
                { x: 1, y: 5 },
                { x: 2, y: 5 },
                { x: 4, y: 5 },
                { x: 5, y: 5 },
                { x: 5, y: 4 },
            ],
            road: [
                { x: 3, y: 0 },
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 },
                { x: 0, y: 4 },
                { x: 4, y: 0 },
                { x: 5, y: 0 },
                { x: 6, y: 1 },
                { x: 6, y: 2 },
                { x: 6, y: 4 },
                { x: 6, y: 3 },
                { x: 6, y: 5 },
                { x: 5, y: 6 },
                { x: 4, y: 6 },
                { x: 3, y: 6 },
                { x: 2, y: 6 },
                { x: 1, y: 6 },
                { x: 0, y: 5 },
            ],
            spawn: [
                { x: 1, y: 2 },
                { x: 5, y: 2 },
                { x: 3, y: 5 },
            ],
            container: [
                { x: 1, y: 3 },
                { x: 5, y: 3 },
            ],
            link: [{ x: 3, y: 3 }],
            empty: [
                { x: 2, y: 2 },
                { x: 4, y: 2 },
                { x: 2, y: 4 },
                { x: 4, y: 4 },
            ],
        },
    },
    hub: {
        offset: 2,
        protectionOffset: 5,
        size: 3,
        structures: {
            road: [
                { x: 1, y: 1 },
                { x: 2, y: 0 },
                { x: 3, y: 0 },
                { x: 0, y: 3 },
                { x: 0, y: 2 },
                { x: 1, y: 4 },
                { x: 2, y: 4 },
                { x: 4, y: 2 },
                { x: 4, y: 1 },
                { x: 3, y: 3 },
            ],
            link: [{ x: 2, y: 3 }],
            factory: [{ x: 2, y: 1 }],
            nuker: [{ x: 1, y: 2 }],
            terminal: [{ x: 1, y: 3 }],
            storage: [{ x: 3, y: 1 }],
            powerSpawn: [{ x: 3, y: 2 }],
            empty: [{ x: 2, y: 2 }],
        },
    },
    extensions: {
        offset: 2,
        protectionOffset: 3,
        size: 3,
        structures: {
            extension: [
                { x: 1, y: 2 },
                { x: 2, y: 1 },
                { x: 2, y: 3 },
                { x: 2, y: 2 },
                { x: 3, y: 2 },
            ],
            road: [
                { x: 1, y: 3 },
                { x: 0, y: 2 },
                { x: 1, y: 1 },
                { x: 2, y: 0 },
                { x: 3, y: 1 },
                { x: 4, y: 2 },
                { x: 3, y: 3 },
                { x: 2, y: 4 },
            ],
        },
    },
    labs: {
        offset: 1,
        protectionOffset: 3,
        size: 2,
        asymmetry: 1,
        structures: {
            road: [
                { x: 3, y: 3 },
                { x: 2, y: 2 },
                { x: 1, y: 1 },
                { x: 0, y: 0 },
            ],
            lab: [
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 1, y: 2 },
                { x: 1, y: 3 },
                { x: 2, y: 3 },
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 2, y: 1 },
                { x: 3, y: 1 },
                { x: 3, y: 2 },
            ],
        },
    },
    tower: {
        offset: 0,
        protectionOffset: 2,
        size: 1,
        structures: {
            tower: [{ x: 0, y: 0 }],
        },
    },
    extension: {
        offset: 0,
        protectionOffset: 0,
        size: 1,
        structures: {
            extension: [{ x: 0, y: 0 }],
        },
    },
    observer: {
        offset: 0,
        protectionOffset: 0,
        size: 1,
        structures: {
            observer: [{ x: 0, y: 0 }],
        },
    },
    sourceLink: {
        offset: 0,
        protectionOffset: 0,
        size: 1,
        structures: {
            link: [{ x: 0, y: 0 }],
        },
    },
    sourceExtension: {
        offset: 0,
        protectionOffset: 0,
        size: 1,
        structures: {
            extension: [{ x: 0, y: 0 }],
        },
    },
    container: {
        offset: 0,
        protectionOffset: 0,
        size: 1,
        structures: {
            container: [{ x: 0, y: 0 }],
        },
    },
    extractor: {
        offset: 0,
        protectionOffset: 0,
        size: 1,
        structures: {
            extractor: [{ x: 0, y: 0 }],
        },
    },
    road: {
        offset: 0,
        protectionOffset: 0,
        size: 1,
        structures: {
            road: [{ x: 0, y: 0 }],
        },
    },
    rampart: {
        offset: 0,
        protectionOffset: 0,
        size: 1,
        structures: {
            rampart: [{ x: 0, y: 0 }],
        },
    },
};
const minerals = [
    RESOURCE_HYDROGEN,
    RESOURCE_OXYGEN,
    RESOURCE_UTRIUM,
    RESOURCE_KEANIUM,
    RESOURCE_LEMERGIUM,
    RESOURCE_ZYNTHIUM,
    RESOURCE_CATALYST,
];
[RESOURCE_CATALYZED_GHODIUM_ACID];
var RemoteNeeds;
(function (RemoteNeeds) {
    RemoteNeeds[RemoteNeeds["source1RemoteHarvester"] = 0] = "source1RemoteHarvester";
    RemoteNeeds[RemoteNeeds["source2RemoteHarvester"] = 1] = "source2RemoteHarvester";
    RemoteNeeds[RemoteNeeds["remoteHauler0"] = 2] = "remoteHauler0";
    RemoteNeeds[RemoteNeeds["remoteHauler1"] = 3] = "remoteHauler1";
    RemoteNeeds[RemoteNeeds["remoteReserver"] = 4] = "remoteReserver";
    RemoteNeeds[RemoteNeeds["remoteCoreAttacker"] = 5] = "remoteCoreAttacker";
    RemoteNeeds[RemoteNeeds["remoteBuilder"] = 6] = "remoteBuilder";
    RemoteNeeds[RemoteNeeds["remoteDismantler"] = 7] = "remoteDismantler";
    RemoteNeeds[RemoteNeeds["minDamage"] = 8] = "minDamage";
    RemoteNeeds[RemoteNeeds["minHeal"] = 9] = "minHeal";
    RemoteNeeds[RemoteNeeds["enemyReserved"] = 10] = "enemyReserved";
    RemoteNeeds[RemoteNeeds["invaderCore"] = 11] = "invaderCore";
})(RemoteNeeds || (RemoteNeeds = {}));
const RemoteNeeds_HaulerByIndex = [RemoteNeeds.remoteHauler0, RemoteNeeds.remoteHauler1];
const RemoteNeeds_HarvesterByIndex = [
    RemoteNeeds.source1RemoteHarvester,
    RemoteNeeds.source2RemoteHarvester,
];
var ClaimRequestNeeds;
(function (ClaimRequestNeeds) {
    ClaimRequestNeeds[ClaimRequestNeeds["claimer"] = 0] = "claimer";
    ClaimRequestNeeds[ClaimRequestNeeds["vanguard"] = 1] = "vanguard";
    ClaimRequestNeeds[ClaimRequestNeeds["vanguardDefender"] = 2] = "vanguardDefender";
})(ClaimRequestNeeds || (ClaimRequestNeeds = {}));
var AttackRequestNeeds;
(function (AttackRequestNeeds) {
    AttackRequestNeeds[AttackRequestNeeds["ranged"] = 0] = "ranged";
    AttackRequestNeeds[AttackRequestNeeds["attack"] = 1] = "attack";
    AttackRequestNeeds[AttackRequestNeeds["dismantle"] = 2] = "dismantle";
    AttackRequestNeeds[AttackRequestNeeds["downgrader"] = 3] = "downgrader";
    AttackRequestNeeds[AttackRequestNeeds["minDamage"] = 4] = "minDamage";
    AttackRequestNeeds[AttackRequestNeeds["minHeal"] = 5] = "minHeal";
})(AttackRequestNeeds || (AttackRequestNeeds = {}));
var AllyCreepRequestNeeds;
(function (AllyCreepRequestNeeds) {
    AllyCreepRequestNeeds[AllyCreepRequestNeeds["allyVanguard"] = 0] = "allyVanguard";
})(AllyCreepRequestNeeds || (AllyCreepRequestNeeds = {}));
var DepositNeeds;
(function (DepositNeeds) {
    DepositNeeds[DepositNeeds["depositHarvester"] = 0] = "depositHarvester";
    DepositNeeds[DepositNeeds["depositHauler"] = 1] = "depositHauler";
})(DepositNeeds || (DepositNeeds = {}));
const remoteHarvesterRoles = [
    'source1RemoteHarvester',
    'source2RemoteHarvester',
];
var RemoteHarvesterRolesBySourceIndex;
(function (RemoteHarvesterRolesBySourceIndex) {
    RemoteHarvesterRolesBySourceIndex[RemoteHarvesterRolesBySourceIndex["source1RemoteHarvester"] = 0] = "source1RemoteHarvester";
    RemoteHarvesterRolesBySourceIndex[RemoteHarvesterRolesBySourceIndex["source2RemoteHarvester"] = 1] = "source2RemoteHarvester";
})(RemoteHarvesterRolesBySourceIndex || (RemoteHarvesterRolesBySourceIndex = {}));
var RemoteHaulerRolesBySourceIndex;
(function (RemoteHaulerRolesBySourceIndex) {
    RemoteHaulerRolesBySourceIndex[RemoteHaulerRolesBySourceIndex["remoteHauler0"] = 0] = "remoteHauler0";
    RemoteHaulerRolesBySourceIndex[RemoteHaulerRolesBySourceIndex["remoteHauler1"] = 1] = "remoteHauler1";
})(RemoteHaulerRolesBySourceIndex || (RemoteHaulerRolesBySourceIndex = {}));
const spawnByRoomRemoteRoles = [
    'source1RemoteHarvester',
    'source2RemoteHarvester',
    'remoteReserver',
    'remoteDefender',
    'remoteCoreAttacker',
    'remoteDismantler',
];
const CPUMaxPerTick = 500;
const CPUBucketRenewThreshold = 5000;
const prefferedCommuneRange = 6;
const controllerDowngradeUpgraderNeed = 10000;
const minHarvestWorkRatio = 1.66666666667;
const UNWALKABLE = -1;
const NORMAL = 0;
const PROTECTED = 1;
const TO_EXIT = 2;
const EXIT = 3;
const safemodeTargets = [
    STRUCTURE_SPAWN,
    STRUCTURE_TOWER,
    STRUCTURE_STORAGE,
    STRUCTURE_TERMINAL,
];
const haulerUpdateDefault = 1500;
const rampartUpkeepCost = RAMPART_DECAY_AMOUNT / REPAIR_POWER / RAMPART_DECAY_TIME;
const roadUpkeepCost = ROAD_DECAY_AMOUNT / REPAIR_POWER / ROAD_DECAY_TIME;
const containerUpkeepCost = CONTAINER_DECAY / REPAIR_POWER / CONTAINER_DECAY_TIME_OWNED;
CONTAINER_DECAY / REPAIR_POWER / CONTAINER_DECAY_TIME;
const minOnboardingRamparts = 1;
const maxRampartGroupSize = 12;
const linkSendThreshold = 0.9;
const linkReceiveTreshold = 0.25;
const relayOffsets = {
    horizontal: [
        {
            x: 0,
            y: 0,
        },
        {
            x: -1,
            y: 0,
        },
        {
            x: 1,
            y: 0,
        },
    ],
    vertical: [
        {
            x: 0,
            y: 0,
        },
        {
            x: 0,
            y: -1,
        },
        {
            x: 0,
            y: 1,
        },
    ],
    topLeft: [
        {
            x: 0,
            y: 0,
        },
        {
            x: 1,
            y: 0,
        },
        {
            x: 0,
            y: 1,
        },
    ],
    topRight: [
        {
            x: 0,
            y: 0,
        },
        {
            x: -1,
            y: 0,
        },
        {
            x: 0,
            y: 1,
        },
    ],
    bottomLeft: [
        {
            x: 0,
            y: 0,
        },
        {
            x: 1,
            y: 0,
        },
        {
            x: 0,
            y: -1,
        },
    ],
    bottomRight: [
        {
            x: 0,
            y: 0,
        },
        {
            x: -1,
            y: 0,
        },
        {
            x: 0,
            y: -1,
        },
    ],
};

const importantStructures = [STRUCTURE_SPAWN, STRUCTURE_STORAGE, STRUCTURE_TERMINAL];
global.clearGlobal = function () {
    var _a;
    (_a = Game.cpu) === null || _a === void 0 ? void 0 : _a.halt();
};
global.CG = global.clearGlobal;
global.clearMemory = function () {
    for (const key in Memory)
        delete Memory[key];
    return 'Cleared all of Memory';
};
global.CM = global.clearMemory;
global.killCreeps = function (roles) {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        if (!room.controller || !room.controller.my)
            continue;
        for (const spawn of room.structures.spawn) {
            if (!spawn.spawning)
                continue;
            if (roles && !roles.includes(Game.creeps[spawn.spawning.name].role))
                continue;
            spawn.spawning.cancel();
        }
    }
    const filteredCreeps = Object.values(Game.creeps).filter(creep => {
        return !roles || roles.includes(creep.role);
    });
    let killedCreepCount = 0;
    for (const creep of filteredCreeps)
        if (creep.suicide() === OK)
            killedCreepCount += 1;
    return `Killed an total of ${killedCreepCount} creeps ${roles ? `with the roles ${roles}` : ''}`;
};
global.marxistLeninism = global.killCreeps;
global.genocide = global.killCreeps;
global.removeCSites = function (types) {
    let removedCSCount = 0;
    for (const cSiteID in Game.constructionSites) {
        const cSite = Game.constructionSites[cSiteID];
        if (types && !types.includes(cSite.structureType))
            continue;
        if (cSite.remove() === OK)
            removedCSCount += 1;
    }
    return `Removed a total of ${removedCSCount} construction sites ${types ? `with the types ${types}` : ''}`;
};
global.destroyStructures = function (roomName, types) {
    const room = Game.rooms[roomName];
    if (!room)
        return `You have no vision in ${roomName}`;
    let destroyedStructureCount = 0;
    for (const structureType of allStructureTypes) {
        if ((types && !types.includes(structureType)) || (importantStructures.includes(structureType) && !types))
            continue;
        const structures = room.structures[structureType];
        for (const structure of structures) {
            if (structure.destroy() === OK)
                destroyedStructureCount += 1;
        }
    }
    return `Destroyed a total of ${destroyedStructureCount} structures in ${roomName} ${types ? `with the types ${types}` : ''}`;
};
global.destroyCommuneStructures = function (types) {
    let log = ``;
    let destroyedStructureCount;
    for (const roomName of global.communes) {
        const room = Game.rooms[roomName];
        destroyedStructureCount = 0;
        for (const structureType of allStructureTypes) {
            if ((types && !types.includes(structureType)) || (importantStructures.includes(structureType) && !types))
                continue;
            const structures = room.structures[structureType];
            for (const structure of structures) {
                if (structure.destroy() === OK)
                    destroyedStructureCount += 1;
            }
            log += `Destroyed a total of ${destroyedStructureCount} structures in ${roomName}
               `;
        }
    }
    return log + ` ${types ? `with the types ${types}` : ''}`;
};
global.claim = function (request, communeName) {
    if (!Memory.claimRequests[request]) {
        Memory.claimRequests[request] = {
            responder: communeName,
            needs: [0],
            score: 0,
        };
    }
    if (communeName) {
        const roomMemory = Memory.rooms[communeName];
        if (!roomMemory)
            return `No memory for ${communeName}`;
        roomMemory.claimRequest = request;
    }
    return `${communeName ? `${communeName} is responding to the` : `created`} claimRequest for ${request}`;
};
global.attack = function (request, communeName) {
    if (!Memory.attackRequests[request]) {
        Memory.attackRequests[request] = {
            responder: communeName,
            needs: [0],
        };
    }
    if (communeName) {
        const roomMemory = Memory.rooms[communeName];
        if (!roomMemory)
            return `No memory for ${communeName}`;
        roomMemory.attackRequests.push(request);
    }
    return `${communeName ? `${communeName} is responding to the` : `created`} attackRequest for ${request}`;
};
global.allyCreepRequest = function (request, communeName) {
    if (!Memory.allyCreepRequests[request]) {
        Memory.allyCreepRequests[request] = {
            responder: communeName,
            needs: [0],
        };
    }
    if (communeName) {
        const roomMemory = Memory.rooms[communeName];
        if (!roomMemory)
            return `No memory for ${communeName}`;
        roomMemory.allyCreepRequest = request;
    }
    return `${communeName ? `${communeName} is responding to the` : `created`} allyCreepRequest for ${request}`;
};
global.ACR = global.allyCreepRequest;

class RespawnHandler {
    static HasRespawned() {
        if (Game.time === 0) {
            return true;
        }
        if (Object.keys(Game.creeps).length > 0) {
            return false;
        }
        const roomNames = Object.keys(Game.rooms);
        if (roomNames.length !== 1) {
            return false;
        }
        const room = Game.rooms[roomNames[0]];
        if (!room.controller ||
            !room.controller.my ||
            room.controller.level !== 1 ||
            !room.controller.progress ||
            !room.controller.safeMode ||
            room.controller.safeMode !== SAFE_MODE_DURATION - 1) {
            return false;
        }
        if (Object.keys(Game.spawns).length !== 1) {
            return false;
        }
        return true;
    }
    static HandleRespawn() {
        const hasRespawned = this.HasRespawned();
        if (!hasRespawned)
            return;
        global.clearMemory();
    }
}
RespawnHandler.HandleRespawn();

const allyArray = [...allyList];
var RequestTypes;
(function (RequestTypes) {
    RequestTypes[RequestTypes["RESOURCE"] = 0] = "RESOURCE";
    RequestTypes[RequestTypes["DEFENSE"] = 1] = "DEFENSE";
    RequestTypes[RequestTypes["ATTACK"] = 2] = "ATTACK";
    RequestTypes[RequestTypes["EXECUTE"] = 3] = "EXECUTE";
    RequestTypes[RequestTypes["HATE"] = 4] = "HATE";
})(RequestTypes || (RequestTypes = {}));
class AllyManager {
    constructor() { }
    getAllyRequests() {
        if (!Memory.allyTrading)
            return;
        if (!allyArray.length)
            return;
        if (Game.time % (10 * allyArray.length) >= allyArray.length)
            return;
        const currentAllyName = allyArray[Game.time % allyArray.length];
        if (RawMemory.foreignSegment && RawMemory.foreignSegment.username === currentAllyName) {
            try {
                this.allyRequests = JSON.parse(RawMemory.foreignSegment.data);
            }
            catch (err) { }
        }
        const nextAllyName = allyArray[(Game.time + 1) % allyArray.length];
        RawMemory.setActiveForeignSegment(nextAllyName, simpleAlliesSegment);
    }
    tickConfig() {
        this.myRequests = [];
        this.allyRequests = [];
    }
    endTickManager() {
        if (!Memory.allyTrading)
            return;
        if (Object.keys(RawMemory.segments).length < 10) {
            RawMemory.segments[simpleAlliesSegment] = JSON.stringify(this.myRequests || []);
            RawMemory.setPublicSegments([simpleAlliesSegment]);
        }
    }
    requestAttack(roomName, playerName, priority = 0) {
        this.myRequests.push({
            requestType: RequestTypes.ATTACK,
            roomName,
            playerName,
            priority,
        });
    }
    requestHelp(roomName, priority = 0) {
        this.myRequests.push({
            requestType: RequestTypes.DEFENSE,
            roomName,
            priority,
        });
    }
    requestHate(playerName, priority = 0) {
        this.myRequests.push({
            requestType: RequestTypes.HATE,
            playerName,
            priority,
        });
    }
    requestResource(roomName, resourceType, maxAmount, priority = 0) {
        this.myRequests.push({
            requestType: RequestTypes.RESOURCE,
            resourceType,
            maxAmount,
            roomName,
            priority,
        });
    }
}
const allyManager = new AllyManager();

function getAvgPrice(resourceType, days = 2) {
    const history = Game.market.getHistory(resourceType);
    let totalPrice = 0;
    for (let index = 0; index <= days; index += 1)
        totalPrice += history[index].avgPrice;
    return totalPrice / days;
}
function findObjectWithID(ID) {
    return Game.getObjectById(ID) || undefined;
}
function findCoordsInsideRect(x1, y1, x2, y2) {
    const positions = [];
    for (let x = x1; x <= x2; x += 1) {
        for (let y = y1; y <= y2; y += 1) {
            if (x < 0 || x >= roomDimensions || y < 0 || y >= roomDimensions)
                continue;
            positions.push({ x, y });
        }
    }
    return positions;
}
function areCoordsEqual(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}
function customLog(title, message, color = myColors.black, bgColor = myColors.white) {
    global.logs += `<div style='width: 85vw; text-align: center; align-items: center; justify-content: left; display: flex; background: ${bgColor};'><div style='padding: 3px; font-size: 14px; font-weigth: 400; color: ${color};'>${title}:</div>`;
    global.logs += `<div style='box-shadow: inset rgb(0, 0, 0, 0.1) 0 0 0 10000px; padding: 3px; font-size: 14px; font-weight: 200; color: ${color};'>${message}</div></div>`;
}
function newID() {
    return (Memory.ID += 1);
}
function advancedFindDistance(originRoomName, goalRoomName, typeWeights) {
    const findRouteResult = Game.map.findRoute(originRoomName, goalRoomName, {
        routeCallback(roomName) {
            if (roomName === goalRoomName)
                return 1;
            const roomMemory = Memory.rooms[roomName];
            if (!roomMemory)
                return Infinity;
            if (typeWeights[roomMemory.T])
                return typeWeights[roomMemory.T];
            return 2;
        },
    });
    if (findRouteResult === ERR_NO_PATH)
        return Infinity;
    return findRouteResult.length;
}
function findCarryPartsRequired(distance, income) {
    return (distance * 2 * income) / CARRY_CAPACITY;
}
function findAvgBetweenCoords(pos1, pos2) {
    return {
        x: Math.floor((pos1.x + pos2.x) / 2),
        y: Math.floor((pos1.y + pos2.y) / 2),
    };
}
function getRange(x1, x2, y1, y2) {
    return Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
}
function findClosestObject(target, objects) {
    let minRange = Infinity;
    let closest = undefined;
    for (const object of objects) {
        const range = getRange(target.x, object.pos.x, target.y, object.pos.y);
        if (range > minRange)
            continue;
        minRange = range;
        closest = object;
    }
    return closest;
}
function findClosestObjectInRange(target, objects, range) {
    let minRange = Infinity;
    let closest = undefined;
    for (const object of objects) {
        const range = getRange(target.x, object.pos.x, target.y, object.pos.y);
        if (range > minRange)
            continue;
        minRange = range;
        closest = object;
    }
    if (minRange <= range)
        return closest;
    return false;
}
function findClosestPos(target, positions) {
    let minRange = Infinity;
    let closest = undefined;
    for (const pos of positions) {
        const range = getRange(target.x, pos.x, target.y, pos.y);
        if (range > minRange)
            continue;
        minRange = range;
        closest = pos;
    }
    return closest;
}
function getRangeEuc(x1, x2, y1, y2) {
    return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 10) / 10;
}
function findClosestObjectEuc(target, objects) {
    let minRange = Infinity;
    let closest = undefined;
    for (const object of objects) {
        const range = getRangeEuc(target.x, object.pos.x, target.y, object.pos.y);
        if (range > minRange)
            continue;
        minRange = range;
        closest = object;
    }
    return closest;
}
function findCPUColor() {
    const CPU = Game.cpu.getUsed();
    if (CPU > Game.cpu.limit * 0.6)
        return myColors.green;
    if (CPU > Game.cpu.limit * 0.9)
        return myColors.green;
    return myColors.green;
}
function unpackAsPos(packedPos) {
    return {
        x: Math.floor(packedPos / roomDimensions),
        y: Math.floor(packedPos % roomDimensions),
    };
}
function unpackAsRoomPos(packedPos, roomName) {
    return new RoomPosition(Math.floor(packedPos / roomDimensions), Math.floor(packedPos % roomDimensions), roomName);
}
function pack(pos) {
    return pos.x * roomDimensions + pos.y;
}
function packXY(x, y) {
    return x * roomDimensions + y;
}
function findLargestTransactionAmount(budget, amount, roomName1, roomName2) {
    budget = Math.max(budget, 1);
    while (Game.market.calcTransactionCost(amount, roomName1, roomName2) >= budget) {
        amount = (amount - 1) * 0.8;
    }
    return Math.floor(amount);
}
function findClosestCommuneName(roomName) {
    const communesNotThis = [];
    for (const communeName of global.communes) {
        if (roomName == communeName)
            continue;
        communesNotThis.push(communeName);
    }
    return communesNotThis.sort((a, b) => Game.map.getRoomLinearDistance(roomName, a) - Game.map.getRoomLinearDistance(roomName, b))[0];
}
function findClosestClaimType(roomName) {
    const claimTypes = Array.from(global.communes)
        .concat(Object.keys(Memory.claimRequests))
        .filter(claimRoomName => roomName !== claimRoomName);
    return claimTypes.sort((a, b) => Game.map.getRoomLinearDistance(roomName, a) - Game.map.getRoomLinearDistance(roomName, b))[0];
}
function findClosestRoomName(start, targets) {
    let minRange = Infinity;
    let closest = undefined;
    for (const target of targets) {
        const range = Game.map.getRoomLinearDistance(start, target);
        if (range > minRange)
            continue;
        minRange = range;
        closest = target;
    }
    return closest;
}
function randomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class Market {
    constructor(mainShard = 'shard0') {
        this._minCpuUnlockSellPrice = 50 * 1000 * 1000;
        this._maxPixelBuyPrice = 40 * 1000;
        this._mainShard = mainShard;
    }
    SellCpuUnlock() {
        const orders = Game.market.getAllOrders(order => order.resourceType === CPU_UNLOCK &&
            order.type === ORDER_BUY &&
            order.price > this._minCpuUnlockSellPrice);
        orders.forEach(order => {
            const result = Game.market.deal(order.id, order.amount);
            if (result === OK) {
                const message = `Dealed CPU UNLOCK ${order.amount} for ${order.price}`;
                Game.notify(message, 0);
                console.log(message);
            }
        });
    }
    BuyPixels() {
        const orders = Game.market.getAllOrders(order => order.resourceType === PIXEL && order.type === ORDER_SELL && order.price < this._maxPixelBuyPrice);
        for (let i = 0; i < orders.length; i += 1) {
            const order = orders[i];
            const result = Game.market.deal(order.id, order.amount);
            if (result === OK) {
                const message = `Dealed PIXEL ${order.amount} for ${order.price}`;
                Game.notify(message, 60 * 24 * 7);
                console.log(message);
            }
        }
    }
    BuyMorePixels() {
        const orders = Game.market.getAllOrders(order => order.resourceType === PIXEL && order.type === ORDER_BUY && order.price < this._maxPixelBuyPrice);
        const myOrder = orders.find(order => order.id === '62d1d72a3a08f134005f736a');
        orders.sort((a, b) => b.price - a.price);
        if (orders[0].id !== myOrder.id) {
            const newPrice = orders[0].price + 1;
            Game.market.changeOrderPrice(myOrder.id, newPrice);
        }
        if (myOrder.remainingAmount < 1000) {
            Game.market.extendOrder(myOrder.id, 1000);
        }
    }
    HandleOrderEveryTick() {
        if (Game.shard.name === this._mainShard) {
            this.BuyPixels();
        }
    }
}

class GetShardVision {
    constructor() {
        var _a;
        this._mainShard = 'shard0';
        this._shardNames = ['shard0', 'shard1', 'shard2', 'shard3'];
        this._lastShardIndex = this._shardNames.indexOf((_a = global.lastShardTarget) !== null && _a !== void 0 ? _a : this._shardNames[this._shardNames.length - 1]);
    }
    SpawnCreeps() {
        const spawnShardFlag = Game.flags[this._shardNames[0]];
        if (!spawnShardFlag)
            return;
        const roomNames = ['E72N6', 'E73N11', 'E73N13', 'E72N14', 'E69N12', 'E75N11'];
        const spawns = Object.values(Game.spawns).filter(s => roomNames.includes(s.room.name));
        const spawn = spawns.filter(s => s.spawning === null)[0];
        if (!spawn)
            return;
        const shardTarget = this._lastShardIndex === this._shardNames.length - 1
            ? this._shardNames[0]
            : this._shardNames[this._lastShardIndex + 1];
        const spawnResult = spawn.spawnCreep([MOVE], `${shardTarget}-${Game.time}`);
        if (spawnResult === OK || spawnResult === ERR_NAME_EXISTS) {
            global.lastShardTarget = shardTarget;
        }
    }
    MoveCreepsToTarget(creep, targetPos) {
        if (!creep.pos.inRangeTo(targetPos, 0)) {
            creep.moveTo(targetPos);
        }
    }
    Handle() {
        if (!this._shardNames.includes(Game.shard.name))
            return;
        this._shardNames.forEach((shardName, index) => {
            if (Game.time % 100 === 0 && index === 0) {
                this.SpawnCreeps();
            }
            let loggedOrders = false;
            const creeps = Object.values(Game.creeps).filter(c => c.name.includes(shardName));
            creeps.forEach(creep => {
                if (Game.shard.name === this._mainShard && shardName === this._mainShard) {
                    this.MoveCreepsToTarget(creep, Game.flags[this._mainShard].pos);
                }
                else if (Game.shard.name === this._mainShard && shardName === 'shard1') {
                    this.MoveCreepsToTarget(creep, Game.flags.shard1.pos);
                }
                else if (shardName === 'shard2') {
                    if (Game.shard.name === this._mainShard) {
                        this.MoveCreepsToTarget(creep, Game.flags.shard1.pos);
                    }
                    else if (Game.shard.name === 'shard1') {
                        this.MoveCreepsToTarget(creep, Game.flags.shard2.pos);
                    }
                }
                else if (shardName === 'shard3') {
                    if (Game.shard.name === this._mainShard) {
                        this.MoveCreepsToTarget(creep, Game.flags.shard1.pos);
                    }
                    else if (Game.shard.name === 'shard1') {
                        this.MoveCreepsToTarget(creep, Game.flags.shard2.pos);
                    }
                    else if (Game.shard.name === 'shard2') {
                        this.MoveCreepsToTarget(creep, Game.flags.shard3.pos);
                    }
                }
                if (Game.shard.name === shardName) {
                    if (!loggedOrders && Game.time % 100 === 0) {
                        console.log(JSON.stringify(Game.market.getAllOrders()));
                        if (Game.time % 1000 === 0) {
                            console.log(JSON.stringify(Game.market.getHistory()));
                        }
                        loggedOrders = true;
                    }
                    creep.say(shardName);
                }
            });
        });
    }
}

function ExecutePandaMasterCode () {
    if (Memory.me != 'PandaMaster')
        return;
    new GetShardVision().Handle();
    new Market().HandleOrderEveryTick();
}

class InternationalManager {
    run() {
        if (Memory.CPULogging)
            var managerCPUStart = Game.cpu.getUsed();
        this.tickConfig();
        this.creepOrganizer();
        this.constructionSiteManager();
        this.orderManager();
        allyManager.tickConfig();
        allyManager.getAllyRequests();
        ExecutePandaMasterCode();
        if (Memory.CPULogging)
            customLog('International Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), myColors.white, myColors.lightBlue);
    }
    orderManager() {
        if (MARKET_MAX_ORDERS * 0.8 > this.myOrdersCount)
            return;
        for (const ID in Game.market.orders) {
            if (!Game.market.orders[ID].active)
                Game.market.cancelOrder(ID);
        }
    }
    getSellOrder(resourceType, maxPrice = getAvgPrice(resourceType) * 1.2) {
        var _a;
        const orders = ((_a = this.orders.sell) === null || _a === void 0 ? void 0 : _a[resourceType]) || [];
        let bestOrder;
        for (const order of orders) {
            if (order.price >= maxPrice)
                continue;
            if (order.price < (bestOrder ? bestOrder.price : Infinity))
                bestOrder = order;
        }
        return bestOrder;
    }
    getBuyOrder(resourceType, minPrice = getAvgPrice(resourceType) * 0.8) {
        var _a;
        const orders = ((_a = this.orders.buy) === null || _a === void 0 ? void 0 : _a[resourceType]) || [];
        let bestOrder;
        for (const order of orders) {
            if (order.price <= minPrice)
                continue;
            if (order.price > (bestOrder ? bestOrder.price : 0))
                bestOrder = order;
        }
        return bestOrder;
    }
    advancedSellPixels() {
        if (!Memory.pixelSelling)
            return;
        if (Game.resources[PIXEL] === 0)
            return;
        const avgPrice = getAvgPrice(PIXEL, 7);
        const minPrice = avgPrice * 0.8;
        customLog('minPixelPrice', minPrice);
        customLog('avgPixelPrice', avgPrice);
        const buyOrder = this.getBuyOrder(PIXEL, minPrice);
        if (buyOrder) {
            Game.market.deal(buyOrder.id, Math.min(buyOrder.amount, Game.resources[PIXEL]));
            return;
        }
        const myPixelOrder = _.filter(Game.market.orders, o => (o.type == "sell" && o.resourceType == PIXEL))[0];
        const sellOrder = this.getSellOrder(PIXEL, Infinity);
        let price;
        if (sellOrder.price < avgPrice) {
            price = avgPrice;
        }
        else {
            price = sellOrder.price;
        }
        if (myPixelOrder) {
            if (Game.time % 100 == 0) {
                if (myPixelOrder.remainingAmount < Game.resources[PIXEL]) {
                    Game.market.extendOrder(myPixelOrder.id, Game.resources[PIXEL] - myPixelOrder.remainingAmount);
                    return;
                }
                else {
                    if (myPixelOrder.price == price)
                        return;
                    Game.market.changeOrderPrice(myPixelOrder.id, price - 0.001);
                    return;
                }
            }
            else {
                return;
            }
        }
        Game.market.createOrder({
            type: ORDER_SELL,
            resourceType: PIXEL,
            price: price - 0.001,
            totalAmount: Game.resources[PIXEL],
        });
    }
    advancedGeneratePixel() {
        if (!Memory.pixelGeneration)
            return;
        if (!mmoShardNames.has(Game.shard.name))
            return;
        if (Game.cpu.bucket !== 10000)
            return;
        Game.cpu.generatePixel();
    }
    getTerrainCoords(roomName) {
        if (!global.terrainCoords)
            global.terrainCoords = {};
        if (global.terrainCoords[roomName])
            return global.terrainCoords[roomName];
        global.terrainCoords[roomName] = new Uint8Array(2500);
        const terrain = Game.map.getRoomTerrain(roomName);
        for (let x = 0; x < roomDimensions; x += 1) {
            for (let y = 0; y < roomDimensions; y += 1) {
                global.terrainCoords[roomName][packXY(x, y)] = terrain.get(x, y) === TERRAIN_MASK_WALL ? 255 : 0;
            }
        }
        return global.terrainCoords[roomName];
    }
    tickReset() {
        delete this._myOrders;
        delete this._orders;
        delete this._myOrdersCount;
        delete this._claimRequestsByScore;
        delete this._defaultMinCacheAmount;
    }
    get myOrders() {
        if (this._myOrders)
            return this._myOrders;
        this._myOrders = {};
        for (const orderID in Game.market.orders) {
            const order = Game.market.orders[orderID];
            if (order.remainingAmount == 0)
                continue;
            if (!this._myOrders[order.roomName]) {
                this._myOrders[order.roomName] = {
                    sell: {},
                    buy: {},
                };
            }
            if (!this._myOrders[order.roomName][order.type][order.resourceType])
                this._myOrders[order.roomName][order.type][order.resourceType] = [];
            this._myOrders[order.roomName][order.type][order.resourceType].push(order);
        }
        return this._myOrders;
    }
    get orders() {
        if (this._orders)
            return this._orders;
        this._orders = {
            buy: {},
            sell: {},
        };
        const orders = Game.market.getAllOrders();
        let order;
        for (const orderID in orders) {
            order = orders[orderID];
            this._orders[order.type][order.resourceType]
                ? this._orders[order.type][order.resourceType].push(order)
                : (this._orders[order.type][order.resourceType] = [order]);
        }
        return this._orders;
    }
    get myOrdersCount() {
        if (this._myOrdersCount)
            return this._myOrdersCount;
        return (this._myOrdersCount = Object.keys(Game.market.orders).length);
    }
    get claimRequestsByScore() {
        if (this._claimRequestsByScore)
            return this._claimRequestsByScore;
        return (this._claimRequestsByScore = Object.keys(Memory.claimRequests).sort((a, b) => Memory.claimRequests[a].score - Memory.claimRequests[b].score));
    }
    get defaultMinCacheAmount() {
        if (this._defaultMinCacheAmount)
            return this._defaultMinCacheAmount;
        const avgCPUUsagePercent = (Memory.stats.cpu.usage || 20) / Game.cpu.limit;
        return Math.floor(Math.pow(avgCPUUsagePercent * 10, 2.2)) + 1;
    }
    get marketIsFunctional() {
        if (this._marketIsFunctional !== undefined)
            return this._marketIsFunctional;
        return (this._marketIsFunctional = Game.market.getHistory(RESOURCE_ENERGY).length);
    }
}
const internationalManager = new InternationalManager();

class StatsManager {
    roomConfig(roomName, roomType) {
        if (roomType === 'commune') {
            const communeStats = {
                cl: 0,
                eib: 0,
                eih: 0,
                eou: 0,
                eoro: 0,
                eorwr: 0,
                eob: 0,
                eos: 0,
                eosp: 0,
                mh: 0,
                es: 0,
                cc: 0,
                cu: Game.cpu.getUsed(),
                su: 0,
                tcc: 0,
                rc: 0,
                rcu: 0,
                res: 0,
                reih: 0,
                reoro: 0,
                reob: 0,
            };
            global.roomStats.commune[roomName] = communeStats;
            if (!Memory.stats.rooms[roomName])
                Memory.stats.rooms[roomName] = communeStats;
            return;
        }
        const remoteStats = {
            rc: 0,
            rcu: Game.cpu.getUsed(),
            res: 0,
            reih: 0,
            reoro: 0,
            reob: 0,
        };
        global.roomStats.remote[roomName] = remoteStats;
    }
    roomPreTick(roomName, roomType) {
        this.roomConfig(roomName, roomType);
    }
    roomEndTick(roomName, roomType) {
        if (roomType === 'commune') {
            const globalStats = global.roomStats.commune[roomName];
            globalStats.cu = globalStats.cu >= 0 ? Game.cpu.getUsed() - globalStats.cu : 0;
        }
        else if (roomType === 'remote') {
            const globalStats = global.roomStats.remote[roomName];
            globalStats.rcu = globalStats.rcu >= 0 ? Game.cpu.getUsed() - globalStats.rcu : 0;
        }
    }
    roomCommuneFinalEndTick(roomName, room) {
        const roomMemory = Memory.rooms[roomName];
        const roomStats = Memory.stats.rooms[roomName];
        const globalCommuneStats = global.roomStats.commune[roomName];
        const allGlobalRemoteStats = Object.entries(global.roomStats.remote).filter(([roomName]) => roomMemory.remotes.includes(roomName));
        let spawnUsage = 0;
        roomStats.cu = this.average(roomStats.cu, globalCommuneStats.cu >= 0 ? globalCommuneStats.cu : 0);
        if (room) {
            roomStats.cc = room.myCreepsAmount;
            roomStats.tcc = room.creepsFromRoomAmount;
            const spawns = room.structures.spawn;
            if (spawns.length > 0)
                spawnUsage = spawns.reduce((sum, spawn) => sum + (spawn.spawning !== null ? 1 : 0), 0) / spawns.length;
        }
        else {
            roomStats.cc = 0;
            roomStats.tcc = 0;
        }
        roomStats.su = this.average(roomStats.su, spawnUsage);
        if (Game.time % 250 === 0 && room) {
            if (room.controller && room.controller.my) {
                const progressPercentage = room.controller.progress / room.controller.progressTotal;
                roomStats.cl =
                    progressPercentage < 1 ? room.controller.level + progressPercentage : room.controller.level;
            }
            else
                roomStats.cl = null;
            roomStats.es = room.findStoredResourceAmount(RESOURCE_ENERGY);
        }
        roomStats.eih = this.average(roomStats.eih, globalCommuneStats.eih);
        if (Memory.roomStats >= 2) {
            roomStats.mh = this.average(roomStats.mh, globalCommuneStats.mh);
            roomStats.eib = this.average(roomStats.eib, globalCommuneStats.eib);
            roomStats.eos = this.average(roomStats.eos, globalCommuneStats.eos);
            roomStats.eou = this.average(roomStats.eou, globalCommuneStats.eou);
            roomStats.eob = this.average(roomStats.eob, globalCommuneStats.eob);
            roomStats.eoro = this.average(roomStats.eoro, globalCommuneStats.eoro);
            roomStats.eorwr = this.average(roomStats.eorwr, globalCommuneStats.eorwr);
            roomStats.eosp = this.average(roomStats.eosp, globalCommuneStats.eosp);
            allGlobalRemoteStats.forEach(([remoteRoomName, remoteRoomStats]) => {
                globalCommuneStats.rc += 1;
                globalCommuneStats.rcu += remoteRoomStats.rcu;
                globalCommuneStats.res += remoteRoomStats.res;
                globalCommuneStats.reih += remoteRoomStats.reih;
                globalCommuneStats.reoro += remoteRoomStats.reoro;
                globalCommuneStats.reob += remoteRoomStats.reob;
            });
            roomStats.rc = this.average(globalCommuneStats.rc, roomStats.rc);
            roomStats.rcu = this.average(globalCommuneStats.rcu, roomStats.rcu);
            roomStats.res = this.average(globalCommuneStats.res, roomStats.res);
            roomStats.reih = this.average(globalCommuneStats.reih, roomStats.reih);
            roomStats.reoro = this.average(globalCommuneStats.reoro, roomStats.reoro);
            roomStats.reob = this.average(globalCommuneStats.reob, roomStats.reob);
        }
    }
    internationalConfig() {
        Memory.stats = {
            lastReset: 0,
            tickLength: 0,
            lastTickTimestamp: 0,
            resources: {
                pixels: 0,
                cpuUnlocks: 0,
                accessKeys: 0,
                credits: 0,
            },
            cpu: {
                bucket: 0,
                usage: 0,
                limit: 0,
            },
            memory: {
                usage: 0,
                limit: 2097,
            },
            gcl: {
                level: 0,
                progress: 0,
                progressTotal: 0,
            },
            gpl: {
                level: 0,
                progress: 0,
                progressTotal: 0,
            },
            rooms: {},
            constructionSiteCount: 0,
        };
        global.roomStats = { commune: {}, remote: {} };
        this.internationalEndTick();
    }
    internationalPreTick() {
        global.roomStats = { commune: {}, remote: {} };
    }
    internationalEndTick() {
        const timestamp = Date.now();
        global.lastReset = (global.lastReset || 0) + 1;
        Memory.stats.lastReset = global.lastReset;
        Memory.stats.tickLength = timestamp - Memory.stats.lastTickTimestamp;
        Memory.stats.lastTickTimestamp = timestamp;
        Memory.stats.constructionSiteCount = global.constructionSitesCount || 0;
        Memory.stats.resources = {
            pixels: Game.resources[PIXEL],
            cpuUnlocks: Game.resources[CPU_UNLOCK],
            accessKeys: Game.resources[ACCESS_KEY],
            credits: Game.market.credits,
        };
        Memory.stats.cpu = {
            bucket: Game.cpu.bucket,
            limit: Game.cpu.limit,
            usage: this.average(Memory.stats.cpu.usage, Game.cpu.getUsed()),
        };
        Memory.stats.memory.usage = Math.floor(RawMemory.get().length / 1000);
        Memory.stats.gcl = {
            progress: Game.gcl.progress,
            progressTotal: Game.gcl.progressTotal,
            level: Game.gcl.level,
        };
        Memory.stats.gpl = {
            progress: Game.gpl.progress,
            progressTotal: Game.gpl.progressTotal,
            level: Game.gpl.level,
        };
        const globalRoomKeys = Object.keys(global.roomStats.commune);
        const notCheckedCommuneRooms = Object.keys(Memory.stats.rooms).filter(room => !globalRoomKeys.includes(room));
        globalRoomKeys.forEach(roomName => {
            this.roomCommuneFinalEndTick(roomName, Game.rooms[roomName]);
        });
        notCheckedCommuneRooms.forEach(roomName => {
            const roomType = Memory.rooms[roomName].T;
            if (roomType === 'commune') {
                this.roomConfig(roomName, roomType);
                this.roomCommuneFinalEndTick(roomName, Game.rooms[roomName]);
            }
            else {
                delete Memory.stats.rooms[roomName];
            }
        });
        delete global.roomStats;
    }
    average(originalNumber, newNumber, averagedOverTickCount = 500, digits = 5) {
        const newWeight = 1 / averagedOverTickCount;
        const originalWeight = 1 - newWeight;
        const originalNumberResult = originalNumber * originalWeight;
        const newNumberResult = newNumber * newWeight;
        const result = (originalNumberResult || 0) + (newNumberResult || 0);
        return parseFloat(result.toFixed(digits));
    }
}
const statsManager = new StatsManager();

class ConfigManager {
    run() {
        this.migrate();
        this.configMemory();
        this.configGlobal();
    }
    migrate() {
        if (Memory.breakingVersion === breakingVersion)
            return;
        if (Memory.breakingVersion === 81) {
            global.killCreeps();
            for (const roomName in Memory.rooms) {
                const type = Memory.rooms[roomName].T;
                if (type === 'commune' || type === 'remote') {
                    delete Memory.rooms[roomName];
                    continue;
                }
            }
            Memory.breakingVersion = 82;
        }
        if (Memory.breakingVersion === 82) {
            global.killCreeps();
            for (const roomName in Memory.rooms) {
                const type = Memory.rooms[roomName].T;
                if (type === 'commune' || type === 'remote') {
                    delete Memory.rooms[roomName];
                    continue;
                }
            }
            Memory.breakingVersion = 83;
        }
        if (Memory.breakingVersion === 83) {
            global.killCreeps();
            for (const roomName in Memory.rooms) {
                const type = Memory.rooms[roomName].T;
                if (type === 'commune' || type === 'remote') {
                    delete Memory.rooms[roomName];
                    continue;
                }
            }
            Memory.breakingVersion = 84;
        }
        if (Memory.breakingVersion < breakingVersion) {
            global.killCreeps();
            global.clearMemory();
            global.removeCSites();
        }
    }
    configMemory() {
        var _a, _b, _c, _d;
        if (Memory.breakingVersion)
            return;
        Memory.breakingVersion = breakingVersion;
        Memory.me =
            ((_b = (_a = Object.values(Game.structures)[0]) === null || _a === void 0 ? void 0 : _a.owner) === null || _b === void 0 ? void 0 : _b.username) ||
                ((_d = (_c = Object.values(Game.creeps)[0]) === null || _c === void 0 ? void 0 : _c.owner) === null || _d === void 0 ? void 0 : _d.username) ||
                'username';
        Memory.isMainShard =
            Game.shard.name !== 'performanceServer'
                ? Object.keys(Game.spawns).length > 0 || Game.shard.name.search('shard[0-3]') === -1
                : false;
        Memory.roomVisuals = roomVisuals;
        Memory.baseVisuals = baseVisuals;
        Memory.mapVisuals = mapVisuals;
        Memory.CPULogging = CPULogging;
        Memory.roomStats = Game.shard.name !== 'performanceServer' ? roomStats : 2;
        Memory.allyList = allyList;
        Memory.pixelSelling = pixelSelling;
        Memory.pixelGeneration = pixelGeneration;
        Memory.tradeBlacklist = tradeBlacklist$1;
        Memory.autoClaim = autoClaim;
        Memory.publicRamparts = publicRamparts;
        Memory.allyTrading = allyTrading;
        Memory.ID = 0;
        Memory.constructionSites = {};
        Memory.players = {};
        Memory.claimRequests = {};
        Memory.attackRequests = {};
        Memory.allyCreepRequests = {};
        statsManager.internationalConfig();
    }
    configGlobal() {
        if (global.constructed)
            return;
        global.constructed = true;
        global.roomManagers = {};
        global.communeManagers = {};
        global.packedRoomNames = {};
        global.unpackedRoomNames = {};
    }
}
const configManager = new ConfigManager();

Room.prototype.haulerSizeManager = function () {
    const { memory } = this;
    memory.HU -= 1;
    if (memory.HU > 0)
        return;
    memory.HU = haulerUpdateDefault;
    const avgCPUUsagePercent = (Memory.stats.cpu.usage || 20) / Game.cpu.limit;
    memory.MHC =
        (Math.floor(Math.max(Math.pow(avgCPUUsagePercent, 1.5) - 0.4, 0) *
            Math.min(this.energyCapacityAvailable / BODYPART_COST.move, MAX_CREEP_SIZE)) + this.structures.spawn.length * 2) * BODYPART_COST[CARRY];
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var lodash = {exports: {}};

/**
 * @license
 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern -d -o ./index.js`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

(function (module, exports) {
(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined$1;

  /** Used as the semantic version number. */
  var VERSION = '3.10.1';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 4,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64,
      ARY_FLAG = 128,
      REARG_FLAG = 256;

  /** Used as default options for `_.trunc`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect when a function becomes hot. */
  var HOT_COUNT = 150,
      HOT_SPAN = 16;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
      reUnescapedHtml = /[&<>"'`]/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

  /**
   * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
   * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
   */
  var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);

  /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
  var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect hexadecimal string values. */
  var reHasHexPrefix = /^0[xX]/;

  /** Used to detect host constructors (Safari > 5). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^\d+$/;

  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to match words to create compound words. */
  var reWords = (function() {
    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
  }());

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number',
    'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'isFinite',
    'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
  cloneableTags[dateTag] = cloneableTags[float32Tag] =
  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[stringTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[mapTag] = cloneableTags[setTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map latin-1 supplementary letters to basic latin letters. */
  var deburredLetters = {
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
  };

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used to escape characters for inclusion in compiled regexes. */
  var regexpEscapes = {
    '0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
    '5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
    'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
    'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
    'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = freeExports && freeModule && typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;

  /** Detect free variable `window`. */
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `compareAscending` which compares values and
   * sorts them in ascending order without guaranteeing a stable sort.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function baseCompareAscending(value, other) {
    if (value !== other) {
      var valIsNull = value === null,
          valIsUndef = value === undefined$1,
          valIsReflexive = value === value;

      var othIsNull = other === null,
          othIsUndef = other === undefined$1,
          othIsReflexive = other === other;

      if ((value > other && !othIsNull) || !valIsReflexive ||
          (valIsNull && !othIsUndef && othIsReflexive) ||
          (valIsUndef && othIsReflexive)) {
        return 1;
      }
      if ((value < other && !valIsNull) || !othIsReflexive ||
          (othIsNull && !valIsUndef && valIsReflexive) ||
          (othIsUndef && valIsReflexive)) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return indexOfNaN(array, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isFunction` without support for environments
   * with incorrect `typeof` results.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   */
  function baseIsFunction(value) {
    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
    return typeof value == 'function' || false;
  }

  /**
   * Converts `value` to a string if it's not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    return value == null ? '' : (value + '');
  }

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the first character not found in `chars`.
   */
  function charsLeftIndex(string, chars) {
    var index = -1,
        length = string.length;

    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the last character not found in `chars`.
   */
  function charsRightIndex(string, chars) {
    var index = string.length;

    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  /**
   * Used by `_.sortBy` to compare transformed elements of a collection and stable
   * sort them in ascending order.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareAscending(object, other) {
    return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
  }

  /**
   * Used by `_.sortByOrder` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all valuess are sorted in ascending order. Otherwise,
   * a value is sorted in ascending order if its corresponding order is "asc", and
   * descending if "desc".
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

    while (++index < length) {
      var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        var order = orders[index];
        return result * ((order === 'asc' || order === true) ? 1 : -1);
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  }

  /**
   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  function deburrLetter(letter) {
    return deburredLetters[letter];
  }

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
  }

  /**
   * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @param {string} leadingChar The capture group for a leading character.
   * @param {string} whitespaceChar The capture group for a whitespace character.
   * @returns {string} Returns the escaped character.
   */
  function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
    if (leadingChar) {
      chr = regexpEscapes[chr];
    } else if (whitespaceChar) {
      chr = stringEscapes[chr];
    }
    return '\\' + chr;
  }

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 0 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      var other = array[index];
      if (other !== other) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /**
   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
   * character code is whitespace.
   *
   * @private
   * @param {number} charCode The character code to inspect.
   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
   */
  function isSpace(charCode) {
    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      if (array[index] === placeholder) {
        array[index] = PLACEHOLDER;
        result[++resIndex] = index;
      }
    }
    return result;
  }

  /**
   * An implementation of `_.uniq` optimized for sorted arrays without support
   * for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate-value-free array.
   */
  function sortedUniq(array, iteratee) {
    var seen,
        index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (!index || seen !== computed) {
        seen = computed;
        result[++resIndex] = value;
      }
    }
    return result;
  }

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the first non-whitespace character.
   */
  function trimmedLeftIndex(string) {
    var index = -1,
        length = string.length;

    while (++index < length && isSpace(string.charCodeAt(index))) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedRightIndex(string) {
    var index = string.length;

    while (index-- && isSpace(string.charCodeAt(index))) {}
    return index;
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the given `context` object.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // using `context` to mock `Date#getTime` use in `_.now`
   * var mock = _.runInContext({
   *   'Date': function() {
   *     return { 'getTime': getTimeMock };
   *   }
   * });
   *
   * // or creating a suped-up `defer` in Node.js
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See https://es5.github.io/#x11.1.5 for more details.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for native method references. */
    var arrayProto = Array.prototype,
        objectProto = Object.prototype,
        stringProto = String.prototype;

    /** Used to resolve the decompiled source of functions. */
    var fnToString = Function.prototype.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /**
     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objToString = objectProto.toString;

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Native method references. */
    var ArrayBuffer = context.ArrayBuffer,
        clearTimeout = context.clearTimeout,
        parseFloat = context.parseFloat,
        pow = Math.pow,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        Set = getNative(context, 'Set'),
        setTimeout = context.setTimeout,
        splice = arrayProto.splice,
        Uint8Array = context.Uint8Array,
        WeakMap = getNative(context, 'WeakMap');

    /* Native method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeCreate = getNative(Object, 'create'),
        nativeFloor = Math.floor,
        nativeIsArray = getNative(Array, 'isArray'),
        nativeIsFinite = context.isFinite,
        nativeKeys = getNative(Object, 'keys'),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = getNative(Date, 'now'),
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;

    /** Used as references for `-Infinity` and `Infinity`. */
    var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
        POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

    /** Used as references for the maximum length and index of an array. */
    var MAX_ARRAY_LENGTH = 4294967295,
        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

    /**
     * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
     * of an array-like value.
     */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
     * Methods that operate on and return arrays, collections, and functions can
     * be chained together. Methods that retrieve a single value or may return a
     * primitive value will automatically end the chain returning the unwrapped
     * value. Explicit chaining may be enabled using `_.chain`. The execution of
     * chained methods is lazy, that is, execution is deferred until `_#value`
     * is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
     * fusion is an optimization strategy which merge iteratee calls; this can help
     * to avoid the creation of intermediate data structures and greatly reduce the
     * number of iteratee executions.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
     * `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
     * and `where`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
     * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
     * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
     * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
     * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
     * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
     * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
     * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
     * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
     * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
     * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
     * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
     * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
     * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
     * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
     * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
     * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
     * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
     * `unescape`, `uniqueId`, `value`, and `words`
     *
     * The wrapper method `sample` will return a wrapped value when `n` is provided,
     * otherwise an unwrapped value is returned.
     *
     * @name _
     * @constructor
     * @category Chain
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(total, n) {
     *   return total + n;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(n) {
     *   return n * n;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The function whose prototype all chaining wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
     */
    function LodashWrapper(value, chainAll, actions) {
      this.__wrapped__ = value;
      this.__actions__ = actions || [];
      this.__chain__ = !!chainAll;
    }

    /**
     * An object environment feature flags.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.support = {};

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB). Change the following template settings to use
     * alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': lodash
      }
    };

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = POSITIVE_INFINITY;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = arrayCopy(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = arrayCopy(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = arrayCopy(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || arrLength < LARGE_ARRAY_SIZE || (arrLength == length && takeCount == length)) {
        return baseWrapperValue((isRight && isArr) ? array.reverse() : array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a cache object to store key/value pairs.
     *
     * @private
     * @static
     * @name Cache
     * @memberOf _.memoize
     */
    function MapCache() {
      this.__data__ = {};
    }

    /**
     * Removes `key` and its value from the cache.
     *
     * @private
     * @name delete
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
     */
    function mapDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /**
     * Gets the cached value for `key`.
     *
     * @private
     * @name get
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the cached value.
     */
    function mapGet(key) {
      return key == '__proto__' ? undefined$1 : this.__data__[key];
    }

    /**
     * Checks if a cached value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapHas(key) {
      return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
    }

    /**
     * Sets `value` to `key` of the cache.
     *
     * @private
     * @name set
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to cache.
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache object.
     */
    function mapSet(key, value) {
      if (key != '__proto__') {
        this.__data__[key] = value;
      }
      return this;
    }

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates a cache object to store unique values.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var length = values ? values.length : 0;

      this.data = { 'hash': nativeCreate(null), 'set': new Set };
      while (length--) {
        this.push(values[length]);
      }
    }

    /**
     * Checks if `value` is in `cache` mimicking the return signature of
     * `_.indexOf` by returning `0` if the value is found, else `-1`.
     *
     * @private
     * @param {Object} cache The cache to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns `0` if `value` is found, else `-1`.
     */
    function cacheIndexOf(cache, value) {
      var data = cache.data,
          result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

      return result ? 0 : -1;
    }

    /**
     * Adds `value` to the cache.
     *
     * @private
     * @name push
     * @memberOf SetCache
     * @param {*} value The value to cache.
     */
    function cachePush(value) {
      var data = this.data;
      if (typeof value == 'string' || isObject(value)) {
        data.set.add(value);
      } else {
        data.hash[value] = true;
      }
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a new array joining `array` with `other`.
     *
     * @private
     * @param {Array} array The array to join.
     * @param {Array} other The other array to join.
     * @returns {Array} Returns the new concatenated array.
     */
    function arrayConcat(array, other) {
      var index = -1,
          length = array.length,
          othIndex = -1,
          othLength = other.length,
          result = Array(length + othLength);

      while (++index < length) {
        result[index] = array[index];
      }
      while (++othIndex < othLength) {
        result[index++] = other[othIndex];
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function arrayCopy(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.forEachRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEachRight(array, iteratee) {
      var length = array.length;

      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.every` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     */
    function arrayEvery(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
     * with one argument: (value).
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
    function arrayExtremum(array, iteratee, comparator, exValue) {
      var index = -1,
          length = array.length,
          computed = exValue,
          result = computed;

      while (++index < length) {
        var value = array[index],
            current = +iteratee(value);

        if (comparator(current, computed)) {
          computed = current;
          result = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.filter` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.map` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.reduce` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the first element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initFromArray) {
      var index = -1,
          length = array.length;

      if (initFromArray && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.reduceRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the last element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
      var length = array.length;
      if (initFromArray && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.some` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    /**
     * A specialized version of `_.sum` for arrays without support for callback
     * shorthands and `this` binding..
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
    function arraySum(array, iteratee) {
      var length = array.length,
          result = 0;

      while (length--) {
        result += +iteratee(array[length]) || 0;
      }
      return result;
    }

    /**
     * Used by `_.defaults` to customize its `_.assign` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignDefaults(objectValue, sourceValue) {
      return objectValue === undefined$1 ? sourceValue : objectValue;
    }

    /**
     * Used by `_.template` to customize its `_.assign` use.
     *
     * **Note:** This function is like `assignDefaults` except that it ignores
     * inherited property values when checking if a property is `undefined`.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @param {string} key The key associated with the object and source values.
     * @param {Object} object The destination object.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignOwnDefaults(objectValue, sourceValue, key, object) {
      return (objectValue === undefined$1 || !hasOwnProperty.call(object, key))
        ? sourceValue
        : objectValue;
    }

    /**
     * A specialized version of `_.assign` for customizing assigned values without
     * support for argument juggling, multiple sources, and `this` binding `customizer`
     * functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     */
    function assignWith(object, source, customizer) {
      var index = -1,
          props = keys(source),
          length = props.length;

      while (++index < length) {
        var key = props[index],
            value = object[key],
            result = customizer(value, source[key], key, object, source);

        if ((result === result ? (result !== value) : (value === value)) ||
            (value === undefined$1 && !(key in object))) {
          object[key] = result;
        }
      }
      return object;
    }

    /**
     * The base implementation of `_.assign` without support for argument juggling,
     * multiple sources, and `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return source == null
        ? object
        : baseCopy(source, keys(source), object);
    }

    /**
     * The base implementation of `_.at` without support for string collections
     * and individual key arguments.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {number[]|string[]} props The property names or indexes of elements to pick.
     * @returns {Array} Returns the new array of picked elements.
     */
    function baseAt(collection, props) {
      var index = -1,
          isNil = collection == null,
          isArr = !isNil && isArrayLike(collection),
          length = isArr ? collection.length : 0,
          propsLength = props.length,
          result = Array(propsLength);

      while(++index < propsLength) {
        var key = props[index];
        if (isArr) {
          result[index] = isIndex(key, length) ? collection[key] : undefined$1;
        } else {
          result[index] = isNil ? undefined$1 : collection[key];
        }
      }
      return result;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @returns {Object} Returns `object`.
     */
    function baseCopy(source, props, object) {
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];
        object[key] = source[key];
      }
      return object;
    }

    /**
     * The base implementation of `_.callback` which supports specifying the
     * number of arguments to provide to `func`.
     *
     * @private
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
    function baseCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (type == 'function') {
        return thisArg === undefined$1
          ? func
          : bindCallback(func, thisArg, argCount);
      }
      if (func == null) {
        return identity;
      }
      if (type == 'object') {
        return baseMatches(func);
      }
      return thisArg === undefined$1
        ? property(func)
        : baseMatchesProperty(func, thisArg);
    }

    /**
     * The base implementation of `_.clone` without support for argument juggling
     * and `this` binding `customizer` functions.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The object `value` belongs to.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object) : customizer(value);
      }
      if (result !== undefined$1) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return arrayCopy(value, result);
        }
      } else {
        var tag = objToString.call(value),
            isFunc = tag == funcTag;

        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return baseAssign(result, value);
          }
        } else {
          return cloneableTags[tag]
            ? initCloneByTag(value, tag, isDeep)
            : (object ? value : {});
        }
      }
      // Check for circular references and return its corresponding clone.
      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == value) {
          return stackB[length];
        }
      }
      // Add the source value to the stack of traversed objects and associate it with its clone.
      stackA.push(value);
      stackB.push(result);

      // Recursively populate clone (susceptible to call stack limits).
      (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
        result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
      });
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(prototype) {
        if (isObject(prototype)) {
          object.prototype = prototype;
          var result = new object;
          object.prototype = undefined$1;
        }
        return result || {};
      };
    }());

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts an index
     * of where to slice the arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Object} args The arguments provide to `func`.
     * @returns {number} Returns the timer id.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined$1, args); }, wait);
    }

    /**
     * The base implementation of `_.difference` which accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values) {
      var length = array ? array.length : 0,
          result = [];

      if (!length) {
        return result;
      }
      var index = -1,
          indexOf = getIndexOf(),
          isCommon = indexOf == baseIndexOf,
          cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
          valuesLength = values.length;

      if (cache) {
        indexOf = cacheIndexOf;
        isCommon = false;
        values = cache;
      }
      outer:
      while (++index < length) {
        var value = array[index];

        if (isCommon && value === value) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === value) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (indexOf(values, value, 0) < 0) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * Gets the extremum value of `collection` invoking `iteratee` for each value
     * in `collection` to generate the criterion by which the value is ranked.
     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(collection, iteratee, comparator, exValue) {
      var computed = exValue,
          result = computed;

      baseEach(collection, function(value, index, collection) {
        var current = +iteratee(value, index, collection);
        if (comparator(current, computed) || (current === exValue && current === result)) {
          computed = current;
          result = value;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined$1 || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : (end >>> 0);
      start >>>= 0;

      while (start < length) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
     * without support for callback shorthands and `this` binding, which iterates
     * over `collection` using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function} predicate The function invoked per iteration.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @param {boolean} [retKey] Specify returning the key of the found element
     *  instead of the element itself.
     * @returns {*} Returns the found element or its key, else `undefined`.
     */
    function baseFind(collection, predicate, eachFunc, retKey) {
      var result;
      eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
          result = retKey ? key : value;
          return false;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with added support for restricting
     * flattening and specifying the start index.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, isDeep, isStrict, result) {
      result || (result = []);

      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index];
        if (isObjectLike(value) && isArrayLike(value) &&
            (isStrict || isArray(value) || isArguments(value))) {
          if (isDeep) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, isDeep, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForIn` and `baseForOwn` which iterates
     * over `object` properties returned by `keysFunc` invoking `iteratee` for
     * each property. Iteratee functions may exit iteration early by explicitly
     * returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forIn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForIn(object, iteratee) {
      return baseFor(object, iteratee, keysIn);
    }

    /**
     * The base implementation of `_.forOwn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from those provided.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the new array of filtered property names.
     */
    function baseFunctions(object, props) {
      var index = -1,
          length = props.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var key = props[index];
        if (isFunction(object[key])) {
          result[++resIndex] = key;
        }
      }
      return result;
    }

    /**
     * The base implementation of `get` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path, pathKey) {
      if (object == null) {
        return;
      }
      if (pathKey !== undefined$1 && pathKey in toObject(object)) {
        path = [pathKey];
      }
      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[path[index++]];
      }
      return (index && index == length) ? object : undefined$1;
    }

    /**
     * The base implementation of `_.isEqual` without support for `this` binding
     * `customizer` functions.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = objToString.call(object);
        if (objTag == argsTag) {
          objTag = objectTag;
        } else if (objTag != objectTag) {
          objIsArr = isTypedArray(object);
        }
      }
      if (!othIsArr) {
        othTag = objToString.call(other);
        if (othTag == argsTag) {
          othTag = objectTag;
        } else if (othTag != objectTag) {
          othIsArr = isTypedArray(other);
        }
      }
      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && !(objIsArr || objIsObj)) {
        return equalByTag(object, other, objTag);
      }
      if (!isLoose) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
      }
      if (!isSameTag) {
        return false;
      }
      // Assume cyclic values are equal.
      // For more information on detecting circular references see https://es5.github.io/#JO.
      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }
      // Add `object` and `other` to the stack of traversed objects.
      stackA.push(object);
      stackB.push(other);

      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

      stackA.pop();
      stackB.pop();

      return result;
    }

    /**
     * The base implementation of `_.isMatch` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} matchData The propery names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = toObject(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined$1 && !(key in object)) {
            return false;
          }
        } else {
          var result = customizer ? customizer(objValue, srcValue, key) : undefined$1;
          if (!(result === undefined$1 ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.map` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which does not clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        var key = matchData[0][0],
            value = matchData[0][1];

        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === value && (value !== undefined$1 || (key in toObject(object)));
        };
      }
      return function(object) {
        return baseIsMatch(object, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to compare.
     * @returns {Function} Returns the new function.
     */
    function baseMatchesProperty(path, srcValue) {
      var isArr = isArray(path),
          isCommon = isKey(path) && isStrictComparable(srcValue),
          pathKey = (path + '');

      path = toPath(path);
      return function(object) {
        if (object == null) {
          return false;
        }
        var key = pathKey;
        object = toObject(object);
        if ((isArr || !isCommon) && !(key in object)) {
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          if (object == null) {
            return false;
          }
          key = last(path);
          object = toObject(object);
        }
        return object[key] === srcValue
          ? (srcValue !== undefined$1 || (key in object))
          : baseIsEqual(srcValue, object[key], undefined$1, true);
      };
    }

    /**
     * The base implementation of `_.merge` without support for argument juggling,
     * multiple sources, and `this` binding `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {Object} Returns `object`.
     */
    function baseMerge(object, source, customizer, stackA, stackB) {
      if (!isObject(object)) {
        return object;
      }
      var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
          props = isSrcArr ? undefined$1 : keys(source);

      arrayEach(props || source, function(srcValue, key) {
        if (props) {
          key = srcValue;
          srcValue = source[key];
        }
        if (isObjectLike(srcValue)) {
          stackA || (stackA = []);
          stackB || (stackB = []);
          baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
        }
        else {
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined$1,
              isCommon = result === undefined$1;

          if (isCommon) {
            result = srcValue;
          }
          if ((result !== undefined$1 || (isSrcArr && !(key in object))) &&
              (isCommon || (result === result ? (result !== value) : (value === value)))) {
            object[key] = result;
          }
        }
      });
      return object;
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
      var length = stackA.length,
          srcValue = source[key];

      while (length--) {
        if (stackA[length] == srcValue) {
          object[key] = stackB[length];
          return;
        }
      }
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined$1,
          isCommon = result === undefined$1;

      if (isCommon) {
        result = srcValue;
        if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
          result = isArray(value)
            ? value
            : (isArrayLike(value) ? arrayCopy(value) : []);
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          result = isArguments(value)
            ? toPlainObject(value)
            : (isPlainObject(value) ? value : {});
        }
        else {
          isCommon = false;
        }
      }
      // Add the source value to the stack of traversed objects and associate
      // it with its merged value.
      stackA.push(srcValue);
      stackB.push(result);

      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
      } else if (result === result ? (result !== value) : (value === value)) {
        object[key] = result;
      }
    }

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined$1 : object[key];
      };
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     */
    function basePropertyDeep(path) {
      var pathKey = (path + '');
      path = toPath(path);
      return function(object) {
        return baseGet(object, path, pathKey);
      };
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * index arguments and capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0;
      while (length--) {
        var index = indexes[length];
        if (index != previous && isIndex(index)) {
          var previous = index;
          splice.call(array, index, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for argument juggling
     * and returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns the random number.
     */
    function baseRandom(min, max) {
      return min + nativeFloor(nativeRandom() * (max - min + 1));
    }

    /**
     * The base implementation of `_.reduce` and `_.reduceRight` without support
     * for callback shorthands and `this` binding, which iterates over `collection`
     * using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} accumulator The initial value.
     * @param {boolean} initFromCollection Specify using the first or last element
     *  of `collection` as the initial value.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the accumulated value.
     */
    function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
      eachFunc(collection, function(value, index, collection) {
        accumulator = initFromCollection
          ? (initFromCollection = false, value)
          : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `setData` without support for hot loop detection.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined$1 || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortBy` which uses `comparer` to define
     * the sort order of `array` and replaces criteria objects with their
     * corresponding values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */
    function baseSortBy(array, comparer) {
      var length = array.length;

      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }

    /**
     * The base implementation of `_.sortByOrder` without param guards.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseSortByOrder(collection, iteratees, orders) {
      var callback = getCallback(),
          index = -1;

      iteratees = arrayMap(iteratees, function(iteratee) { return callback(iteratee); });

      var result = baseMap(collection, function(value) {
        var criteria = arrayMap(iteratees, function(iteratee) { return iteratee(value); });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.sum` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
    function baseSum(collection, iteratee) {
      var result = 0;
      baseEach(collection, function(value, index, collection) {
        result += +iteratee(value, index, collection) || 0;
      });
      return result;
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The function invoked per iteration.
     * @returns {Array} Returns the new duplicate-value-free array.
     */
    function baseUniq(array, iteratee) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array.length,
          isCommon = indexOf == baseIndexOf,
          isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
          seen = isLarge ? createCache() : null,
          result = [];

      if (seen) {
        indexOf = cacheIndexOf;
        isCommon = false;
      } else {
        isLarge = false;
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value, index, array) : value;

        if (isCommon && value === value) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (indexOf(seen, computed, 0) < 0) {
          if (iteratee || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      var index = -1,
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /**
     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
     * and `_.takeWhile` without support for callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to peform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      var index = -1,
          length = actions.length;

      while (++index < length) {
        var action = actions[index];
        result = action.func.apply(action.thisArg, arrayPush([result], action.args));
      }
      return result;
    }

    /**
     * Performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function binaryIndex(array, value, retHighest) {
      var low = 0,
          high = array ? array.length : low;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return binaryIndexBy(array, value, identity, retHighest);
    }

    /**
     * This function is like `binaryIndex` except that it invokes `iteratee` for
     * `value` and each element of `array` to compute their sort ranking. The
     * iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function binaryIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array ? array.length : 0,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsUndef = value === undefined$1;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            isDef = computed !== undefined$1,
            isReflexive = computed === computed;

        if (valIsNaN) {
          var setLow = isReflexive || retHighest;
        } else if (valIsNull) {
          setLow = isReflexive && isDef && (retHighest || computed != null);
        } else if (valIsUndef) {
          setLow = isReflexive && (retHighest || isDef);
        } else if (computed == null) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * A specialized version of `baseCallback` which only supports `this` binding
     * and specifying the number of arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
    function bindCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      if (thisArg === undefined$1) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
        case 5: return function(value, other, key, object, source) {
          return func.call(thisArg, value, other, key, object, source);
        };
      }
      return function() {
        return func.apply(thisArg, arguments);
      };
    }

    /**
     * Creates a clone of the given array buffer.
     *
     * @private
     * @param {ArrayBuffer} buffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function bufferClone(buffer) {
      var result = new ArrayBuffer(buffer.byteLength),
          view = new Uint8Array(result);

      view.set(new Uint8Array(buffer));
      return result;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders) {
      var holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          leftIndex = -1,
          leftLength = partials.length,
          result = Array(leftLength + argsLength);

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
      while (argsLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders) {
      var holdersIndex = -1,
          holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          rightIndex = -1,
          rightLength = partials.length,
          result = Array(argsLength + rightLength);

      while (++argsIndex < argsLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
      return result;
    }

    /**
     * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
     *
     * @private
     * @param {Function} setter The function to set keys and values of the accumulator object.
     * @param {Function} [initializer] The function to initialize the accumulator object.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee, thisArg) {
        var result = initializer ? initializer() : {};
        iteratee = getCallback(iteratee, thisArg, 3);

        if (isArray(collection)) {
          var index = -1,
              length = collection.length;

          while (++index < length) {
            var value = collection[index];
            setter(result, value, iteratee(value, index, collection), collection);
          }
        } else {
          baseEach(collection, function(value, key, collection) {
            setter(result, value, iteratee(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return restParam(function(object, sources) {
        var index = -1,
            length = object == null ? 0 : sources.length,
            customizer = length > 2 ? sources[length - 2] : undefined$1,
            guard = length > 2 ? sources[2] : undefined$1,
            thisArg = length > 1 ? sources[length - 1] : undefined$1;

        if (typeof customizer == 'function') {
          customizer = bindCallback(customizer, thisArg, 5);
          length -= 2;
        } else {
          customizer = typeof thisArg == 'function' ? thisArg : undefined$1;
          length -= (customizer ? 1 : 0);
        }
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined$1 : customizer;
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        var length = collection ? getLength(collection) : 0;
        if (!isLength(length)) {
          return eachFunc(collection, iteratee);
        }
        var index = fromRight ? length : -1,
            iterable = toObject(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var iterable = toObject(object),
            props = keysFunc(object),
            length = props.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length)) {
          var key = props[index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` and invokes it with the `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new bound function.
     */
    function createBindWrapper(func, thisArg) {
      var Ctor = createCtorWrapper(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(thisArg, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a `Set` cache object to optimize linear searches of large arrays.
     *
     * @private
     * @param {Array} [values] The values to cache.
     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
     */
    function createCache(values) {
      return (nativeCreate && Set) ? new SetCache(values) : null;
    }

    /**
     * Creates a function that produces compound words out of the words in a
     * given string.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        var index = -1,
            array = words(deburr(string)),
            length = array.length,
            result = '';

        while (++index < length) {
          result = callback(result, array[index], index);
        }
        return result;
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtorWrapper(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors.
        // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a `_.curry` or `_.curryRight` function.
     *
     * @private
     * @param {boolean} flag The curry bit flag.
     * @returns {Function} Returns the new curry function.
     */
    function createCurry(flag) {
      function curryFunc(func, arity, guard) {
        if (guard && isIterateeCall(func, arity, guard)) {
          arity = undefined$1;
        }
        var result = createWrapper(func, flag, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result.placeholder = curryFunc.placeholder;
        return result;
      }
      return curryFunc;
    }

    /**
     * Creates a `_.defaults` or `_.defaultsDeep` function.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Function} Returns the new defaults function.
     */
    function createDefaults(assigner, customizer) {
      return restParam(function(args) {
        var object = args[0];
        if (object == null) {
          return object;
        }
        args.push(customizer);
        return assigner.apply(undefined$1, args);
      });
    }

    /**
     * Creates a `_.max` or `_.min` function.
     *
     * @private
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {Function} Returns the new extremum function.
     */
    function createExtremum(comparator, exValue) {
      return function(collection, iteratee, thisArg) {
        if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
          iteratee = undefined$1;
        }
        iteratee = getCallback(iteratee, thisArg, 3);
        if (iteratee.length == 1) {
          collection = isArray(collection) ? collection : toIterable(collection);
          var result = arrayExtremum(collection, iteratee, comparator, exValue);
          if (!(collection.length && result === exValue)) {
            return result;
          }
        }
        return baseExtremum(collection, iteratee, comparator, exValue);
      };
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
    function createFind(eachFunc, fromRight) {
      return function(collection, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        if (isArray(collection)) {
          var index = baseFindIndex(collection, predicate, fromRight);
          return index > -1 ? collection[index] : undefined$1;
        }
        return baseFind(collection, predicate, eachFunc);
      };
    }

    /**
     * Creates a `_.findIndex` or `_.findLastIndex` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
    function createFindIndex(fromRight) {
      return function(array, predicate, thisArg) {
        if (!(array && array.length)) {
          return -1;
        }
        predicate = getCallback(predicate, thisArg, 3);
        return baseFindIndex(array, predicate, fromRight);
      };
    }

    /**
     * Creates a `_.findKey` or `_.findLastKey` function.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new find function.
     */
    function createFindKey(objectFunc) {
      return function(object, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        return baseFind(object, predicate, objectFunc, true);
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return function() {
        var wrapper,
            length = arguments.length,
            index = fromRight ? length : -1,
            leftIndex = 0,
            funcs = Array(length);

        while ((fromRight ? index-- : ++index < length)) {
          var func = funcs[leftIndex++] = arguments[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
            wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? -1 : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined$1;

          if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      };
    }

    /**
     * Creates a function for `_.forEach` or `_.forEachRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
    function createForEach(arrayFunc, eachFunc) {
      return function(collection, iteratee, thisArg) {
        return (typeof iteratee == 'function' && thisArg === undefined$1 && isArray(collection))
          ? arrayFunc(collection, iteratee)
          : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
      };
    }

    /**
     * Creates a function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
    function createForIn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined$1) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee, keysIn);
      };
    }

    /**
     * Creates a function for `_.forOwn` or `_.forOwnRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
    function createForOwn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined$1) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee);
      };
    }

    /**
     * Creates a function for `_.mapKeys` or `_.mapValues`.
     *
     * @private
     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
     * @returns {Function} Returns the new map function.
     */
    function createObjectMapper(isMapKeys) {
      return function(object, iteratee, thisArg) {
        var result = {};
        iteratee = getCallback(iteratee, thisArg, 3);

        baseForOwn(object, function(value, key, object) {
          var mapped = iteratee(value, key, object);
          key = isMapKeys ? mapped : key;
          value = isMapKeys ? value : mapped;
          result[key] = value;
        });
        return result;
      };
    }

    /**
     * Creates a function for `_.padLeft` or `_.padRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify padding from the right.
     * @returns {Function} Returns the new pad function.
     */
    function createPadDir(fromRight) {
      return function(string, length, chars) {
        string = baseToString(string);
        return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
      };
    }

    /**
     * Creates a `_.partial` or `_.partialRight` function.
     *
     * @private
     * @param {boolean} flag The partial bit flag.
     * @returns {Function} Returns the new partial function.
     */
    function createPartial(flag) {
      var partialFunc = restParam(function(func, partials) {
        var holders = replaceHolders(partials, partialFunc.placeholder);
        return createWrapper(func, flag, undefined$1, partials, holders);
      });
      return partialFunc;
    }

    /**
     * Creates a function for `_.reduce` or `_.reduceRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
    function createReduce(arrayFunc, eachFunc) {
      return function(collection, iteratee, accumulator, thisArg) {
        var initFromArray = arguments.length < 3;
        return (typeof iteratee == 'function' && thisArg === undefined$1 && isArray(collection))
          ? arrayFunc(collection, iteratee, accumulator, initFromArray)
          : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
      };
    }

    /**
     * Creates a function that wraps `func` and invokes it with optional `this`
     * binding of, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & ARY_FLAG,
          isBind = bitmask & BIND_FLAG,
          isBindKey = bitmask & BIND_KEY_FLAG,
          isCurry = bitmask & CURRY_FLAG,
          isCurryBound = bitmask & CURRY_BOUND_FLAG,
          isCurryRight = bitmask & CURRY_RIGHT_FLAG,
          Ctor = isBindKey ? undefined$1 : createCtorWrapper(func);

      function wrapper() {
        // Avoid `arguments` object use disqualifying optimizations by
        // converting it to an array before providing it to other functions.
        var length = arguments.length,
            index = length,
            args = Array(length);

        while (index--) {
          args[index] = arguments[index];
        }
        if (partials) {
          args = composeArgs(args, partials, holders);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight);
        }
        if (isCurry || isCurryRight) {
          var placeholder = wrapper.placeholder,
              argsHolders = replaceHolders(args, placeholder);

          length -= argsHolders.length;
          if (length < arity) {
            var newArgPos = argPos ? arrayCopy(argPos) : undefined$1,
                newArity = nativeMax(arity - length, 0),
                newsHolders = isCurry ? argsHolders : undefined$1,
                newHoldersRight = isCurry ? undefined$1 : argsHolders,
                newPartials = isCurry ? args : undefined$1,
                newPartialsRight = isCurry ? undefined$1 : args;

            bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
            bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

            if (!isCurryBound) {
              bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
            }
            var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                result = createHybridWrapper.apply(undefined$1, newData);

            if (isLaziable(func)) {
              setData(result, newData);
            }
            result.placeholder = placeholder;
            return result;
          }
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        if (argPos) {
          args = reorder(args, argPos);
        }
        if (isAry && ary < args.length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtorWrapper(func);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates the padding required for `string` based on the given `length`.
     * The `chars` string is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {string} string The string to create padding for.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the pad for `string`.
     */
    function createPadding(string, length, chars) {
      var strLength = string.length;
      length = +length;

      if (strLength >= length || !nativeIsFinite(length)) {
        return '';
      }
      var padLength = length - strLength;
      chars = chars == null ? ' ' : (chars + '');
      return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
    }

    /**
     * Creates a function that wraps `func` and invokes it with the optional `this`
     * binding of `thisArg` and the `partials` prepended to those provided to
     * the wrapper.
     *
     * @private
     * @param {Function} func The function to partially apply arguments to.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to the new function.
     * @returns {Function} Returns the new bound function.
     */
    function createPartialWrapper(func, bitmask, thisArg, partials) {
      var isBind = bitmask & BIND_FLAG,
          Ctor = createCtorWrapper(func);

      function wrapper() {
        // Avoid `arguments` object use disqualifying optimizations by
        // converting it to an array before providing it `func`.
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength);

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.ceil`, `_.floor`, or `_.round` function.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        precision = precision === undefined$1 ? 0 : (+precision || 0);
        if (precision) {
          precision = pow(10, precision);
          return func(number * precision) / precision;
        }
        return func(number);
      };
    }

    /**
     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
     *
     * @private
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {Function} Returns the new index function.
     */
    function createSortedIndex(retHighest) {
      return function(array, value, iteratee, thisArg) {
        var callback = getCallback(iteratee);
        return (iteratee == null && callback === baseCallback)
          ? binaryIndex(array, value, retHighest)
          : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags.
     *  The bitmask may be composed of the following flags:
     *     1 - `_.bind`
     *     2 - `_.bindKey`
     *     4 - `_.curry` or `_.curryRight` of a bound function
     *     8 - `_.curry`
     *    16 - `_.curryRight`
     *    32 - `_.partial`
     *    64 - `_.partialRight`
     *   128 - `_.rearg`
     *   256 - `_.ary`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
        partials = holders = undefined$1;
      }
      length -= (holders ? holders.length : 0);
      if (bitmask & PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined$1;
      }
      var data = isBindKey ? undefined$1 : getData(func),
          newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

      if (data) {
        mergeData(newData, data);
        bitmask = newData[1];
        arity = newData[9];
      }
      newData[9] = arity == null
        ? (isBindKey ? 0 : func.length)
        : (nativeMax(arity - length, 0) || 0);

      if (bitmask == BIND_FLAG) {
        var result = createBindWrapper(newData[0], newData[2]);
      } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
        result = createPartialWrapper.apply(undefined$1, newData);
      } else {
        result = createHybridWrapper.apply(undefined$1, newData);
      }
      var setter = data ? baseSetData : setData;
      return setter(result, newData);
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing arrays.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var index = -1,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
        return false;
      }
      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index],
            result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined$1;

        if (result !== undefined$1) {
          if (result) {
            continue;
          }
          return false;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (isLoose) {
          if (!arraySome(other, function(othValue) {
                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
              })) {
            return false;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag) {
      switch (tag) {
        case boolTag:
        case dateTag:
          // Coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
          return +object == +other;

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case numberTag:
          // Treat `NaN` vs. `NaN` as equal.
          return (object != +object)
            ? other != +other
            : object == +other;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings primitives and string
          // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
          return object == (other + '');
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isLoose) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var skipCtor = isLoose;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key],
            result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined$1;

        // Recursively compare objects (susceptible to call stack limits).
        if (!(result === undefined$1 ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
          return false;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (!skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Gets the appropriate "callback" function. If the `_.callback` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseCallback` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function} Returns the chosen function or its result.
     */
    function getCallback(func, thisArg, argCount) {
      var result = lodash.callback || callback;
      result = result === callback ? baseCallback : result;
      return argCount ? result(func, thisArg, argCount) : result;
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = func.name,
          array = realNames[result],
          length = array ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseIndexOf` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function|number} Returns the chosen function or its result.
     */
    function getIndexOf(collection, target, fromIndex) {
      var result = lodash.indexOf || indexOf;
      result = result === indexOf ? baseIndexOf : result;
      return collection ? result(collection, target, fromIndex) : result;
    }

    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');

    /**
     * Gets the propery names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = pairs(object),
          length = result.length;

      while (length--) {
        result[length][2] = isStrictComparable(result[length][1]);
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = object == null ? undefined$1 : object[key];
      return isNative(value) ? value : undefined$1;
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add array properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      var Ctor = object.constructor;
      if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
        Ctor = Object;
      }
      return new Ctor;
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return bufferClone(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          var buffer = object.buffer;
          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          var result = new Ctor(object.source, reFlags.exec(object));
          result.lastIndex = object.lastIndex;
      }
      return result;
    }

    /**
     * Invokes the method at `path` on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function invokePath(object, path, args) {
      if (object != null && !isKey(path, object)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        path = last(path);
      }
      var func = object == null ? object : object[path];
      return func == null ? undefined$1 : func.apply(object, args);
    }

    /**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }

    /**
     * Checks if the provided arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)) {
        var other = object[index];
        return value === value ? (value === other) : (other !== other);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      var type = typeof value;
      if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
        return true;
      }
      if (isArray(value)) {
        return false;
      }
      var result = !reIsDeepProp.test(value);
      return result || (object != null && value in toObject(object));
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func);
      if (!(funcName in LazyWrapper.prototype)) {
        return false;
      }
      var other = lodash[funcName];
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers required to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
     * augment function arguments, making the order in which they are executed important,
     * preventing the merging of metadata. However, we make an exception for a safe
     * common case where curried functions have `_.ary` and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < ARY_FLAG;

      var isCombo =
        (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
        (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
        (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = arrayCopy(value);
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function mergeDefaults(objectValue, sourceValue) {
      return objectValue === undefined$1 ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
    }

    /**
     * A specialized version of `_.pick` which picks `object` properties specified
     * by `props`.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} props The property names to pick.
     * @returns {Object} Returns the new object.
     */
    function pickByArray(object, props) {
      object = toObject(object);

      var index = -1,
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        if (key in object) {
          result[key] = object[key];
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.pick` which picks `object` properties `predicate`
     * returns truthy for.
     *
     * @private
     * @param {Object} object The source object.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Object} Returns the new object.
     */
    function pickByCallback(object, predicate) {
      var result = {};
      baseForIn(object, function(value, key, object) {
        if (predicate(value, key, object)) {
          result[key] = value;
        }
      });
      return result;
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = arrayCopy(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
      }
      return array;
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity function
     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = (function() {
      var count = 0,
          lastCalled = 0;

      return function(key, value) {
        var stamp = now(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return key;
          }
        } else {
          count = 0;
        }
        return baseSetData(key, value);
      };
    }());

    /**
     * A fallback implementation of `Object.keys` which creates an array of the
     * own enumerable property names of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function shimKeys(object) {
      var props = keysIn(object),
          propsLength = props.length,
          length = propsLength && object.length;

      var allowIndexes = !!length && isLength(length) &&
        (isArray(object) || isArguments(object));

      var index = -1,
          result = [];

      while (++index < propsLength) {
        var key = props[index];
        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to an array-like object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array|Object} Returns the array-like object.
     */
    function toIterable(value) {
      if (value == null) {
        return [];
      }
      if (!isArrayLike(value)) {
        return values(value);
      }
      return isObject(value) ? value : Object(value);
    }

    /**
     * Converts `value` to an object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Object} Returns the object.
     */
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }

    /**
     * Converts `value` to property path array if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array} Returns the property path array.
     */
    function toPath(value) {
      if (isArray(value)) {
        return value;
      }
      var result = [];
      baseToString(value).replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      return wrapper instanceof LazyWrapper
        ? wrapper.clone()
        : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `collection` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new array containing chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if (guard ? isIterateeCall(array, size, guard) : size == null) {
        size = 1;
      } else {
        size = nativeMax(nativeFloor(size) || 1, 1);
      }
      var index = 0,
          length = array ? array.length : 0,
          resIndex = -1,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[++resIndex] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * Creates an array of unique `array` values not included in the other
     * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3], [4, 2]);
     * // => [1, 3]
     */
    var difference = restParam(function(array, values) {
      return (isObjectLike(array) && isArrayLike(array))
        ? baseDifference(array, baseFlatten(values, false, true))
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that match the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [1]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
     * // => ['barney']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropWhile(users, 'active', false), 'user');
     * // => ['pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8], '*', 1, 2);
     * // => [4, '*', 8]
     */
    function fill(array, value, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(chr) {
     *   return chr.user == 'barney';
     * });
     * // => 0
     *
     * // using the `_.matches` callback shorthand
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findIndex(users, 'active', false);
     * // => 0
     *
     * // using the `_.property` callback shorthand
     * _.findIndex(users, 'active');
     * // => 2
     */
    var findIndex = createFindIndex();

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(chr) {
     *   return chr.user == 'pebbles';
     * });
     * // => 2
     *
     * // using the `_.matches` callback shorthand
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastIndex(users, 'active', false);
     * // => 2
     *
     * // using the `_.property` callback shorthand
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    var findLastIndex = createFindIndex(true);

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias head
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([]);
     * // => undefined
     */
    function first(array) {
      return array ? array[0] : undefined$1;
    }

    /**
     * Flattens a nested array. If `isDeep` is `true` the array is recursively
     * flattened, otherwise it is only flattened a single level.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, [4]]
     *
     * // using `isDeep`
     * _.flatten([1, [2, 3, [4]]], true);
     * // => [1, 2, 3, 4]
     */
    function flatten(array, isDeep, guard) {
      var length = array ? array.length : 0;
      if (guard && isIterateeCall(array, isDeep, guard)) {
        isDeep = false;
      }
      return length ? baseFlatten(array, isDeep) : [];
    }

    /**
     * Recursively flattens a nested array.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to recursively flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4]
     */
    function flattenDeep(array) {
      var length = array ? array.length : 0;
      return length ? baseFlatten(array, true) : [];
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
     * performs a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // using `fromIndex`
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     *
     * // performing a binary search
     * _.indexOf([1, 1, 2, 2], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      if (typeof fromIndex == 'number') {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
      } else if (fromIndex) {
        var index = binaryIndex(array, value);
        if (index < length &&
            (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
          return index;
        }
        return -1;
      }
      return baseIndexOf(array, value, fromIndex || 0);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      return dropRight(array, 1);
    }

    /**
     * Creates an array of unique values that are included in all of the provided
     * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of shared values.
     * @example
     * _.intersection([1, 2], [4, 2], [2, 1]);
     * // => [2]
     */
    var intersection = restParam(function(arrays) {
      var othLength = arrays.length,
          othIndex = othLength,
          caches = Array(length),
          indexOf = getIndexOf(),
          isCommon = indexOf == baseIndexOf,
          result = [];

      while (othIndex--) {
        var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
        caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
      }
      var array = arrays[0],
          index = -1,
          length = array ? array.length : 0,
          seen = caches[0];

      outer:
      while (++index < length) {
        value = array[index];
        if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
          var othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(value);
          }
          result.push(value);
        }
      }
      return result;
    });

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined$1;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
     *  or `true` to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // using `fromIndex`
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     *
     * // performing a binary search
     * _.lastIndexOf([1, 1, 2, 2], 2, true);
     * // => 3
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      var index = length;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
      } else if (fromIndex) {
        index = binaryIndex(array, value, true) - 1;
        var other = array[index];
        if (value === value ? (value === other) : (other !== other)) {
          return index;
        }
        return -1;
      }
      if (value !== value) {
        return indexOfNaN(array, index, true);
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull() {
      var args = arguments,
          array = args[0];

      if (!(array && array.length)) {
        return array;
      }
      var index = 0,
          indexOf = getIndexOf(),
          length = args.length;

      while (++index < length) {
        var fromIndex = 0,
            value = args[index];

        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * Removes elements from `array` corresponding to the given indexes and returns
     * an array of the removed elements. Indexes may be specified as an array of
     * indexes or as individual arguments.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [5, 10, 15, 20];
     * var evens = _.pullAt(array, 1, 3);
     *
     * console.log(array);
     * // => [5, 15]
     *
     * console.log(evens);
     * // => [10, 20]
     */
    var pullAt = restParam(function(array, indexes) {
      indexes = baseFlatten(indexes);

      var result = baseAt(array, indexes);
      basePullAt(array, indexes.sort(baseCompareAscending));
      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate, thisArg) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getCallback(predicate, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias tail
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     */
    function rest(array) {
      return drop(array, 1);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of `Array#slice` to support node
     * lists in IE < 9 and to ensure dense arrays are returned.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value` should
     * be inserted into `array` in order to maintain its sort order. If an iteratee
     * function is provided it is invoked for `value` and each element of `array`
     * to compute their sort ranking. The iteratee is bound to `thisArg` and
     * invoked with one argument; (value).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     *
     * _.sortedIndex([4, 4, 5, 5], 5);
     * // => 2
     *
     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
     *
     * // using an iteratee function
     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
     *   return this.data[word];
     * }, dict);
     * // => 1
     *
     * // using the `_.property` callback shorthand
     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 1
     */
    var sortedIndex = createSortedIndex();

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 4, 5, 5], 5);
     * // => 4
     */
    var sortedLastIndex = createSortedIndex(true);

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
     * and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [2, 3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
     * // => []
     */
    function takeRightWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [1, 2]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false},
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeWhile(users, 'active', false), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeWhile(users, 'active'), 'user');
     * // => []
     */
    function takeWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all of the provided arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([1, 2], [4, 2], [2, 1]);
     * // => [1, 2, 4]
     */
    var union = restParam(function(arrays) {
      return baseUniq(baseFlatten(arrays, false, true));
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurence of each element
     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
     * for sorted arrays. If an iteratee function is provided it is invoked for
     * each element in the array to generate the criterion by which uniqueness
     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, array).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {boolean} [isSorted] Specify the array is sorted.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new duplicate-value-free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     *
     * // using `isSorted`
     * _.uniq([1, 1, 2], true);
     * // => [1, 2]
     *
     * // using an iteratee function
     * _.uniq([1, 2.5, 1.5, 2], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => [1, 2.5]
     *
     * // using the `_.property` callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (isSorted != null && typeof isSorted != 'boolean') {
        thisArg = iteratee;
        iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined$1 : isSorted;
        isSorted = false;
      }
      var callback = getCallback();
      if (!(iteratee == null && callback === baseCallback)) {
        iteratee = callback(iteratee, thisArg, 3);
      }
      return (isSorted && getIndexOf() == baseIndexOf)
        ? sortedUniq(array, iteratee)
        : baseUniq(array, iteratee);
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     *
     * _.unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var index = -1,
          length = 0;

      array = arrayFilter(array, function(group) {
        if (isArrayLike(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      var result = Array(length);
      while (++index < length) {
        result[index] = arrayMap(array, baseProperty(index));
      }
      return result;
    }

    /**
     * This method is like `_.unzip` except that it accepts an iteratee to specify
     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee] The function to combine regrouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      iteratee = bindCallback(iteratee, thisArg, 4);
      return arrayMap(result, function(group) {
        return arrayReduce(group, iteratee, undefined$1, true);
      });
    }

    /**
     * Creates an array excluding all provided values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to filter.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 3], 1, 2);
     * // => [3]
     */
    var without = restParam(function(array, values) {
      return isArrayLike(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the provided arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * _.xor([1, 2], [4, 2]);
     * // => [1, 4]
     */
    function xor() {
      var index = -1,
          length = arguments.length;

      while (++index < length) {
        var array = arguments[index];
        if (isArrayLike(array)) {
          var result = result
            ? arrayPush(baseDifference(result, array), baseDifference(array, result))
            : array;
        }
      }
      return result ? baseUniq(result) : [];
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second elements
     * of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
    var zip = restParam(unzip);

    /**
     * The inverse of `_.pairs`; this method returns an object composed from arrays
     * of property names and values. Provide either a single two dimensional array,
     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
     * and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Array
     * @param {Array} props The property names.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function zipObject(props, values) {
      var index = -1,
          length = props ? props.length : 0,
          result = {};

      if (length && !values && !isArray(props[0])) {
        values = [];
      }
      while (++index < length) {
        var key = props[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /**
     * This method is like `_.zip` except that it accepts an iteratee to specify
     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee] The function to combine grouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
     * // => [111, 222]
     */
    var zipWith = restParam(function(arrays) {
      var length = arrays.length,
          iteratee = length > 2 ? arrays[length - 2] : undefined$1,
          thisArg = length > 1 ? arrays[length - 1] : undefined$1;

      if (length > 2 && typeof iteratee == 'function') {
        length -= 2;
      } else {
        iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined$1;
        thisArg = undefined$1;
      }
      arrays.length = length;
      return unzipWith(arrays, iteratee, thisArg);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps `value` with explicit method
     * chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(users)
     *   .sortBy('age')
     *   .map(function(chr) {
     *     return chr.user + ' is ' + chr.age;
     *   })
     *   .first()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor is
     * bound to `thisArg` and invoked with one argument; (value). The purpose of
     * this method is to "tap into" a method chain in order to perform operations
     * on intermediate results within the chain.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor, thisArg) {
      interceptor.call(thisArg, value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor, thisArg) {
      return interceptor.call(thisArg, value);
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(users).first();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(users).chain()
     *   .first()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chained sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Creates a new array joining a wrapped array with any additional arrays
     * and/or values.
     *
     * @name concat
     * @memberOf _
     * @category Chain
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var wrapped = _(array).concat(2, [3], [[4]]);
     *
     * console.log(wrapped.value());
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    var wrapperConcat = restParam(function(values) {
      values = baseFlatten(values);
      return this.thru(function(array) {
        return arrayConcat(isArray(array) ? array : [toObject(array)], values);
      });
    });

    /**
     * Creates a clone of the chained sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).map(function(value) {
     *   return Math.pow(value, 2);
     * });
     *
     * var other = [3, 4];
     * var otherWrapped = wrapped.plant(other);
     *
     * otherWrapped.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * Reverses the wrapped array so the first element becomes the last, the
     * second element becomes the second to last, and so on.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;

      var interceptor = function(value) {
        return (wrapped && wrapped.__dir__ < 0) ? value : value.reverse();
      };
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined$1 });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(interceptor);
    }

    /**
     * Produces the result of coercing the unwrapped value to a string.
     *
     * @name toString
     * @memberOf _
     * @category Chain
     * @returns {string} Returns the coerced string value.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return (this.value() + '');
    }

    /**
     * Executes the chained sequence to extract the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @alias run, toJSON, valueOf
     * @category Chain
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements corresponding to the given keys, or indexes,
     * of `collection`. Keys may be specified as individual arguments or as arrays
     * of keys.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [props] The property names
     *  or indexes of elements to pick, specified individually or in arrays.
     * @returns {Array} Returns the new array of picked elements.
     * @example
     *
     * _.at(['a', 'b', 'c'], [0, 2]);
     * // => ['a', 'c']
     *
     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
     * // => ['barney', 'pebbles']
     */
    var at = restParam(function(collection, props) {
      return baseAt(collection, baseFlatten(props));
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the number of times the key was returned by `iteratee`.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * The predicate is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'active': false },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.every(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = undefined$1;
      }
      if (typeof predicate != 'function' || thisArg !== undefined$1) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.filter([4, 5, 6], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [4, 6]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.filter(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.filter(users, 'active'), 'user');
     * // => ['barney']
     */
    function filter(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, predicate);
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.result(_.find(users, function(chr) {
     *   return chr.age < 40;
     * }), 'user');
     * // => 'barney'
     *
     * // using the `_.matches` callback shorthand
     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.result(_.find(users, 'active', false), 'user');
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.result(_.find(users, 'active'), 'user');
     * // => 'barney'
     */
    var find = createFind(baseEach);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(baseEachRight, true);

    /**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning the first element that has equivalent property
     * values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
     * // => 'barney'
     *
     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
     * // => 'fred'
     */
    function findWhere(collection, source) {
      return find(collection, baseMatches(source));
    }

    /**
     * Iterates over elements of `collection` invoking `iteratee` for each element.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection). Iteratee functions may exit iteration early
     * by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length" property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEach(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from left to right and returns the array
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
     *   console.log(n, key);
     * });
     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
     */
    var forEach = createForEach(arrayEach, baseEach);

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEachRight(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from right to left and returns the array
     */
    var forEachRight = createForEach(arrayEachRight, baseEachRight);

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using the `_.property` callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        result[key] = [value];
      }
    });

    /**
     * Checks if `value` is in `collection` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @alias contains, include
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {*} target The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.includes('pebbles', 'eb');
     * // => true
     */
    function includes(collection, target, fromIndex, guard) {
      var length = collection ? getLength(collection) : 0;
      if (!isLength(length)) {
        collection = values(collection);
        length = collection.length;
      }
      if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
        fromIndex = 0;
      } else {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
      }
      return (typeof collection == 'string' || !isArray(collection) && isString(collection))
        ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1)
        : (!!length && getIndexOf(collection, target, fromIndex) > -1);
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the last element responsible for generating the key. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keyData = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keyData, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return String.fromCharCode(object.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return this.fromCharCode(object.code);
     * }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `methodName` is a function it is
     * invoked for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invoke = restParam(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          isProp = isKey(path),
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined$1);
        result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
      });
      return result;
    });

    /**
     * Creates an array of values by running each element in `collection` through
     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
     * `sum`, `uniq`, and `words`
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function timesThree(n) {
     *   return n * 3;
     * }
     *
     * _.map([1, 2], timesThree);
     * // => [3, 6]
     *
     * _.map({ 'a': 1, 'b': 2 }, timesThree);
     * // => [3, 6] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee, thisArg) {
      var func = isArray(collection) ? arrayMap : baseMap;
      iteratee = getCallback(iteratee, thisArg, 3);
      return func(collection, iteratee);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, while the second of which
     * contains elements `predicate` returns falsey for. The predicate is bound
     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * _.partition([1, 2, 3], function(n) {
     *   return n % 2;
     * });
     * // => [[1, 3], [2]]
     *
     * _.partition([1.2, 2.3, 3.4], function(n) {
     *   return this.floor(n) % 2;
     * }, Math);
     * // => [[1.2, 3.4], [2.3]]
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * var mapper = function(array) {
     *   return _.pluck(array, 'user');
     * };
     *
     * // using the `_.matches` callback shorthand
     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
     * // => [['pebbles'], ['barney', 'fred']]
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.map(_.partition(users, 'active', false), mapper);
     * // => [['barney', 'pebbles'], ['fred']]
     *
     * // using the `_.property` callback shorthand
     * _.map(_.partition(users, 'active'), mapper);
     * // => [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Gets the property value of `path` from all elements in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|string} path The path of the property to pluck.
     * @returns {Array} Returns the property values.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(users, 'user');
     * // => ['barney', 'fred']
     *
     * var userIndex = _.indexBy(users, 'user');
     * _.pluck(userIndex, 'age');
     * // => [36, 40] (iteration order is not guaranteed)
     */
    function pluck(collection, path) {
      return map(collection, property(path));
    }

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` through `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not provided the first element of `collection` is used as the initial
     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `sortByAll`,
     * and `sortByOrder`
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.reduce([1, 2], function(total, n) {
     *   return total + n;
     * });
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
     */
    var reduce = createReduce(arrayReduce, baseEach);

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    var reduceRight = createReduce(arrayReduceRight, baseEachRight);

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.reject([1, 2, 3, 4], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [1, 3]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.reject(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.reject(users, 'active'), 'user');
     * // => ['barney']
     */
    function reject(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, function(value, index, collection) {
        return !predicate(value, index, collection);
      });
    }

    /**
     * Gets a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {*} Returns the random sample(s).
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      if (guard ? isIterateeCall(collection, n, guard) : n == null) {
        collection = toIterable(collection);
        var length = collection.length;
        return length > 0 ? collection[baseRandom(0, length - 1)] : undefined$1;
      }
      var index = -1,
          result = toArray(collection),
          length = result.length,
          lastIndex = length - 1;

      n = nativeMin(n < 0 ? 0 : (+n || 0), length);
      while (++index < n) {
        var rand = baseRandom(index, lastIndex),
            value = result[rand];

        result[rand] = result[index];
        result[index] = value;
      }
      result.length = n;
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      return sample(collection, POSITIVE_INFINITY);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the size of `collection`.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      var length = collection ? getLength(collection) : 0;
      return isLength(length) ? length : keys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * The function returns as soon as it finds a passing value and does not iterate
     * over the entire collection. The predicate is bound to `thisArg` and invoked
     * with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.some(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, thisArg) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = undefined$1;
      }
      if (typeof predicate != 'function' || thisArg !== undefined$1) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through `iteratee`. This method performs
     * a stable sort, that is, it preserves the original sort order of equal elements.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return Math.sin(n);
     * });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return this.sin(n);
     * }, Math);
     * // => [3, 1, 2]
     *
     * var users = [
     *   { 'user': 'fred' },
     *   { 'user': 'pebbles' },
     *   { 'user': 'barney' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.sortBy(users, 'user'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function sortBy(collection, iteratee, thisArg) {
      if (collection == null) {
        return [];
      }
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = undefined$1;
      }
      var index = -1;
      iteratee = getCallback(iteratee, thisArg, 3);

      var result = baseMap(collection, function(value, key, collection) {
        return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
      });
      return baseSortBy(result, compareAscending);
    }

    /**
     * This method is like `_.sortBy` except that it can sort by multiple iteratees
     * or property names.
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
     *  The iteratees to sort by, specified as individual values or arrays of values.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
     *
     * _.map(_.sortByAll(users, 'user', function(chr) {
     *   return Math.floor(chr.age / 10);
     * }), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    var sortByAll = restParam(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var guard = iteratees[2];
      if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
        iteratees.length = 1;
      }
      return baseSortByOrder(collection, baseFlatten(iteratees), []);
    });

    /**
     * This method is like `_.sortByAll` except that it allows specifying the
     * sort orders of the iteratees to sort by. If `orders` is unspecified, all
     * values are sorted in ascending order. Otherwise, a value is sorted in
     * ascending order if its corresponding order is "asc", and descending if "desc".
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.map(_.sortByOrder(users, ['user', 'age'], ['asc', 'desc']), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    function sortByOrder(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (guard && isIterateeCall(iteratees, orders, guard)) {
        orders = undefined$1;
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseSortByOrder(collection, iteratees, orders);
    }

    /**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning an array of all elements that have equivalent
     * property values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
     * // => ['barney']
     *
     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
     * // => ['fred']
     */
    function where(collection, source) {
      return filter(collection, baseMatches(source));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @category Date
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => logs the number of milliseconds it took for the deferred function to be invoked
     */
    var now = nativeNow || function() {
      return new Date().getTime();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it is called `n` or more times.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'done saving!' after the two async saves have completed
     */
    function after(n, func) {
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      n = nativeIsFinite(n = +n) ? n : 0;
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that accepts up to `n` arguments ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      if (guard && isIterateeCall(func, n, guard)) {
        n = undefined$1;
      }
      n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
      return createWrapper(func, ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it is called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery('#add').on('click', _.before(5, addContactToList));
     * // => allows adding up to 4 contacts to the list
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined$1;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and prepends any additional `_.bind` arguments to those provided to the
     * bound function.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind` this method does not set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var greet = function(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * };
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // using placeholders
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = restParam(function(func, thisArg, partials) {
      var bitmask = BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bind.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all enumerable function
     * properties, own and inherited, of `object` are bound.
     *
     * **Note:** This method does not set the "length" property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} [methodNames] The object method names to bind,
     *  specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs' when the element is clicked
     */
    var bindAll = restParam(function(object, methodNames) {
      methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);

      var index = -1,
          length = methodNames.length;

      while (++index < length) {
        var key = methodNames[index];
        object[key] = createWrapper(object[key], BIND_FLAG, object);
      }
      return object;
    });

    /**
     * Creates a function that invokes the method at `object[key]` and prepends
     * any additional `_.bindKey` arguments to those provided to the bound function.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist.
     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // using placeholders
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = restParam(function(object, key, partials) {
      var bitmask = BIND_FLAG | BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bindKey.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts one or more arguments of `func` that when
     * called either invokes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` may be specified
     * if `func.length` is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    var curry = createCurry(CURRY_FLAG);

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    var curryRight = createCurry(CURRY_RIGHT_FLAG);

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed invocations. Provide an options object to indicate that `func`
     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
     * Subsequent calls to the debounced function return the result of the last
     * `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading
     *  edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
     *  delayed before it is invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // ensure `batchLog` is invoked once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }));
     *
     * // cancel a debounced call
     * var todoChanges = _.debounce(batchLog, 1000);
     * Object.observe(models.todo, todoChanges);
     *
     * Object.observe(models, function(changes) {
     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
     *     todoChanges.cancel();
     *   }
     * }, ['delete']);
     *
     * // ...at some point `models.todo` is changed
     * models.todo.completed = true;
     *
     * // ...before 1 second has passed `models.todo` is deleted
     * // which cancels the debounced `todoChanges` call
     * delete models.todo;
     */
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = wait < 0 ? 0 : (+wait || 0);
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = !!options.leading;
        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function cancel() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        lastCalled = 0;
        maxTimeoutId = timeoutId = trailingCall = undefined$1;
      }

      function complete(isCalled, id) {
        if (id) {
          clearTimeout(id);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined$1;
        if (isCalled) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = undefined$1;
          }
        }
      }

      function delayed() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0 || remaining > wait) {
          complete(trailingCall, maxTimeoutId);
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      }

      function maxDelayed() {
        complete(trailing, timeoutId);
      }

      function debounced() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0 || remaining > maxWait;

          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        }
        else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = undefined$1;
        }
        return result;
      }
      debounced.cancel = cancel;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */
    var defer = restParam(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => logs 'later' after one second
     */
    var delay = restParam(function(func, wait, args) {
      return baseDelay(func, wait, args);
    });

    /**
     * Creates a function that returns the result of invoking the provided
     * functions with the `this` binding of the created function, where each
     * successive invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow(_.add, square);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the provided functions from right to left.
     *
     * @static
     * @memberOf _
     * @alias backflow, compose
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight(square, _.add);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is coerced to a string and used as the
     * cache key. The `func` is invoked with the `this` binding of the memoized
     * function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var upperCase = _.memoize(function(string) {
     *   return string.toUpperCase();
     * });
     *
     * upperCase('fred');
     * // => 'FRED'
     *
     * // modifying the result cache
     * upperCase.cache.set('fred', 'BARNEY');
     * upperCase('fred');
     * // => 'BARNEY'
     *
     * // replacing `_.memoize.Cache`
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'barney' };
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'fred' }
     *
     * _.memoize.Cache = WeakMap;
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'barney' }
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new memoize.Cache;
      return memoized;
    }

    /**
     * Creates a function that runs each argument through a corresponding
     * transform function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms] The functions to transform
     * arguments, specified as individual functions or arrays of functions.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var modded = _.modArgs(function(x, y) {
     *   return [x, y];
     * }, square, doubled);
     *
     * modded(1, 2);
     * // => [1, 4]
     *
     * modded(5, 10);
     * // => [25, 20]
     */
    var modArgs = restParam(function(func, transforms) {
      transforms = baseFlatten(transforms);
      if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = transforms.length;
      return restParam(function(args) {
        var index = nativeMin(args.length, length);
        while (index--) {
          args[index] = transforms[index](args[index]);
        }
        return func.apply(this, args);
      });
    });

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        return !predicate.apply(this, arguments);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first call. The `func` is invoked
     * with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` invokes `createApplication` once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with `partial` arguments prepended
     * to those provided to the new function. This method is like `_.bind` except
     * it does **not** alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // using placeholders
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = createPartial(PARTIAL_FLAG);

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to those provided to the new function.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // using placeholders
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = createPartial(PARTIAL_RIGHT_FLAG);

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified indexes where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, 2, 0, 1);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     *
     * var map = _.rearg(_.map, [1, 0]);
     * map(function(n) {
     *   return n * 3;
     * }, [1, 2, 3]);
     * // => [3, 6, 9]
     */
    var rearg = restParam(function(func, indexes) {
      return createWrapper(func, REARG_FLAG, undefined$1, undefined$1, undefined$1, baseFlatten(indexes));
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as an array.
     *
     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.restParam(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined$1 ? (func.length - 1) : (+start || 0), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);

        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, rest);
          case 1: return func.call(this, args[0], rest);
          case 2: return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the created
     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
     *
     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * // with a Promise
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function(array) {
        return func.apply(this, array);
      };
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed invocations. Provide an options object to indicate
     * that `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. Subsequent calls to the throttled function return the
     * result of the last `func` call.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading
     *  edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     *
     * // cancel a trailing throttled call
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, { 'leading': leading, 'maxWait': +wait, 'trailing': trailing });
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Any additional arguments provided to the function are
     * appended to those provided to the wrapper function. The wrapper is invoked
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      wrapper = wrapper == null ? identity : wrapper;
      return createWrapper(wrapper, PARTIAL_FLAG, undefined$1, [value], []);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
     * otherwise they are assigned by reference. If `customizer` is provided it is
     * invoked to produce the cloned values. If `customizer` returns `undefined`
     * cloning is handled by the method instead. The `customizer` is bound to
     * `thisArg` and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var shallow = _.clone(users);
     * shallow[0] === users[0];
     * // => true
     *
     * var deep = _.clone(users, true);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.clone(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 0
     */
    function clone(value, isDeep, customizer, thisArg) {
      if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
        isDeep = false;
      }
      else if (typeof isDeep == 'function') {
        thisArg = customizer;
        customizer = isDeep;
        isDeep = false;
      }
      return typeof customizer == 'function'
        ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1))
        : baseClone(value, isDeep);
    }

    /**
     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
     * to produce the cloned values. If `customizer` returns `undefined` cloning
     * is handled by the method instead. The `customizer` is bound to `thisArg`
     * and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var deep = _.cloneDeep(users);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.cloneDeep(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 20
     */
    function cloneDeep(value, customizer, thisArg) {
      return typeof customizer == 'function'
        ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
        : baseClone(value, true);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    function gt(value, other) {
      return value > other;
    }

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    function gte(value, other) {
      return value >= other;
    }

    /**
     * Checks if `value` is classified as an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) &&
        hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(function() { return arguments; }());
     * // => false
     */
    var isArray = nativeIsArray || function(value) {
      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
    };

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
    }

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    function isDate(value) {
      return isObjectLike(value) && objToString.call(value) == dateTag;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
    }

    /**
     * Checks if `value` is empty. A value is considered empty unless it is an
     * `arguments` object, array, string, or jQuery-like collection with a length
     * greater than `0` or an object with own enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
          (isObjectLike(value) && isFunction(value.splice)))) {
        return !value.length;
      }
      return !keys(value).length;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent. If `customizer` is provided it is invoked to compare values.
     * If `customizer` returns `undefined` comparisons are handled by the method
     * instead. The `customizer` is bound to `thisArg` and invoked with three
     * arguments: (value, other [, index|key]).
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. Functions and DOM nodes
     * are **not** supported. Provide a customizer function to extend support
     * for comparing other values.
     *
     * @static
     * @memberOf _
     * @alias eq
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * object == other;
     * // => false
     *
     * _.isEqual(object, other);
     * // => true
     *
     * // using a customizer callback
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqual(array, other, function(value, other) {
     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
     *     return true;
     *   }
     * });
     * // => true
     */
    function isEqual(value, other, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined$1;
      var result = customizer ? customizer(value, other) : undefined$1;
      return  result === undefined$1 ? baseIsEqual(value, other, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(10);
     * // => true
     *
     * _.isFinite('10');
     * // => false
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite(Object(10));
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in older versions of Chrome and Safari which return 'function' for regexes
      // and Safari 8 equivalents which return 'object' for typed array constructors.
      return isObject(value) && objToString.call(value) == funcTag;
    }

    /**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // Avoid a V8 JIT bug in Chrome 19-20.
      // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Performs a deep comparison between `object` and `source` to determine if
     * `object` contains equivalent property values. If `customizer` is provided
     * it is invoked to compare values. If `customizer` returns `undefined`
     * comparisons are handled by the method instead. The `customizer` is bound
     * to `thisArg` and invoked with three arguments: (value, other, index|key).
     *
     * **Note:** This method supports comparing properties of arrays, booleans,
     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
     * and DOM nodes are **not** supported. Provide a customizer function to extend
     * support for comparing other values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.isMatch(object, { 'age': 40 });
     * // => true
     *
     * _.isMatch(object, { 'age': 36 });
     * // => false
     *
     * // using a customizer callback
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatch(object, source, function(value, other) {
     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
     * });
     * // => true
     */
    function isMatch(object, source, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined$1;
      return baseIsMatch(object, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
     * which returns `true` for `undefined` and other non-numeric values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (isFunction(value)) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
     * as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isNumber(8.4);
     * // => true
     *
     * _.isNumber(NaN);
     * // => true
     *
     * _.isNumber('8.4');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * **Note:** This method assumes objects created by the `Object` constructor
     * have no inherited enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      var Ctor;

      // Exit early for non `Object` objects.
      if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
          (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
        return false;
      }
      // IE < 9 iterates inherited properties before own properties. If the first
      // iterated property is an object's own property then there are no inherited
      // enumerable properties.
      var result;
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      baseForIn(value, function(subValue, key) {
        result = key;
      });
      return result === undefined$1 || hasOwnProperty.call(value, result);
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    function isRegExp(value) {
      return isObject(value) && objToString.call(value) == regexpTag;
    }

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    function isTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined$1;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    function lt(value, other) {
      return value < other;
    }

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    function lte(value, other) {
      return value <= other;
    }

    /**
     * Converts `value` to an array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * (function() {
     *   return _.toArray(arguments).slice(1);
     * }(1, 2, 3));
     * // => [2, 3]
     */
    function toArray(value) {
      var length = value ? getLength(value) : 0;
      if (!isLength(length)) {
        return values(value);
      }
      if (!length) {
        return [];
      }
      return arrayCopy(value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable
     * properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return baseCopy(value, keysIn(value));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * overwrite property assignments of previous sources. If `customizer` is
     * provided it is invoked to produce the merged values of the destination and
     * source properties. If `customizer` returns `undefined` merging is handled
     * by the method instead. The `customizer` is bound to `thisArg` and invoked
     * with five arguments: (objectValue, sourceValue, key, object, source).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var users = {
     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
     * };
     *
     * var ages = {
     *   'data': [{ 'age': 36 }, { 'age': 40 }]
     * };
     *
     * _.merge(users, ages);
     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
     *
     * // using a customizer callback
     * var object = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var other = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(object, other, function(a, b) {
     *   if (_.isArray(a)) {
     *     return a.concat(b);
     *   }
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
     */
    var merge = createAssigner(baseMerge);

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources overwrite property assignments of previous sources.
     * If `customizer` is provided it is invoked to produce the assigned values.
     * The `customizer` is bound to `thisArg` and invoked with five arguments:
     * (objectValue, sourceValue, key, object, source).
     *
     * **Note:** This method mutates `object` and is based on
     * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
     *
     * @static
     * @memberOf _
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using a customizer callback
     * var defaults = _.partialRight(_.assign, function(value, other) {
     *   return _.isUndefined(value) ? other : value;
     * });
     *
     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
    var assign = createAssigner(function(object, source, customizer) {
      return customizer
        ? assignWith(object, source, customizer)
        : baseAssign(object, source);
    });

    /**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties, guard) {
      var result = baseCreate(prototype);
      if (guard && isIterateeCall(prototype, properties, guard)) {
        properties = undefined$1;
      }
      return properties ? baseAssign(result, properties) : result;
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
    var defaults = createDefaults(assign, assignDefaults);

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
     * // => { 'user': { 'name': 'barney', 'age': 36 } }
     *
     */
    var defaultsDeep = createDefaults(merge, mergeDefaults);

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // using the `_.matches` callback shorthand
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    var findKey = createFindKey(baseForOwn);

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles` assuming `_.findKey` returns `barney`
     *
     * // using the `_.matches` callback shorthand
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    var findLastKey = createFindKey(baseForOwnRight);

    /**
     * Iterates over own and inherited enumerable properties of an object invoking
     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
     */
    var forIn = createForIn(baseFor);

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
     */
    var forInRight = createForIn(baseForRight);

    /**
     * Iterates over own enumerable properties of an object invoking `iteratee`
     * for each property. The `iteratee` is bound to `thisArg` and invoked with
     * three arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a' and 'b' (iteration order is not guaranteed)
     */
    var forOwn = createForOwn(baseForOwn);

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
     */
    var forOwnRight = createForOwn(baseForOwnRight);

    /**
     * Creates an array of function property names from all enumerable properties,
     * own and inherited, of `object`.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the new array of property names.
     * @example
     *
     * _.functions(_);
     * // => ['after', 'ary', 'assign', ...]
     */
    function functions(object) {
      return baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined$1 : baseGet(object, toPath(path), path + '');
      return result === undefined$1 ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': { 'c': 3 } } };
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b.c');
     * // => true
     *
     * _.has(object, ['a', 'b', 'c']);
     * // => true
     */
    function has(object, path) {
      if (object == null) {
        return false;
      }
      var result = hasOwnProperty.call(object, path);
      if (!result && !isKey(path)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        if (object == null) {
          return false;
        }
        path = last(path);
        result = hasOwnProperty.call(object, path);
      }
      return result || (isLength(object.length) && isIndex(path, object.length) &&
        (isArray(object) || isArguments(object)));
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite property
     * assignments of previous values unless `multiValue` is `true`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to invert.
     * @param {boolean} [multiValue] Allow multiple values per key.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     *
     * // with `multiValue`
     * _.invert(object, true);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function invert(object, multiValue, guard) {
      if (guard && isIterateeCall(object, multiValue, guard)) {
        multiValue = undefined$1;
      }
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index],
            value = object[key];

        if (multiValue) {
          if (hasOwnProperty.call(result, value)) {
            result[value].push(key);
          } else {
            result[value] = [key];
          }
        }
        else {
          result[value] = key;
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      var Ctor = object == null ? undefined$1 : object.constructor;
      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
          (typeof object != 'function' && isArrayLike(object))) {
        return shimKeys(object);
      }
      return isObject(object) ? nativeKeys(object) : [];
    };

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = (length && isLength(length) &&
        (isArray(object) || isArguments(object)) && length) || 0;

      var Ctor = object.constructor,
          index = -1,
          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
          result = Array(length),
          skipIndexes = length > 0;

      while (++index < length) {
        result[index] = (index + '');
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) &&
            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * property of `object` through `iteratee`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    var mapKeys = createObjectMapper(true);

    /**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through `iteratee`. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, key, object).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
     *   return n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * // using the `_.property` callback shorthand
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    var mapValues = createObjectMapper();

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable properties of `object` that are not omitted.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to omit, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.omit(object, 'age');
     * // => { 'user': 'fred' }
     *
     * _.omit(object, _.isNumber);
     * // => { 'user': 'fred' }
     */
    var omit = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      if (typeof props[0] != 'function') {
        var props = arrayMap(baseFlatten(props), String);
        return pickByArray(object, baseDifference(keysIn(object), props));
      }
      var predicate = bindCallback(props[0], props[1], 3);
      return pickByCallback(object, function(value, key, object) {
        return !predicate(value, key, object);
      });
    });

    /**
     * Creates a two dimensional array of the key-value pairs for `object`,
     * e.g. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
     */
    function pairs(object) {
      object = toObject(object);

      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }

    /**
     * Creates an object composed of the picked `object` properties. Property
     * names may be specified as individual arguments or as arrays of property
     * names. If `predicate` is provided it is invoked for each property of `object`
     * picking the properties `predicate` returns truthy for. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.pick(object, 'user');
     * // => { 'user': 'fred' }
     *
     * _.pick(object, _.isString);
     * // => { 'user': 'fred' }
     */
    var pick = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      return typeof props[0] == 'function'
        ? pickByCallback(object, bindCallback(props[0], props[1], 3))
        : pickByArray(object, baseFlatten(props));
    });

    /**
     * This method is like `_.get` except that if the resolved value is a function
     * it is invoked with the `this` binding of its parent object and its result
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a.b.c', 'default');
     * // => 'default'
     *
     * _.result(object, 'a.b.c', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      var result = object == null ? undefined$1 : object[path];
      if (result === undefined$1) {
        if (object != null && !isKey(path, object)) {
          path = toPath(path);
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          result = object == null ? undefined$1 : object[last(path)];
        }
        result = result === undefined$1 ? defaultValue : result;
      }
      return isFunction(result) ? result.call(object) : result;
    }

    /**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it is created.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      if (object == null) {
        return object;
      }
      var pathKey = (path + '');
      path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = path[index];
        if (isObject(nested)) {
          if (index == lastIndex) {
            nested[key] = value;
          } else if (nested[key] == null) {
            nested[key] = isIndex(path[index + 1]) ? [] : {};
          }
        }
        nested = nested[key];
      }
      return object;
    }

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own enumerable
     * properties through `iteratee`, with each invocation potentially mutating
     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
     * with four arguments: (accumulator, value, key, object). Iteratee functions
     * may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * });
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     */
    function transform(object, iteratee, accumulator, thisArg) {
      var isArr = isArray(object) || isTypedArray(object);
      iteratee = getCallback(iteratee, thisArg, 4);

      if (accumulator == null) {
        if (isArr || isObject(object)) {
          var Ctor = object.constructor;
          if (isArr) {
            accumulator = isArray(object) ? new Ctor : [];
          } else {
            accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined$1);
          }
        } else {
          accumulator = {};
        }
      }
      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Creates an array of the own enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable property values
     * of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Checks if `n` is between `start` and up to but not including, `end`. If
     * `end` is not specified it is set to `start` with `start` then set to `0`.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} n The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     */
    function inRange(value, start, end) {
      start = +start || 0;
      if (end === undefined$1) {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      return value >= nativeMin(start, end) && value < nativeMax(start, end);
    }

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number is returned.
     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
     * number is returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(min, max, floating) {
      if (floating && isIterateeCall(min, max, floating)) {
        max = floating = undefined$1;
      }
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (noMax && typeof min == 'boolean') {
          floating = min;
          min = 1;
        }
        else if (typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
        noMax = false;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      if (floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
      }
      return baseRandom(min, max);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar');
     * // => 'fooBar'
     *
     * _.camelCase('__foo_bar__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
    });

    /**
     * Capitalizes the first character of `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('fred');
     * // => 'Fred'
     */
    function capitalize(string) {
      string = baseToString(string);
      return string && (string.charAt(0).toUpperCase() + string.slice(1));
    }

    /**
     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = baseToString(string);
      return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search from.
     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = baseToString(string);
      target = (target + '');

      var length = string.length;
      position = position === undefined$1
        ? length
        : nativeMin(position < 0 ? 0 : (+position || 0), length);

      position -= target.length;
      return position >= 0 && string.indexOf(target, position) == position;
    }

    /**
     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
     * their corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional characters
     * use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value.
     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * Backticks are escaped because in Internet Explorer < 9, they can break out
     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
     * for more details.
     *
     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
     * to reduce XSS vectors.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      // Reset `lastIndex` because in IE < 9 `String#replace` does not.
      string = baseToString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
     */
    function escapeRegExp(string) {
      string = baseToString(string);
      return (string && reHasRegExpChars.test(string))
        ? string.replace(reRegExpChars, escapeRegExpChar)
        : (string || '(?:)');
    }

    /**
     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__foo_bar__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = baseToString(string);
      length = +length;

      var strLength = string.length;
      if (strLength >= length || !nativeIsFinite(length)) {
        return string;
      }
      var mid = (length - strLength) / 2,
          leftLength = nativeFloor(mid),
          rightLength = nativeCeil(mid);

      chars = createPadding('', rightLength, chars);
      return chars.slice(0, leftLength) + string + chars;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padLeft('abc', 6);
     * // => '   abc'
     *
     * _.padLeft('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padLeft('abc', 3);
     * // => 'abc'
     */
    var padLeft = createPadDir();

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padRight('abc', 6);
     * // => 'abc   '
     *
     * _.padRight('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padRight('abc', 3);
     * // => 'abc'
     */
    var padRight = createPadDir(true);

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
     * in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
     * of `parseInt`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
      // Chrome fails to trim leading <BOM> whitespace characters.
      // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
      if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      string = trim(string);
      return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=0] The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n) {
      var result = '';
      string = baseToString(string);
      n = +n;
      if (n < 1 || !string || !nativeIsFinite(n)) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        string += string;
      } while (n);

      return result;
    }

    /**
     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--foo-bar');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__foo_bar__');
     * // => 'Foo Bar'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = baseToString(string);
      position = position == null
        ? 0
        : nativeMin(position < 0 ? 0 : (+position || 0), string.length);

      return string.lastIndexOf(target, position) == position;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is provided it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [options.variable] The data object variable name.
     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // using the HTML "escape" delimiter to escape data property values
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // using custom template delimiters
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using backslashes to treat delimiters as plain text
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // using the `imports` option to import `jQuery` as `jq`
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, otherOptions) {
      // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
        options = otherOptions = undefined$1;
      }
      string = baseToString(string);
      options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);

      var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      var sourceURL = '//# sourceURL=' +
        ('sourceURL' in options
          ? options.sourceURL
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined$1, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
      }
      chars = (chars + '');
      return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimLeft('  abc  ');
     * // => 'abc  '
     *
     * _.trimLeft('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimLeft(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string));
      }
      return string.slice(charsLeftIndex(string, (chars + '')));
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimRight('  abc  ');
     * // => '  abc'
     *
     * _.trimRight('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimRight(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(0, trimmedRightIndex(string) + 1);
      }
      return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object|number} [options] The options object or maximum string length.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.trunc('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', 24);
     * // => 'hi-diddly-ho there, n...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function trunc(string, options, guard) {
      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined$1;
      }
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (options != null) {
        if (isObject(options)) {
          var separator = 'separator' in options ? options.separator : separator;
          length = 'length' in options ? (+options.length || 0) : length;
          omission = 'omission' in options ? baseToString(options.omission) : omission;
        } else {
          length = +options || 0;
        }
      }
      string = baseToString(string);
      if (length >= string.length) {
        return string;
      }
      var end = length - omission.length;
      if (end < 1) {
        return omission;
      }
      var result = string.slice(0, end);
      if (separator == null) {
        return result + omission;
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              newEnd,
              substring = string.slice(0, end);

          if (!separator.global) {
            separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            newEnd = match.index;
          }
          result = result.slice(0, newEnd == null ? end : newEnd);
        }
      } else if (string.indexOf(separator, end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
     * corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
     * entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = baseToString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      if (guard && isIterateeCall(string, pattern, guard)) {
        pattern = undefined$1;
      }
      string = baseToString(string);
      return string.match(pattern || reWords) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function} func The function to attempt.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // avoid throwing errors for invalid selectors
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = restParam(function(func, args) {
      try {
        return func.apply(undefined$1, args);
      } catch(e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and arguments of the created function. If `func` is a property name the
     * created callback returns the property value for a given element. If `func`
     * is an object the created callback returns `true` for elements that contain
     * the equivalent object properties, otherwise it returns `false`.
     *
     * @static
     * @memberOf _
     * @alias iteratee
     * @category Utility
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
     *   if (!match) {
     *     return callback(func, thisArg);
     *   }
     *   return function(object) {
     *     return match[2] == 'gt'
     *       ? object[match[1]] > match[3]
     *       : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(users, 'age__gt36');
     * // => [{ 'user': 'fred', 'age': 40 }]
     */
    function callback(func, thisArg, guard) {
      if (guard && isIterateeCall(func, thisArg, guard)) {
        thisArg = undefined$1;
      }
      return isObjectLike(func)
        ? matches(func)
        : baseCallback(func, thisArg);
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var getter = _.constant(object);
     *
     * getter() === object;
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.identity(object) === object;
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that performs a deep comparison between a given object
     * and `source`, returning `true` if the given object has equivalent property
     * values, else `false`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, true));
    }

    /**
     * Creates a function that compares the property value of `path` on a given
     * object to `value`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * _.find(users, _.matchesProperty('user', 'fred'));
     * // => { 'user': 'fred' }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, true));
    }

    /**
     * Creates a function that invokes the method at `path` on a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': _.constant(2) } } },
     *   { 'a': { 'b': { 'c': _.constant(1) } } }
     * ];
     *
     * _.map(objects, _.method('a.b.c'));
     * // => [2, 1]
     *
     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
    var method = restParam(function(path, args) {
      return function(object) {
        return invokePath(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path on `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = restParam(function(object, args) {
      return function(path) {
        return invokePath(object, path, args);
      };
    });

    /**
     * Adds all own enumerable function properties of a source object to the
     * destination object. If `object` is a function then methods are added to
     * its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added
     *  are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      if (options == null) {
        var isObj = isObject(source),
            props = isObj ? keys(source) : undefined$1,
            methodNames = (props && props.length) ? baseFunctions(source, props) : undefined$1;

        if (!(methodNames ? methodNames.length : isObj)) {
          methodNames = false;
          options = source;
          source = object;
          object = this;
        }
      }
      if (!methodNames) {
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = true,
          index = -1,
          isFunc = isFunction(object),
          length = methodNames.length;

      if (options === false) {
        chain = false;
      } else if (isObject(options) && 'chain' in options) {
        chain = options.chain;
      }
      while (++index < length) {
        var methodName = methodNames[index],
            func = source[methodName];

        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = (function(func) {
            return function() {
              var chainAll = this.__chain__;
              if (chain || chainAll) {
                var result = object(this.__wrapped__),
                    actions = result.__actions__ = arrayCopy(this.__actions__);

                actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
                result.__chain__ = chainAll;
                return result;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }(func));
        }
      }
      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      root._ = oldDash;
      return this;
    }

    /**
     * A no-operation function that returns `undefined` regardless of the
     * arguments it receives.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.noop(object) === undefined;
     * // => true
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that returns the property value at `path` on a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': 2 } } },
     *   { 'a': { 'b': { 'c': 1 } } }
     * ];
     *
     * _.map(objects, _.property('a.b.c'));
     * // => [2, 1]
     *
     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the property value at a given path on `object`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return baseGet(object, toPath(path), path + '');
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. If `end` is not specified it is
     * set to `start` with `start` then set to `0`. If `end` is less than `start`
     * a zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the new array of numbers.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    function range(start, end, step) {
      if (step && isIterateeCall(start, end, step)) {
        end = step = undefined$1;
      }
      start = +start || 0;
      step = step == null ? 1 : (+step || 0);

      if (end == null) {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
      // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Invokes the iteratee function `n` times, returning an array of the results
     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
     * one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) {
     *   mage.castSpell(n);
     * });
     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
     *
     * _.times(3, function(n) {
     *   this.cast(n);
     * }, mage);
     * // => also invokes `mage.castSpell(n)` three times
     */
    function times(n, iteratee, thisArg) {
      n = nativeFloor(n);

      // Exit early to avoid a JSC JIT bug in Safari 8
      // where `Array(0)` is treated as `Array(1)`.
      if (n < 1 || !nativeIsFinite(n)) {
        return [];
      }
      var index = -1,
          result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

      iteratee = bindCallback(iteratee, thisArg, 1);
      while (++index < n) {
        if (index < MAX_ARRAY_LENGTH) {
          result[index] = iteratee(index);
        } else {
          iteratee(index);
        }
      }
      return result;
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return baseToString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} augend The first number to add.
     * @param {number} addend The second number to add.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    function add(augend, addend) {
      return (+augend || 0) + (+addend || 0);
    }

    /**
     * Calculates `n` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Calculates `n` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Gets the maximum value of `collection`. If `collection` is empty or falsey
     * `-Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => -Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.max(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using the `_.property` callback shorthand
     * _.max(users, 'age');
     * // => { 'user': 'fred', 'age': 40 }
     */
    var max = createExtremum(gt, NEGATIVE_INFINITY);

    /**
     * Gets the minimum value of `collection`. If `collection` is empty or falsey
     * `Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.min(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // using the `_.property` callback shorthand
     * _.min(users, 'age');
     * // => { 'user': 'barney', 'age': 36 }
     */
    var min = createExtremum(lt, POSITIVE_INFINITY);

    /**
     * Calculates `n` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Gets the sum of the values in `collection`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 6]);
     * // => 10
     *
     * _.sum({ 'a': 4, 'b': 6 });
     * // => 10
     *
     * var objects = [
     *   { 'n': 4 },
     *   { 'n': 6 }
     * ];
     *
     * _.sum(objects, function(object) {
     *   return object.n;
     * });
     * // => 10
     *
     * // using the `_.property` callback shorthand
     * _.sum(objects, 'n');
     * // => 10
     */
    function sum(collection, iteratee, thisArg) {
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = undefined$1;
      }
      iteratee = getCallback(iteratee, thisArg, 3);
      return iteratee.length == 1
        ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee)
        : baseSum(collection, iteratee);
    }

    /*------------------------------------------------------------------------*/

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    // Add functions to the `Map` cache.
    MapCache.prototype['delete'] = mapDelete;
    MapCache.prototype.get = mapGet;
    MapCache.prototype.has = mapHas;
    MapCache.prototype.set = mapSet;

    // Add functions to the `Set` cache.
    SetCache.prototype.push = cachePush;

    // Assign cache to `_.memoize`.
    memoize.Cache = MapCache;

    // Add functions that return wrapped values when chaining.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.callback = callback;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.modArgs = modArgs;
    lodash.negate = negate;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.restParam = restParam;
    lodash.set = set;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortByAll = sortByAll;
    lodash.sortByOrder = sortByOrder;
    lodash.spread = spread;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.backflow = flowRight;
    lodash.collect = map;
    lodash.compose = flowRight;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.iteratee = callback;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;

    // Add functions to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add functions that return unwrapped values when chaining.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.deburr = deburr;
    lodash.endsWith = endsWith;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.findWhere = findWhere;
    lodash.first = first;
    lodash.floor = floor;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isMatch = isMatch;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.min = min;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padLeft = padLeft;
    lodash.padRight = padRight;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.sum = sum;
    lodash.template = template;
    lodash.trim = trim;
    lodash.trimLeft = trimLeft;
    lodash.trimRight = trimRight;
    lodash.trunc = trunc;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.words = words;

    // Add aliases.
    lodash.all = every;
    lodash.any = some;
    lodash.contains = includes;
    lodash.eq = isEqual;
    lodash.detect = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.head = first;
    lodash.include = includes;
    lodash.inject = reduce;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!lodash.prototype[methodName]) {
          source[methodName] = func;
        }
      });
      return source;
    }()), false);

    /*------------------------------------------------------------------------*/

    // Add functions capable of returning wrapped and unwrapped values when chaining.
    lodash.sample = sample;

    lodash.prototype.sample = function(n) {
      if (!this.__chain__ && n == null) {
        return sample(this.value());
      }
      return this.thru(function(value) {
        return sample(value, n);
      });
    };

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        var filtered = this.__filtered__;
        if (filtered && !index) {
          return new LazyWrapper(this);
        }
        n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);

        var result = this.clone();
        if (filtered) {
          result.__takeCount__ = nativeMin(result.__takeCount__, n);
        } else {
          result.__views__.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type != LAZY_MAP_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
        var result = this.clone();
        result.__iteratees__.push({ 'iteratee': getCallback(iteratee, thisArg, 1), 'type': type });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.first` and `_.last`.
    arrayEach(['first', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
    arrayEach(['initial', 'rest'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
    arrayEach(['pluck', 'where'], function(methodName, index) {
      var operationName = index ? 'filter' : 'map',
          createCallback = index ? baseMatches : property;

      LazyWrapper.prototype[methodName] = function(value) {
        return this[operationName](createCallback(value));
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.reject = function(predicate, thisArg) {
      predicate = getCallback(predicate, thisArg, 1);
      return this.filter(function(value) {
        return !predicate(value);
      });
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = start == null ? 0 : (+start || 0);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined$1) {
        end = (+end || 0);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
      return this.reverse().takeWhile(predicate, thisArg).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(POSITIVE_INFINITY);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
          retUnwrapped = /^(?:first|last)$/.test(methodName),
          lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var args = retUnwrapped ? [1] : arguments,
            chainAll = this.__chain__,
            value = this.__wrapped__,
            isHybrid = !!this.__actions__.length,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var interceptor = function(value) {
          return (retUnwrapped && chainAll)
            ? lodashFunc(value, 1)[0]
            : lodashFunc.apply(undefined$1, arrayPush([value], args));
        };

        var action = { 'func': thru, 'args': [interceptor], 'thisArg': undefined$1 },
            onlyLazy = isLazy && !isHybrid;

        if (retUnwrapped && !chainAll) {
          if (onlyLazy) {
            value = value.clone();
            value.__actions__.push(action);
            return func.call(value);
          }
          return lodashFunc.call(undefined$1, this.value())[0];
        }
        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push(action);
          return new LodashWrapper(result, chainAll);
        }
        return this.thru(interceptor);
      };
    });

    // Add `Array` and `String` methods to `lodash.prototype`.
    arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
      var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          return func.apply(this.value(), args);
        }
        return this[chainName](function(value) {
          return func.apply(value, args);
        });
      };
    });

    // Map minified function names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name,
            names = realNames[key] || (realNames[key] = []);

        names.push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybridWrapper(undefined$1, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': undefined$1 }];

    // Add functions to the lazy wrapper.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chaining functions to the `lodash` wrapper.
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.concat = wrapperConcat;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add function aliases to the `lodash` wrapper.
    lodash.prototype.collect = lodash.prototype.map;
    lodash.prototype.head = lodash.prototype.first;
    lodash.prototype.select = lodash.prototype.filter;
    lodash.prototype.tail = lodash.prototype.rest;

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers like r.js check for condition patterns like the following:
  if (freeExports && freeModule) {
    // Export for Node.js or RingoJS.
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // Export for Rhino with CommonJS support.
    else {
      freeExports._ = _;
    }
  }
  else {
    // Export for a browser or Rhino.
    root._ = _;
  }
}.call(commonjsGlobal));
}(lodash, lodash.exports));

Room.prototype.advancedSell = function (resourceType, amount, targetAmount) {
    var _a;
    const mySpecificOrders = ((_a = internationalManager.myOrders[this.name]) === null || _a === void 0 ? void 0 : _a[ORDER_SELL][resourceType]) || [];
    for (const order of mySpecificOrders)
        amount -= order.remainingAmount;
    if (amount <= targetAmount * 0.5)
        return false;
    const order = internationalManager.getBuyOrder(resourceType);
    if (order) {
        const dealAmount = findLargestTransactionAmount(this.terminal.store.energy * 0.75, amount, this.name, order.roomName);
        const result = Game.market.deal(order.id, Math.min(dealAmount, order.remainingAmount), this.name);
        if (result === OK && resourceType === 'energy') {
            global.roomStats.commune[this.name].eos += amount;
        }
        return result == OK;
    }
    if (mySpecificOrders.length)
        return false;
    if (internationalManager.myOrdersCount === MARKET_MAX_ORDERS)
        return false;
    const orders = internationalManager.orders[ORDER_SELL][resourceType];
    const price = Math.max(Math.min.apply(Math, orders.map(o => o.price)) * 0.99, getAvgPrice(resourceType) * 0.8);
    const result = Game.market.createOrder({
        roomName: this.name,
        type: ORDER_SELL,
        resourceType,
        price,
        totalAmount: amount,
    });
    if (result === OK && resourceType === 'energy') {
        global.roomStats.commune[this.name].eos += amount;
    }
    return result == OK;
};
Room.prototype.advancedBuy = function (resourceType, amount, targetAmount) {
    var _a;
    const mySpecificOrders = ((_a = internationalManager.myOrders[this.name]) === null || _a === void 0 ? void 0 : _a[ORDER_BUY][resourceType]) || [];
    for (const order of mySpecificOrders)
        amount -= order.remainingAmount;
    if (amount <= targetAmount * 0.5)
        return false;
    const order = internationalManager.getSellOrder(resourceType, getAvgPrice(resourceType) * 1.2);
    if (order) {
        const dealAmount = findLargestTransactionAmount(this.terminal.store.energy * 0.75, amount, this.name, order.roomName);
        const result = Game.market.deal(order.id, Math.min(dealAmount, order.remainingAmount), this.name);
        if (result === OK && resourceType === 'energy') {
            global.roomStats.commune[this.name].eib += amount;
        }
        return result == OK;
    }
    if (mySpecificOrders.length)
        return false;
    if (internationalManager.myOrdersCount === MARKET_MAX_ORDERS)
        return false;
    const orders = internationalManager.orders[ORDER_BUY][resourceType];
    const price = Math.min(Math.max.apply(Math, orders.map(o => o.price)) * 1.01, getAvgPrice(resourceType) * 1.2);
    const result = Game.market.createOrder({
        roomName: this.name,
        type: ORDER_BUY,
        resourceType,
        price,
        totalAmount: amount,
    });
    if (result === OK && resourceType === 'energy') {
        global.roomStats.commune[this.name].eib += amount;
    }
    return result == OK;
};

function loadLocalMarketMemory() {
    let segment = JSON.parse(InterShardMemory.getLocal() || '{}');
    return segment.market || { departures: {} };
}
function storeLocalMarketMemory(memory) {
    let segment = JSON.parse(InterShardMemory.getLocal() || '{}');
    segment.market = memory;
    InterShardMemory.setLocal(JSON.stringify(segment));
}
const tradeBlacklist = [
    'W21N9',
    'W21N8',
    'W17N16',
];
class MarketManager {
    constructor(communeManager) {
        this.communeManager = communeManager;
    }
    isTradingPossible() {
        return this.room.terminal && this.room.storage;
    }
    run() {
        let room = this.communeManager.room;
        const { terminal } = room;
        if (!terminal)
            return;
        if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 50000)
            allyManager.requestResource(room.name, RESOURCE_ENERGY, 60000 - terminal.store.getUsedCapacity(RESOURCE_ENERGY), 0.75);
        if (!internationalManager.marketIsFunctional)
            return;
        for (const mineral of minerals) {
            const mineralAmount = terminal.store.getUsedCapacity(mineral);
            if (mineralAmount > 5000)
                continue;
            allyManager.requestResource(room.name, mineral, 7000 - mineralAmount, 0.25);
        }
        if (terminal.cooldown > 0)
            return;
        const resourceRequests = allyManager.allyRequests.filter(request => request.requestType === RequestTypes.RESOURCE);
        resourceRequests.sort((a, b) => a.priority - b.priority).reverse();
        let amount = 0;
        for (const request of resourceRequests) {
            if (!request.maxAmount)
                continue;
            amount = 0;
            if (minerals.includes(request.resourceType)) {
                if (terminal.store.getUsedCapacity(request.resourceType) < 20000)
                    continue;
                amount = Math.min(request.maxAmount, terminal.store.getUsedCapacity(request.resourceType) / 2);
                terminal.send(request.resourceType, amount, request.roomName, `Sending ${request} to ally`);
                return;
            }
            if (request.resourceType === RESOURCE_ENERGY) {
                if (terminal.store.getUsedCapacity(request.resourceType) < 60000)
                    continue;
                amount = Math.min(request.maxAmount, terminal.store.getUsedCapacity(request.resourceType) / 2);
                terminal.send(request.resourceType, amount, request.roomName, `Sending ${request} to ally`);
                return;
            }
            continue;
        }
        let resourceType;
        let targetAmount = 8000;
        for (resourceType of minerals) {
            if (terminal.store[resourceType] <= targetAmount)
                continue;
            targetAmount *= 0.75;
            if (room.advancedSell(resourceType, terminal.store[resourceType] - targetAmount, targetAmount))
                return;
        }
        resourceType = RESOURCE_ENERGY;
        targetAmount = 30000;
        if (terminal.store[resourceType] < targetAmount) {
            targetAmount *= 1.2;
            if (room.advancedBuy(resourceType, targetAmount - terminal.store[resourceType], targetAmount))
                return;
        }
    }
    runNewVersion() {
        this.room = this.communeManager.room;
        this.terminal = this.room.terminal;
        if (!this.room.storage || !this.room.terminal)
            return;
        if (Game.cpu.bucket > 6000 || (Game.cpu.bucket > 3000 && Game.time % 10 == 0)) {
            this.doTransfers();
        }
        if (this.room.name != 'W17N16' && this.room.name != 'W21N9' && this.room.name != 'W21N8')
            return;
        if (!this.isTradingPossible())
            return;
        if (Game.cpu.bucket > 6000 || (Game.cpu.bucket > 3000 && Game.time % 10 == 0)) {
            this.doTrading();
        }
    }
    amountInRoom(resource, roomName = null) {
        let room = this.room;
        if (roomName)
            room = Game.rooms[roomName];
        if (!room)
            console.log('Somethings wrong.  room is null.  RN: ' + roomName);
        return ((room.terminal.store[resource] || 0) +
            (room.storage.store[resource] || 0) +
            (room.structures.factory ? room.structures.factory[0].store[resource] || 0 : 0));
    }
    sendResourceToRoom(resource, rooms) {
        for (let room of rooms) {
            if (this.room.name == room)
                continue;
            if (this.amountInRoom(resource) > this.amountInRoom(resource, room) * 2) {
                let transferAmount = Math.min(this.amountInRoom(resource) / 2, this.terminal.store[resource], this.terminal.store[RESOURCE_ENERGY]);
                if (transferAmount == 0)
                    continue;
                let result = this.terminal.send(resource, transferAmount, room);
                if (result != OK) {
                    console.log(`Error ${result} in transfer from ${this.room.name} to ${room}. ${resource}`);
                }
                else
                    return true;
            }
        }
        return false;
    }
    doTransfers() {
        if (this.terminal.cooldown > 0)
            return false;
        if (Game.shard.name != 'shard3')
            return false;
        let amountOfEnergy = this.amountInRoom(RESOURCE_ENERGY);
        if (amountOfEnergy > 450000) {
            let result = _.min(_.filter(Game.rooms, rm => rm.controller &&
                rm.controller.my &&
                rm.storage &&
                rm.terminal &&
                rm.name != 'W19N15' &&
                rm.name != 'W15N18'), room => (room.terminal.store[RESOURCE_ENERGY] || 0) + (room.storage.store[RESOURCE_ENERGY] || 0));
            let lowestRoom = result === Infinity ? null : result;
            if (lowestRoom != null &&
                lowestRoom.name != this.room.name &&
                amountOfEnergy - this.amountInRoom(RESOURCE_ENERGY, lowestRoom.name) > 100000 &&
                lowestRoom.terminal &&
                lowestRoom.terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 50000) {
                console.log('LowTransfer to: ' + lowestRoom.name);
                let amountToTransfer = Math.min(this.terminal.store[RESOURCE_ENERGY], 50000);
                let transactionCost = Game.market.calcTransactionCost(1000, this.room.name, lowestRoom.name);
                amountToTransfer = (1000 / (1000 + transactionCost)) * amountToTransfer * 0.99;
                let result = this.terminal.send(RESOURCE_ENERGY, amountToTransfer, lowestRoom.name);
                if (result != OK) {
                    console.log('Error in energy balance transfer.  ' + result);
                }
                return result == OK;
            }
        }
        if (this.room.name == 'W19N15') {
            for (let resource of [RESOURCE_MIST, RESOURCE_WIRE, RESOURCE_CONDENSATE, RESOURCE_CELL]) {
                if (this.terminal.store[resource] > 100) {
                    let result = this.terminal.send(resource, this.terminal.store[resource], 'W17N16');
                    if (result != OK) {
                        console.log('Error in transfer.  ' + result + resource);
                    }
                    return result == OK;
                }
            }
        }
        if (this.sendResourceToRoom(RESOURCE_MIST, ['W14N18']))
            return true;
        if (this.sendResourceToRoom(RESOURCE_CONDENSATE, ['W15N18', 'W17N16']))
            return true;
        if (this.sendAllToRooms(RESOURCE_MUSCLE, ['W17N16']))
            return true;
        if (this.sendAllToRooms(RESOURCE_TISSUE, ['W18N16']))
            return true;
        if (this.sendAllToRooms(RESOURCE_PHLEGM, ['W18N16', 'W15N18']))
            return true;
        if (this.sendAllToRooms(RESOURCE_CELL, ['W17N16', 'W15N18']))
            return true;
        if (this.sendAllToRooms('XGH2O', ['W17N16']))
            return true;
        if (this.sendAllToRooms(RESOURCE_WIRE, ['W17N16', 'W18N16', 'W15N18']))
            return true;
        if (this.sendAllToRooms(RESOURCE_SWITCH, ['W15N18']))
            return true;
        if (this.sendSomeToRooms(RESOURCE_COMPOSITE, ['W18N16']))
            return true;
        if (this.sendAllToRooms(RESOURCE_TRANSISTOR, ['W18N16']))
            return true;
        if (this.sendAllToRooms(RESOURCE_MICROCHIP, ['W17N16']))
            return true;
        if (this.terminal.store[RESOURCE_CONCENTRATE] > 100 &&
            this.room.name != 'W18N16' &&
            this.room.name != 'W15N18') {
            let result = this.terminal.send(RESOURCE_CONCENTRATE, this.terminal.store[RESOURCE_CONCENTRATE], 'W15N18');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_CONCENTRATE);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_OPS) > this.amountInRoom(RESOURCE_OPS, 'W15N18') * 2 &&
            this.room.name != 'W15N18' &&
            this.terminal.store[RESOURCE_OPS]) {
            let result = this.terminal.send(RESOURCE_OPS, Math.min(this.amountInRoom(RESOURCE_OPS) / 2, this.terminal.store[RESOURCE_OPS], this.terminal.store[RESOURCE_ENERGY]), 'W15N18');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_OPS);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_OPS) > this.amountInRoom(RESOURCE_OPS, 'W17N16') * 2 &&
            this.room.name != 'W17N16' &&
            this.terminal.store[RESOURCE_OPS]) {
            let result = this.terminal.send(RESOURCE_OPS, Math.min(this.amountInRoom(RESOURCE_OPS) / 2, this.terminal.store[RESOURCE_OPS], this.terminal.store[RESOURCE_ENERGY]), 'W17N16');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_OPS);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_CONCENTRATE) > this.amountInRoom(RESOURCE_CONCENTRATE, 'W18N16') * 2 &&
            this.room.name != 'W18N16' &&
            this.terminal.store[RESOURCE_CONCENTRATE]) {
            let result = this.terminal.send(RESOURCE_CONCENTRATE, Math.min(this.amountInRoom(RESOURCE_CONCENTRATE) / 2, this.terminal.store[RESOURCE_CONCENTRATE], this.terminal.store[RESOURCE_ENERGY]), 'W18N16');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_CONCENTRATE);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_CONCENTRATE) > this.amountInRoom(RESOURCE_CONCENTRATE, 'W15N18') * 2 &&
            this.room.name != 'W15N18' &&
            this.terminal.store[RESOURCE_CONCENTRATE]) {
            let result = this.terminal.send(RESOURCE_CONCENTRATE, Math.min(this.amountInRoom(RESOURCE_CONCENTRATE) / 2, this.terminal.store[RESOURCE_CONCENTRATE], this.terminal.store[RESOURCE_ENERGY]), 'W15N18');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_CONCENTRATE);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_EXTRACT) > this.amountInRoom(RESOURCE_EXTRACT, 'W18N16') * 2 &&
            this.room.name != 'W18N16' &&
            this.terminal.store[RESOURCE_EXTRACT]) {
            let result = this.terminal.send(RESOURCE_EXTRACT, Math.min(this.amountInRoom(RESOURCE_EXTRACT) / 2, this.terminal.store[RESOURCE_EXTRACT], this.terminal.store[RESOURCE_ENERGY]), 'W18N16');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_EXTRACT);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_KEANIUM_BAR) > this.amountInRoom(RESOURCE_KEANIUM_BAR, 'W17N16') * 2 &&
            this.room.name != 'W17N16' &&
            this.terminal.store[RESOURCE_KEANIUM_BAR]) {
            let result = this.terminal.send(RESOURCE_KEANIUM_BAR, Math.min(this.amountInRoom(RESOURCE_KEANIUM_BAR) / 2, this.terminal.store[RESOURCE_KEANIUM_BAR], this.terminal.store[RESOURCE_ENERGY]), 'W17N16');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_KEANIUM_BAR);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_REDUCTANT) > this.amountInRoom(RESOURCE_REDUCTANT, 'W17N16') * 2 &&
            this.room.name != 'W17N16' &&
            this.terminal.store[RESOURCE_REDUCTANT]) {
            let result = this.terminal.send(RESOURCE_REDUCTANT, Math.min(this.amountInRoom(RESOURCE_REDUCTANT) / 2, this.terminal.store[RESOURCE_REDUCTANT], this.terminal.store[RESOURCE_ENERGY]), 'W17N16');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_REDUCTANT);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_REDUCTANT) > this.amountInRoom(RESOURCE_REDUCTANT, 'W15N18') * 2 &&
            this.room.name != 'W15N18' &&
            this.terminal.store[RESOURCE_REDUCTANT]) {
            let result = this.terminal.send(RESOURCE_REDUCTANT, Math.min(this.amountInRoom(RESOURCE_REDUCTANT) / 2, this.terminal.store[RESOURCE_REDUCTANT], this.terminal.store[RESOURCE_ENERGY]), 'W15N18');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_REDUCTANT);
            }
            return result == OK;
        }
        if (this.amountInRoom(RESOURCE_REDUCTANT) > this.amountInRoom(RESOURCE_REDUCTANT, 'W18N16') * 2 &&
            this.room.name != 'W18N16' &&
            this.terminal.store[RESOURCE_REDUCTANT]) {
            let result = this.terminal.send(RESOURCE_REDUCTANT, Math.min(this.amountInRoom(RESOURCE_REDUCTANT) / 2, this.terminal.store[RESOURCE_REDUCTANT], this.terminal.store[RESOURCE_ENERGY]), 'W18N16');
            if (result != OK) {
                console.log('Error in transfer.  ' + result + RESOURCE_REDUCTANT);
            }
            return result == OK;
        }
        if (this.sendResourceToRoom(RESOURCE_REDUCTANT, ['W18N16', 'W17N16']))
            return true;
        if (this.balanceResourceToRCL8Rooms([RESOURCE_POWER])) ;
        if (this.room.name != 'W17N16')
            for (let resource of [RESOURCE_SPIRIT]) {
                if (this.terminal.store[resource] > 0) {
                    let result = this.terminal.send(resource, Math.min(this.terminal.store[resource], this.terminal.store[RESOURCE_ENERGY]), 'W17N16');
                    if (result != OK) {
                        console.log(`Error ${result} in ${resource} transfer.`);
                    }
                    return result == OK;
                }
            }
        return false;
    }
    sendAllToRooms(resource, rooms) {
        if (!this.room.terminal.store[resource])
            return false;
        let result = _.min(rooms.map(rm => Game.rooms[rm]).filter(rm => rm.terminal && rm.storage && rm != this.room), rm => (rm.storage.store[resource] || 0) + (rm.terminal.store[resource] || 0));
        let neediestRoom = result === Infinity ? null : result;
        if (neediestRoom != null) {
            let amount = Math.min(this.terminal.store[resource], this.terminal.store[RESOURCE_ENERGY]);
            if (rooms.length > 1)
                amount = Math.min(amount, Math.ceil((Memory.masterPlan.resources[resource] || 0) / (rooms.length + 1)));
            if (rooms.includes(this.room.name)) {
                if (this.amountInRoom(resource) / 2 < this.amountInRoom(resource, neediestRoom.name))
                    return false;
                amount = Math.min((this.amountInRoom(resource) - this.amountInRoom(resource, neediestRoom.name)) / 2, this.terminal.store[resource], this.terminal.store[RESOURCE_ENERGY]);
            }
            if (amount <= 0)
                return false;
            let result = this.terminal.send(resource, amount, neediestRoom.name);
            if (result != OK) {
                console.log(`sendAllToRooms: Error ${result} in ${resource} transfer from ${this.room.name}.`);
            }
            return result == OK;
        }
        return false;
    }
    sendSomeToRooms(resource, rooms) {
        if (!this.room.terminal.store[resource])
            return false;
        for (let room of rooms) {
            if (this.amountInRoom(resource) > this.amountInRoom(resource, room) * 2 &&
                this.room.name != room &&
                this.terminal.store[resource]) {
                let result = this.terminal.send(resource, Math.min(this.amountInRoom(resource) / 2, this.terminal.store[resource], this.terminal.store[RESOURCE_ENERGY]), room);
                console.log(`Sending some ${resource} from ${this.room.name} to ${room}.`);
                if (result != OK) {
                    console.log('Error in transfer.  ' + result + resource);
                }
                return result == OK;
            }
        }
        return false;
    }
    balanceResourceToRCL8Rooms(resources) {
        let possibleRooms = _.filter(Game.rooms, rm => rm.controller && rm.controller.my && rm.controller.level == 8 && rm.terminal && rm != this.room);
        for (let resource of resources) {
            let thisRoomAmount = (this.terminal.store[resource] || 0) + (this.room.storage.store[resource] || 0);
            if (thisRoomAmount === 0)
                continue;
            for (let targetRoom of possibleRooms) {
                let targetRoomAmount = (targetRoom.terminal.store[resource] || 0) + (targetRoom.storage.store[resource] || 0);
                if (thisRoomAmount > targetRoomAmount * 2) {
                    let amount = Math.min(thisRoomAmount / 2, this.terminal.store[resource], this.terminal.store[RESOURCE_ENERGY]);
                    if (amount == 0)
                        continue;
                    let result = this.terminal.send(resource, amount, targetRoom.name);
                    if (result != OK) {
                        console.log(`balanceResourceToRCL8Rooms: Error ${result} in ${resource} transfer from ${this.room.name}.`);
                    }
                    return result == OK;
                }
            }
        }
        return false;
    }
    getBestSell(resource, energyPrice) {
        return _.first(_.sortBy(_.map(this.dataCache[ORDER_SELL][resource].filter(ord => ord.remainingAmount > 0), order => ({
            orderId: order.id,
            remainingAmount: order.remainingAmount,
            adjCost: order.price +
                (energyPrice * Game.market.calcTransactionCost(1000, this.room.name, order.roomName)) /
                    1000,
            origPrice: order.price,
        })), o => o.adjCost));
    }
    getBestBuy(resource, energyPrice) {
        return _.first(_.sortBy(_.map(this.dataCache[ORDER_BUY][resource]
            .filter(ord => !tradeBlacklist.includes(ord.roomName))
            .filter(ord => ord.remainingAmount > 0 && ord.amount > 0), order => ({
            orderId: order.id,
            remainingAmount: order.remainingAmount,
            adjCost: order.price -
                (energyPrice * Game.market.calcTransactionCost(1000, this.room.name, order.roomName)) /
                    1000,
            origPrice: order.price,
        })), o => -o.adjCost));
    }
    updateBuyAvg(energyPrice) {
        if (Game.time % 10 == 0) {
            if (!this.room.memory.marketData.buyAvg)
                this.room.memory.marketData.buyAvg = {};
            let resourceToTrackBuy = [
                RESOURCE_METAL,
                RESOURCE_BIOMASS,
                RESOURCE_SILICON,
                RESOURCE_MIST,
                RESOURCE_ZYNTHIUM_KEANITE,
                RESOURCE_UTRIUM_LEMERGITE,
                RESOURCE_POWER,
                ..._.keys(COMMODITIES),
            ];
            for (let resource of resourceToTrackBuy) {
                let bestBuy = this.getBestBuy(resource, energyPrice);
                if (bestBuy) {
                    if (!this.room.memory.marketData.buyAvg[resource])
                        this.room.memory.marketData.buyAvg[resource] = bestBuy.adjCost;
                    else
                        this.room.memory.marketData.buyAvg[resource] =
                            this.room.memory.marketData.buyAvg[resource] * 0.98 + bestBuy.adjCost * 0.02;
                }
                else {
                    this.room.memory.marketData.buyAvg[resource] = this.room.memory.marketData.buyAvg[resource] * 0.995;
                    if (!this.room.memory.marketData.buyAvg[resource])
                        this.room.memory.marketData.buyAvg[resource] = 0;
                }
            }
            let marketData = loadLocalMarketMemory();
            marketData[this.room.name] = this.room.memory.marketData;
            storeLocalMarketMemory(marketData);
        }
    }
    updateSellAvg(energyPrice) {
        if (Game.time % 10 == 0) {
            if (!this.room.memory.marketData.sellAvg)
                this.room.memory.marketData.sellAvg = {};
            let resourceToTrackSell = [
                RESOURCE_ZYNTHIUM_KEANITE,
                RESOURCE_UTRIUM_LEMERGITE,
                RESOURCE_POWER,
                RESOURCE_METAL,
                RESOURCE_BIOMASS,
                RESOURCE_SILICON,
                RESOURCE_MIST,
                ..._.keys(COMMODITIES),
            ];
            for (let resource of resourceToTrackSell) {
                let bestSell = this.getBestSell(resource, energyPrice);
                if (bestSell) {
                    let daysOutside3Sigma = _.filter(Game.market.getHistory(resource), mh => bestSell.origPrice > mh.avgPrice + 3 * mh.stddevPrice).length;
                    if (daysOutside3Sigma >= 12) {
                        continue;
                    }
                    if (!this.room.memory.marketData.sellAvg[resource])
                        this.room.memory.marketData.sellAvg[resource] = bestSell.adjCost;
                    else
                        this.room.memory.marketData.sellAvg[resource] =
                            this.room.memory.marketData.sellAvg[resource] * 0.995 + bestSell.adjCost * 0.005;
                }
                else {
                    this.room.memory.marketData.sellAvg[resource] =
                        this.room.memory.marketData.sellAvg[resource] * 1.005;
                    if (!this.room.memory.marketData.sellAvg[resource])
                        this.room.memory.marketData.sellAvg[resource] = 99999999;
                }
            }
            this.room.memory.marketData.aquire = {};
            for (let resource of [..._.keys(COMMODITIES)]) {
                if (resource == RESOURCE_ENERGY)
                    continue;
                this.room.memory.marketData.aquire[resource] = null;
            }
            this.room.memory.marketData.aquire[RESOURCE_ENERGY] = Math.min(this.room.memory.marketData[RESOURCE_ENERGY], (this.room.memory.marketData.sellAvg[RESOURCE_BATTERY] *
                COMMODITIES[RESOURCE_ENERGY].components[RESOURCE_BATTERY]) /
                COMMODITIES[RESOURCE_ENERGY].amount);
            for (let resource of [
                RESOURCE_HYDROGEN,
                RESOURCE_OXYGEN,
                RESOURCE_UTRIUM,
                RESOURCE_KEANIUM,
                RESOURCE_LEMERGIUM,
                RESOURCE_ZYNTHIUM,
                RESOURCE_CATALYST,
                RESOURCE_UTRIUM_BAR,
                RESOURCE_LEMERGIUM_BAR,
                RESOURCE_ZYNTHIUM_BAR,
                RESOURCE_KEANIUM_BAR,
                RESOURCE_OXIDANT,
                RESOURCE_REDUCTANT,
                RESOURCE_PURIFIER,
                RESOURCE_BATTERY,
            ]) {
                let buildCost = 0;
                for (let comp in COMMODITIES[resource].components) {
                    let amount = COMMODITIES[resource].components[comp];
                    if (comp == RESOURCE_ENERGY) {
                        buildCost += this.room.memory.marketData.aquire[RESOURCE_ENERGY] * amount;
                    }
                    else {
                        buildCost +=
                            this.room.memory.marketData.sellAvg[comp] * amount;
                    }
                }
                this.room.memory.marketData.aquire[resource] = Math.min(this.room.memory.marketData.sellAvg[resource], buildCost / COMMODITIES[resource].amount);
            }
            for (let resource of [RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE, RESOURCE_HYDROXIDE]) {
                let buildCost = 0;
                switch (resource) {
                    case RESOURCE_ZYNTHIUM_KEANITE:
                        buildCost =
                            this.room.memory.marketData.aquire[RESOURCE_ZYNTHIUM] +
                                this.room.memory.marketData.aquire[RESOURCE_KEANIUM];
                        break;
                    case RESOURCE_UTRIUM_LEMERGITE:
                        buildCost =
                            this.room.memory.marketData.aquire[RESOURCE_UTRIUM] +
                                this.room.memory.marketData.aquire[RESOURCE_LEMERGIUM];
                        break;
                    case RESOURCE_HYDROXIDE:
                        buildCost =
                            this.room.memory.marketData.aquire[RESOURCE_OXYGEN] +
                                this.room.memory.marketData.aquire[RESOURCE_HYDROGEN];
                        break;
                }
                this.room.memory.marketData.aquire[resource] = Math.min(this.room.memory.marketData.sellAvg[resource], buildCost);
            }
            let gReactionCost = this.room.memory.marketData.aquire[RESOURCE_ZYNTHIUM_KEANITE] +
                this.room.memory.marketData.aquire[RESOURCE_UTRIUM_LEMERGITE];
            for (let resource of [RESOURCE_GHODIUM, RESOURCE_GHODIUM_MELT]) {
                let buildCost = 0;
                for (let comp in COMMODITIES[resource].components) {
                    let amount = COMMODITIES[resource].components[comp];
                    if (comp == RESOURCE_ENERGY) {
                        buildCost += this.room.memory.marketData.aquire[RESOURCE_ENERGY] * amount;
                    }
                    else if (comp == RESOURCE_GHODIUM) {
                        buildCost += gReactionCost * amount;
                    }
                    else {
                        buildCost +=
                            this.room.memory.marketData.sellAvg[comp] * amount;
                    }
                }
                this.room.memory.marketData.aquire[resource] = Math.min(this.room.memory.marketData.sellAvg[resource], buildCost / COMMODITIES[resource].amount);
                if (resource == RESOURCE_GHODIUM)
                    this.room.memory.marketData.aquire[resource] = Math.min(this.room.memory.marketData.aquire[resource], gReactionCost);
            }
            for (let resource of [RESOURCE_METAL, RESOURCE_BIOMASS, RESOURCE_SILICON, RESOURCE_MIST]) {
                let priceToUse = this.room.memory.marketData.sellAvg[resource];
                if (priceToUse === undefined || priceToUse === null || priceToUse >= 99999999) {
                    this.room.memory.marketData.buyAvg
                        ? (priceToUse = this.room.memory.marketData.buyAvg[resource] * 1.5)
                        : 99999999;
                }
                this.room.memory.marketData.aquire[resource] = priceToUse;
            }
            let didWork = true;
            while (didWork) {
                didWork = false;
                for (let resource of [
                    ..._.keys(COMMODITIES),
                ]) {
                    if (resource == RESOURCE_ENERGY)
                        continue;
                    if (this.room.memory.marketData.aquire[resource])
                        continue;
                    let buildCost = 0;
                    for (let comp in COMMODITIES[resource].components) {
                        let amount = COMMODITIES[resource].components[comp];
                        buildCost +=
                            this.room.memory.marketData.aquire[comp] * amount;
                    }
                    if (buildCost) {
                        this.room.memory.marketData.aquire[resource] = Math.min(this.room.memory.marketData.sellAvg[resource] || 99999999, buildCost / COMMODITIES[resource].amount);
                        if (this.room.memory.marketData.aquire[resource])
                            didWork = true;
                    }
                }
            }
            let marketData = loadLocalMarketMemory();
            marketData[this.room.name] = this.room.memory.marketData;
            storeLocalMarketMemory(marketData);
        }
    }
    useTerminal(bestEnergySellOrder) {
        if (this.room.name == 'W21N8') {
            let purchaseTarget = [
                { valuePrice: 1.8, targetAmount: 20000, orderSize: 2000, resource: RESOURCE_HYDROGEN },
                { valuePrice: 10, targetAmount: 20000, orderSize: 2000, resource: RESOURCE_REDUCTANT },
                { valuePrice: 0.7, targetAmount: 10000, orderSize: 2000, resource: RESOURCE_ZYNTHIUM },
                { valuePrice: 0.8, targetAmount: 10000, orderSize: 2000, resource: RESOURCE_KEANIUM },
            ];
            this.extendBuyOrders(purchaseTarget);
        }
        return;
    }
    buyAt(resource, price, energyPrice) {
        let amountOnHand = (this.room.terminal.store[resource] || 0) + (this.room.storage.store[resource] || 0);
        let targetAmount = 10000;
        let epislon = Math.ceil(targetAmount / 10);
        if (amountOnHand < targetAmount) {
            let bestSell = this.getBestSell(resource, energyPrice);
            if (!bestSell)
                return false;
            let amountToBuy = targetAmount - amountOnHand;
            amountToBuy += epislon;
            amountToBuy = Math.min(amountToBuy, Math.floor(this.terminal.store[RESOURCE_ENERGY] / 2));
            let rate = 1;
            let avg = this.room.memory.marketData.sellAvg[resource];
            if (bestSell.adjCost > price) {
                return false;
            }
            console.log('buyAt ' +
                resource +
                ' bestSell: ' +
                JSON.stringify(bestSell) +
                ' qty: ' +
                amountToBuy +
                ' avg*rate: ' +
                avg * rate);
            let result = Game.market.deal(bestSell.orderId, amountToBuy, this.room.name);
            if (result != 0)
                console.log(result);
            else
                return true;
        }
        return false;
    }
    sellAt(resource, price, energyPrice) {
        if (!this.terminal.store[resource])
            return false;
        let bestSell = this.getBestBuy(resource, energyPrice);
        if (bestSell && bestSell.adjCost > price) {
            let result = Game.market.deal(bestSell.orderId, Math.min(this.terminal.store[resource], bestSell.remainingAmount), this.room.name);
            if (result != OK)
                console.log('Error ' +
                    result +
                    ' while sellAt the order. ' +
                    JSON.stringify({
                        orderId: bestSell.orderId,
                        amount: this.terminal.store[resource],
                        roomName: this.room.name,
                        order: Game.market.getOrderById(bestSell.orderId),
                    }));
            return true;
        }
        return false;
    }
    extendSellOrders(sellTarget) {
        for (let thisTarget of sellTarget) {
            let resource = thisTarget.resource;
            let sellOrder = _.head(_.filter(_.values(Game.market.orders), ord => ord.resourceType == resource && ord.roomName == this.room.name && ord.type == ORDER_SELL));
            if (!sellOrder)
                continue;
            let totalBetweenStorageAndTerminal = (this.room.terminal.store[resource] || 0) + (this.room.storage.store[resource] || 0);
            let targetOrderSize = Math.min(totalBetweenStorageAndTerminal - thisTarget.sellPast, thisTarget.orderSize);
            let amountToAdjust = Math.min(targetOrderSize, totalBetweenStorageAndTerminal) - sellOrder.remainingAmount;
            if (amountToAdjust > 0) {
                let result = Game.market.extendOrder(sellOrder.id, amountToAdjust);
                if (result != OK) {
                    console.log('doTrading extendOrder failed in ' +
                        this.room.name +
                        ' for ' +
                        resource +
                        '.  Error code' +
                        result +
                        '.');
                }
            }
        }
    }
    extendBuyOrders(purchaseTarget) {
        for (let thisTarget of purchaseTarget) {
            let targetOrderPrice = thisTarget.valuePrice;
            let result = _.min(this.dataCache[ORDER_BUY][thisTarget.resource], ord => -ord.price);
            let highestOrder = result === Infinity ? null : result;
            if (highestOrder)
                targetOrderPrice = Math.min(thisTarget.valuePrice, highestOrder.price);
            let totalBetweenStorageAndTerminal = (this.room.terminal.store[thisTarget.resource] || 0) +
                (this.room.storage.store[thisTarget.resource] || 0);
            let buyOrder = _.head(_.filter(_.values(Game.market.orders), ord => ord.resourceType == thisTarget.resource &&
                ord.roomName == this.room.name &&
                ord.type == ORDER_BUY));
            if (!buyOrder) {
                let amountToBuy = Math.min(thisTarget.orderSize, thisTarget.targetAmount - totalBetweenStorageAndTerminal);
                if (amountToBuy > 0) {
                    console.log('Creating order: rsc:' +
                        thisTarget.resource +
                        ' qty:' +
                        amountToBuy +
                        ' price:' +
                        targetOrderPrice +
                        JSON.stringify([totalBetweenStorageAndTerminal, thisTarget]));
                    let result = Game.market.createOrder({
                        roomName: this.room.name,
                        type: ORDER_BUY,
                        resourceType: thisTarget.resource,
                        price: targetOrderPrice,
                        totalAmount: amountToBuy,
                    });
                    if (result != OK)
                        console.log('Error ' +
                            result +
                            ' while creating the order.' +
                            JSON.stringify({
                                ORDER_BUY,
                                resource: thisTarget.resource,
                                targetOrderPrice,
                                amountToBuy,
                                roomName: this.room.name,
                            }));
                }
                continue;
            }
            let amountToAdjust = thisTarget.targetAmount - totalBetweenStorageAndTerminal - buyOrder.remainingAmount;
            amountToAdjust = Math.min(amountToAdjust, thisTarget.orderSize - buyOrder.remainingAmount);
            if (amountToAdjust < thisTarget.orderSize * 0.05)
                continue;
            if (amountToAdjust > 0) {
                console.log('Extending order.  ' +
                    JSON.stringify({
                        amountToAdjust: amountToAdjust,
                        totalBetweenStorageAndTerminal: totalBetweenStorageAndTerminal,
                        buyOrder: buyOrder,
                    }));
                let result = Game.market.extendOrder(buyOrder.id, amountToAdjust);
                if (result != OK) {
                    console.log('doTrading extendOrder failed in ' +
                        this.room.name +
                        ' for ' +
                        thisTarget.resource +
                        '.  Error code' +
                        result +
                        '.');
                }
            }
        }
    }
    tryBuyingStuff(resourcesToDirectBuy, energyPrice, rateOverride) {
        for (let resource of resourcesToDirectBuy) {
            let totalBetweenStorageAndTerminal = (this.room.terminal.store[resource] || 0) + (this.room.storage.store[resource] || 0);
            let amountOnHand = (this.room.terminal.store[resource] || 0) + (this.room.storage.store[resource] || 0);
            let targetAmount = 10000;
            let epislon = Math.ceil(targetAmount / 10);
            if (amountOnHand < targetAmount) {
                let bestSell = this.getBestSell(resource, energyPrice);
                if (!bestSell)
                    continue;
                let amountToBuy = targetAmount - amountOnHand;
                amountToBuy += epislon;
                amountToBuy = Math.min(amountToBuy, Math.floor(this.terminal.store[RESOURCE_ENERGY] / 2));
                let rate = 1;
                if (totalBetweenStorageAndTerminal < 20000)
                    rate = 1.1;
                if (totalBetweenStorageAndTerminal < 10000)
                    rate = 1.3;
                if (totalBetweenStorageAndTerminal < 5000)
                    rate = 1.5;
                if ((COMMODITIES[resource] &&
                    COMMODITIES[resource].level > 0) ||
                    resource == RESOURCE_METAL ||
                    resource == RESOURCE_SILICON ||
                    resource == RESOURCE_BIOMASS ||
                    resource == RESOURCE_MIST) {
                    rate = 1;
                    if (totalBetweenStorageAndTerminal < 1000)
                        rate = 1.05;
                }
                if (resource == RESOURCE_ZYNTHIUM || resource == RESOURCE_ZYNTHIUM_KEANITE)
                    rate = 4;
                if (rateOverride)
                    rate = rateOverride;
                let avg = this.room.memory.marketData.sellAvg[resource];
                if (avg * rate < bestSell.adjCost) {
                    console.log('not buying : ' +
                        resource +
                        ' ' +
                        JSON.stringify(bestSell) +
                        ' avg*rate:' +
                        avg * rate +
                        ' amount:' +
                        amountToBuy +
                        '  adj:' +
                        bestSell.adjCost);
                    continue;
                }
                console.log('buying ' +
                    resource +
                    ' bestSell: ' +
                    JSON.stringify(bestSell) +
                    ' qty: ' +
                    amountToBuy +
                    ' avg*rate: ' +
                    avg * rate);
                let result = Game.market.deal(bestSell.orderId, amountToBuy, this.room.name);
                if (result != 0)
                    console.log(result);
                else
                    return;
            }
        }
    }
    trySellingOffStuff(resources, energyPrice) {
        let importedResourceCosts = {};
        if (this.room.name == 'W21N9') {
            importedResourceCosts[RESOURCE_UTRIUM] = 5;
            importedResourceCosts[RESOURCE_ZYNTHIUM_BAR] = 30;
            importedResourceCosts[RESOURCE_PURIFIER] = 140;
            importedResourceCosts[RESOURCE_OXIDANT] = 65;
            importedResourceCosts[RESOURCE_REDUCTANT] = 120;
            importedResourceCosts[RESOURCE_KEANIUM_BAR] = 20;
            importedResourceCosts[RESOURCE_UTRIUM_BAR] = 40;
        }
        else {
            importedResourceCosts[RESOURCE_ZYNTHIUM_BAR] = 20;
            importedResourceCosts[RESOURCE_COMPOSITE] = 30;
        }
        for (let resource of resources) {
            let amountOnHand = (this.room.terminal.store[resource] || 0) + (this.room.storage.store[resource] || 0);
            let amount = this.room.terminal.store[resource];
            if (resource !== RESOURCE_LEMERGIUM_BAR) {
                amount -=
                    _.sum(_.filter(Game.market.orders, ord => ord.resourceType == resource && ord.roomName == this.room.name), ord => ord.remainingAmount) / 2;
            }
            if (amount < 1)
                continue;
            let bestBuy = this.getBestBuy(resource, energyPrice);
            if (!bestBuy)
                continue;
            let multiplier = 0.95;
            if (amountOnHand > 15000)
                multiplier = 0.9;
            if (importedResourceCosts[resource] && importedResourceCosts[resource] > bestBuy.adjCost)
                continue;
            let avg = this.room.memory.marketData.buyAvg[resource];
            if (avg * multiplier > bestBuy.adjCost) {
                continue;
            }
            if (bestBuy.adjCost < 0) {
                continue;
            }
            if (!importedResourceCosts[resource]) {
                let daysOutside3Sigma = _.filter(Game.market.getHistory(resource), mh => bestBuy.origPrice < mh.avgPrice - 3 * mh.stddevPrice).length;
                if (daysOutside3Sigma >= 6) {
                    console.log('not selling due to sigma : ' +
                        resource +
                        ' ' +
                        JSON.stringify(bestBuy) +
                        ' avg:' +
                        avg +
                        ' amount:' +
                        amount +
                        '  adj:' +
                        bestBuy.adjCost);
                    continue;
                }
            }
            amount = Math.min(amount, bestBuy.remainingAmount);
            amount = Math.min(amount, this.room.terminal.store[RESOURCE_ENERGY]);
            console.log('selling : ' +
                resource +
                ' ' +
                JSON.stringify(bestBuy) +
                ' avg:' +
                avg +
                ' amount:' +
                amount +
                '  adj:' +
                bestBuy.adjCost +
                ' oh: ' +
                amountOnHand);
            let result = Game.market.deal(bestBuy.orderId, amount, this.room.name);
            if (result != 0) {
                console.log(result);
            }
            else {
                return true;
            }
        }
        return false;
    }
    buildDataCache() {
        const result = { [ORDER_SELL]: {}, [ORDER_BUY]: {} };
        for (let resource of [...RESOURCES_ALL, ...INTERSHARD_RESOURCES]) {
            result[ORDER_SELL][resource] = [];
            result[ORDER_BUY][resource] = [];
        }
        for (let ord of Game.market.getAllOrders()) {
            if (tradeBlacklist.includes(ord.roomName))
                continue;
            result[ord.type][ord.resourceType].push(ord);
        }
        this.dataCache = result;
    }
    doTrading() {
        this.buildDataCache();
        let bestSell = _.first(_.sortBy(_.map(this.dataCache[ORDER_SELL][RESOURCE_ENERGY], order => ({
            orderId: order.id,
            remainingAmount: order.remainingAmount,
            adjCost: order.price /
                (1 - Game.market.calcTransactionCost(1000, this.room.name, order.roomName) / 1000),
            origPrice: order.price,
        })), function (o) {
            return o.adjCost;
        }));
        let bestOrder = _.head(_.sortBy(_.map(this.dataCache[ORDER_BUY][RESOURCE_ENERGY], order => ({
            orderId: order.id,
            remainingAmount: order.remainingAmount,
            adjPrice: order.price -
                1.4 * (Game.market.calcTransactionCost(1000, this.room.name, order.roomName) / 1000),
            origPrice: order.price,
        })), function (o) {
            return -o.adjPrice;
        }));
        if (bestSell && bestOrder && Game.time % 10 == 0) {
            let avg = (bestSell.adjCost + bestOrder.adjPrice) / 2;
            if (!this.room.memory.marketData)
                this.room.memory.marketData = {};
            if (!this.room.memory.marketData[RESOURCE_ENERGY]) {
                this.room.memory.marketData[RESOURCE_ENERGY] = avg;
            }
            else {
                this.room.memory.marketData[RESOURCE_ENERGY] =
                    this.room.memory.marketData[RESOURCE_ENERGY] * 0.995 + avg * 0.005;
            }
        }
        let energyPrice = this.room.memory.marketData[RESOURCE_ENERGY];
        this.updateSellAvg(energyPrice);
        this.updateBuyAvg(energyPrice);
    }
}

StructureSpawn.prototype.advancedSpawn = function (spawnRequest) {
    return this.spawnCreep(spawnRequest.body, `${spawnRequest.role} ${spawnRequest.cost} ${this.room.name} T${spawnRequest.tier} ${newID()}`, spawnRequest.extraOpts);
};
Room.prototype.constructSpawnRequests = function (opts) {
    if (!opts)
        return;
    if (opts.minCreeps) {
        this.spawnRequestIndividually(opts);
        return;
    }
    this.spawnRequestByGroup(opts);
};
Room.prototype.decideMaxCostPerCreep = function (maxCostPerCreep) {
    var _a;
    if (!maxCostPerCreep)
        maxCostPerCreep = this.energyCapacityAvailable;
    if (this.myCreeps.source1Harvester.length + (((_a = this.myCreeps.source2Harvester) === null || _a === void 0 ? void 0 : _a.length) || 0) === 0 ||
        this.myCreeps.hauler.length === 0)
        return Math.min(maxCostPerCreep, this.energyAvailable);
    return Math.min(maxCostPerCreep, this.energyCapacityAvailable);
};
Room.prototype.createSpawnRequest = function (priority, role, body, tier, cost, memory) {
    this.spawnRequests[priority] = {
        role,
        body,
        tier,
        cost,
        extraOpts: {
            memory,
            energyStructures: this.spawningStructuresByPriority,
            dryRun: true,
        },
    };
};
Room.prototype.spawnRequestIndividually = function (opts) {
    const maxCostPerCreep = Math.max(this.decideMaxCostPerCreep(opts.maxCostPerCreep), opts.minCost);
    while (opts.minCreeps > (opts.spawningGroup ? opts.spawningGroup.length : this.creepsFromRoom[opts.role].length)) {
        const body = [];
        let tier = 0;
        let cost = 0;
        let partCost;
        if (opts.defaultParts.length) {
            tier += 1;
            for (const part of opts.defaultParts) {
                partCost = BODYPART_COST[part];
                cost += partCost;
                body.push(part);
            }
        }
        if (opts.extraParts.length) {
            let remainingAllowedParts = Math.min(50 - opts.defaultParts.length, opts.extraParts.length * opts.partsMultiplier);
            while (cost < maxCostPerCreep && remainingAllowedParts > 0) {
                for (const part of opts.extraParts) {
                    cost += BODYPART_COST[part];
                    body.push(part);
                    remainingAllowedParts -= 1;
                }
                tier += 1;
            }
            if (cost > maxCostPerCreep || remainingAllowedParts < 0) {
                let part;
                let partIndex = opts.extraParts.length - 1;
                while (partIndex >= 0) {
                    part = opts.extraParts[partIndex];
                    partCost = BODYPART_COST[part];
                    if (cost - partCost < opts.minCost)
                        break;
                    cost -= partCost;
                    body.pop();
                    remainingAllowedParts += 1;
                    partIndex -= 1;
                }
                tier -= 1;
            }
        }
        this.createSpawnRequest(opts.priority, opts.role, body, tier, cost, opts.memoryAdditions);
        opts.minCreeps -= 1;
    }
};
Room.prototype.spawnRequestByGroup = function (opts) {
    const maxCostPerCreep = Math.max(this.decideMaxCostPerCreep(opts.maxCostPerCreep), opts.minCost);
    let totalExtraParts = Math.floor(opts.extraParts.length * opts.partsMultiplier);
    const maxPartsPerCreep = Math.min(50 - opts.defaultParts.length, totalExtraParts);
    for (const creepName of opts.spawningGroup || this.creepsFromRoom[opts.role]) {
        totalExtraParts -= Game.creeps[creepName].body.length - opts.defaultParts.length;
    }
    if (totalExtraParts < maxPartsPerCreep * (opts.threshold || 0.25))
        return;
    if (!opts.maxCreeps)
        opts.maxCreeps = Infinity;
    opts.maxCreeps -= opts.spawningGroup ? opts.spawningGroup.length : this.creepsFromRoom[opts.role].length;
    while (totalExtraParts >= opts.extraParts.length && opts.maxCreeps > 0) {
        const body = [];
        let tier = 0;
        let cost = 0;
        let partCost;
        let remainingAllowedParts = maxPartsPerCreep;
        if (opts.defaultParts.length) {
            tier += 1;
            for (const part of opts.defaultParts) {
                partCost = BODYPART_COST[part];
                cost += partCost;
                body.push(part);
            }
        }
        while (cost < maxCostPerCreep && remainingAllowedParts > 0) {
            for (const part of opts.extraParts) {
                cost += BODYPART_COST[part];
                body.push(part);
                remainingAllowedParts -= 1;
                totalExtraParts -= 1;
            }
            tier += 1;
        }
        if (cost > maxCostPerCreep || remainingAllowedParts < 0) {
            let part;
            let partIndex = opts.extraParts.length - 1;
            while (partIndex >= 0) {
                part = opts.extraParts[partIndex];
                partCost = BODYPART_COST[part];
                if (cost - partCost < opts.minCost)
                    break;
                cost -= partCost;
                body.pop();
                remainingAllowedParts += 1;
                totalExtraParts += 1;
                partIndex -= 1;
            }
            tier -= 1;
        }
        this.createSpawnRequest(opts.priority, opts.role, body, tier, cost, opts.memoryAdditions);
        opts.maxCreeps -= 1;
    }
};

function packCoord(coord) {
    return String.fromCharCode(((coord.x << 6) | coord.y) + 65);
}
function unpackCoord(char) {
    const xShiftedSixOrY = char.charCodeAt(0) - 65;
    return {
        x: (xShiftedSixOrY & 0b111111000000) >>> 6,
        y: xShiftedSixOrY & 0b000000111111,
    };
}
global.packedRoomNames = global.packedRoomNames || {};
global.unpackedRoomNames = global.unpackedRoomNames || {};
function packRoomName(roomName) {
    if (global.packedRoomNames[roomName] === undefined) {
        const coordinateRegex = /(E|W)(\d+)(N|S)(\d+)/g;
        const match = coordinateRegex.exec(roomName);
        const xDir = match[1];
        const x = Number(match[2]);
        const yDir = match[3];
        const y = Number(match[4]);
        let quadrant;
        if (xDir === 'W') {
            if (yDir === 'N') {
                quadrant = 0;
            }
            else {
                quadrant = 1;
            }
        }
        else if (yDir === 'N') {
            quadrant = 2;
        }
        else {
            quadrant = 3;
        }
        const num = ((quadrant << 12) | (x << 6) | y) + 65;
        const char = String.fromCharCode(num);
        global.packedRoomNames[roomName] = char;
        global.unpackedRoomNames[char] = roomName;
    }
    return global.packedRoomNames[roomName];
}
function unpackRoomName(char) {
    if (global.unpackedRoomNames[char] === undefined) {
        const num = char.charCodeAt(0) - 65;
        const { q, x, y } = {
            q: (num & 0b11000000111111) >>> 12,
            x: (num & 0b00111111000000) >>> 6,
            y: num & 0b00000000111111,
        };
        let roomName;
        switch (q) {
            case 0:
                roomName = `W${x}N${y}`;
                break;
            case 1:
                roomName = `W${x}S${y}`;
                break;
            case 2:
                roomName = `E${x}N${y}`;
                break;
            case 3:
                roomName = `E${x}S${y}`;
                break;
            default:
                roomName = 'ERROR';
        }
        global.packedRoomNames[roomName] = char;
        global.unpackedRoomNames[char] = roomName;
    }
    return global.unpackedRoomNames[char];
}
function packPos(pos) {
    return packCoord(pos) + packRoomName(pos.roomName);
}
function unpackPos(chars) {
    const { x, y } = unpackCoord(chars[0]);
    return new RoomPosition(x, y, unpackRoomName(chars[1]));
}
function packPosList(posList) {
    let str = '';
    for (let i = 0; i < posList.length; ++i) {
        str += packPos(posList[i]);
    }
    return str;
}
function unpackPosList(chars) {
    const posList = [];
    for (let i = 0; i < chars.length; i += 2) {
        posList.push(unpackPos(chars.substr(i, 2)));
    }
    return posList;
}

Room.prototype.spawnRequester = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    const spawnEnergyCapacity = this.energyCapacityAvailable;
    const mostOptimalSource = this.sourcesByEfficacy[0];
    const { storage } = this;
    const { terminal } = this;
    let partsMultiplier;
    this.constructSpawnRequests((() => {
        const sourceIndex = 0;
        const role = 'source1Harvester';
        const priority = (mostOptimalSource.index === sourceIndex ? 0 : 1) + this.creepsFromRoom[role].length;
        if (spawnEnergyCapacity >= 800) {
            return {
                role,
                defaultParts: [CARRY],
                extraParts: [WORK, MOVE, WORK],
                partsMultiplier: 3,
                minCreeps: 1,
                minCost: 200,
                priority,
                memoryAdditions: {
                    SI: sourceIndex,
                    R: true,
                },
            };
        }
        if (spawnEnergyCapacity >= 750) {
            return {
                role,
                defaultParts: [],
                extraParts: [WORK, MOVE, WORK],
                partsMultiplier: 3,
                minCreeps: 1,
                minCost: 200,
                priority,
                memoryAdditions: {
                    SI: sourceIndex,
                    R: true,
                },
            };
        }
        if (spawnEnergyCapacity >= 600) {
            return {
                role,
                defaultParts: [MOVE, CARRY],
                extraParts: [WORK],
                partsMultiplier: 6,
                minCreeps: 1,
                minCost: 300,
                priority,
                memoryAdditions: {
                    SI: sourceIndex,
                    R: true,
                },
            };
        }
        if (this.sourceContainers[sourceIndex]) {
            return {
                role,
                defaultParts: [MOVE],
                extraParts: [WORK],
                partsMultiplier: 6,
                minCreeps: 1,
                minCost: 150,
                priority,
                memoryAdditions: {
                    SI: sourceIndex,
                    R: true,
                },
            };
        }
        return {
            role,
            defaultParts: [MOVE, CARRY],
            extraParts: [WORK],
            partsMultiplier: 6,
            minCreeps: undefined,
            maxCreeps: Math.min(3, this.sourcePositions[sourceIndex].length),
            minCost: 200,
            priority,
            memoryAdditions: {
                SI: sourceIndex,
                R: true,
            },
        };
    })());
    if (this.sources.length > 1)
        this.constructSpawnRequests((() => {
            const sourceIndex = 1;
            const role = 'source2Harvester';
            const priority = (mostOptimalSource.index === sourceIndex ? 0 : 1) + this.creepsFromRoom[role].length;
            if (spawnEnergyCapacity >= 800) {
                return {
                    role,
                    defaultParts: [CARRY],
                    extraParts: [WORK, MOVE, WORK],
                    partsMultiplier: 3,
                    minCreeps: 1,
                    minCost: 200,
                    priority,
                    memoryAdditions: {
                        SI: sourceIndex,
                        R: true,
                    },
                };
            }
            if (spawnEnergyCapacity >= 750) {
                return {
                    role,
                    defaultParts: [],
                    extraParts: [WORK, MOVE, WORK],
                    partsMultiplier: 3,
                    minCreeps: 1,
                    minCost: 200,
                    priority,
                    memoryAdditions: {
                        SI: sourceIndex,
                        R: true,
                    },
                };
            }
            if (spawnEnergyCapacity >= 600) {
                return {
                    role,
                    defaultParts: [MOVE, CARRY],
                    extraParts: [WORK],
                    partsMultiplier: 6,
                    minCreeps: 1,
                    minCost: 300,
                    priority,
                    memoryAdditions: {
                        SI: sourceIndex,
                        R: true,
                    },
                };
            }
            if (this.sourceContainers[sourceIndex]) {
                return {
                    role,
                    defaultParts: [MOVE],
                    extraParts: [WORK],
                    partsMultiplier: 6,
                    minCreeps: 1,
                    minCost: 150,
                    priority,
                    memoryAdditions: {
                        SI: sourceIndex,
                        R: true,
                    },
                };
            }
            return {
                role,
                defaultParts: [MOVE, CARRY],
                extraParts: [WORK],
                partsMultiplier: 6,
                minCreeps: undefined,
                maxCreeps: Math.min(3, this.sourcePositions[sourceIndex].length),
                minCost: 200,
                priority,
                memoryAdditions: {
                    SI: sourceIndex,
                    R: true,
                },
            };
        })());
    this.constructSpawnRequests((() => {
        const priority = 0.5 + this.creepsFromRoom.hauler.length;
        let requiredCarryParts = 10;
        requiredCarryParts += 10;
        if (this.sourcePaths[0] && !this.sourceLinks[0])
            requiredCarryParts += findCarryPartsRequired(this.sourcePaths[0].length, 10);
        if (this.sourcePaths[1] && !this.sourceLinks[1])
            requiredCarryParts += findCarryPartsRequired(this.sourcePaths[1].length, 10);
        if (this.controllerContainer) {
            let income;
            if (storage && this.controller.level >= 4) {
                income = this.getPartsOfRoleAmount('controllerUpgrader', WORK);
            }
            else
                income = Math.min(this.getPartsOfRoleAmount('controllerUpgrader', WORK) * 0.75, this.sources.length * 0.75);
            requiredCarryParts += findCarryPartsRequired(this.upgradePathLength, income);
        }
        if (this.controller.level >= 4 && storage && storage.store.energy >= 1000) ;
        else if (this.controller.level >= 6 && terminal && terminal.store.energy >= 1000) ;
        const role = 'hauler';
        if (spawnEnergyCapacity >= 800) {
            return {
                role,
                defaultParts: [],
                extraParts: [CARRY, CARRY, MOVE],
                partsMultiplier: requiredCarryParts / 2,
                minCreeps: undefined,
                maxCreeps: Infinity,
                minCost: 150,
                maxCostPerCreep: this.memory.MHC,
                priority,
                memoryAdditions: {
                    R: true,
                },
            };
        }
        return {
            role,
            defaultParts: [],
            extraParts: [CARRY, MOVE],
            partsMultiplier: requiredCarryParts,
            minCreeps: undefined,
            maxCreeps: Infinity,
            minCost: 100,
            maxCostPerCreep: this.memory.MHC,
            priority,
            memoryAdditions: {},
        };
    })());
    this.constructSpawnRequests((() => {
        if (!this.structures.extractor.length)
            return false;
        if (this.controller.level < 6)
            return false;
        if (!storage)
            return false;
        if (storage.store.energy < 40000)
            return false;
        if (!terminal)
            return false;
        if (terminal.store.getFreeCapacity() <= 10000)
            return false;
        if (this.mineral.mineralAmount === 0)
            return false;
        let minCost = 900;
        if (spawnEnergyCapacity < minCost)
            return false;
        const role = 'mineralHarvester';
        return {
            role,
            defaultParts: [],
            extraParts: [WORK, WORK, MOVE, WORK, WORK, MOVE, WORK, MOVE, CARRY, CARRY, MOVE, WORK],
            partsMultiplier: 4,
            minCreeps: 1,
            minCost,
            priority: 10 + this.creepsFromRoom.mineralHarvester.length * 3,
            memoryAdditions: {
                R: true,
            },
        };
    })());
    this.constructSpawnRequests((() => {
        if (!storage || this.controller.level < 4)
            return false;
        if (!this.hubLink && (!terminal || this.controller.level < 6))
            return false;
        const role = 'hubHauler';
        return {
            role,
            defaultParts: [MOVE],
            extraParts: [CARRY],
            partsMultiplier: 8,
            minCreeps: 1,
            minCost: 300,
            priority: 7,
            memoryAdditions: {},
        };
    })());
    this.constructSpawnRequests((() => {
        const fastFillerPositions = this.get('fastFillerPositions');
        if (!fastFillerPositions.length)
            return false;
        let defaultParts = [CARRY, MOVE, CARRY];
        if (spawnEnergyCapacity >= 650)
            defaultParts = [CARRY, CARRY, MOVE, CARRY];
        else if (this.controller.level >= 7)
            defaultParts = [CARRY, CARRY, CARRY, MOVE, CARRY];
        const role = 'fastFiller';
        return {
            role,
            defaultParts,
            extraParts: [],
            partsMultiplier: 1,
            minCreeps: fastFillerPositions.length,
            minCost: 250,
            priority: 0.75,
            memoryAdditions: {},
        };
    })());
    const { enemyAttackers } = this;
    let attackStrength = 0;
    let healStrength = 0;
    for (const enemyCreep of this.enemyCreeps) {
        attackStrength += enemyCreep.attackStrength;
        healStrength += enemyCreep.healStrength;
    }
    this.constructSpawnRequests((() => {
        if (!enemyAttackers.length)
            return false;
        if (this.towerSuperiority)
            return false;
        let requiredStrength = (healStrength + (this.structures.tower.length ? 0 : attackStrength)) * 1.5;
        const role = 'meleeDefender';
        if (spawnEnergyCapacity >= 800) {
            const extraParts = [ATTACK, ATTACK, MOVE];
            const strength = ATTACK_POWER * 2;
            return {
                role,
                defaultParts: [],
                extraParts,
                partsMultiplier: Math.max(requiredStrength / strength / 2, 1),
                minCost: 210,
                priority: 6 + this.creepsFromRoom.meleeDefender.length,
                memoryAdditions: {
                    R: true,
                },
                threshold: 0.1,
            };
        }
        const extraParts = [ATTACK, MOVE];
        const strength = ATTACK_POWER;
        return {
            role,
            defaultParts: [],
            extraParts,
            partsMultiplier: Math.max(requiredStrength / strength, 1),
            minCost: 260,
            priority: 6 + this.creepsFromRoom.meleeDefender.length,
            memoryAdditions: {},
            threshold: 0,
        };
    })());
    const estimatedIncome = this.estimateIncome();
    this.constructSpawnRequests((() => {
        if (attackStrength > 0)
            return false;
        if (this.find(FIND_MY_CONSTRUCTION_SITES).length === 0)
            return false;
        let priority = 9;
        let partsMultiplier = 0;
        if (storage && this.controller.level < 4) {
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) >= this.communeManager.storedEnergyBuildThreshold)
                partsMultiplier += storage.store.getUsedCapacity(RESOURCE_ENERGY) / 8000;
        }
        else {
            partsMultiplier += estimatedIncome / 5;
            if (spawnEnergyCapacity >= 800)
                partsMultiplier *= 1.2;
        }
        const role = 'builder';
        if (storage || terminal) {
            return {
                role,
                defaultParts: [],
                extraParts: [CARRY, WORK, MOVE],
                partsMultiplier: partsMultiplier,
                minCreeps: undefined,
                maxCreeps: Infinity,
                minCost: 200,
                priority,
                memoryAdditions: {
                    R: true,
                },
            };
        }
        if (spawnEnergyCapacity >= 800) {
            return {
                role,
                defaultParts: [],
                extraParts: [CARRY, WORK, MOVE],
                partsMultiplier: partsMultiplier,
                maxCreeps: Infinity,
                minCost: 200,
                priority,
                memoryAdditions: {
                    R: true,
                },
            };
        }
        if (!this.fastFillerContainerLeft && !this.fastFillerContainerRight) {
            return {
                role,
                defaultParts: [],
                extraParts: [WORK, CARRY, CARRY, MOVE],
                partsMultiplier: partsMultiplier,
                maxCreeps: Infinity,
                minCost: 250,
                priority,
                memoryAdditions: {
                    R: true,
                },
            };
        }
        return {
            role,
            defaultParts: [],
            extraParts: [CARRY, MOVE, WORK, CARRY, MOVE],
            partsMultiplier: partsMultiplier,
            minCreeps: undefined,
            maxCreeps: Infinity,
            minCost: 300,
            priority,
            memoryAdditions: {
                R: true,
            },
        };
    })());
    this.constructSpawnRequests((() => {
        const priority = 8 + this.creepsFromRoom.maintainer.length;
        const repairTargets = [...this.structures.road, ...this.structures.container].filter(structure => structure.hitsMax * 0.2 >= structure.hits);
        const ramparts = this.structures.rampart.filter(rampart => rampart.hits < rampart.hitsMax);
        if (!ramparts.length && !repairTargets.length)
            return false;
        let partsMultiplier = 1;
        partsMultiplier += this.structures.road.length * roadUpkeepCost * 1.2;
        partsMultiplier += this.structures.container.length * containerUpkeepCost * 1.2;
        partsMultiplier += ramparts.length * rampartUpkeepCost * 1.2;
        partsMultiplier += attackStrength / (REPAIR_POWER / 3);
        if (storage && this.controller.level >= 4)
            partsMultiplier += storage.store.getUsedCapacity(RESOURCE_ENERGY) / 20000;
        const role = 'maintainer';
        if (spawnEnergyCapacity >= 800) {
            return {
                role,
                defaultParts: [],
                extraParts: [CARRY, MOVE, WORK],
                partsMultiplier,
                minCreeps: undefined,
                maxCreeps: Infinity,
                minCost: 200,
                priority,
                memoryAdditions: {
                    R: true,
                },
            };
        }
        return {
            role,
            defaultParts: [],
            extraParts: [MOVE, CARRY, MOVE, WORK],
            partsMultiplier,
            minCreeps: undefined,
            maxCreeps: Infinity,
            minCost: 250,
            priority,
            memoryAdditions: {},
        };
    })());
    this.constructSpawnRequests((() => {
        let partsMultiplier = 1;
        let maxCreeps = this.get('upgradePositions').length - 1;
        const priority = 9;
        if (enemyAttackers.length &&
            this.controller.ticksToDowngrade > controllerDowngradeUpgraderNeed &&
            !this.towerSuperiority)
            return false;
        if (storage && this.controller.level >= 4) {
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) >= this.communeManager.storedEnergyUpgradeThreshold)
                partsMultiplier = Math.pow(storage.store.getUsedCapacity(RESOURCE_ENERGY) / 10000, 2);
            else
                partsMultiplier = 0;
        }
        else {
            partsMultiplier += estimatedIncome * 0.75;
        }
        const controllerLink = this.controllerLink;
        if (controllerLink) {
            const hubLink = this.hubLink;
            const sourceLinks = this.sourceLinks;
            if (hubLink || sourceLinks.length) {
                let maxPartsMultiplier = 0;
                if (hubLink) {
                    const range = getRange(controllerLink.pos.x, hubLink.pos.x, controllerLink.pos.y, hubLink.pos.y);
                    maxPartsMultiplier += (controllerLink.store.getCapacity(RESOURCE_ENERGY) * 0.7) / range;
                }
                else
                    maxCreeps -= 1;
                for (const sourceLink of sourceLinks) {
                    if (!sourceLink)
                        continue;
                    const range = getRange(controllerLink.pos.x, sourceLink.pos.x, controllerLink.pos.y, sourceLink.pos.y);
                    maxPartsMultiplier += (controllerLink.store.getCapacity(RESOURCE_ENERGY) * 0.5) / range;
                }
                partsMultiplier = Math.min(partsMultiplier, maxPartsMultiplier);
            }
        }
        if (this.find(FIND_MY_CONSTRUCTION_SITES).length)
            partsMultiplier = 0;
        const threshold = 0.15;
        const role = 'controllerUpgrader';
        if (this.controllerContainer || controllerLink) {
            if (this.controller.level === 8) {
                if (this.controller.ticksToDowngrade < controllerDowngradeUpgraderNeed)
                    partsMultiplier = Math.max(partsMultiplier, 3);
                partsMultiplier = Math.min(Math.round(partsMultiplier / 3), 5);
                if (partsMultiplier === 0)
                    return false;
                return {
                    role,
                    defaultParts: [],
                    extraParts: [
                        WORK,
                        WORK,
                        MOVE,
                        CARRY,
                        WORK,
                        WORK,
                        MOVE,
                        WORK,
                        WORK,
                        WORK,
                        MOVE,
                        WORK,
                        WORK,
                        MOVE,
                        CARRY,
                        WORK,
                        MOVE,
                        WORK,
                        WORK,
                        MOVE,
                        WORK,
                        WORK,
                        MOVE,
                        CARRY,
                        WORK,
                        MOVE,
                    ],
                    partsMultiplier,
                    threshold,
                    minCreeps: 1,
                    minCost: 300,
                    priority,
                    memoryAdditions: {
                        R: true,
                    },
                };
            }
            if (spawnEnergyCapacity >= 800) {
                if (this.controller.ticksToDowngrade < controllerDowngradeUpgraderNeed)
                    partsMultiplier = Math.max(partsMultiplier, 6);
                partsMultiplier = Math.round(partsMultiplier / 6);
                if (partsMultiplier === 0)
                    return false;
                return {
                    role,
                    defaultParts: [CARRY],
                    extraParts: [WORK, MOVE, WORK, WORK, WORK],
                    partsMultiplier,
                    threshold,
                    minCreeps: undefined,
                    maxCreeps,
                    minCost: 750,
                    priority,
                    memoryAdditions: {
                        R: true,
                    },
                };
            }
            if (this.controller.ticksToDowngrade < controllerDowngradeUpgraderNeed)
                partsMultiplier = Math.max(partsMultiplier, 4);
            partsMultiplier = Math.round(partsMultiplier / 4);
            if (partsMultiplier === 0)
                return false;
            return {
                role,
                defaultParts: [CARRY],
                extraParts: [WORK, MOVE, WORK, WORK, WORK],
                partsMultiplier,
                threshold,
                minCreeps: undefined,
                maxCreeps,
                minCost: 200,
                priority,
                memoryAdditions: {
                    R: true,
                },
            };
        }
        if (this.controller.ticksToDowngrade < controllerDowngradeUpgraderNeed)
            partsMultiplier = Math.max(partsMultiplier, 1);
        if (this.controller.level < 2)
            partsMultiplier = Math.max(partsMultiplier, 1);
        if (spawnEnergyCapacity >= 800) {
            return {
                role,
                defaultParts: [],
                extraParts: [CARRY, MOVE, WORK],
                partsMultiplier,
                threshold,
                maxCreeps: Infinity,
                minCost: 200,
                priority,
                memoryAdditions: {
                    R: true,
                },
            };
        }
        return {
            role,
            defaultParts: [],
            extraParts: [MOVE, CARRY, MOVE, WORK],
            partsMultiplier,
            threshold,
            maxCreeps: Infinity,
            minCost: 250,
            priority,
            memoryAdditions: {},
        };
    })());
    const minRemotePriority = 10;
    for (const remoteInfo of this.remoteSourceIndexesByEfficacy) {
        const splitRemoteInfo = remoteInfo.split(' ');
        const remoteName = splitRemoteInfo[0];
        const sourceIndex = parseInt(splitRemoteInfo[1]);
        const remoteMemory = Memory.rooms[remoteName];
        const remoteNeeds = Memory.rooms[remoteName].needs;
        const remote = Game.rooms[remoteName];
        const priority = minRemotePriority + 1 + remoteMemory.SE[sourceIndex] / 100;
        const role = RemoteHarvesterRolesBySourceIndex[sourceIndex];
        if (remoteNeeds[RemoteNeeds[role]] <= 0)
            continue;
        const sourcePositionsAmount = remote
            ? remote.sourcePositions.length
            : unpackPosList(remoteMemory.SP[sourceIndex]).length;
        this.constructSpawnRequests((() => {
            if (spawnEnergyCapacity >= 950) {
                return {
                    role,
                    defaultParts: [CARRY],
                    extraParts: [WORK, MOVE],
                    partsMultiplier: remoteNeeds[RemoteNeeds[role]],
                    spawningGroup: this.creepsFromRoomWithRemote[remoteName][role],
                    threshold: 0.1,
                    minCreeps: 1,
                    maxCreeps: sourcePositionsAmount,
                    maxCostPerCreep: 50 + 150 * 6,
                    minCost: 200,
                    priority: priority,
                    memoryAdditions: {
                        R: true,
                        SI: sourceIndex,
                        RN: remoteName,
                    },
                };
            }
            return {
                role,
                defaultParts: [CARRY],
                extraParts: [WORK, WORK, MOVE],
                partsMultiplier: remoteNeeds[RemoteNeeds[role]],
                spawningGroup: this.creepsFromRoomWithRemote[remoteName][role],
                threshold: 0.1,
                minCreeps: undefined,
                maxCreeps: sourcePositionsAmount,
                maxCostPerCreep: 50 + 250 * 3,
                minCost: 300,
                priority: priority,
                memoryAdditions: {
                    R: true,
                    SI: sourceIndex,
                    RN: remoteName,
                },
            };
        })());
    }
    let remoteHaulerNeed = 0;
    const remoteNamesByEfficacy = this.remoteNamesBySourceEfficacy;
    for (let index = 0; index < remoteNamesByEfficacy.length; index += 1) {
        const remoteName = remoteNamesByEfficacy[index];
        const remoteNeeds = Memory.rooms[remoteName].needs;
        const totalRemoteNeed = Math.max(remoteNeeds[RemoteNeeds.remoteHauler0], 0) +
            Math.max(remoteNeeds[RemoteNeeds.remoteHauler1], 0) +
            Math.max(remoteNeeds[RemoteNeeds.remoteReserver], 0) +
            Math.max(remoteNeeds[RemoteNeeds.remoteCoreAttacker], 0) +
            Math.max(remoteNeeds[RemoteNeeds.remoteDismantler], 0) +
            Math.max(remoteNeeds[RemoteNeeds.minDamage], 0) +
            Math.max(remoteNeeds[RemoteNeeds.minHeal], 0);
        const remoteMemory = Memory.rooms[remoteName];
        if (!remoteMemory.needs[RemoteNeeds.enemyReserved] && !remoteMemory.abandoned) {
            const remote = Game.rooms[remoteName];
            const isReserved = remote && remote.controller.reservation && remote.controller.reservation.username === Memory.me;
            for (let index = 0; index < remoteMemory.SE.length; index += 1) {
                const income = Math.max((isReserved ? 10 : 5) -
                    Math.floor(Math.max(remoteMemory.needs[RemoteNeeds[remoteHarvesterRoles[index]]], 0) * minHarvestWorkRatio), 0);
                remoteHaulerNeed += findCarryPartsRequired(remoteMemory.SE[index], income);
            }
        }
        if (totalRemoteNeed <= 0)
            continue;
        this.constructSpawnRequests((() => {
            if (Math.max(remoteNeeds[RemoteNeeds.source1RemoteHarvester], 0) +
                Math.max(remoteNeeds[RemoteNeeds.source2RemoteHarvester], 0) >
                0)
                return false;
            let cost = 650;
            if (spawnEnergyCapacity < cost)
                return false;
            if (remoteNeeds[RemoteNeeds.remoteReserver] <= 0)
                return false;
            const role = 'remoteReserver';
            return {
                role,
                defaultParts: [],
                extraParts: [MOVE, CLAIM],
                partsMultiplier: 6,
                spawningGroup: this.creepsFromRoomWithRemote[remoteName].remoteReserver,
                minCreeps: 1,
                maxCreeps: Infinity,
                minCost: cost,
                priority: minRemotePriority + 1,
                memoryAdditions: {
                    RN: remoteName,
                },
            };
        })());
        this.constructSpawnRequests((() => {
            if (remoteNeeds[RemoteNeeds.minDamage] + remoteNeeds[RemoteNeeds.minHeal] <= 0)
                return false;
            const minCost = 400;
            const cost = 900;
            const extraParts = [RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE];
            const rangedAttackStrength = RANGED_ATTACK_POWER * 2;
            const healStrength = HEAL_POWER;
            if (spawnEnergyCapacity < minCost)
                return false;
            if (rangedAttackStrength * (spawnEnergyCapacity / cost) < remoteNeeds[RemoteNeeds.minDamage] ||
                healStrength * (spawnEnergyCapacity / cost) < remoteNeeds[RemoteNeeds.minHeal]) {
                Memory.rooms[remoteName].abandoned = 1500;
                return false;
            }
            const partsMultiplier = Math.max(remoteNeeds[RemoteNeeds.minDamage] / rangedAttackStrength +
                remoteNeeds[RemoteNeeds.minHeal] / healStrength, 1);
            const role = 'remoteDefender';
            return {
                role,
                defaultParts: [],
                extraParts,
                partsMultiplier,
                spawningGroup: this.creepsFromRoomWithRemote[remoteName].remoteDefender,
                minCreeps: 1,
                minCost,
                priority: minRemotePriority - 3,
                memoryAdditions: {},
            };
        })());
        this.constructSpawnRequests((() => {
            if (remoteNeeds[RemoteNeeds.remoteCoreAttacker] <= 0)
                return false;
            const cost = 130;
            const extraParts = [ATTACK, MOVE];
            const minCost = cost * extraParts.length;
            const role = 'remoteCoreAttacker';
            return {
                role,
                defaultParts: [],
                extraParts,
                partsMultiplier: 50 / extraParts.length,
                spawningGroup: this.creepsFromRoomWithRemote[remoteName].remoteCoreAttacker,
                minCreeps: 1,
                minCost,
                priority: minRemotePriority - 2,
                memoryAdditions: {
                    RN: remoteName,
                },
            };
        })());
        this.constructSpawnRequests((() => {
            if (remoteNeeds[RemoteNeeds.remoteDismantler] <= 0)
                return false;
            const cost = 150;
            const extraParts = [WORK, MOVE];
            const role = 'remoteDismantler';
            return {
                role,
                defaultParts: [],
                extraParts,
                partsMultiplier: 50 / extraParts.length,
                spawningGroup: this.creepsFromRoomWithRemote[remoteName].remoteDismantler,
                minCreeps: 1,
                minCost: cost * 2,
                priority: minRemotePriority - 1,
                memoryAdditions: {
                    RN: remoteName,
                },
            };
        })());
    }
    this.constructSpawnRequests((() => {
        if (remoteHaulerNeed === 0)
            return false;
        partsMultiplier = remoteHaulerNeed;
        const role = 'remoteHauler';
        return {
            role,
            defaultParts: [],
            extraParts: [CARRY, MOVE],
            threshold: 0.1,
            partsMultiplier,
            maxCreeps: Infinity,
            minCost: 100,
            maxCostPerCreep: this.memory.MHC,
            priority: minRemotePriority,
            memoryAdditions: {},
        };
    })());
    this.constructSpawnRequests((() => {
        const role = 'scout';
        return {
            role,
            defaultParts: [MOVE],
            extraParts: [],
            partsMultiplier: 1,
            minCreeps: this.controller.level === 8 ? 1 : 2,
            maxCreeps: Infinity,
            minCost: 100,
            priority: 6,
            memoryAdditions: {},
        };
    })());
    if (this.memory.claimRequest) {
        const claimRequestNeeds = Memory.claimRequests[this.memory.claimRequest].needs;
        this.constructSpawnRequests((() => {
            if (claimRequestNeeds[ClaimRequestNeeds.claimer] <= 0)
                return false;
            const role = 'claimer';
            return {
                role,
                defaultParts: [CLAIM, MOVE],
                extraParts: [MOVE, MOVE, MOVE, MOVE],
                partsMultiplier: 1,
                minCreeps: 1,
                minCost: 650,
                priority: 8.1,
                memoryAdditions: {},
            };
        })());
        this.constructSpawnRequests((() => {
            if (claimRequestNeeds[ClaimRequestNeeds.vanguard] <= 0)
                return false;
            const role = 'vanguard';
            return {
                role,
                defaultParts: [],
                extraParts: [CARRY, MOVE, WORK, MOVE, CARRY, MOVE],
                partsMultiplier: claimRequestNeeds[ClaimRequestNeeds.vanguard],
                minCreeps: undefined,
                maxCreeps: Infinity,
                minCost: 250,
                priority: 8.2 + this.creepsFromRoom.vanguard.length,
                memoryAdditions: {},
            };
        })());
        this.constructSpawnRequests((() => {
            const minCost = 400;
            const cost = 900;
            const extraParts = [RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, HEAL, MOVE];
            const strengthOfParts = RANGED_ATTACK_POWER * 3 + HEAL_POWER * 1;
            if (spawnEnergyCapacity < minCost)
                return false;
            if (claimRequestNeeds[ClaimRequestNeeds.vanguardDefender] <= 0)
                return false;
            if (strengthOfParts * (spawnEnergyCapacity / cost) <
                claimRequestNeeds[ClaimRequestNeeds.vanguardDefender]) {
                Memory.claimRequests[this.memory.claimRequest].abandon = 20000;
                delete Memory.claimRequests[this.memory.claimRequest].responder;
                delete this.memory.claimRequest;
                return false;
            }
            const partsMultiplier = Math.max(Math.floor(claimRequestNeeds[ClaimRequestNeeds.vanguardDefender] / strengthOfParts) * 1.2, 1);
            if (claimRequestNeeds[ClaimRequestNeeds.vanguardDefender] <= 0)
                return false;
            const role = 'vanguardDefender';
            return {
                role,
                defaultParts: [],
                extraParts,
                partsMultiplier,
                minCreeps: 1,
                minCost,
                priority: 8 + this.creepsFromRoom.vanguardDefender.length,
                memoryAdditions: {},
            };
        })());
    }
    if (this.memory.allyCreepRequest) {
        const allyCreepRequestNeeds = Memory.allyCreepRequests[this.memory.allyCreepRequest].needs;
        this.constructSpawnRequests((() => {
            if (allyCreepRequestNeeds[AllyCreepRequestNeeds.allyVanguard] <= 0)
                return false;
            const role = 'allyVanguard';
            return {
                role,
                defaultParts: [],
                extraParts: [CARRY, MOVE, WORK, MOVE, CARRY, MOVE],
                partsMultiplier: allyCreepRequestNeeds[AllyCreepRequestNeeds.allyVanguard],
                minCreeps: undefined,
                maxCreeps: Infinity,
                minCost: 250,
                priority: 10 + this.creepsFromRoom.allyVanguard.length,
                memoryAdditions: {},
            };
        })());
    }
    for (const roomName of this.memory.attackRequests) {
        Memory.attackRequests[roomName];
        const minCost = 300;
        const role = 'antifaAssaulter';
        this.constructSpawnRequests((() => {
            return {
                role,
                defaultParts: [],
                extraParts: [],
                partsMultiplier,
                minCreeps: 1,
                minCost,
                priority: 8 + this.creepsFromRoom.antifaAssaulter.length,
                memoryAdditions: {},
            };
        })());
    }
    if (Memory.CPULogging)
        customLog('Spawn Request Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2));
};

Room.prototype.spawnManager = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    const inactiveSpawns = this.structures.spawn.filter(spawn => !spawn.spawning);
    if (!inactiveSpawns.length)
        return;
    this.spawnRequester();
    const requestsByPriority = Object.keys(this.spawnRequests).sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
    let spawnIndex = inactiveSpawns.length - 1;
    for (const priority of requestsByPriority) {
        if (spawnIndex < 0)
            break;
        const spawn = inactiveSpawns[spawnIndex];
        const spawnRequest = this.spawnRequests[priority];
        const testSpawnResult = spawn.advancedSpawn(spawnRequest);
        if (testSpawnResult !== OK) {
            customLog('Failed to spawn', `error: ${testSpawnResult}, role: ${spawnRequest.role}, cost: ${spawnRequest.cost}, body: (${spawnRequest.body.length}) ${spawnRequest.body}`, myColors.white, myColors.red);
            break;
        }
        spawnRequest.extraOpts.dryRun = false;
        spawn.advancedSpawn(spawnRequest);
        this.energyAvailable -= spawnRequest.cost;
        if (global.roomStats.commune[this.name])
            global.roomStats.commune[this.name].eosp += spawnRequest.cost;
        spawnIndex -= 1;
    }
    if (Memory.CPULogging)
        customLog('Spawn Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
};

const colors = {
    gray: '#555555',
    light: '#AAAAAA',
    road: '#666',
    energy: '#FFE87B',
    power: '#F53547',
    dark: '#181818',
    outline: '#8FBB93',
    speechText: '#000000',
    speechBackground: '#2ccf3b',
};
const speechSize = 0.5;
const speechFont = 'Times New Roman';
function calculateFactoryLevelGapsPoly() {
    let x = -0.08;
    let y = -0.52;
    const result = [];
    const gapAngle = 16 * (Math.PI / 180);
    const c1 = Math.cos(gapAngle);
    const s1 = Math.sin(gapAngle);
    const angle = 72 * (Math.PI / 180);
    const c2 = Math.cos(angle);
    const s2 = Math.sin(angle);
    for (let i = 0; i < 5; i += 1) {
        result.push([0.0, 0.0]);
        result.push([x, y]);
        result.push([x * c1 - y * s1, x * s1 + y * c1]);
        const tmpX = x * c2 - y * s2;
        y = x * s2 + y * c2;
        x = tmpX;
    }
    return result;
}
const factoryLevelGaps = calculateFactoryLevelGapsPoly();
RoomVisual.prototype.structure = function (x, y, type, opts = {}) {
    opts = {
        opacity: 1,
        ...opts,
    };
    switch (type) {
        case STRUCTURE_FACTORY: {
            const outline = [
                [-0.68, -0.11],
                [-0.84, -0.18],
                [-0.84, -0.32],
                [-0.44, -0.44],
                [-0.32, -0.84],
                [-0.18, -0.84],
                [-0.11, -0.68],
                [0.11, -0.68],
                [0.18, -0.84],
                [0.32, -0.84],
                [0.44, -0.44],
                [0.84, -0.32],
                [0.84, -0.18],
                [0.68, -0.11],
                [0.68, 0.11],
                [0.84, 0.18],
                [0.84, 0.32],
                [0.44, 0.44],
                [0.32, 0.84],
                [0.18, 0.84],
                [0.11, 0.68],
                [-0.11, 0.68],
                [-0.18, 0.84],
                [-0.32, 0.84],
                [-0.44, 0.44],
                [-0.84, 0.32],
                [-0.84, 0.18],
                [-0.68, 0.11],
            ];
            this.poly(outline.map(p => [p[0] + x, p[1] + y]), {
                fill: undefined,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            this.circle(x, y, {
                radius: 0.65,
                fill: '#232323',
                strokeWidth: 0.035,
                stroke: '#140a0a',
                opacity: opts.opacity,
            });
            const spikes = [
                [-0.4, -0.1],
                [-0.8, -0.2],
                [-0.8, -0.3],
                [-0.4, -0.4],
                [-0.3, -0.8],
                [-0.2, -0.8],
                [-0.1, -0.4],
                [0.1, -0.4],
                [0.2, -0.8],
                [0.3, -0.8],
                [0.4, -0.4],
                [0.8, -0.3],
                [0.8, -0.2],
                [0.4, -0.1],
                [0.4, 0.1],
                [0.8, 0.2],
                [0.8, 0.3],
                [0.4, 0.4],
                [0.3, 0.8],
                [0.2, 0.8],
                [0.1, 0.4],
                [-0.1, 0.4],
                [-0.2, 0.8],
                [-0.3, 0.8],
                [-0.4, 0.4],
                [-0.8, 0.3],
                [-0.8, 0.2],
                [-0.4, 0.1],
            ];
            this.poly(spikes.map(p => [p[0] + x, p[1] + y]), {
                fill: colors.gray,
                stroke: '#140a0a',
                strokeWidth: 0.04,
                opacity: opts.opacity,
            });
            this.circle(x, y, {
                radius: 0.54,
                fill: '#302a2a',
                strokeWidth: 0.04,
                stroke: '#140a0a',
                opacity: opts.opacity,
            });
            this.poly(factoryLevelGaps.map(p => [p[0] + x, p[1] + y]), {
                fill: '#140a0a',
                stroke: undefined,
                opacity: opts.opacity,
            });
            this.circle(x, y, {
                radius: 0.42,
                fill: '#140a0a',
                opacity: opts.opacity,
            });
            this.rect(x - 0.24, y - 0.24, 0.48, 0.48, {
                fill: '#3f3f3f',
                opacity: opts.opacity,
            });
            break;
        }
        case STRUCTURE_EXTENSION:
            this.circle(x, y, {
                radius: 0.5,
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            this.circle(x, y, {
                radius: 0.35,
                fill: colors.gray,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_SPAWN:
            this.circle(x, y, {
                radius: 0.65,
                fill: colors.dark,
                stroke: '#CCCCCC',
                strokeWidth: 0.1,
                opacity: opts.opacity,
            });
            this.circle(x, y, {
                radius: 0.4,
                fill: colors.energy,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_POWER_SPAWN:
            this.circle(x, y, {
                radius: 0.65,
                fill: colors.dark,
                stroke: colors.power,
                strokeWidth: 0.1,
                opacity: opts.opacity,
            });
            this.circle(x, y, {
                radius: 0.4,
                fill: colors.energy,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_LINK: {
            let outer = [
                [0.0, -0.5],
                [0.4, 0.0],
                [0.0, 0.5],
                [-0.4, 0.0],
            ];
            let inner = [
                [0.0, -0.3],
                [0.25, 0.0],
                [0.0, 0.3],
                [-0.25, 0.0],
            ];
            outer = relPoly(x, y, outer);
            inner = relPoly(x, y, inner);
            outer.push(outer[0]);
            inner.push(inner[0]);
            this.poly(outer, {
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            this.poly(inner, {
                fill: colors.gray,
                stroke: undefined,
                opacity: opts.opacity,
            });
            break;
        }
        case STRUCTURE_TERMINAL: {
            let outer = [
                [0.0, -0.8],
                [0.55, -0.55],
                [0.8, 0.0],
                [0.55, 0.55],
                [0.0, 0.8],
                [-0.55, 0.55],
                [-0.8, 0.0],
                [-0.55, -0.55],
            ];
            let inner = [
                [0.0, -0.65],
                [0.45, -0.45],
                [0.65, 0.0],
                [0.45, 0.45],
                [0.0, 0.65],
                [-0.45, 0.45],
                [-0.65, 0.0],
                [-0.45, -0.45],
            ];
            outer = relPoly(x, y, outer);
            inner = relPoly(x, y, inner);
            outer.push(outer[0]);
            inner.push(inner[0]);
            this.poly(outer, {
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            this.poly(inner, {
                fill: colors.light,
                stroke: undefined,
                opacity: opts.opacity,
            });
            this.rect(x - 0.45, y - 0.45, 0.9, 0.9, {
                fill: colors.gray,
                stroke: colors.dark,
                strokeWidth: 0.1,
                opacity: opts.opacity,
            });
            break;
        }
        case STRUCTURE_LAB:
            this.circle(x, y - 0.025, {
                radius: 0.55,
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            this.circle(x, y - 0.025, {
                radius: 0.4,
                fill: colors.gray,
                opacity: opts.opacity,
            });
            this.rect(x - 0.45, y + 0.3, 0.9, 0.25, {
                fill: colors.dark,
                stroke: undefined,
                opacity: opts.opacity,
            });
            let box = [
                [-0.45, 0.3],
                [-0.45, 0.55],
                [0.45, 0.55],
                [0.45, 0.3],
            ];
            box = relPoly(x, y, box);
            this.poly(box, {
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_TOWER:
            this.circle(x, y, {
                radius: 0.6,
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            this.rect(x - 0.4, y - 0.3, 0.8, 0.6, {
                fill: colors.gray,
                opacity: opts.opacity,
            });
            this.rect(x - 0.2, y - 0.9, 0.4, 0.5, {
                fill: colors.light,
                stroke: colors.dark,
                strokeWidth: 0.07,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_ROAD:
            this.circle(x, y, {
                radius: 0.175,
                fill: colors.road,
                stroke: undefined,
                opacity: opts.opacity,
            });
            if (!this.roads)
                this.roads = [];
            this.roads.push([x, y]);
            break;
        case STRUCTURE_RAMPART:
            this.circle(x, y, {
                radius: 0.5,
                fill: 'rgb(78, 104, 79)',
                stroke: 'rgb(106, 180, 107)',
                strokeWidth: 0.12,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_WALL:
            this.circle(x, y, {
                radius: 0.4,
                fill: colors.dark,
                stroke: colors.light,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_STORAGE:
            const outline1 = relPoly(x, y, [
                [-0.45, -0.55],
                [0, -0.65],
                [0.45, -0.55],
                [0.55, 0],
                [0.45, 0.55],
                [0, 0.65],
                [-0.45, 0.55],
                [-0.55, 0],
                [-0.45, -0.55],
            ]);
            this.poly(outline1, {
                stroke: colors.outline,
                strokeWidth: 0.05,
                fill: colors.dark,
                opacity: opts.opacity,
            });
            this.rect(x - 0.35, y - 0.45, 0.7, 0.9, {
                fill: colors.energy,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_OBSERVER:
            this.circle(x, y, {
                fill: colors.dark,
                radius: 0.45,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity,
            });
            this.circle(x + 0.225, y, {
                fill: colors.outline,
                radius: 0.2,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_NUKER:
            let outline = [
                [0, -1],
                [-0.47, 0.2],
                [-0.5, 0.5],
                [0.5, 0.5],
                [0.47, 0.2],
                [0, -1],
            ];
            outline = relPoly(x, y, outline);
            this.poly(outline, {
                stroke: colors.outline,
                strokeWidth: 0.05,
                fill: colors.dark,
                opacity: opts.opacity,
            });
            let inline = [
                [0, -0.8],
                [-0.4, 0.2],
                [0.4, 0.2],
                [0, -0.8],
            ];
            inline = relPoly(x, y, inline);
            this.poly(inline, {
                stroke: colors.outline,
                strokeWidth: 0.01,
                fill: colors.gray,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_CONTAINER:
            this.rect(x - 0.225, y - 0.3, 0.45, 0.6, {
                fill: colors.gray,
                opacity: opts.opacity,
                stroke: colors.dark,
                strokeWidth: 0.09,
            });
            this.rect(x - 0.17, y + 0.07, 0.34, 0.2, {
                fill: colors.energy,
                opacity: opts.opacity,
            });
            break;
        default:
            this.circle(x, y, {
                fill: colors.light,
                radius: 0.35,
                stroke: colors.dark,
                strokeWidth: 0.2,
                opacity: opts.opacity,
            });
            break;
    }
    return this;
};
const dirs = [[], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
function rotate(x, y, s, c, px, py) {
    const xDelta = x * c - y * s;
    const yDelta = x * s + y * c;
    return { x: px + xDelta, y: py + yDelta };
}
function relPoly(x, y, poly) {
    return poly.map(p => {
        p[0] += x;
        p[1] += y;
        return p;
    });
}
RoomVisual.prototype.connectRoads = function (opts = {}) {
    const color = opts.color || colors.road || 'white';
    if (!this.roads)
        return this;
    this.roads.forEach(r => {
        for (let i = 1; i <= 4; i += 1) {
            const d = dirs[i];
            const c = [r[0] + d[0], r[1] + d[1]];
            const rd = _.some(this.roads, r => r[0] === c[0] && r[1] === c[1]);
            if (rd) {
                this.line(r[0], r[1], c[0], c[1], {
                    color,
                    width: 0.35,
                    opacity: opts.opacity || 1,
                });
            }
        }
    });
    return this;
};
RoomVisual.prototype.speech = function (text, x, y, opts = {}) {
    const background = opts.background ? opts.background : colors.speechBackground;
    const textcolor = opts.textcolor ? opts.textcolor : colors.speechText;
    const textstyle = opts.textstyle ? opts.textstyle : false;
    const textsize = opts.textsize ? opts.textsize : speechSize;
    const textfont = opts.textfont ? opts.textfont : speechFont;
    const opacity = opts.opacity ? opts.opacity : 1;
    let fontstring = '';
    if (textstyle) {
        fontstring = `${textstyle} `;
    }
    fontstring += `${textsize} ${textfont}`;
    let pointer = [
        [-0.2, -0.8],
        [0.2, -0.8],
        [0, -0.3],
    ];
    pointer = relPoly(x, y, pointer);
    pointer.push(pointer[0]);
    this.poly(pointer, {
        fill: background,
        stroke: background,
        opacity,
        strokeWidth: 0.0,
    });
    this.text(text, x, y - 1, {
        color: textcolor,
        backgroundColor: background,
        backgroundPadding: 0.1,
        opacity,
        font: fontstring,
    });
    return this;
};
RoomVisual.prototype.animatedPosition = function (x, y, opts = {}) {
    const color = opts.color ? opts.color : 'blue';
    const opacity = opts.opacity ? opts.opacity : 0.5;
    let radius = opts.radius ? opts.radius : 0.75;
    const frames = opts.frames ? opts.frames : 6;
    const angle = (((Game.time % frames) * 90) / frames) * (Math.PI / 180);
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const sizeMod = Math.abs((Game.time % frames) - frames / 2) / 10;
    radius += radius * sizeMod;
    const points = [
        rotate(0, -radius, s, c, x, y),
        rotate(radius, 0, s, c, x, y),
        rotate(0, radius, s, c, x, y),
        rotate(-radius, 0, s, c, x, y),
        rotate(0, -radius, s, c, x, y),
    ].map(p => [p.x, p.y]);
    this.poly(points, { stroke: color, opacity });
    return this;
};
RoomVisual.prototype.test = function test() {
    const demopos = [19, 24];
    this.clear();
    this.structure(demopos[0] + 0, demopos[1] + 0, STRUCTURE_LAB);
    this.structure(demopos[0] + 1, demopos[1] + 1, STRUCTURE_TOWER);
    this.structure(demopos[0] + 2, demopos[1] + 0, STRUCTURE_LINK);
    this.structure(demopos[0] + 3, demopos[1] + 1, STRUCTURE_TERMINAL);
    this.structure(demopos[0] + 4, demopos[1] + 0, STRUCTURE_EXTENSION);
    this.structure(demopos[0] + 5, demopos[1] + 1, STRUCTURE_SPAWN);
    return this;
};

function rampartPlanner(room) {
    if (room.memory.stampAnchors.rampart.length)
        return false;
    function generadeRoomMatrix() {
        room.tileCoords = new Uint8Array(2500);
        const terrainCoords = internationalManager.getTerrainCoords(room.name);
        for (let x = 0; x < roomDimensions; x += 1) {
            for (let y = 0; y < roomDimensions; y += 1) {
                const packedCoord = packXY(x, y);
                room.tileCoords[packedCoord] = UNWALKABLE;
                if (terrainCoords[packXY(x, y)] === 255)
                    continue;
                room.tileCoords[packedCoord] = NORMAL;
                if (x === 0 || y === 0 || x === roomDimensions - 1 || y === roomDimensions - 1)
                    room.tileCoords[packedCoord] = EXIT;
            }
        }
        let y = 1;
        for (; y < roomDimensions - 1; y += 1) {
            if (room.tileCoords[packXY(0, y - 1)] === EXIT)
                room.tileCoords[packXY(1, y)] = TO_EXIT;
            if (room.tileCoords[packXY(0, y)] === EXIT)
                room.tileCoords[packXY(1, y)] = TO_EXIT;
            if (room.tileCoords[packXY(0, y + 1)] === EXIT)
                room.tileCoords[packXY(1, y)] = TO_EXIT;
            if (room.tileCoords[packXY(roomDimensions - 1, y - 1)] === EXIT)
                room.tileCoords[packXY(roomDimensions - 2, y)] = TO_EXIT;
            if (room.tileCoords[packXY(roomDimensions - 1, y)] === EXIT)
                room.tileCoords[packXY(roomDimensions - 2, y)] = TO_EXIT;
            if (room.tileCoords[packXY(roomDimensions - 1, y + 1)] === EXIT)
                room.tileCoords[packXY(roomDimensions - 2, y)] = TO_EXIT;
        }
        let x = 1;
        for (; x < roomDimensions - 1; x += 1) {
            if (room.tileCoords[packXY(x - 1, 0)] === EXIT)
                room.tileCoords[packXY(x, 1)] = TO_EXIT;
            if (room.tileCoords[packXY(x, 0)] === EXIT)
                room.tileCoords[packXY(x, 1)] = TO_EXIT;
            if (room.tileCoords[packXY(x + 1, 0)] === EXIT)
                room.tileCoords[packXY(x, 1)] = TO_EXIT;
            if (room.tileCoords[packXY(x - 1, roomDimensions - 1)] === EXIT)
                room.tileCoords[packXY(x, roomDimensions - 2)] = TO_EXIT;
            if (room.tileCoords[packXY(x, roomDimensions - 1)] === EXIT)
                room.tileCoords[packXY(x, roomDimensions - 2)] = TO_EXIT;
            if (room.tileCoords[packXY(x + 1, roomDimensions - 1)] === EXIT)
                room.tileCoords[packXY(x, roomDimensions - 2)] = TO_EXIT;
        }
        y = 1;
        for (; y < roomDimensions - 1; y += 1) {
            room.tileCoords[packXY(0, y)] === UNWALKABLE;
            room.tileCoords[packXY(roomDimensions - 1, y)] === UNWALKABLE;
        }
        x = 1;
        for (; x < roomDimensions - 1; x += 1) {
            room.tileCoords[packXY(x, 0)] === UNWALKABLE;
            room.tileCoords[packXY(x, roomDimensions - 1)] === UNWALKABLE;
        }
    }
    class Graph {
        constructor(menge_v) {
            this.v = menge_v;
            this.level = Array(menge_v);
            this.edges = Array(menge_v)
                .fill(0)
                .map(x => []);
        }
    }
    Graph.prototype.New_edge = function (u, v, c) {
        this.edges[u].push({ v, r: this.edges[v].length, c, f: 0 });
        this.edges[v].push({ v: u, r: this.edges[u].length - 1, c: 0, f: 0 });
    };
    Graph.prototype.Bfs = function (s, t) {
        if (t >= this.v)
            return false;
        this.level.fill(-1);
        this.level[s] = 0;
        const q = [];
        q.push(s);
        let u = 0;
        let edge = null;
        while (q.length) {
            u = q.splice(0, 1)[0];
            let i = 0;
            const imax = this.edges[u].length;
            for (; i < imax; i += 1) {
                edge = this.edges[u][i];
                if (this.level[edge.v] < 0 && edge.f < edge.c) {
                    this.level[edge.v] = this.level[u] + 1;
                    q.push(edge.v);
                }
            }
        }
        return this.level[t] >= 0;
    };
    Graph.prototype.Dfsflow = function (u, f, t, c) {
        if (u === t)
            return f;
        let edge = null;
        let flow_till_here = 0;
        let flow_to_t = 0;
        while (c[u] < this.edges[u].length) {
            edge = this.edges[u][c[u]];
            if (this.level[edge.v] === this.level[u] + 1 && edge.f < edge.c) {
                flow_till_here = Math.min(f, edge.c - edge.f);
                flow_to_t = this.Dfsflow(edge.v, flow_till_here, t, c);
                if (flow_to_t > 0) {
                    edge.f += flow_to_t;
                    this.edges[edge.v][edge.r].f -= flow_to_t;
                    return flow_to_t;
                }
            }
            c[u] += 1;
        }
        return 0;
    };
    Graph.prototype.Bfsthecut = function (s) {
        const e_in_cut = [];
        this.level.fill(-1);
        this.level[s] = 1;
        const q = [];
        q.push(s);
        let u = 0;
        let edge = null;
        while (q.length) {
            u = q.splice(0, 1)[0];
            let i = 0;
            const imax = this.edges[u].length;
            for (; i < imax; i += 1) {
                edge = this.edges[u][i];
                if (edge.f < edge.c) {
                    if (this.level[edge.v] < 1) {
                        this.level[edge.v] = 1;
                        q.push(edge.v);
                    }
                }
                if (edge.f === edge.c && edge.c > 0) {
                    edge.u = u;
                    e_in_cut.push(edge);
                }
            }
        }
        const min_cut = [];
        let i = 0;
        const imax = e_in_cut.length;
        for (; i < imax; i += 1) {
            if (this.level[e_in_cut[i].v] === -1)
                min_cut.push(e_in_cut[i].u);
        }
        return min_cut;
    };
    Graph.prototype.Calcmincut = function (s, t) {
        if (s === t)
            return -1;
        let returnValue = 0;
        while (this.Bfs(s, t) === true) {
            const count = Array(this.v + 1).fill(0);
            let flow = 0;
            do {
                flow = this.Dfsflow(s, Number.MAX_VALUE, t, count);
                if (flow > 0)
                    returnValue += flow;
            } while (flow);
        }
        return returnValue;
    };
    function createGraph(rects) {
        generadeRoomMatrix();
        for (const rect of rects) {
            for (let x = rect.x1; x <= rect.x2; x += 1) {
                for (let y = rect.y1; y <= rect.y2; y += 1) {
                    if (x === rect.x1 || x === rect.x2 || y === rect.y1 || y === rect.y2) {
                        if (room.tileCoords[packXY(x, y)] === NORMAL)
                            room.tileCoords[packXY(x, y)] = PROTECTED;
                        continue;
                    }
                    room.tileCoords[packXY(x, y)] = UNWALKABLE;
                }
            }
        }
        const g = new Graph(2 * 50 * 50 + 2);
        const infini = Number.MAX_VALUE;
        const surr = [
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
        ];
        const source = 2 * 50 * 50;
        const sink = 2 * 50 * 50 + 1;
        let dx = 0;
        let dy = 0;
        for (let x = 1; x < roomDimensions - 1; x += 1) {
            for (let y = 1; y < roomDimensions - 1; y += 1) {
                const top = y * 50 + x;
                const bot = top + 2500;
                if (room.tileCoords[packXY(x, y)] === NORMAL) {
                    g.New_edge(top, bot, 1);
                    for (let i = 0; i < 8; i += 1) {
                        dx = x + surr[i][0];
                        dy = y + surr[i][1];
                        if (room.tileCoords[packXY(dx, dy)] === NORMAL || room.tileCoords[packXY(dx, dy)] === TO_EXIT)
                            g.New_edge(bot, dy * 50 + dx, infini);
                    }
                    continue;
                }
                if (room.tileCoords[packXY(x, y)] === PROTECTED) {
                    g.New_edge(source, top, infini);
                    g.New_edge(top, bot, 1);
                    for (let i = 0; i < 8; i += 1) {
                        dx = x + surr[i][0];
                        dy = y + surr[i][1];
                        if (room.tileCoords[packXY(dx, dy)] === NORMAL || room.tileCoords[packXY(dx, dy)] === TO_EXIT)
                            g.New_edge(bot, dy * 50 + dx, infini);
                    }
                    continue;
                }
                if (room.tileCoords[packXY(x, y)] === TO_EXIT) {
                    g.New_edge(top, sink, infini);
                    continue;
                }
            }
        }
        return g;
    }
    function deleteTilesToDeadEnds(cutCoords) {
        for (let i = cutCoords.length - 1; i >= 0; i -= 1)
            room.tileCoords[packXY(cutCoords[i].x, cutCoords[i].y)] = UNWALKABLE;
        const unvisited_pos = [];
        let y = 0;
        for (; y < roomDimensions - 1; y += 1) {
            if (room.tileCoords[packXY(1, y)] === TO_EXIT)
                unvisited_pos.push(50 * y + 1);
            if (room.tileCoords[packXY(48, y)] === TO_EXIT)
                unvisited_pos.push(50 * y + 48);
        }
        let x = 0;
        for (; x < roomDimensions - 1; x += 1) {
            if (room.tileCoords[packXY(x, 1)] === TO_EXIT)
                unvisited_pos.push(50 + x);
            if (room.tileCoords[packXY(x, 48)] === TO_EXIT)
                unvisited_pos.push(2400 + x);
        }
        const surr = [
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
        ];
        let index;
        let dx;
        let dy;
        while (unvisited_pos.length > 0) {
            index = unvisited_pos.pop();
            x = index % 50;
            y = Math.floor(index / 50);
            for (let i = 0; i < 8; i += 1) {
                dx = x + surr[i][0];
                dy = y + surr[i][1];
                if (room.tileCoords[packXY(dx, dy)] === NORMAL) {
                    unvisited_pos.push(50 * dy + dx);
                    room.tileCoords[packXY(dx, dy)] = TO_EXIT;
                }
            }
        }
        let leads_to_exit = false;
        for (let i = cutCoords.length - 1; i >= 0; i -= 1) {
            leads_to_exit = false;
            x = cutCoords[i].x;
            y = cutCoords[i].y;
            for (let i = 0; i < 8; i += 1) {
                dx = x + surr[i][0];
                dy = y + surr[i][1];
                if (room.tileCoords[packXY(dx, dy)] === TO_EXIT) {
                    leads_to_exit = true;
                }
            }
            if (!leads_to_exit)
                cutCoords.splice(i, 1);
        }
    }
    function GetCutTiles(rects) {
        const graph = createGraph(rects);
        if (!graph)
            return [];
        const source = 2 * 50 * 50;
        const sink = 2 * 50 * 50 + 1;
        const positions = [];
        const packedPositions = [];
        if (graph.Calcmincut(source, sink) > 0) {
            const cutEdges = graph.Bfsthecut(source);
            for (let i = 0; i < cutEdges.length; i += 1) {
                const packedCoord = cutEdges[i];
                const x = packedCoord % 50;
                const y = Math.floor(packedCoord / 50);
                positions.push({ x, y });
                packedPositions.push(pack({ x, y }));
            }
        }
        if (positions.length > 0)
            deleteTilesToDeadEnds(positions);
        return packedPositions;
    }
    const protectionRects = [];
    const { controller } = room;
    protectionRects.push({
        x1: Math.max(Math.min(controller.pos.x - 1, roomDimensions - 3), 2),
        y1: Math.max(Math.min(controller.pos.y - 1, roomDimensions - 3), 2),
        x2: Math.max(Math.min(controller.pos.x + 1, roomDimensions - 3), 2),
        y2: Math.max(Math.min(controller.pos.y + 1, roomDimensions - 3), 2),
    });
    const centerUpgradePos = room.get('centerUpgradePos');
    protectionRects.push({
        x1: Math.max(Math.min(centerUpgradePos.x - 3, roomDimensions - 3), 2),
        y1: Math.max(Math.min(centerUpgradePos.y - 3, roomDimensions - 3), 2),
        x2: Math.max(Math.min(centerUpgradePos.x + 3, roomDimensions - 3), 2),
        y2: Math.max(Math.min(centerUpgradePos.y + 3, roomDimensions - 3), 2),
    });
    const { stampAnchors } = room.memory;
    for (const stampType in stampAnchors) {
        const stamp = stamps[stampType];
        const { protectionOffset } = stamp;
        for (const packedStampAnchor of stampAnchors[stampType]) {
            const stampAnchor = unpackAsPos(packedStampAnchor);
            protectionRects.push({
                x1: Math.max(Math.min(stampAnchor.x - protectionOffset, roomDimensions - 3), 2),
                y1: Math.max(Math.min(stampAnchor.y - protectionOffset, roomDimensions - 3), 2),
                x2: Math.max(Math.min(stampAnchor.x + protectionOffset + (stamp.asymmetry || 0), roomDimensions - 3), 2),
                y2: Math.max(Math.min(stampAnchor.y + protectionOffset + (stamp.asymmetry || 0), roomDimensions - 3), 2),
            });
        }
    }
    const rampartPositions = GetCutTiles(protectionRects);
    for (const packedPos of rampartPositions) {
        const pos = unpackAsPos(packedPos);
        room.roadCoords[pack(pos)] = 1;
        room.rampartCoords[pack(pos)] = 1;
    }
    room.findUnprotectedCoords();
    const hubAnchor = unpackAsRoomPos(room.memory.stampAnchors.hub[0], room.name);
    const onboardingRampartCoords = new Uint8Array(2500);
    const groupedRampartPositions = room.groupRampartPositions(rampartPositions);
    for (const group of groupedRampartPositions) {
        const closestPosToAnchor = group.sort((a, b) => {
            return (room.advancedFindPath({
                origin: a,
                goals: [{ pos: hubAnchor, range: 3 }],
                weightCoordMaps: [room.unprotectedCoords, room.roadCoords],
            }).length -
                room.advancedFindPath({
                    origin: b,
                    goals: [{ pos: hubAnchor, range: 3 }],
                    weightCoordMaps: [room.unprotectedCoords, room.roadCoords],
                }).length);
        })[0];
        const path = room.advancedFindPath({
            origin: closestPosToAnchor,
            goals: [{ pos: hubAnchor, range: 2 }],
            weightCoordMaps: [room.unprotectedCoords, room.roadCoords],
        });
        for (const pos of path)
            room.roadCoords[pack(pos)] = 1;
        let onboardingIndex = 0;
        let onboardingCount = 0;
        while (path[onboardingIndex]) {
            const packedPos = pack(path[onboardingIndex]);
            onboardingIndex += 1;
            if (room.rampartCoords[packedPos] === 1 && onboardingRampartCoords[packedPos] === 0)
                continue;
            room.roadCoords[packedPos] = 1;
            room.rampartCoords[packedPos] = 1;
            onboardingRampartCoords[packedPos] = 1;
            onboardingCount += 1;
            if (onboardingCount === minOnboardingRamparts)
                break;
        }
    }
    return true;
}

function basePlanner(room) {
    if (Game.cpu.bucket < CPUMaxPerTick)
        return false;
    const terrainCoords = internationalManager.getTerrainCoords(room.name);
    room.baseCoords = new Uint8Array(terrainCoords);
    for (const pos of room.find(FIND_EXIT)) {
        room.baseCoords[pack(pos)] = 255;
        for (const coord of findCoordsInsideRect(pos.x - 2, pos.y - 2, pos.x + 2, pos.y + 2))
            room.baseCoords[pack(coord)] = 255;
    }
    room.roadCoords = new Uint8Array(terrainCoords);
    room.rampartCoords = new Uint8Array(terrainCoords);
    if (!room.memory.stampAnchors) {
        room.memory.stampAnchors = {};
        for (const type in stamps)
            room.memory.stampAnchors[type] = [];
    }
    function recordAdjacentPositions(x, y, range, weight) {
        for (const coord of findCoordsInsideRect(x - range, y - range, x + range, y + range)) {
            room.baseCoords[pack(coord)] = Math.max(weight || 255, room.baseCoords[pack(coord)]);
        }
    }
    recordAdjacentPositions(room.controller.pos.x, room.controller.pos.y, 2);
    for (const coord of room.get('mineralHarvestPositions'))
        room.baseCoords[pack(coord)] = 255;
    const sources = room.sources;
    for (const sourceIndex in sources) {
        const sourcePositions = room.sourcePositions[sourceIndex];
        recordAdjacentPositions(sourcePositions[0].x, sourcePositions[0].y, 1);
        for (const pos of sourcePositions)
            room.baseCoords[pack(pos)] = 255;
    }
    const avgSourcePos = sources.length > 1 ? findAvgBetweenCoords(sources[0].pos, sources[1].pos) : sources[0].pos;
    const avgControllerSourcePos = findAvgBetweenCoords(room.controller.pos, avgSourcePos);
    const controllerAdjacentCoords = findCoordsInsideRect(room.controller.pos.x - 3, room.controller.pos.y - 3, room.controller.pos.x + 3, room.controller.pos.y + 3);
    for (const coord of controllerAdjacentCoords)
        room.baseCoords[pack(coord)] = 255;
    let stamp;
    let packedStampAnchor;
    let stampAnchor;
    let structureType;
    let pos;
    let x;
    let y;
    function planStamp(opts) {
        if (!opts.coordMap)
            opts.coordMap = room.baseCoords;
        else {
            opts.coordMap = new Uint8Array(opts.coordMap);
            for (const pos of room.find(FIND_EXIT)) {
                opts.coordMap[pack(pos)] = 255;
                for (const coord of findCoordsInsideRect(pos.x - 2, pos.y - 2, pos.x + 2, pos.y + 2))
                    opts.coordMap[pack(coord)] = 255;
            }
        }
        stamp = stamps[opts.stampType];
        const newStampAnchors = [];
        const newStampAnchorsPacked = [];
        while (opts.count > 0) {
            opts.count -= 1;
            if (room.memory.stampAnchors[opts.stampType][opts.count]) {
                for (packedStampAnchor of room.memory.stampAnchors[opts.stampType]) {
                    stampAnchor = unpackAsPos(packedStampAnchor);
                    for (structureType in stamp.structures) {
                        for (pos of stamp.structures[structureType]) {
                            x = pos.x + stampAnchor.x - stamp.offset;
                            y = pos.y + stampAnchor.y - stamp.offset;
                            if (structureType === STRUCTURE_ROAD) {
                                room.roadCoords[packXY(x, y)] = 1;
                                continue;
                            }
                            room.baseCoords[packXY(x, y)] = 255;
                            room.roadCoords[packXY(x, y)] = 255;
                        }
                    }
                }
                continue;
            }
            const distanceCoords = opts.normalDT
                ? room.distanceTransform(opts.coordMap, false, opts.minAvoid)
                : room.diagonalDistanceTransform(opts.coordMap, false, opts.minAvoid);
            stampAnchor = stamp.asymmetry
                ? room.findClosestPosOfValueAsym({
                    coordMap: distanceCoords,
                    startCoords: opts.startCoords,
                    requiredValue: stamp.size,
                    reduceIterations: 0,
                    initialWeight: opts.initialWeight || 0,
                    adjacentToRoads: opts.adjacentToRoads,
                    roadCoords: opts.adjacentToRoads ? room.roadCoords : undefined,
                    offset: stamp.offset,
                    asymOffset: stamp.asymmetry,
                    cardinalFlood: opts.cardinalFlood,
                })
                : room.findClosestPosOfValue({
                    coordMap: distanceCoords,
                    startCoords: opts.startCoords,
                    requiredValue: stamp.size,
                    reduceIterations: 0,
                    initialWeight: opts.initialWeight || 0,
                    adjacentToRoads: opts.adjacentToRoads,
                    roadCoords: opts.adjacentToRoads ? room.roadCoords : undefined,
                    cardinalFlood: opts.cardinalFlood,
                });
            if (!stampAnchor)
                return false;
            newStampAnchors.push(stampAnchor);
            newStampAnchorsPacked.push(pack(stampAnchor));
            for (structureType in stamp.structures) {
                for (pos of stamp.structures[structureType]) {
                    x = pos.x + stampAnchor.x - stamp.offset;
                    y = pos.y + stampAnchor.y - stamp.offset;
                    if (structureType === STRUCTURE_ROAD) {
                        room.roadCoords[packXY(x, y)] = 1;
                        continue;
                    }
                    room.baseCoords[packXY(x, y)] = 255;
                    room.roadCoords[packXY(x, y)] = 255;
                }
            }
        }
        room.memory.stampAnchors[opts.stampType] =
            room.memory.stampAnchors[opts.stampType].concat(newStampAnchorsPacked);
        return newStampAnchors;
    }
    if (!planStamp({
        stampType: 'fastFiller',
        count: 1,
        startCoords: [avgControllerSourcePos],
        normalDT: true,
        cardinalFlood: true,
    }))
        return 'failed';
    if (!room.memory.stampAnchors.fastFiller.length) {
        room.memory.notClaimable = true;
        return 'failed';
    }
    for (const coord of controllerAdjacentCoords) {
        if (room.roadCoords[pack(coord)] > 0)
            continue;
        room.baseCoords[pack(coord)] = 0;
    }
    const centerUpgadePos = room.get('centerUpgradePos');
    const upgradePositions = room.get('upgradePositions');
    for (const pos of upgradePositions) {
        room.baseCoords[pack(pos)] = 255;
        room.roadCoords[pack(pos)] = 20;
    }
    const closestSource = room.anchor.findClosestByPath(sources, {
        ignoreRoads: true,
        ignoreDestructibleStructures: true,
        ignoreCreeps: true,
    });
    let path = room.advancedFindPath({
        origin: closestSource.pos,
        goals: [{ pos: room.anchor, range: 3 }],
        weightCoordMaps: [room.roadCoords],
    });
    const hubStartCoord = path[path.length - 1];
    if (!planStamp({
        stampType: 'hub',
        count: 1,
        startCoords: [hubStartCoord],
        normalDT: true,
        cardinalFlood: true,
    }))
        return 'failed';
    const hubAnchor = unpackAsRoomPos(room.memory.stampAnchors.hub[0], room.name);
    const fastFillerHubAnchor = findAvgBetweenCoords(room.anchor, hubAnchor);
    const closestUpgradePos = upgradePositions[0];
    if (!closestUpgradePos)
        return 'failed';
    room.roadCoords[pack(closestUpgradePos)] = 1;
    if (!planStamp({
        stampType: 'labs',
        count: 1,
        startCoords: [hubAnchor],
        normalDT: true,
        coordMap: room.roadCoords,
        cardinalFlood: true,
    }))
        return 'failed';
    path = room.advancedFindPath({
        origin: hubAnchor,
        goals: [{ pos: room.anchor, range: 3 }],
        weightCoordMaps: [room.roadCoords],
    });
    if (!planStamp({
        stampType: 'extensions',
        count: 3,
        startCoords: [hubAnchor],
    }))
        return 'failed';
    for (const extensionsAnchor of room.memory.stampAnchors.extensions) {
        path = room.advancedFindPath({
            origin: unpackAsRoomPos(extensionsAnchor, room.name),
            goals: [{ pos: hubAnchor, range: 2 }],
            weightCoordMaps: [room.roadCoords],
        });
        for (const pos of path)
            room.roadCoords[pack(pos)] = 1;
    }
    for (const pos of path) {
        room.roadCoords[pack(pos)] = 1;
    }
    path = room.advancedFindPath({
        origin: centerUpgadePos,
        goals: [{ pos: hubAnchor, range: 1 }],
        weightCoordMaps: [room.roadCoords],
    });
    for (const pos of path)
        room.roadCoords[pack(pos)] = 1;
    for (const index in sources) {
        const closestSourcePos = room.sourcePositions[index][0];
        room.roadCoords[pack(closestSourcePos)] = 255;
    }
    for (const index in sources) {
        const closestSourcePos = room.sourcePositions[index][0];
        if (!room.memory.stampAnchors.container.includes(pack(closestSourcePos))) {
            room.memory.stampAnchors.container.push(pack(closestSourcePos));
        }
        for (const index2 in room.sources) {
            if (index === index2)
                continue;
            for (const pos of room.sourcePositions[index2])
                room.roadCoords[pack(pos)] = 10;
        }
        path = room.advancedFindPath({
            origin: closestSourcePos,
            goals: [{ pos: room.anchor, range: 3 }],
            weightCoordMaps: [room.roadCoords],
        });
        for (const pos of path)
            room.roadCoords[pack(pos)] = 1;
        path = room.advancedFindPath({
            origin: closestSourcePos,
            goals: [{ pos: closestUpgradePos, range: 1 }],
            weightCoordMaps: [room.roadCoords],
        });
        for (const pos of path)
            room.roadCoords[pack(pos)] = 1;
    }
    path = room.advancedFindPath({
        origin: unpackAsRoomPos(room.memory.stampAnchors.labs[0], room.name),
        goals: [{ pos: hubAnchor, range: 1 }],
        weightCoordMaps: [room.roadCoords],
    });
    for (const pos of path)
        room.roadCoords[pack(pos)] = 1;
    const mineralHarvestPos = room.get('closestMineralHarvestPos');
    if (mineralHarvestPos)
        room.roadCoords[pack(mineralHarvestPos)] = 255;
    path = room.advancedFindPath({
        origin: mineralHarvestPos,
        goals: [{ pos: hubAnchor, range: 1 }],
        weightCoordMaps: [room.roadCoords],
    });
    for (const pos of path)
        room.roadCoords[pack(pos)] = 1;
    if (!room.memory.stampAnchors.extractor.length)
        room.memory.stampAnchors.extractor.push(pack(room.mineral.pos));
    room.baseCoords[pack(closestUpgradePos)] = 255;
    let extraExtensionsAmount = CONTROLLER_STRUCTURES.extension[8] -
        stamps.fastFiller.structures.extension.length -
        room.memory.stampAnchors.extensions.length * stamps.extensions.structures.extension.length -
        room.memory.stampAnchors.extension.length -
        room.memory.stampAnchors.sourceExtension.length;
    if (!planStamp({
        stampType: 'tower',
        count: 6,
        startCoords: [fastFillerHubAnchor],
        adjacentToRoads: true,
        coordMap: room.roadCoords,
        minAvoid: 255,
    }))
        return 'failed';
    rampartPlanner(room);
    for (let x = 0; x < roomDimensions; x += 1) {
        for (let y = 0; y < roomDimensions; y += 1) {
            const packedCoord = packXY(x, y);
            if (room.roadCoords[packedCoord] === 1)
                room.baseCoords[packedCoord] = 255;
        }
    }
    if (room.memory.stampAnchors.sourceLink.length + room.memory.stampAnchors.sourceExtension.length === 0) {
        for (const sourceIndex in sources) {
            let sourceHasLink = false;
            const closestSourcePos = room.sourcePositions[sourceIndex][0];
            const OGCoords = new Map();
            for (let posIndex = 1; posIndex < room.sourcePositions[sourceIndex].length; posIndex += 1) {
                const packedCoord = pack(room.sourcePositions[sourceIndex][posIndex]);
                OGCoords.set(packedCoord, room.roadCoords[packedCoord]);
                room.roadCoords[packedCoord] = 0;
            }
            let adjacentCoords = findCoordsInsideRect(closestSourcePos.x - 3, closestSourcePos.y - 3, closestSourcePos.x + 3, closestSourcePos.y + 3);
            for (const coord of adjacentCoords) {
                if (room.unprotectedCoords[pack(coord)] === 0)
                    continue;
                room.rampartCoords[pack(closestSourcePos)] = 1;
                break;
            }
            adjacentCoords = findCoordsInsideRect(closestSourcePos.x - 1, closestSourcePos.y - 1, closestSourcePos.x + 1, closestSourcePos.y + 1);
            adjacentCoords.sort(function (a, b) {
                return getRange(a.x, hubAnchor.x, a.y, hubAnchor.y) - getRange(b.x, hubAnchor.x, b.y, hubAnchor.y);
            });
            for (const coord1 of adjacentCoords) {
                const packedCoord1 = pack(coord1);
                if (room.roadCoords[packedCoord1] > 0)
                    continue;
                if (room.rampartCoords[packedCoord1] > 0)
                    continue;
                if (coord1.x < 2 || coord1.x >= roomDimensions - 2 || coord1.y < 2 || coord1.y >= roomDimensions - 2)
                    continue;
                room.baseCoords[packedCoord1] = 255;
                room.roadCoords[packedCoord1] = 255;
                OGCoords.set(packedCoord1, 255);
                if (!sourceHasLink) {
                    sourceHasLink = true;
                    room.memory.stampAnchors.sourceLink.push(packedCoord1);
                    const adjacentCoords = findCoordsInsideRect(coord1.x - 3, coord1.y - 3, coord1.x + 3, coord1.y + 3);
                    for (const coord2 of adjacentCoords) {
                        if (room.unprotectedCoords[pack(coord2)] === 0)
                            continue;
                        room.rampartCoords[packedCoord1] = 1;
                        break;
                    }
                    continue;
                }
                room.memory.stampAnchors.sourceExtension.push(packedCoord1);
                extraExtensionsAmount -= 1;
                continue;
            }
            for (const [coord, value] of OGCoords)
                room.roadCoords[coord] = value;
        }
    }
    if (!planStamp({
        stampType: 'extension',
        count: extraExtensionsAmount,
        startCoords: [hubAnchor],
        adjacentToRoads: true,
        coordMap: room.roadCoords,
        minAvoid: 255,
    }))
        return 'failed';
    if (!planStamp({
        stampType: 'observer',
        count: 1,
        startCoords: [fastFillerHubAnchor],
        coordMap: room.roadCoords,
    }))
        return 'failed';
    const observerAnchor = unpackAsRoomPos(room.memory.stampAnchors.observer[0], room.name);
    let adjacentCoords = findCoordsInsideRect(observerAnchor.x - 3, observerAnchor.y - 3, observerAnchor.x + 3, observerAnchor.y + 3);
    if (!room.unprotectedCoords)
        room.findUnprotectedCoords();
    for (const coord of adjacentCoords) {
        if (room.unprotectedCoords[pack(coord)] === 0)
            continue;
        room.rampartCoords[pack(observerAnchor)] = 1;
        break;
    }
    for (let x = 0; x < roomDimensions; x += 1) {
        for (let y = 0; y < roomDimensions; y += 1) {
            const packedPos = packXY(x, y);
            if (room.rampartCoords[packedPos] === 1)
                room.memory.stampAnchors.rampart.push(packedPos);
            if (!room.memory.stampAnchors.road.includes(packedPos) && room.roadCoords[packedPos] === 1)
                room.memory.stampAnchors.road.push(packedPos);
        }
    }
    room.memory.PC = true;
    return true;
}

Room.prototype.remotePlanner = function (commune) {
    return true;
};
Room.prototype.clearOtherStructures = function () {
    if (Game.time % 100 !== 0)
        return;
    for (const wall of this.structures.constructedWall)
        wall.destroy();
    for (const structure of this.find(FIND_HOSTILE_STRUCTURES))
        structure.destroy();
};
Room.prototype.remoteConstructionPlacement = function () { };
Room.prototype.communeConstructionPlacement = function () {
    if (!this.memory.PC)
        return;
    if (!this.myCreeps.builder.length && Game.time % Math.floor(Math.random() * 100) !== 0)
        return;
    if (global.constructionSitesCount === MAX_CONSTRUCTION_SITES)
        return;
    if (this.find(FIND_MY_CONSTRUCTION_SITES).length > 2)
        return;
    let placed = 0;
    for (const stampType in stamps) {
        const stamp = stamps[stampType];
        for (const packedStampAnchor of this.memory.stampAnchors[stampType]) {
            const stampAnchor = unpackAsPos(packedStampAnchor);
            for (const structureType in stamp.structures) {
                if (structureType === 'empty')
                    continue;
                if (this.structures[structureType].length +
                    this.cSites[structureType].length >=
                    CONTROLLER_STRUCTURES[structureType][this.controller.level])
                    continue;
                if (structureType === STRUCTURE_RAMPART &&
                    (!this.storage || this.controller.level < 4 || this.storage.store.energy < 30000)) {
                    continue;
                }
                if (structureType === STRUCTURE_ROAD && this.energyCapacityAvailable < 800)
                    continue;
                for (const pos of stamp.structures[structureType]) {
                    const x = pos.x + stampAnchor.x - stamp.offset;
                    const y = pos.y + stampAnchor.y - stamp.offset;
                    if (placed > 10)
                        return;
                    if (structureType == STRUCTURE_ROAD) {
                        const impassableStructure = this.lookForAt(LOOK_STRUCTURES, x, y).find(str => impassibleStructureTypes.includes(str.structureType));
                        if (impassableStructure)
                            continue;
                    }
                    if (this.createConstructionSite(x, y, structureType) === OK)
                        placed += 1;
                }
            }
        }
    }
    if (this.storage && this.storage.store.energy > 30000) {
        for (const structureType of [
            STRUCTURE_TOWER,
            STRUCTURE_SPAWN,
            STRUCTURE_STORAGE,
            STRUCTURE_TERMINAL,
            STRUCTURE_FACTORY,
            STRUCTURE_LAB,
        ]) {
            const structures = this.find(FIND_MY_STRUCTURES, { filter: { structureType: structureType } });
            for (const structure of structures) {
                if (placed > 10)
                    continue;
                let rampart = structure.pos.lookFor(LOOK_STRUCTURES).filter(st => st.structureType == STRUCTURE_RAMPART);
                let rampartc = structure.pos
                    .lookFor(LOOK_CONSTRUCTION_SITES)
                    .filter(st => st.structureType == STRUCTURE_RAMPART);
                if (rampart.length == 0 && rampartc.length == 0) {
                    if (this.createConstructionSite(structure.pos.x, structure.pos.y, STRUCTURE_RAMPART) === OK)
                        placed += 1;
                }
            }
        }
    }
    if (Memory.roomVisuals)
        this.visual.connectRoads();
};

function constructionManager(room) {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    if (!room.memory.PC)
        basePlanner(room);
    manageControllerStructures();
    function manageControllerStructures() {
        const centerUpgradePos = room.get('centerUpgradePos');
        if (!centerUpgradePos)
            return;
        if (room.controller.level >= 5) {
            const controllerContainer = room.controllerContainer;
            if (controllerContainer)
                controllerContainer.destroy();
            room.createConstructionSite(centerUpgradePos, STRUCTURE_LINK);
            return;
        }
        room.createConstructionSite(centerUpgradePos, STRUCTURE_CONTAINER);
    }
    room.clearOtherStructures();
    room.communeConstructionPlacement();
    if (Memory.CPULogging)
        customLog('Construction Manager', `CPU: ${(Game.cpu.getUsed() - managerCPUStart).toFixed(2)}`, undefined, myColors.lightGrey);
}

Room.prototype.defenceManager = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    this.advancedActivateSafeMode();
    this.manageRampartPublicity();
    if (Memory.CPULogging)
        customLog('Defence Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
};
Room.prototype.manageRampartPublicity = function () {
    const enemyAttackers = this.enemyAttackers.filter(function (creep) {
        return !creep.isOnExit();
    });
    if (!enemyAttackers.length) {
        if (!Memory.publicRamparts)
            return;
        if (Game.time % Math.floor(Math.random() * 50) !== 0)
            return;
        let intents = 0;
        for (const rampart of this.structures.rampart) {
            if (intents >= 10)
                return;
            if (rampart.isPublic)
                continue;
            rampart.setPublic(true);
            intents += 1;
        }
        return;
    }
    for (const rampart of this.structures.rampart)
        if (rampart.isPublic)
            rampart.setPublic(false);
};
Room.prototype.advancedActivateSafeMode = function () {
    if (this.controller.safeModeCooldown)
        return;
    if (this.controller.safeModeAvailable === 0)
        return;
    if (this.controller.upgradeBlocked > 0)
        return;
    const nonInvaderAttackers = this.enemyAttackers.filter(enemyCreep => !enemyCreep.isOnExit() && enemyCreep.owner.username);
    if (!nonInvaderAttackers.length)
        return;
    const eventLog = this.getEventLog();
    for (const eventItem of eventLog) {
        if (eventItem.event !== EVENT_ATTACK)
            continue;
        const attackTarget = findObjectWithID(eventItem.data.targetId);
        if (!(attackTarget instanceof Structure))
            continue;
        if (!safemodeTargets.includes(attackTarget.structureType))
            continue;
        this.controller.activateSafeMode();
        return;
    }
};

Room.prototype.allyCreepRequestManager = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    if (this.memory.allyCreepRequest) {
        Memory.allyCreepRequests[this.memory.allyCreepRequest].needs[AllyCreepRequestNeeds.allyVanguard] = 20;
        const request = Game.rooms[this.memory.allyCreepRequest];
        if (!request)
            return;
        if (request.controller &&
            request.controller.owner &&
            !Memory.allyList.includes(request.controller.owner.username)) {
            Memory.allyCreepRequests[this.memory.allyCreepRequest].needs[AllyCreepRequestNeeds.allyVanguard] += 1;
            return;
        }
        if (!request.allyCSites.length) {
            delete Memory.allyCreepRequests[this.memory.allyCreepRequest];
            delete this.memory.allyCreepRequest;
            return;
        }
        if (request.enemyCreeps.length) {
            Memory.allyCreepRequests[this.memory.allyCreepRequest].abandon = 20000;
            Memory.allyCreepRequests[this.memory.allyCreepRequest].needs[AllyCreepRequestNeeds.allyVanguard] = 0;
            delete this.memory.allyCreepRequest;
        }
    }
    if (Memory.CPULogging)
        customLog('Ally Creep Request Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
};

Room.prototype.claimRequestManager = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    if (this.memory.claimRequest) {
        if (!Memory.claimRequests[this.memory.claimRequest]) {
            delete this.memory.claimRequest;
            return;
        }
        if (Memory.claimRequests[this.memory.claimRequest].abandon > 0) {
            delete Memory.claimRequests[this.memory.claimRequest].responder;
            delete this.memory.claimRequest;
            return;
        }
        if (this.energyCapacityAvailable < 650) {
            delete Memory.claimRequests[this.memory.claimRequest].responder;
            delete this.memory.claimRequest;
            return;
        }
        const claimTarget = Game.rooms[this.memory.claimRequest];
        if (!claimTarget || !claimTarget.controller.my) {
            Memory.claimRequests[this.memory.claimRequest].needs[ClaimRequestNeeds.claimer] += 1;
            return;
        }
        if (claimTarget.structures.spawn.length) {
            delete Memory.claimRequests[this.memory.claimRequest];
            delete this.memory.claimRequest;
            return;
        }
        const invaderCores = claimTarget.structures.invaderCore;
        if (invaderCores.length) {
            Memory.claimRequests[this.memory.claimRequest].abandon = invaderCores[0].effects[EFFECT_COLLAPSE_TIMER].ticksRemaining + CONTROLLER_RESERVE_MAX;
            delete Memory.claimRequests[this.memory.claimRequest].responder;
            delete this.memory.claimRequest;
            return;
        }
        Memory.claimRequests[this.memory.claimRequest].needs[ClaimRequestNeeds.vanguard] = claimTarget.structures.spawn
            .length
            ? 0
            : 20;
        Memory.claimRequests[this.memory.claimRequest].needs[ClaimRequestNeeds.vanguardDefender] = 0;
        for (const enemyCreep of claimTarget.enemyCreeps) {
            if (enemyCreep.owner.username === 'Invader')
                continue;
            Memory.claimRequests[this.memory.claimRequest].needs[ClaimRequestNeeds.vanguardDefender] +=
                enemyCreep.strength;
        }
        return;
    }
    if (Memory.CPULogging)
        customLog('Claim Request Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
};

Room.prototype.attackRequestManager = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    for (let index = 0; index < this.memory.attackRequests.length; index++) {
        const roomName = this.memory.attackRequests[index];
        Memory.attackRequests[roomName].needs[AttackRequestNeeds.ranged] = 10;
        const request = Game.rooms[roomName];
        if (!request)
            return;
        if (request.enemyAttackers.length) {
            Memory.attackRequests[roomName].abandon = 1500;
            Memory.attackRequests[roomName].needs[AttackRequestNeeds.ranged] = 0;
            this.memory.attackRequests.splice(index, 1);
        }
        if (!request.enemyCreeps.length) {
            Memory.attackRequests[roomName].abandon = 1500;
            Memory.attackRequests[roomName].needs[AttackRequestNeeds.ranged] = 0;
            this.memory.attackRequests.splice(index, 1);
        }
    }
    if (Memory.CPULogging)
        customLog('Attack Request Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
};

Room.prototype.factoryManager = function () {
    const factory = this.structures.factory[0];
    const room = this;
    if (!factory)
        return;
    function allComponents(product) {
        let result = [];
        if (factory && COMMODITIES[product].level && COMMODITIES[product].level != factory.level)
            return [];
        for (let component of Object.keys(COMMODITIES[product].components)) {
            result.push(component);
            if (!BASE_RESOURCES.includes(component) &&
                COMMODITIES[component]) {
                result = result.concat(allComponents(component));
            }
        }
        return _.uniq(result);
    }
    function updateUsableResources() {
        if (!getProduct()) {
            room.memory.factoryUsableResources = [];
            return;
        }
        room.memory.factoryUsableResources = allComponents(getProduct());
    }
    function setProduct(product) {
        room.memory.factoryProduct = product;
        updateUsableResources();
    }
    function getProduct() {
        return room.memory.factoryProduct;
    }
    const BASE_RESOURCES = ['energy', 'H', 'O', 'U', 'L', 'K', 'Z', 'X', 'G'];
    function haveAllMaterials(resource) {
        var currentlyHaveAllMaterials = true;
        if (COMMODITIES[resource].level && COMMODITIES[resource].level !== factory.level) {
            return false;
        }
        for (const component in COMMODITIES[resource].components) {
            let required = COMMODITIES[resource].components[component];
            var comonentOnHand = room.findStoredResourceAmount(component);
            if (BASE_RESOURCES.includes(component) ||
                !COMMODITIES[component]) {
                if (comonentOnHand < required)
                    currentlyHaveAllMaterials = false;
            }
            else {
                if (comonentOnHand < required)
                    if (!haveAllMaterials(component))
                        currentlyHaveAllMaterials = false;
            }
        }
        return currentlyHaveAllMaterials;
    }
    function nextProduction(product) {
        if (!product)
            product = getProduct();
        if (!product)
            return null;
        let receipe = COMMODITIES[product];
        if (!receipe)
            return null;
        let missingComponents = _.filter(Object.keys(receipe.components), r => factory.store[r] <
            receipe.components[r]);
        if (missingComponents.length == 0 && (!receipe.level || receipe.level == factory.level)) {
            return product;
        }
        else {
            for (let component of missingComponents) {
                if (!BASE_RESOURCES.includes(component) &&
                    COMMODITIES[component]) {
                    let result = nextProduction(component);
                    if (result)
                        return result;
                }
            }
        }
        return null;
    }
    function pickProduct() {
        setProduct(null);
        if (room.findStoredResourceAmount(RESOURCE_ENERGY) > 150000 &&
            (room.storage.store.getFreeCapacity() < 100000 || room.findStoredResourceAmount(RESOURCE_BATTERY) < 5000)) {
            setProduct(RESOURCE_BATTERY);
            return;
        }
        if (room.findStoredResourceAmount(RESOURCE_ENERGY) < 20000 &&
            room.findStoredResourceAmount(RESOURCE_BATTERY) >= 600) {
            setProduct(RESOURCE_ENERGY);
            return;
        }
        let stuffToMake = [
            RESOURCE_CONDENSATE,
            RESOURCE_WIRE,
            RESOURCE_ALLOY,
            RESOURCE_CELL,
            RESOURCE_REDUCTANT,
            RESOURCE_OXIDANT,
            RESOURCE_PURIFIER,
            RESOURCE_GHODIUM_MELT,
            RESOURCE_LEMERGIUM_BAR,
            RESOURCE_UTRIUM_BAR,
            RESOURCE_KEANIUM_BAR,
            RESOURCE_ZYNTHIUM_BAR,
            RESOURCE_BATTERY,
            RESOURCE_COMPOSITE,
        ];
        for (var resource of stuffToMake) {
            let productionTarget = 10000;
            if (resource == RESOURCE_COMPOSITE)
                productionTarget = 200;
            var totalOnHand = room.findStoredResourceAmount(resource);
            if (resource == RESOURCE_BATTERY && room.findStoredResourceAmount(RESOURCE_ENERGY) < 200000)
                continue;
            if ((totalOnHand < productionTarget &&
                ![
                    RESOURCE_UTRIUM_BAR,
                    RESOURCE_LEMERGIUM_BAR,
                    RESOURCE_ZYNTHIUM_BAR,
                    RESOURCE_KEANIUM_BAR,
                    RESOURCE_OXIDANT,
                    RESOURCE_REDUCTANT,
                    RESOURCE_PURIFIER,
                ].includes(resource)) ||
                resource == RESOURCE_WIRE ||
                resource == RESOURCE_CONDENSATE ||
                resource == RESOURCE_CELL ||
                resource == RESOURCE_ALLOY ||
                (resource == RESOURCE_PURIFIER && room.findStoredResourceAmount(RESOURCE_CATALYST) > 10000) ||
                (resource == RESOURCE_UTRIUM_BAR && room.findStoredResourceAmount(RESOURCE_UTRIUM) > 10000) ||
                (resource == RESOURCE_LEMERGIUM_BAR && room.findStoredResourceAmount(RESOURCE_LEMERGIUM) > 10000) ||
                (resource == RESOURCE_ZYNTHIUM_BAR &&
                    room.findStoredResourceAmount(RESOURCE_ZYNTHIUM) > 10000 &&
                    room.findStoredResourceAmount(RESOURCE_ZYNTHIUM) >
                        room.findStoredResourceAmount(RESOURCE_ZYNTHIUM_BAR)) ||
                (resource == RESOURCE_KEANIUM_BAR &&
                    room.findStoredResourceAmount(RESOURCE_KEANIUM) > 10000 &&
                    room.findStoredResourceAmount(RESOURCE_KEANIUM) >
                        room.findStoredResourceAmount(RESOURCE_KEANIUM_BAR)) ||
                (resource == RESOURCE_OXIDANT &&
                    room.findStoredResourceAmount(RESOURCE_OXYGEN) > 10000 &&
                    room.findStoredResourceAmount(RESOURCE_OXYGEN) > room.findStoredResourceAmount(RESOURCE_OXIDANT)) ||
                (resource == RESOURCE_REDUCTANT &&
                    room.findStoredResourceAmount(RESOURCE_HYDROGEN) > 10000 &&
                    room.findStoredResourceAmount(RESOURCE_HYDROGEN) >
                        room.findStoredResourceAmount(RESOURCE_REDUCTANT))) {
                let currentlyHaveAllMaterials = haveAllMaterials(resource);
                if (!currentlyHaveAllMaterials)
                    continue;
                setProduct(resource);
                break;
            }
        }
    }
    function runFactory() {
        if (!getProduct())
            return;
        if (factory.cooldown > 0)
            return;
        let product = nextProduction(null);
        if (!product)
            return;
        var result = factory.produce(product);
        if (result == ERR_BUSY) {
            console.log('runfactory: ' + room.name + ' needs activating.');
        }
        else if (result != OK) {
            console.log('runFactory produce error: ' + result);
        }
        else ;
    }
    if (factory.cooldown > 0)
        return;
    if (Game.time % 10 == 0) {
        pickProduct();
    }
    runFactory();
};

const reactionCycleAmount = 5000;
const reverseReactions = {
    G: ['ZK', 'UL'],
    ZK: ['Z', 'K'],
    UL: ['U', 'L'],
    OH: ['H', 'O'],
    LH: ['L', 'H'],
    LO: ['L', 'O'],
    KO: ['K', 'O'],
    KH: ['K', 'H'],
    GH: ['G', 'H'],
    GO: ['G', 'O'],
    UO: ['U', 'O'],
    UH: ['U', 'H'],
    ZH: ['Z', 'H'],
    ZO: ['Z', 'O'],
    LH2O: ['LH', 'OH'],
    LHO2: ['LO', 'OH'],
    GH2O: ['GH', 'OH'],
    GHO2: ['GO', 'OH'],
    KHO2: ['KO', 'OH'],
    KH2O: ['KH', 'OH'],
    UH2O: ['UH', 'OH'],
    UHO2: ['UO', 'OH'],
    ZH2O: ['ZH', 'OH'],
    ZHO2: ['ZO', 'OH'],
    XLH2O: ['X', 'LH2O'],
    XLHO2: ['X', 'LHO2'],
    XGH2O: ['X', 'GH2O'],
    XGHO2: ['X', 'GHO2'],
    XKHO2: ['X', 'KHO2'],
    XKH2O: ['X', 'KH2O'],
    XUH2O: ['X', 'UH2O'],
    XUHO2: ['X', 'UHO2'],
    XZH2O: ['X', 'ZH2O'],
    XZHO2: ['X', 'ZHO2'],
};
const allCompounds = [...Object.keys(reverseReactions), ...minerals];
function decompose(compound) {
    return reverseReactions[compound];
}
const boostsInOrder = [
    RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    RESOURCE_ZYNTHIUM_ALKALIDE,
    RESOURCE_ZYNTHIUM_OXIDE,
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
    RESOURCE_GHODIUM_ALKALIDE,
    RESOURCE_GHODIUM_OXIDE,
    RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    RESOURCE_LEMERGIUM_ALKALIDE,
    RESOURCE_LEMERGIUM_OXIDE,
    RESOURCE_CATALYZED_UTRIUM_ACID,
    RESOURCE_UTRIUM_ACID,
    RESOURCE_UTRIUM_HYDRIDE,
    RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
    RESOURCE_KEANIUM_ALKALIDE,
    RESOURCE_KEANIUM_OXIDE,
    RESOURCE_CATALYZED_ZYNTHIUM_ACID,
    RESOURCE_ZYNTHIUM_ACID,
    RESOURCE_ZYNTHIUM_HYDRIDE,
    RESOURCE_CATALYZED_GHODIUM_ACID,
    RESOURCE_GHODIUM_ACID,
    RESOURCE_GHODIUM_HYDRIDE,
    RESOURCE_CATALYZED_KEANIUM_ACID,
    RESOURCE_KEANIUM_ACID,
    RESOURCE_KEANIUM_HYDRIDE,
    RESOURCE_CATALYZED_LEMERGIUM_ACID,
    RESOURCE_LEMERGIUM_ACID,
    RESOURCE_LEMERGIUM_HYDRIDE,
    RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
    RESOURCE_UTRIUM_ALKALIDE,
    RESOURCE_UTRIUM_OXIDE,
];
class LabManager {
    constructor(communeManager) {
        this.targetCompounds = {
            KH: 5000,
            G: 20000,
            OH: 5000,
        };
        this.deficits = {};
        this.requestedBoosts = [];
        this.communeManager = communeManager;
    }
    demandBoost(creep, boost) {
        if (creep.ticksToLive < CREEP_LIFE_TIME - 100)
            return false;
        if (creep.boosts[boost] > 0)
            return false;
        const labId = this.assignedBoosts[boost];
        if (!labId)
            return true;
        const lab = this.communeManager.structures.lab.find(lab => lab.id == labId);
        if (lab.mineralType != boost)
            return true;
        let result = lab.boostCreep(creep);
        if (result == OK)
            return false;
        if (result == ERR_NOT_IN_RANGE) {
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [
                    {
                        pos: lab.pos,
                        range: 1,
                    },
                ],
                avoidEnemyRanges: true,
            });
        }
        else {
            creep.message += 'BE' + result;
        }
        return true;
    }
    labsInRange(thisLab, otherLab = null) {
        return _.filter(this.communeManager.structures.lab, lab => lab != thisLab && lab != otherLab && lab.pos.getRangeTo(thisLab.pos) <= 2).length;
    }
    doLayoutCheck() {
        if (this.lastLayoutCheck + 1000 > Game.time)
            return;
        if (!this.lab1Id || !this.lab2Id || !this.input1 || !this.input2) {
            this.lab1Id = null;
            this.lab2Id = null;
            if (this.communeManager.structures.lab.length >= 3) {
                let sorted = _.sortBy(this.communeManager.structures.lab, lab => { var _a; return lab.pos.getRangeTo((_a = this.communeManager.room.terminal) === null || _a === void 0 ? void 0 : _a.pos); });
                let bestLab = sorted[0];
                for (let i = 2; i < sorted.length; i++) {
                    let thisLab = sorted[i];
                    if (this.labsInRange(thisLab) > this.labsInRange(bestLab))
                        bestLab = thisLab;
                }
                this.lab1Id = bestLab.id;
                let lab1 = bestLab;
                bestLab = sorted[1];
                for (let i = 2; i < sorted.length; i++) {
                    let thisLab = sorted[i];
                    if (this.labsInRange(thisLab, lab1) > this.labsInRange(bestLab, lab1))
                        bestLab = thisLab;
                }
                this.lab2Id = bestLab.id;
                if (this.labsInRange(bestLab) == 0 || this.labsInRange(lab1) == 0) {
                    this.lab1Id = null;
                    this.lab2Id = null;
                }
            }
        }
        this.lastLayoutCheck = Game.time;
    }
    get input1() {
        return _.find(this.communeManager.structures.lab, lab => lab.id == this.lab1Id);
    }
    get input2() {
        return _.find(this.communeManager.structures.lab, lab => lab.id == this.lab2Id);
    }
    get outputs() {
        let boostingLabs = Object.values(this.assignedBoosts);
        return _.filter(this.communeManager.structures.lab, lab => lab.id != this.lab1Id && lab.id != this.lab2Id && !boostingLabs.includes(lab.id));
    }
    get all() {
        return this.communeManager.structures.lab;
    }
    isProperlyLoaded() {
        if ((this.input1.mineralType == this.input1Rsc || this.input1.mineralType == null) &&
            (this.input2.mineralType == this.input2Rsc || this.input2.mineralType == null))
            return true;
        return false;
    }
    run() {
        if (!this.communeManager.room.storage || !this.communeManager.room.terminal)
            return;
        this.doLayoutCheck();
        this.assignBoosts();
        if (this.lab1Id) {
            this.updateDeficits();
            this.setCurrentReaction();
            if (this.isProperlyLoaded) {
                this.react();
            }
        }
    }
    assignBoosts() {
        this.assignedBoosts = {};
        for (let compund of boostsInOrder) {
            if (this.requestedBoosts.includes(compund)) {
                if (this.input1Rsc === compund) {
                    this.assignedBoosts[compund] = this.lab1Id;
                    continue;
                }
                if (this.input2Rsc === compund) {
                    this.assignedBoosts[compund] = this.lab2Id;
                    continue;
                }
                let boostingLabs = Object.values(this.assignedBoosts);
                let freelabs = this.communeManager.structures.lab.filter(lab => lab.id != this.lab1Id && lab.id != this.lab2Id && !boostingLabs.includes(lab.id));
                if (freelabs.length == 0 && this.lab1Id && !boostingLabs.includes(this.lab1Id)) {
                    freelabs = [this.input1];
                }
                if (freelabs.length == 0 && this.lab2Id && !boostingLabs.includes(this.lab2Id)) {
                    freelabs = [this.input2];
                }
                if (freelabs.length > 0) {
                    let pickedLab = freelabs.find(lab => lab.mineralType == compund);
                    if (!pickedLab)
                        pickedLab = freelabs[0];
                    this.assignedBoosts[compund] = pickedLab.id;
                }
                else {
                    return;
                }
            }
        }
    }
    get reactionAmountRemaining() {
        if (this.isReverse) {
            return this.amount(this.outputRsc) - this.targetAmount;
        }
        else {
            let minMaterial = _.min(_.map(decompose(this.outputRsc), comp => this.amount(comp)));
            return Math.min(minMaterial, this.targetAmount - this.amount(this.outputRsc));
        }
    }
    isValid() {
        return this.outputs.length > 0 && this.input1 != null && this.input2 != null;
    }
    reactionPossible() {
        if (!this.isValid())
            return false;
        if (!this.outputRsc)
            return false;
        if (!this.isReverse) {
            if (!this.input1.mineralType || !this.inputSatisfied(this.input1, this.input1Rsc))
                return false;
            if (!this.input2.mineralType || !this.inputSatisfied(this.input2, this.input2Rsc))
                return false;
        }
        return true;
    }
    inputSatisfied(inputLab, inputRsc) {
        if (!inputLab)
            return false;
        return !inputLab.mineralType || inputLab.mineralType === inputRsc;
    }
    inputFull(inputLab) {
        if (!inputLab)
            return false;
        if (!inputLab.mineralType)
            return false;
        return (inputLab.store.getFreeCapacity(inputLab.mineralType) === 0 &&
            inputLab.store.getUsedCapacity(inputLab.mineralType) >= this.reactionAmountRemaining);
    }
    react() {
        if (!this.isValid())
            return false;
        if (!this.reactionPossible())
            return false;
        for (let output of this.outputs) {
            if (this.isReverse) {
                if (output.mineralType == this.outputRsc && output.store[this.outputRsc] >= LAB_REACTION_AMOUNT)
                    output.reverseReaction(this.input1, this.input2);
            }
            else {
                output.runReaction(this.input1, this.input2);
            }
        }
        return true;
    }
    chainDecompose(compound, amount) {
        this.deficits[compound] = amount + (this.deficits[compound] || 0);
        amount = Math.min(amount, this.deficits[compound]);
        amount = Math.max(amount, 0);
        let decomps = decompose(compound);
        for (var c in decomps) {
            this.chainDecompose(decomps[c], amount);
        }
    }
    updateDeficits() {
        if (Game.time % 10 != 0)
            return;
        this.deficits = {};
        for (let key of allCompounds) {
            this.deficits[key] = -this.amount(key);
        }
        for (let compound in this.targetCompounds) {
            var amount = Math.max(0, 10000);
            this.chainDecompose(compound, amount);
        }
        for (let key of Object.keys(this.deficits)) {
            if (this.deficits[key] < 0)
                this.deficits[key] = 0;
        }
    }
    setupReaction(outputRsc, targetAmount, reverse) {
        this.outputRsc = outputRsc;
        if (outputRsc == null) {
            this.input1Rsc = null;
            this.input2Rsc = null;
        }
        else {
            this.input1Rsc = reverseReactions[outputRsc][0];
            this.input2Rsc = reverseReactions[outputRsc][1];
        }
        this.isReverse = reverse;
        this.targetAmount = targetAmount;
    }
    setCurrentReaction() {
        if (this.snoozeUntil && this.snoozeUntil > Game.time)
            return;
        if (!this.isCurrentReactionFinished() && this.replanAt > Game.time)
            return;
        let nextReaction = this.findNextReaction();
        if (nextReaction) {
            this.setupReaction(nextReaction.type, this.amount(nextReaction.type) + Math.min(reactionCycleAmount, nextReaction.amount), false);
        }
        else if (this.communeManager.room.storage.store['GO'] > 1000) {
            this.setupReaction('GO', 1000, true);
        }
        else if (this.communeManager.room.storage.store['LO'] > 500) {
            this.setupReaction('LO', 500, true);
        }
        else {
            this.setupReaction(null, 0, false);
            this.snoozeUntil = Game.time + 30;
        }
        this.replanAt = Game.time + 3000;
    }
    isCurrentReactionFinished() {
        let currentReaction = this.outputRsc;
        if (!currentReaction)
            return true;
        if (this.isReverse) {
            if (this.amount(currentReaction) <= this.targetAmount)
                return true;
            return false;
        }
        else {
            if (_.any(decompose(currentReaction), r => this.amount(r) < LAB_REACTION_AMOUNT))
                return true;
            return this.amount(currentReaction) >= this.targetAmount;
        }
    }
    chainFindNextReaction(target, targetAmount) {
        let nextReaction = target;
        let missing = _.filter(decompose(nextReaction), r => this.amount(r) < LAB_REACTION_AMOUNT);
        console.log(targetAmount + ':' + target + ' missing: ' + JSON.stringify(missing));
        if (missing.length === 0)
            return { type: target, amount: targetAmount };
        missing = _.filter(decompose(nextReaction), r => this.amount(r) < targetAmount);
        missing = _.filter(missing, r => decompose(r));
        for (let target of missing) {
            var result = this.chainFindNextReaction(target, targetAmount - this.amount(target));
            if (result)
                return result;
        }
        return null;
    }
    findNextReaction() {
        let targets = _.sortBy(_.filter(Object.keys(this.targetCompounds), v => this.deficits[v] > 0), v => -this.deficits[v]);
        for (let target of targets) {
            var result = this.chainFindNextReaction(target, this.deficits[target]);
            if (result)
                return result;
        }
        return null;
    }
    setupInputLab(creep, inputLab, inputRsc) {
        var _a, _b, _c, _d;
        if (inputLab.mineralType == inputRsc || inputLab.mineralType == null) {
            let source = ((_a = this.communeManager.room) === null || _a === void 0 ? void 0 : _a.storage.store[inputRsc]) > ((_b = this.communeManager.room) === null || _b === void 0 ? void 0 : _b.terminal.store[inputRsc])
                ? this.communeManager.room.storage
                : this.communeManager.room.terminal;
            let amount = Math.min(creep.store.getFreeCapacity(), source.store[inputRsc], inputLab.store.getFreeCapacity(inputRsc));
            amount = Math.max(amount, 0);
            if (inputLab.store.getFreeCapacity(inputRsc) >= creep.store.getCapacity()) {
                creep.createReservation('withdraw', source.id, amount, inputRsc);
                creep.createReservation('transfer', inputLab.id, amount, inputRsc);
            }
        }
        else {
            let amount = Math.min(creep.store.getFreeCapacity(), inputLab.store[inputLab.mineralType]);
            creep.createReservation('withdraw', inputLab.id, amount, inputLab.mineralType);
            creep.createReservation('transfer', (_c = this.communeManager.room.storage) === null || _c === void 0 ? void 0 : _c.id, amount + creep.store[inputLab.mineralType], inputLab.mineralType);
        }
        if (((_d = creep.memory.reservations) === null || _d === void 0 ? void 0 : _d.length) > 0)
            return true;
        return false;
    }
    setupOutputLab(creep, outputLab) {
        var _a, _b;
        if ((outputLab.mineralType != null && outputLab.mineralType != this.outputRsc) ||
            outputLab.usedStore(this.outputRsc) >= creep.store.getFreeCapacity()) {
            let amount = Math.min(creep.freeStore(), outputLab.store[outputLab.mineralType]);
            if (amount != 0)
                creep.createReservation('withdraw', outputLab.id, amount, outputLab.mineralType);
            if (amount + creep.usedStore(outputLab.mineralType) != 0)
                creep.createReservation('transfer', (_a = this.communeManager.room.storage) === null || _a === void 0 ? void 0 : _a.id, amount + creep.store[outputLab.mineralType], outputLab.mineralType);
        }
        if (((_b = creep.memory.reservations) === null || _b === void 0 ? void 0 : _b.length) > 0)
            return true;
        return false;
    }
    setupBoosterLab(creep, lab, compound) {
        var _a, _b, _c, _d, _e, _f;
        if (lab.mineralType == compound || lab.mineralType == null) {
            if (lab.store[RESOURCE_ENERGY] / 30 < lab.store[compound] / 20 &&
                lab.store.getFreeCapacity(RESOURCE_ENERGY) > creep.store.getCapacity()) {
                let source = ((_a = this.communeManager.room) === null || _a === void 0 ? void 0 : _a.storage.store[RESOURCE_ENERGY]) >
                    ((_b = this.communeManager.room) === null || _b === void 0 ? void 0 : _b.terminal.store[RESOURCE_ENERGY])
                    ? this.communeManager.room.storage
                    : this.communeManager.room.terminal;
                creep.createReservation('withdraw', source.id, creep.store.getCapacity(), RESOURCE_ENERGY);
                creep.createReservation('transfer', lab.id, creep.store.getCapacity(), RESOURCE_ENERGY);
            }
            else {
                let source = ((_c = this.communeManager.room) === null || _c === void 0 ? void 0 : _c.storage.store[compound]) >
                    ((_d = this.communeManager.room) === null || _d === void 0 ? void 0 : _d.terminal.store[compound])
                    ? this.communeManager.room.storage
                    : this.communeManager.room.terminal;
                let amount = Math.min(creep.store.getFreeCapacity(), source.store[compound], lab.store.getFreeCapacity(compound));
                amount = Math.max(amount, 0);
                if (lab.store.getFreeCapacity(compound) >= creep.store.getCapacity()) {
                    creep.createReservation('withdraw', source.id, amount, compound);
                    creep.createReservation('transfer', lab.id, amount, compound);
                }
            }
        }
        else {
            let amount = Math.min(creep.store.getFreeCapacity(), lab.store[lab.mineralType]);
            creep.createReservation('withdraw', lab.id, amount, lab.mineralType);
            creep.createReservation('transfer', (_e = this.communeManager.room.storage) === null || _e === void 0 ? void 0 : _e.id, amount + creep.store[lab.mineralType], lab.mineralType);
        }
        if (((_f = creep.memory.reservations) === null || _f === void 0 ? void 0 : _f.length) > 0)
            return true;
        return false;
    }
    amount(resource) {
        if (!resource)
            return 0;
        let storageAmount = this.communeManager.room.storage.store[resource] || 0;
        let terminalAmount = (this.communeManager.room.terminal && this.communeManager.room.terminal.store[resource]) || 0;
        let labAmount = _.sum(_.filter(this.all, l => l.mineralType == resource), l => l.mineralAmount);
        let haulerAmount = _.sum(this.communeManager.room.myCreeps.hauler, crName => { var _a; return ((_a = Game.creeps[crName]) === null || _a === void 0 ? void 0 : _a.store[resource]) || 0; });
        return storageAmount + terminalAmount + labAmount + haulerAmount;
    }
    requestBoost(compound) {
        if (!this.requestedBoosts.includes(compound))
            this.requestedBoosts.push(compound);
    }
    generateHaulingReservation(creep) {
        if (this.assignedBoosts) {
            for (const compound in this.assignedBoosts) {
                const labId = this.assignedBoosts[compound];
                const lab = this.communeManager.structures.lab.find(lab => lab.id == labId);
                if (this.setupBoosterLab(creep, lab, compound))
                    return;
            }
        }
        if (!this.lab1Id || !this.lab2Id)
            return;
        if (this.input2.store[this.input2Rsc] > this.input1.store[this.input1Rsc]) {
            if (this.setupInputLab(creep, this.input1, this.input1Rsc))
                return;
            if (this.setupInputLab(creep, this.input2, this.input2Rsc))
                return;
        }
        else {
            if (this.setupInputLab(creep, this.input2, this.input2Rsc))
                return;
            if (this.setupInputLab(creep, this.input1, this.input1Rsc))
                return;
        }
        for (const output of this.outputs)
            if (this.setupOutputLab(creep, output))
                return;
    }
}

Room.prototype.towerManager = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    if (!this.structures.tower.length)
        return;
    this.towersAttackCreeps();
    this.towersHealCreeps();
    this.towersRepairRamparts();
    if (Memory.CPULogging)
        customLog('Tower Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
};
Room.prototype.towersHealCreeps = function () {
    const healTargets = this.myDamagedCreeps.concat(this.allyDamagedCreeps).filter(creep => {
        return creep.body.length > 1 && creep.hits < creep.hitsMax && !creep.isOnExit();
    });
    if (!healTargets.length)
        return;
    const target = healTargets[0];
    for (const tower of this.structures.tower) {
        if (tower.inactionable)
            continue;
        if (tower.store.energy < TOWER_ENERGY_COST)
            continue;
        if (tower.store.energy <= tower.store.getCapacity(RESOURCE_ENERGY) * 0.5)
            continue;
        if (tower.heal(target) !== OK)
            continue;
        tower.inactionable = true;
        continue;
    }
};
Room.prototype.towersAttackCreeps = function () {
    const attackTargets = this.enemyCreeps.filter(function (creep) {
        return !creep.isOnExit();
    });
    if (!attackTargets.length)
        return;
    const attackTarget = attackTargets.sort(function (a, b) {
        return a.towerDamage - b.towerDamage;
    })[attackTargets.length - 1];
    if (attackTarget.towerDamage <= 0)
        return;
    if (attackTargets[attackTargets.length - 1].towerDamage > 0)
        this.towerSuperiority = true;
    if (attackTargets.length >= 15)
        this.towerSuperiority = false;
    for (const tower of this.structures.tower) {
        if (tower.inactionable)
            continue;
        if (tower.store.energy < TOWER_ENERGY_COST)
            continue;
        if (tower.attack(attackTarget) !== OK)
            continue;
        tower.inactionable = true;
        continue;
    }
};
Room.prototype.towersRepairRamparts = function () {
    const ramparts = this.structures.rampart.filter(function (rampart) {
        return rampart.hits <= RAMPART_DECAY_AMOUNT;
    });
    if (!ramparts.length)
        return;
    for (const tower of this.structures.tower) {
        if (tower.inactionable)
            continue;
        if (tower.store.energy < TOWER_ENERGY_COST)
            continue;
        const target = ramparts[ramparts.length - 1];
        if (!target)
            continue;
        if (tower.repair(target) !== OK)
            continue;
        if (global.roomStats.commune[this.name])
            global.roomStats.commune[this.name].eorwr += TOWER_ENERGY_COST;
        tower.inactionable = true;
        ramparts.pop();
        continue;
    }
};

Room.prototype.linkManager = function () {
    if (!this.storage)
        return;
    const sourceLinks = this.sourceLinks;
    const receiverLinks = [this.fastFillerLink, this.hubLink, this.controllerLink];
    this.sourcesToReceivers(sourceLinks, receiverLinks);
    this.hubToFastFiller(this.hubLink, this.fastFillerLink);
    this.hubToController(this.hubLink, this.controllerLink);
};
Room.prototype.sourcesToReceivers = function (sourceLinks, receiverLinks) {
    for (const sourceLink of sourceLinks) {
        if (!sourceLink)
            continue;
        if (sourceLink.store.getCapacity(RESOURCE_ENERGY) * linkSendThreshold > sourceLink.store.energy)
            continue;
        for (const receiverLink of receiverLinks) {
            if (!receiverLink)
                continue;
            if (receiverLink.store.energy > receiverLink.store.getCapacity(RESOURCE_ENERGY) * linkReceiveTreshold)
                continue;
            sourceLink.transferEnergy(receiverLink);
            receiverLink.store.energy += sourceLink.store.energy;
            sourceLink.store.energy -= receiverLink.store.getCapacity(RESOURCE_ENERGY) - receiverLink.store.energy;
            break;
        }
    }
};
Room.prototype.hubToFastFiller = function (hubLink, fastFillerLink) {
    if (!hubLink || !fastFillerLink)
        return;
    if (hubLink.store.getCapacity(RESOURCE_ENERGY) * linkSendThreshold > hubLink.store.energy)
        return;
    if (fastFillerLink.store.energy > fastFillerLink.store.getCapacity(RESOURCE_ENERGY) * linkReceiveTreshold)
        return;
    hubLink.transferEnergy(fastFillerLink);
    fastFillerLink.store.energy += hubLink.store.energy;
    hubLink.store.energy -= fastFillerLink.store.getCapacity(RESOURCE_ENERGY) - fastFillerLink.store.energy;
};
Room.prototype.hubToController = function (hubLink, controllerLink) {
    if (this.controller.ticksToDowngrade > 10000 &&
        this.storage.store.energy < this.communeManager.storedEnergyUpgradeThreshold * 0.5)
        return;
    if (!hubLink || !controllerLink)
        return;
    if (hubLink.store.getCapacity(RESOURCE_ENERGY) * linkSendThreshold > hubLink.store.energy)
        return;
    if (controllerLink.store.energy > controllerLink.store.getCapacity(RESOURCE_ENERGY) * linkReceiveTreshold)
        return;
    hubLink.transferEnergy(controllerLink);
    controllerLink.store.energy += hubLink.store.energy;
    hubLink.store.energy -= controllerLink.store.getCapacity(RESOURCE_ENERGY) - controllerLink.store.energy;
};

class RemotesManager {
    constructor(communeManager) {
        this.communeManager = communeManager;
    }
    stage1() {
        for (let index = this.communeManager.room.memory.remotes.length - 1; index >= 0; index -= 1) {
            const remoteName = this.communeManager.room.memory.remotes[index];
            const remoteMemory = Memory.rooms[remoteName];
            if (remoteMemory.T !== 'remote' || remoteMemory.commune !== this.communeManager.room.name) {
                this.communeManager.room.memory.remotes.splice(index, 1);
                continue;
            }
            if (remoteMemory.abandoned > 0) {
                remoteMemory.abandoned -= 1;
                for (const need in remoteMemory.needs)
                    remoteMemory.needs[need] = 0;
                continue;
            }
            remoteMemory.needs[RemoteNeeds.source1RemoteHarvester] = 3;
            remoteMemory.needs[RemoteNeeds.source2RemoteHarvester] = remoteMemory.SIDs[1] ? 3 : 0;
            remoteMemory.needs[RemoteNeeds.remoteHauler0] = 0;
            remoteMemory.needs[RemoteNeeds.remoteHauler1] = 0;
            remoteMemory.needs[RemoteNeeds.remoteReserver] = 1;
            const remote = Game.rooms[remoteName];
            const possibleReservation = this.communeManager.room.energyCapacityAvailable >= 650;
            const isReserved = remote && remote.controller.reservation && remote.controller.reservation.username === Memory.me;
            if (possibleReservation) {
                remoteMemory.needs[RemoteNeeds.source1RemoteHarvester] *= 2;
                remoteMemory.needs[RemoteNeeds.source2RemoteHarvester] *= 2;
                if (isReserved && remote.controller.reservation.ticksToEnd >= Math.min(remoteMemory.RE * 5, 2500))
                    remoteMemory.needs[RemoteNeeds.remoteReserver] = 0;
            }
            if (remote) {
                remoteMemory.needs[RemoteNeeds.minDamage] = 0;
                remoteMemory.needs[RemoteNeeds.minHeal] = 0;
                for (const enemyCreep of remote.enemyCreeps) {
                    remoteMemory.needs[RemoteNeeds.minDamage] += enemyCreep.healStrength;
                    remoteMemory.needs[RemoteNeeds.minHeal] += enemyCreep.attackStrength;
                }
                if (remote.controller.reservation && remote.controller.reservation.username !== Memory.me)
                    remoteMemory.needs[RemoteNeeds.enemyReserved] = 1;
                else
                    remoteMemory.needs[RemoteNeeds.enemyReserved] = 0;
                remoteMemory.needs[RemoteNeeds.remoteCoreAttacker] = remote.structures.invaderCore.length;
                remoteMemory.needs[RemoteNeeds.invaderCore] = remote.structures.invaderCore.length;
                remoteMemory.needs[RemoteNeeds.remoteDismantler] =
                    Math.min(remote.actionableWalls.length, 1) ||
                        Math.min(remote.find(FIND_HOSTILE_STRUCTURES).filter(function (structure) {
                            return structure.structureType != STRUCTURE_INVADER_CORE;
                        }).length, 1);
            }
            if (remoteMemory.needs[RemoteNeeds.enemyReserved]) {
                remoteMemory.needs[RemoteNeeds.source1RemoteHarvester] = 0;
                remoteMemory.needs[RemoteNeeds.source2RemoteHarvester] = 0;
                remoteMemory.needs[RemoteNeeds.remoteHauler0] = 0;
                remoteMemory.needs[RemoteNeeds.remoteHauler1] = 0;
            }
            if (remoteMemory.needs[RemoteNeeds.invaderCore]) {
                remoteMemory.needs[RemoteNeeds.source1RemoteHarvester] = 0;
                remoteMemory.needs[RemoteNeeds.source2RemoteHarvester] = 0;
                remoteMemory.needs[RemoteNeeds.remoteHauler0] = 0;
                remoteMemory.needs[RemoteNeeds.remoteHauler1] = 0;
            }
        }
    }
    stage2() {
        for (let index = this.communeManager.room.memory.remotes.length - 1; index >= 0; index -= 1) {
            const remoteName = this.communeManager.room.memory.remotes[index];
            const remoteMemory = Memory.rooms[remoteName];
            if (remoteMemory.abandoned)
                continue;
            const remote = Game.rooms[remoteName];
            const isReserved = remote && remote.controller.reservation && remote.controller.reservation.username === Memory.me;
            for (let sourceIndex = 0; sourceIndex < remoteMemory.SE.length; sourceIndex += 1) {
                const income = Math.max((isReserved ? 10 : 5) -
                    Math.floor(Math.max(remoteMemory.needs[RemoteNeeds[remoteHarvesterRoles[sourceIndex]]], 0) * minHarvestWorkRatio), 0);
                remoteMemory.needs[RemoteNeeds[`remoteHauler${sourceIndex}`]] += findCarryPartsRequired(remoteMemory.SE[sourceIndex], income);
            }
        }
    }
}

class CommuneManager {
    constructor() {
        this.labManager = new LabManager(this);
        this.marketManager = new MarketManager(this);
        this.remotesManager = new RemotesManager(this);
    }
    update(room) {
        this.room = room;
        this.structures = room.structures;
    }
    run() {
        constructionManager(this.room);
        this.room.defenceManager();
        this.room.towerManager();
        try {
            this.marketManager.run();
        }
        catch (err) {
            customLog('Exception processing marketManager in ' + this.room.name + '. ', err + '\n' + err.stack, myColors.white, myColors.red);
        }
        this.room.linkManager();
        this.room.claimRequestManager();
        this.room.attackRequestManager();
        this.room.allyCreepRequestManager();
        this.remotesManager.stage2();
        this.room.spawnManager();
        this.room.factoryManager();
        this.labManager.run();
        this.test();
    }
    test() {
        return;
    }
    get storedEnergyUpgradeThreshold() {
        return this.room.controller.level * 10000;
    }
    get storedEnergyBuildThreshold() {
        return this.room.controller.level * 8000;
    }
}

InternationalManager.prototype.tickConfig = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    global.communes = new Set();
    statsManager.internationalPreTick();
    global.constructionSitesCount = Object.keys(Game.constructionSites).length;
    global.logs = ``;
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        room.moveRequests = new Map();
        room.creepPositions = new Map();
        room.myCreeps = {};
        for (const role of creepRoles)
            room.myCreeps[role] = [];
        room.myCreepsAmount = 0;
        room.roomObjects = {};
        room.creepsOfSourceAmount = [];
        for (const index in room.sources)
            room.creepsOfSourceAmount.push(0);
        const { controller } = room;
        if (!controller)
            continue;
        room.communeManager = global.communeManagers[room.name];
        if (!room.communeManager) {
            room.communeManager = new CommuneManager();
            global.communeManagers[room.name] = room.communeManager;
        }
        room.communeManager.update(room);
        if (controller.my)
            room.memory.T = 'commune';
        if (room.memory.T != 'commune')
            continue;
        if (!controller.my) {
            room.memory.T = 'neutral';
            continue;
        }
        if (!room.memory.attackRequests)
            room.memory.attackRequests = [];
        room.spawnRequests = {};
        if (!room.memory.remotes)
            room.memory.remotes = [];
        room.creepsFromRoomWithRemote = {};
        if (!room.memory.MHC) {
            room.memory.MHC = 0;
            room.memory.HU = 0;
        }
        room.haulerSizeManager();
        room.communeManager.remotesManager.stage1();
        global.communes.add(roomName);
        room.creepsFromRoom = {};
        for (let index = room.memory.remotes.length - 1; index >= 0; index -= 1) {
            const remoteName = room.memory.remotes[index];
            room.creepsFromRoomWithRemote[remoteName] = {};
            for (const role of spawnByRoomRemoteRoles)
                room.creepsFromRoomWithRemote[remoteName][role] = [];
        }
        for (const role of creepRoles)
            room.creepsFromRoom[role] = [];
        room.creepsFromRoomAmount = 0;
        if (!room.memory.stampAnchors) {
            room.memory.stampAnchors = {};
            for (const type in stamps)
                room.memory.stampAnchors[type] = [];
        }
        room.scoutTargets = new Set();
        if (!room.memory.deposits)
            room.memory.deposits = {};
    }
    let reservedGCL = Game.gcl.level - global.communes.size;
    for (const roomName in Memory.claimRequests) {
        if (!Memory.claimRequests[roomName].responder)
            continue;
        reservedGCL -= 1;
    }
    const communesForResponding = [];
    for (const roomName of global.communes) {
        if (Memory.rooms[roomName].claimRequest)
            continue;
        if (Game.rooms[roomName].energyCapacityAvailable < 650)
            continue;
        communesForResponding.push(roomName);
    }
    for (const roomName of internationalManager.claimRequestsByScore) {
        const request = Memory.claimRequests[roomName];
        if (!request)
            continue;
        if (request.abandon > 0) {
            request.abandon -= 1;
            continue;
        }
        delete request.abandon;
        if (request.responder && global.communes.has(request.responder))
            continue;
        if (!Memory.autoClaim)
            continue;
        if (reservedGCL <= 0)
            continue;
        if (Memory.rooms[roomName].T !== 'neutral') {
            delete Memory.claimRequests[roomName];
            continue;
        }
        const communeName = findClosestRoomName(roomName, communesForResponding);
        if (!communeName)
            break;
        const maxRange = 10;
        if (Game.map.getRoomLinearDistance(communeName, roomName) > maxRange ||
            advancedFindDistance(communeName, roomName, {
                keeper: Infinity,
                enemy: Infinity,
                ally: Infinity,
            }) > maxRange) {
            Memory.claimRequests[roomName].abandon = 20000;
            continue;
        }
        Memory.rooms[communeName].claimRequest = roomName;
        Memory.claimRequests[roomName].responder = communeName;
        reservedGCL -= 1;
        communesForResponding.splice(lodash.exports.indexOf(communesForResponding, communeName), 1);
    }
    for (const roomName in Memory.allyCreepRequests) {
        const request = Memory.allyCreepRequests[roomName];
        if (request.abandon > 0) {
            request.abandon -= 1;
            continue;
        }
        request.abandon = undefined;
        if (request.responder)
            continue;
        const communes = [];
        for (const roomName of global.communes) {
            if (Memory.rooms[roomName].allyCreepRequest)
                continue;
            communes.push(roomName);
        }
        const communeName = findClosestRoomName(roomName, communes);
        if (!communeName)
            break;
        const maxRange = 25;
        if (Game.map.getRoomLinearDistance(communeName, roomName) > maxRange ||
            advancedFindDistance(communeName, roomName, {
                keeper: Infinity,
                enemy: Infinity,
                ally: Infinity,
            }) > maxRange) {
            Memory.allyCreepRequests[roomName].abandon = 20000;
            continue;
        }
        Memory.rooms[communeName].allyCreepRequest = roomName;
        Memory.allyCreepRequests[roomName].responder = communeName;
    }
    for (const roomName in Memory.attackRequests) {
        const request = Memory.attackRequests[roomName];
        if (request.abandon > 0) {
            request.abandon -= 1;
            continue;
        }
        if (request.responder)
            continue;
        const communes = [];
        for (const roomName of global.communes) {
            if (Memory.rooms[roomName].attackRequests.includes(roomName))
                continue;
            communes.push(roomName);
        }
        const communeName = findClosestRoomName(roomName, communes);
        if (!communeName)
            break;
        const maxRange = 15;
        if (Game.map.getRoomLinearDistance(communeName, roomName) > maxRange ||
            advancedFindDistance(communeName, roomName, {
                keeper: Infinity,
                enemy: Infinity,
                ally: Infinity,
            }) > maxRange) {
            Memory.attackRequests[roomName].abandon = 20000;
            continue;
        }
        Memory.rooms[communeName].attackRequests.push(roomName);
        Memory.attackRequests[roomName].responder = communeName;
    }
    if (Memory.CPULogging)
        customLog('Tick Config', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.midGrey);
};

class Duo {
    constructor(members, assaulter, supporter) {
        this.members = members;
        this.assaulter = assaulter;
        this.supporter = supporter;
    }
    run() { }
    move(opts) { }
    advancedRangedAttack() { }
    advancedAttack() { }
    advancedDismantle() { }
    advancedHeal() { }
}

class Quad {
    constructor(members, assaulters, supporters) {
        this.members = members;
        this.assaulters = assaulters;
        this.supporters = supporters;
    }
    run() { }
    move(opts) { }
    advancedRangedAttack() { }
    advancedAttack() { }
    advancedDismantle() { }
    advancedHeal() { }
}

class AntifaAssaulter extends Creep {
    findSquad() {
        return true;
    }
    runSingle() {
        var _a;
        const { room } = this;
        if (!this.memory.AR || this.memory.AR === room.name) {
            if (this.memory.squadType === 'rangedAttack') {
                this.advancedRangedAttack();
                return;
            }
            if (this.memory.squadType === 'attack') {
                this.advancedAttack();
                return;
            }
            this.advancedDismantle();
            return;
        }
        this.passiveRangedAttack();
        this.passiveHeal();
        if (((_a = this.commune) === null || _a === void 0 ? void 0 : _a.name) === this.name) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [
                    {
                        pos: new RoomPosition(25, 25, this.memory.AR),
                        range: 25,
                    },
                ],
            });
            return;
        }
        this.createMoveRequest({
            origin: this.pos,
            goals: [
                {
                    pos: new RoomPosition(25, 25, this.memory.AR),
                    range: 25,
                },
            ],
        });
    }
    advancedRangedAttack() {
        const { room } = this;
        const enemyAttackers = room.enemyAttackers.filter(function (creep) {
            return !creep.isOnExit();
        });
        if (!enemyAttackers.length) {
            const enemyCreeps = room.enemyCreeps.filter(function (creep) {
                return !creep.isOnExit();
            });
            if (!enemyCreeps.length) {
                return this.aggressiveHeal();
            }
            if (this.passiveHeal())
                return true;
            this.say('EC');
            const enemyCreep = findClosestObject(this.pos, enemyCreeps);
            const range = getRange(this.pos.x, enemyCreep.pos.x, this.pos.y, enemyCreep.pos.y);
            if (range > 1) {
                this.rangedAttack(enemyCreep);
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyCreep.pos, range: 1 }],
                });
                return true;
            }
            this.rangedMassAttack();
            this.moveRequest = pack(enemyCreep.pos);
            return true;
        }
        const enemyAttacker = findClosestObject(this.pos, enemyAttackers);
        const range = getRange(this.pos.x, enemyAttacker.pos.x, this.pos.y, enemyAttacker.pos.y);
        if (range > 3) {
            this.passiveHeal();
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 1 }],
            });
            return true;
        }
        this.say('AEA');
        this.heal(this);
        if (range === 1) {
            this.rangedMassAttack();
            this.moveRequest = pack(enemyAttacker.pos);
        }
        else
            this.rangedAttack(enemyAttacker);
        if (this.healStrength < enemyAttacker.attackStrength) {
            if (range === 3)
                return true;
            if (range >= 3) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyAttacker.pos, range: 3 }],
                });
                return true;
            }
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 25 }],
                flee: true,
            });
            return true;
        }
        if (this.healStrength < enemyAttacker.attackStrength) {
            if (range <= 2) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyAttacker.pos, range: 1 }],
                    flee: true,
                });
                return true;
            }
        }
        if (range > 1) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 1 }],
            });
            return true;
        }
        return true;
    }
    advancedAttack() { }
    advancedDismantle() { }
    constructor(creepID) {
        super(creepID);
    }
    static antifaAssaulterManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (!creep.squad && creep.memory.squadType) {
                if (!creep.findSquad())
                    continue;
            }
            if (creep.squad instanceof Quad) {
                if (creep.name === creep.squad.assaulters[0].name)
                    creep.squad.run();
                continue;
            }
            if (creep.squad instanceof Duo) {
                if (creep.name === creep.squad.assaulter.name)
                    creep.squad.run();
                continue;
            }
            creep.runSingle();
        }
    }
}

class Builder extends Creep {
    getEnergy() {
        var _a;
        const { room } = this;
        if (!this.needsResources()) {
            this.message += '✨';
            return false;
        }
        if (!(room.myCreeps.source1Harvester.length + ((_a = room.myCreeps.source2Harvester) === null || _a === void 0 ? void 0 : _a.length) || 0)) {
            const sources = room.find(FIND_SOURCES_ACTIVE);
            if (!sources.length)
                return true;
            const source = this.pos.findClosestByPath(sources, {
                ignoreCreeps: true,
            });
            if (getRange(this.pos.x, source.pos.x, this.pos.y, source.pos.y) > 1) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: source.pos, range: 1 }],
                    avoidEnemyRanges: true,
                });
                return true;
            }
            this.advancedHarvestSource(source);
            return true;
        }
        if (!room.fastFillerContainerLeft && !room.fastFillerContainerRight)
            return false;
        if (!this.memory.reservations || !this.memory.reservations.length)
            this.reserveWithdrawEnergy();
        if (!this.fulfillReservation()) {
            this.say(this.message);
            return true;
        }
        this.reserveWithdrawEnergy();
        if (!this.fulfillReservation()) {
            this.say(this.message);
            return true;
        }
        return false;
    }
    constructor(creepID) {
        super(creepID);
    }
    static builderManager(room, creepsOfRole) {
        const cSiteTarget = room.cSiteTarget;
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (!cSiteTarget) {
                creep.advancedRecycle();
                continue;
            }
            if (creep.getEnergy()) {
                creep.say(creep.message);
                continue;
            }
            if (creep.advancedBuildCSite())
                creep.getEnergy();
            creep.say(creep.message);
        }
    }
}

class ControllerUpgrader extends Creep {
    constructor(creepID) {
        super(creepID);
    }
    get dying() {
        if (this._dying)
            return true;
        if (!this.ticksToLive)
            return false;
        if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME + (this.room.upgradePathLength - 3))
            return false;
        return (this._dying = true);
    }
    static controllerUpgraderManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            creep.advancedUpgradeController();
        }
    }
}

class FastFiller extends Creep {
    travelToFastFiller() {
        const { room } = this;
        if (!this.findFastFillerPos())
            return true;
        const fastFillerPos = unpackAsRoomPos(this.memory.packedPos, room.name);
        if (getRange(this.pos.x, fastFillerPos.x, this.pos.y, fastFillerPos.y) === 0)
            return false;
        this.say('⏩F');
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: fastFillerPos, range: 0 }],
        });
        return true;
    }
    fillFastFiller() {
        const { room } = this;
        this.say('💁');
        if (this.usedStore() > this.store.energy) {
            for (const resourceType in this.store) {
                if (resourceType == RESOURCE_ENERGY)
                    continue;
                this.say('WR');
                this.drop(resourceType);
                return true;
            }
        }
        const fastFillerContainers = [room.fastFillerContainerLeft, room.fastFillerContainerRight];
        if (room.energyAvailable === room.energyCapacityAvailable)
            return false;
        if (this.needsResources()) {
            let fastFillerStoringStructures = [room.fastFillerLink];
            fastFillerStoringStructures = fastFillerStoringStructures.concat(fastFillerContainers);
            fastFillerStoringStructures.length;
            for (const structure of fastFillerStoringStructures) {
                if (!structure) {
                    continue;
                }
                if (getRange(this.pos.x, structure.pos.x, this.pos.y, structure.pos.y) > 1)
                    continue;
                if (structure.structureType != STRUCTURE_LINK && structure.usedStore() > structure.store.energy) {
                    for (const key in structure.store) {
                        const resourceType = key;
                        if (resourceType === RESOURCE_ENERGY)
                            continue;
                        this.say('WCR');
                        this.withdraw(structure, resourceType);
                        return true;
                    }
                }
                if (structure.store.energy < this.freeSpecificStore(RESOURCE_ENERGY) ||
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) < this.freeSpecificStore(RESOURCE_ENERGY))
                    continue;
                this.say('W');
                this.withdraw(structure, RESOURCE_ENERGY);
                structure.store.energy -= this.store.getCapacity() - this.store.energy;
                return true;
            }
            return false;
        }
        const adjacentStructures = room.lookForAtArea(LOOK_STRUCTURES, this.pos.y - 1, this.pos.x - 1, this.pos.y + 1, this.pos.x + 1, true);
        for (const adjacentPosData of adjacentStructures) {
            const structure = adjacentPosData.structure;
            if (!structure.store)
                continue;
            if (structure.structureType !== STRUCTURE_SPAWN && structure.structureType !== STRUCTURE_EXTENSION)
                continue;
            if (structure.store.energy >= structure.store.getCapacity(RESOURCE_ENERGY))
                continue;
            this.say('T');
            this.transfer(structure, RESOURCE_ENERGY);
            structure.store.energy += this.store.energy;
            return true;
        }
        return false;
    }
    constructor(creepID) {
        super(creepID);
    }
    static fastFillerManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (creep.travelToFastFiller())
                continue;
            if (creep.fillFastFiller())
                continue;
            creep.advancedRenew();
        }
    }
}

class Hauler extends Creep {
    haul() {
        this.reserve();
        if (!this.fulfillReservation()) {
            this.say(this.message);
            return;
        }
        this.reserve();
        if (!this.fulfillReservation()) {
            this.say(this.message);
            return;
        }
        if (this.message.length)
            this.say(this.message);
    }
    reserve() {
        var _a, _b, _c;
        if ((_a = this.memory.reservations) === null || _a === void 0 ? void 0 : _a.length)
            return;
        const { room } = this;
        let withdrawTargets = room.MAWT.filter(target => {
            if (target instanceof Resource)
                return (target.reserveAmount >= this.store.getCapacity() * 0.2 || target.reserveAmount >= this.freeStore());
            return target.store.energy >= this.freeStore();
        });
        let transferTargets;
        let target;
        let amount;
        if (this.needsResources()) {
            if (withdrawTargets.length) {
                target = findClosestObject(this.pos, withdrawTargets);
                if (target instanceof Resource)
                    amount = target.reserveAmount;
                else
                    amount = Math.min(this.freeStore(), target.store.energy);
                this.createReservation('withdraw', target.id, amount);
                return;
            }
            transferTargets = room.MATT.filter(function (target) {
                return target.freeStore() > 0;
            });
            if (transferTargets.length == 0) {
                transferTargets = room.METT.filter(function (target) {
                    return target.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                });
            }
            transferTargets = transferTargets.concat(room.MEFTT.filter(target => {
                return ((target.freeStore() >= this.store.energy && this.store.energy > 0) ||
                    target.freeSpecificStore(RESOURCE_ENERGY) >= this.store.energy + this.freeStore());
            }));
            if (transferTargets.length) {
                withdrawTargets = room.OAWT.filter(target => {
                    if (target instanceof Resource)
                        return (target.reserveAmount >= this.store.getCapacity() * 0.2 ||
                            target.reserveAmount >= this.freeStore());
                    return target.store.energy >= this.freeStore();
                });
                if (!withdrawTargets.length)
                    return;
                target = findClosestObject(this.pos, withdrawTargets);
                if (target instanceof Resource)
                    amount = target.reserveAmount;
                else
                    amount = Math.min(this.freeStore(), target.store.energy);
                this.createReservation('withdraw', target.id, amount);
                return;
            }
        }
        if (!transferTargets) {
            transferTargets = room.MATT.filter(function (target) {
                return target.freeSpecificStore(RESOURCE_ENERGY) > 0;
            });
            transferTargets = transferTargets.concat(room.MEFTT.filter(target => {
                return ((target.freeStore() >= this.store.energy && this.store.energy > 0) ||
                    target.freeSpecificStore(RESOURCE_ENERGY) >= this.store.energy + this.freeStore());
            }));
        }
        if (transferTargets.length) {
            target = transferTargets.sort((a, b) => {
                return (getRange(this.pos.x, a.pos.x, this.pos.y, a.pos.y) +
                    a.store.energy * 0.05 -
                    (getRange(this.pos.x, b.pos.x, this.pos.y, b.pos.y) + b.store.energy * 0.05));
            })[0];
            amount = Math.min(Math.max(this.store.energy, 0), target.freeSpecificStore(RESOURCE_ENERGY));
            if (amount > 0) {
                this.createReservation('transfer', target.id, amount);
                return;
            }
        }
        transferTargets = room.OATT.filter(target => {
            return target.freeStore() >= this.store.energy;
        });
        if (transferTargets.length) {
            target = findClosestObject(this.pos, transferTargets);
            amount = Math.min(Math.max(this.store.energy, 0), target.freeStore());
            this.createReservation('transfer', target.id, amount);
        }
        if (((_b = this.memory.reservations) === null || _b === void 0 ? void 0 : _b.length) == 0) {
            if (this.store.getUsedCapacity() > 0) {
                let target = room.OATT[0];
                if (target)
                    for (let rsc in this.store) {
                        this.createReservation('transfer', target.id, this.store[rsc], rsc);
                    }
            }
        }
        if (((_c = this.memory.reservations) === null || _c === void 0 ? void 0 : _c.length) == 0 && room.communeManager.labManager)
            room.communeManager.labManager.generateHaulingReservation(this);
    }
    constructor(creepID) {
        super(creepID);
    }
    static haulerManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            creep.advancedRenew();
            creep.haul();
        }
    }
}

class HubHauler extends Creep {
    travelToHub() {
        const { room } = this;
        const hubAnchor = unpackAsRoomPos(room.memory.stampAnchors.hub[0], room.name);
        if (!hubAnchor)
            return true;
        if (this.pos.getRangeTo(hubAnchor) === 0)
            return false;
        this.say('⏩H');
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: hubAnchor, range: 0 }],
        });
        return true;
    }
    reserve() {
        var _a;
        if ((_a = this.memory.reservations) === null || _a === void 0 ? void 0 : _a.length)
            return;
        const { room } = this;
        const { storage } = room;
        const { terminal } = room;
        if (!storage && !terminal)
            return;
        if (this.factoryEnergyOverfillTransfer())
            return;
        if (this.reserveStorageTransfer())
            return;
        if (this.reserveTerminalTransfer())
            return;
        if (this.reserveHubLinkWithdraw())
            return;
        if (this.reserveHubLinkTransfer())
            return;
        if (this.reserveFactoryWithdraw())
            return;
        if (this.reserveFactoryTransfer())
            return;
    }
    factoryEnergyOverfillTransfer() {
        const { room } = this;
        const { storage } = room;
        const factory = room.structures.factory[0];
        if (!storage || !factory)
            return false;
        if (factory.store.energy > 10000 && storage.store.getFreeCapacity() > 10000) {
            this.createReservation('withdraw', factory.id, 10000, RESOURCE_ENERGY);
            this.createReservation('transfer', storage.id, 10000, RESOURCE_ENERGY);
            return true;
        }
        return false;
    }
    reserveStorageTransfer() {
        const { room } = this;
        const { storage } = room;
        const { terminal } = room;
        if (!storage)
            return false;
        if (storage.freeStore() < this.store.getCapacity())
            return false;
        if (terminal && (!terminal.effects || !terminal.effects[PWR_DISRUPT_TERMINAL])) {
            for (const key in terminal.store) {
                const resourceType = key;
                if (terminal.store[resourceType] < this.store.getCapacity())
                    continue;
                if (terminal.store[resourceType] < storage.store[resourceType] * 0.3 + this.store.getCapacity())
                    continue;
                this.message += 'RST';
                let amount = this.freeStore();
                this.createReservation('withdraw', terminal.id, amount, resourceType);
                this.createReservation('transfer', storage.id, amount + this.store[resourceType], resourceType);
                return true;
            }
        }
        return false;
    }
    reserveTerminalTransfer() {
        const { room } = this;
        const { storage } = room;
        const { terminal } = room;
        if (!storage || !terminal)
            return false;
        if (terminal.freeStore() < this.store.getCapacity())
            return false;
        if (storage) {
            for (const key in storage.store) {
                const resourceType = key;
                if (storage.store[resourceType] < this.store.getCapacity())
                    continue;
                if (storage.store[resourceType] * 0.3 < terminal.store[resourceType] + this.store.getCapacity())
                    continue;
                this.message += 'RTT';
                let amount = this.freeStore();
                this.createReservation('withdraw', storage.id, amount, resourceType);
                this.createReservation('transfer', terminal.id, amount + this.store[resourceType], resourceType);
                return true;
            }
        }
        return false;
    }
    reserveHubLinkWithdraw() {
        const { room } = this;
        const { storage } = room;
        const { terminal } = room;
        const { hubLink } = room;
        if (!hubLink)
            return false;
        if (hubLink.store.getCapacity(RESOURCE_ENERGY) * linkReceiveTreshold > hubLink.store.energy)
            return false;
        const { controllerLink } = room;
        if (controllerLink &&
            controllerLink.store.getCapacity(RESOURCE_ENERGY) * linkReceiveTreshold > controllerLink.store.energy)
            return false;
        const { fastFillerLink } = room;
        if (fastFillerLink &&
            fastFillerLink.store.getCapacity(RESOURCE_ENERGY) * linkReceiveTreshold > fastFillerLink.store.energy)
            return false;
        let target;
        if (storage && storage.freeStore() > this.store.getCapacity())
            target = storage;
        else if (terminal && terminal.freeStore() > this.store.getCapacity())
            target = terminal;
        if (!target)
            return false;
        this.message += 'RHLW';
        let amount = Math.min(this.freeStore(), hubLink.store.energy);
        this.createReservation('withdraw', hubLink.id, amount);
        this.createReservation('transfer', target.id, amount + this.store.energy);
        return true;
    }
    reserveHubLinkTransfer() {
        const { room } = this;
        const { storage } = room;
        const { terminal } = room;
        const { hubLink } = room;
        if (!hubLink)
            return false;
        if (hubLink.cooldown > 4)
            return false;
        if (hubLink.store.getCapacity(RESOURCE_ENERGY) * linkSendThreshold < hubLink.store.energy)
            return false;
        const { controllerLink } = room;
        const { fastFillerLink } = room;
        if (controllerLink &&
            controllerLink.store.getCapacity(RESOURCE_ENERGY) * linkReceiveTreshold > controllerLink.store.energy) ;
        else if (fastFillerLink &&
            fastFillerLink.store.getCapacity(RESOURCE_ENERGY) * linkReceiveTreshold > fastFillerLink.store.energy) ;
        else
            return false;
        const amount = Math.min(this.freeStore(), hubLink.freeSpecificStore());
        let provider;
        if (storage && storage.store.energy >= amount)
            provider = storage;
        else if (terminal && terminal.store.energy >= amount)
            provider = terminal;
        if (!provider)
            return false;
        this.message += 'RHLT';
        this.createReservation('withdraw', provider.id, amount);
        this.createReservation('transfer', hubLink.id, Math.min(this.freeStore() + this.store.energy, hubLink.freeSpecificStore()));
        return true;
    }
    reserveFactoryWithdraw() {
        const { room } = this;
        const { storage } = room;
        const { terminal } = room;
        const factory = room.structures.factory[0];
        if (!factory)
            return false;
        for (let resource in factory.store) {
            if (room.memory.factoryUsableResources.includes(resource))
                continue;
            if (resource == RESOURCE_BATTERY)
                continue;
            if (resource == room.memory.factoryProduct && factory.store[resource] < this.freeStore())
                continue;
            let target;
            if (terminal && terminal.freeStore() > this.store.getCapacity())
                target = terminal;
            else if (storage && storage.freeStore() > this.store.getCapacity())
                target = storage;
            if (!target)
                return false;
            let amount = Math.min(this.freeStore(), target.freeStore(), factory.store[resource]);
            this.createReservation('withdraw', factory.id, amount, resource);
            this.createReservation('transfer', target.id, amount +
                this.store[resource], resource);
            return true;
        }
        if (factory.store.battery < this.store.getCapacity())
            return false;
        let target;
        if (storage && storage.freeStore() > this.store.getCapacity())
            target = storage;
        else if (terminal && terminal.freeStore() > this.store.getCapacity())
            target = terminal;
        if (!target)
            return false;
        this.message += 'RFW';
        let amount = this.freeStore();
        this.createReservation('withdraw', factory.id, amount, RESOURCE_BATTERY);
        this.createReservation('transfer', target.id, amount + this.store.battery, RESOURCE_BATTERY);
        return true;
    }
    reserveFactoryTransfer() {
        const { room } = this;
        const { storage } = room;
        const { terminal } = room;
        const factory = room.structures.factory[0];
        if (!factory)
            return false;
        if (factory.freeStore() < this.store.getCapacity())
            return false;
        if (room.memory.factoryProduct && room.memory.factoryUsableResources) {
            for (let component of room.memory.factoryUsableResources) {
                if (factory.store[component] >= 1000)
                    continue;
                let provider;
                if (storage && storage.store[component] > 0)
                    provider = storage;
                else if (terminal && terminal.store[component] > 0)
                    provider = terminal;
                if (!provider)
                    continue;
                let amount = Math.min(this.freeStore(), provider.store[component], 2000 - factory.store[component]);
                if (amount <= 0)
                    continue;
                this.createReservation('withdraw', provider.id, amount, component);
                this.createReservation('transfer', factory.id, amount + this.store[component], component);
            }
        }
        if (room.findStoredResourceAmount(RESOURCE_BATTERY) * 100 > room.findStoredResourceAmount(RESOURCE_ENERGY))
            return false;
        let provider;
        if (storage && storage.store.energy > this.store.getCapacity())
            provider = storage;
        else if (terminal && terminal.store.energy > this.store.getCapacity())
            provider = terminal;
        if (!provider)
            return false;
        this.message += 'RFT';
        let amount = this.freeStore();
        this.createReservation('withdraw', provider.id, amount);
        this.createReservation('transfer', factory.id, amount + this.store.energy);
        return true;
    }
    constructor(creepID) {
        super(creepID);
    }
    static hubHaulerManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (creep.travelToHub())
                continue;
            if ((!creep.memory.reservations || !creep.memory.reservations.length) && creep.freeStore() === 0) {
                for (const key in creep.store) {
                    const resourceType = key;
                    creep.drop(resourceType);
                    break;
                }
                continue;
            }
            creep.reserve();
            if (!creep.fulfillReservation()) {
                creep.say(creep.message);
                continue;
            }
            creep.reserve();
            if (!creep.fulfillReservation()) {
                creep.say(creep.message);
                continue;
            }
            creep.say(creep.message);
            creep.say('🚬');
        }
    }
}

class Maintainer extends Creep {
    advancedMaintain() {
        const { room } = this;
        this.say('⏩🔧');
        if (this.needsResources()) {
            if (!this.memory.reservations || !this.memory.reservations.length)
                this.reserveWithdrawEnergy();
            if (!this.fulfillReservation()) {
                this.say(this.message);
                return false;
            }
            this.reserveWithdrawEnergy();
            if (!this.fulfillReservation()) {
                this.say(this.message);
                return false;
            }
            if (this.needsResources())
                return false;
        }
        const workPartCount = this.parts.work;
        const repairTarget = findObjectWithID(this.memory.repairTarget) ||
            this.findRepairTarget() ||
            this.findRampartRepairTarget(workPartCount);
        if (!repairTarget)
            return false;
        this.memory.repairTarget = repairTarget.id;
        if (Memory.roomVisuals)
            room.visual.text(repairTarget.structureType === STRUCTURE_RAMPART ? '🧱' : '🔧', repairTarget.pos);
        if (this.pos.getRangeTo(repairTarget.pos) > 3) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: repairTarget.pos, range: 3 }],
                avoidEnemyRanges: true,
            });
            return false;
        }
        const repairResult = this.repair(repairTarget);
        if (repairResult !== OK)
            return false;
        const energySpentOnRepairs = Math.min(workPartCount, (repairTarget.hitsMax - repairTarget.hits) / REPAIR_POWER);
        if (repairTarget.structureType === STRUCTURE_RAMPART) {
            if (global.roomStats.commune[this.room.name])
                global.roomStats.commune[this.room.name].eorwr += energySpentOnRepairs;
            this.say(`🧱${energySpentOnRepairs * REPAIR_POWER}`);
        }
        else {
            if (global.roomStats.commune[this.room.name])
                global.roomStats.commune[this.room.name].eoro += energySpentOnRepairs;
            else if (global.roomStats.remote[this.room.name])
                global.roomStats.remote[this.room.name].reoro += energySpentOnRepairs;
            this.say(`🔧${energySpentOnRepairs * REPAIR_POWER}`);
        }
        repairTarget.realHits = repairTarget.hits + workPartCount * REPAIR_POWER;
        if (repairTarget.structureType === STRUCTURE_RAMPART) {
            if (repairTarget.realHits <= this.memory.quota + workPartCount * REPAIR_POWER * 25)
                return true;
        }
        else if (repairTarget.hitsMax - repairTarget.realHits >= workPartCount * REPAIR_POWER)
            return true;
        delete this.memory.repairTarget;
        const newRepairTarget = this.findRepairTarget(new Set([repairTarget.id]));
        if (!newRepairTarget)
            return true;
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: newRepairTarget.pos, range: 3 }],
            avoidEnemyRanges: true,
        });
        return true;
    }
    maintainNearby() {
        const { room } = this;
        if (this.store.getUsedCapacity(RESOURCE_ENERGY) === 0)
            return false;
        const structuresAsPos = this.pos.lookFor(LOOK_STRUCTURES);
        const workPartCount = this.parts.work;
        let structure;
        for (structure of structuresAsPos) {
            if (structure.structureType !== STRUCTURE_ROAD && structure.structureType !== STRUCTURE_CONTAINER)
                continue;
            if (structure.hitsMax - structure.hits < workPartCount * REPAIR_POWER)
                break;
            if (this.repair(structure) !== OK)
                return false;
            const energySpentOnRepairs = Math.min(workPartCount, (structure.hitsMax - structure.hits) / REPAIR_POWER);
            this.say(`👣🔧${energySpentOnRepairs * REPAIR_POWER}`);
            return true;
        }
        const adjacentStructures = room.lookForAtArea(LOOK_STRUCTURES, Math.max(Math.min(this.pos.y - 3, -1), 1), Math.max(Math.min(this.pos.x - 3, -1), 1), Math.max(Math.min(this.pos.y + 3, -1), 1), Math.max(Math.min(this.pos.x + 3, -1), 1), true);
        for (const adjacentPosData of adjacentStructures) {
            structure = adjacentPosData.structure;
            if (structure.structureType !== STRUCTURE_ROAD && structure.structureType !== STRUCTURE_CONTAINER)
                continue;
            if (structure.hitsMax - structure.hits < workPartCount * REPAIR_POWER)
                continue;
            if (this.repair(structure) !== OK)
                return false;
            const energySpentOnRepairs = Math.min(workPartCount, (structure.hitsMax - structure.hits) / REPAIR_POWER);
            this.say(`🗺️🔧${energySpentOnRepairs * REPAIR_POWER}`);
            return true;
        }
        return false;
    }
    constructor(creepID) {
        super(creepID);
    }
    static maintainerManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (creep.advancedMaintain())
                continue;
            if (creep.maintainNearby())
                continue;
        }
    }
}

class MeleeDefender extends Creep {
    advancedDefend() {
        const { room } = this;
        const enemyAttackers = room.enemyAttackers.filter(function (enemyAttacker) {
            return !enemyAttacker.isOnExit();
        });
        if (!enemyAttackers.length)
            return false;
        const enemyAttacker = this.pos.findClosestByPath(enemyAttackers, {
            ignoreCreeps: true,
            ignoreRoads: true,
        });
        const ramparts = room.structures.rampart.filter(rampart => {
            if (areCoordsEqual(this.pos, rampart.pos))
                return true;
            const structuresAtPos = room.lookForAt(LOOK_STRUCTURES, rampart.pos);
            for (const structure of structuresAtPos)
                if (impassibleStructureTypes.includes(structure.structureType))
                    return false;
            return !room.creepPositions.get(pack(rampart.pos));
        });
        if (!ramparts.length) {
            delete this.memory.ROS;
            if (getRange(this.pos.x, enemyAttacker.pos.x, this.pos.y, enemyAttacker.pos.y) > 1) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyAttacker.pos, range: 1 }],
                });
                return true;
            }
            this.attack(enemyAttacker);
            if (enemyAttacker.getActiveBodyparts(MOVE) > 0)
                this.moveRequest = pack(enemyAttacker.pos);
            return true;
        }
        this.memory.ROS = true;
        this.attack(enemyAttacker);
        for (const rampart of ramparts)
            room.visual.text(getRangeEuc(enemyAttacker.pos.x, rampart.pos.x, enemyAttacker.pos.y, rampart.pos.y).toString(), rampart.pos, { font: 0.5 });
        const closestRampart = findClosestObjectEuc(enemyAttacker.pos, ramparts);
        room.visual.circle(enemyAttacker.pos, { fill: myColors.yellow });
        room.visual.circle(closestRampart.pos, { fill: myColors.red });
        if (Memory.roomVisuals)
            room.visual.line(this.pos, closestRampart.pos, {
                color: myColors.lightBlue,
                opacity: 0.2,
            });
        if (getRange(this.pos.x, closestRampart.pos.x, this.pos.y, closestRampart.pos.y) === 0)
            return false;
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: closestRampart.pos, range: 0 }],
            plainCost: 20,
            swampCost: 80,
        });
        return true;
    }
    constructor(creepID) {
        super(creepID);
    }
    static meleeDefenderManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (creep.spawning)
                continue;
            creep.advancedDefend();
        }
    }
}

class MineralHarvester extends Creep {
    advancedHarvestMineral(mineral) {
        const creep = this;
        const { room } = creep;
        if (!creep.findMineralHarvestPos())
            return false;
        creep.say('🚬');
        const harvestPos = unpackAsRoomPos(creep.memory.packedPos, room.name);
        if (getRange(creep.pos.x, harvestPos.x, creep.pos.y, harvestPos.y) > 0) {
            creep.say('⏩M');
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [{ pos: harvestPos, range: 0 }],
                avoidEnemyRanges: true,
            });
            return false;
        }
        if (creep.harvest(mineral) !== OK)
            return false;
        const mineralsHarvested = Math.min(this.parts.work * HARVEST_POWER, mineral.mineralAmount);
        if (global.roomStats.commune[this.room.name])
            global.roomStats.commune[this.room.name].mh += mineralsHarvested;
        creep.say(`⛏️${mineralsHarvested}`);
        return true;
    }
    constructor(creepID) {
        super(creepID);
    }
    static mineralHarvesterManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            const mineral = room.mineral;
            if (mineral.mineralAmount === 0) {
                creep.advancedRecycle();
                continue;
            }
            if (creep.needsResources()) {
                creep.advancedHarvestMineral(mineral);
                continue;
            }
            if (room.terminal && room.terminal.store.getFreeCapacity() >= 10000) {
                creep.advancedTransfer(room.terminal, mineral.mineralType);
            }
        }
    }
}

class SourceHarvester extends Creep {
    constructor(creepID) {
        super(creepID);
    }
    get dying() {
        if (this._dying)
            return true;
        if (!this.ticksToLive)
            return false;
        if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME + (this.room.sourcePaths[this.memory.SI].length - 1))
            return false;
        return (this._dying = true);
    }
    preTickManager() {
        const { room } = this;
        if (this.memory.SI && !this.dying)
            room.creepsOfSourceAmount[this.memory.SI] += 1;
    }
    travelToSource() {
        const { room } = this;
        this.say('🚬');
        const harvestPos = unpackAsPos(this.memory.packedPos);
        if (getRange(this.pos.x, harvestPos.x, this.pos.y, harvestPos.y) === 0)
            return false;
        if (this.memory.getPulled)
            return true;
        this.say(`⏩${this.memory.SI}`);
        this.createMoveRequest({
            origin: this.pos,
            goals: [
                {
                    pos: new RoomPosition(harvestPos.x, harvestPos.y, room.name),
                    range: 0,
                },
            ],
            avoidEnemyRanges: true,
        });
        return true;
    }
    transferToSourceExtensions() {
        const { room } = this;
        if (room.energyAvailable === room.energyCapacityAvailable)
            return false;
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) > this.parts.work * HARVEST_POWER)
            return false;
        const adjacentStructures = room.lookForAtArea(LOOK_STRUCTURES, this.pos.y - 1, this.pos.x - 1, this.pos.y + 1, this.pos.x + 1, true);
        for (const adjacentPosData of adjacentStructures) {
            const structure = adjacentPosData.structure;
            if (!structure.store)
                continue;
            if (structure.structureType !== STRUCTURE_EXTENSION)
                continue;
            if (structure.store.getFreeCapacity(RESOURCE_ENERGY) === 0)
                continue;
            this.transfer(structure, RESOURCE_ENERGY);
            return true;
        }
        return false;
    }
    transferToSourceLink() {
        const { room } = this;
        if (this.store.getFreeCapacity(RESOURCE_ENERGY) > this.parts.work * HARVEST_POWER)
            return false;
        const sourceLink = room.sourceLinks[this.memory.SI];
        if (!sourceLink)
            return false;
        return this.advancedTransfer(sourceLink);
    }
    repairSourceContainer(sourceContainer) {
        if (!sourceContainer)
            return false;
        const workPartCount = this.parts.work;
        if (sourceContainer.hitsMax - sourceContainer.hits < workPartCount * REPAIR_POWER)
            return false;
        if (this.store.getUsedCapacity(RESOURCE_ENERGY) < workPartCount && !this.movedResource)
            this.withdraw(sourceContainer, RESOURCE_ENERGY);
        if (this.worked)
            return false;
        const repairResult = this.repair(sourceContainer);
        if (repairResult === OK) {
            this.worked = true;
            const energySpentOnRepairs = Math.min(workPartCount, (sourceContainer.hitsMax - sourceContainer.hits) / REPAIR_POWER);
            if (global.roomStats.commune[this.room.name])
                global.roomStats.commune[this.room.name].eoro += energySpentOnRepairs;
            else if (global.roomStats.remote[this.room.name])
                global.roomStats.remote[this.room.name].reoro += energySpentOnRepairs;
            this.say(`🔧${energySpentOnRepairs * REPAIR_POWER}`);
            return true;
        }
        return false;
    }
    static sourceHarvesterManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            const sourceIndex = creep.memory.SI;
            if (!creep.findSourcePos(sourceIndex))
                continue;
            if (creep.travelToSource())
                continue;
            creep.advancedHarvestSource(room.sources[sourceIndex]);
            if (creep.transferToSourceExtensions())
                continue;
            if (creep.transferToSourceLink())
                continue;
            creep.repairSourceContainer(room.sourceContainers[sourceIndex]);
        }
    }
}

class AllyVanguard extends Creep {
    findRemote() {
        if (this.memory.RN)
            return true;
        const { room } = this;
        const exitRoomNames = Game.map.describeExits(room.name);
        for (const exitKey in exitRoomNames) {
            const roomName = exitRoomNames[exitKey];
            const roomMemory = Memory.rooms[roomName];
            if (!roomMemory ||
                roomMemory.T === 'enemy' ||
                roomMemory.T === 'enemyRemote' ||
                roomMemory.T === 'keeper' ||
                roomMemory.T === 'ally' ||
                roomMemory.T === 'allyRemote')
                continue;
            this.memory.RN = roomName;
            return true;
        }
        return false;
    }
    getEnergyFromRemote() {
        const { room } = this;
        if (!this.findRemote())
            return;
        if (room.name !== this.memory.RN) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: new RoomPosition(25, 25, this.memory.RN), range: 25 }],
                avoidEnemyRanges: true,
            });
            return;
        }
        if (!this.findOptimalSourceIndex())
            return;
        const sourceIndex = this.memory.SI;
        if (this.travelToSource(sourceIndex))
            return;
        if (this.advancedHarvestSource(room.sources[sourceIndex]))
            return;
    }
    getEnergyFromRoom() {
        const { room } = this;
        if (room.controller && (room.controller.owner || room.controller.reservation)) {
            if (!this.memory.reservations || !this.memory.reservations.length)
                this.reserveWithdrawEnergy();
            if (!this.fulfillReservation()) {
                this.say(this.message);
                return true;
            }
            this.reserveWithdrawEnergy();
            if (!this.fulfillReservation()) {
                this.say(this.message);
                return true;
            }
            if (this.needsResources())
                return false;
            return false;
        }
        if (!this.findOptimalSourceIndex())
            return true;
        const sourceIndex = this.memory.SI;
        if (this.travelToSource(sourceIndex))
            return true;
        if (this.advancedHarvestSource(room.sources[sourceIndex]))
            return true;
        return true;
    }
    travelToSource(sourceIndex) {
        const { room } = this;
        this.say('FHP');
        if (!this.findSourcePos(sourceIndex))
            return false;
        this.say('🚬');
        const harvestPos = unpackAsPos(this.memory.packedPos);
        if (getRange(this.pos.x, harvestPos.x, this.pos.y, harvestPos.y) === 0)
            return false;
        this.say(`⏩ ${sourceIndex}`);
        this.createMoveRequest({
            origin: this.pos,
            goals: [
                {
                    pos: new RoomPosition(harvestPos.x, harvestPos.y, room.name),
                    range: 0,
                },
            ],
            avoidEnemyRanges: true,
        });
        return true;
    }
    buildRoom() {
        const { room } = this;
        if (this.needsResources()) {
            if (this.memory.RN) {
                this.getEnergyFromRemote();
                return;
            }
            if (!this.getEnergyFromRoom()) {
                this.getEnergyFromRemote();
            }
            return;
        }
        const request = Memory.rooms[this.commune.name].allyCreepRequest;
        if (room.name !== request) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: new RoomPosition(25, 25, request), range: 25 }],
                avoidEnemyRanges: true,
            });
            return;
        }
        this.advancedBuildAllyCSite();
    }
    constructor(creepID) {
        super(creepID);
    }
    static allyVanguardManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            const request = Memory.rooms[creep.commune.name].allyCreepRequest;
            if (!request)
                return;
            Memory.allyCreepRequests[Memory.rooms[creep.commune.name].allyCreepRequest].needs[AllyCreepRequestNeeds.allyVanguard] -= creep.parts.work;
            creep.say(request);
            if (room.name === request || (creep.memory.RN && room.name === creep.memory.RN)) {
                creep.buildRoom();
                continue;
            }
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [{ pos: new RoomPosition(25, 25, request), range: 25 }],
                avoidEnemyRanges: true,
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    commune: 1,
                    neutral: 1,
                    highway: 1,
                },
            });
        }
    }
}

class Claimer extends Creep {
    constructor(creepID) {
        super(creepID);
    }
    claimRoom() {
        const creep = this;
        const { room } = creep;
        if (room.controller.my)
            return;
        if (creep.pos.getRangeTo(room.controller) > 1) {
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [{ pos: room.controller.pos, range: 1 }],
                avoidEnemyRanges: true,
                plainCost: 1,
                swampCost: 1,
                typeWeights: {
                    keeper: Infinity,
                },
            });
            return;
        }
        if (room.controller.owner ||
            (room.controller.reservation && room.controller.reservation.username !== Memory.me)) {
            creep.attackController(room.controller);
            return;
        }
        creep.claimController(room.controller);
    }
    static claimerManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            const claimTarget = Memory.rooms[creep.commune.name].claimRequest;
            if (!claimTarget)
                return;
            creep.say(claimTarget);
            Memory.claimRequests[Memory.rooms[creep.commune.name].claimRequest].needs[ClaimRequestNeeds.claimer] = 0;
            if (room.name === claimTarget) {
                creep.claimRoom();
                continue;
            }
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [{ pos: new RoomPosition(25, 25, claimTarget), range: 25 }],
                avoidEnemyRanges: true,
                swampCost: creep.parts.move >= 5 ? 1 : undefined,
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity
                },
            });
        }
    }
}

class Scout extends Creep {
    findScoutTarget() {
        if (this.memory.scoutTarget)
            return true;
        const commune = this.commune;
        const scoutedRooms = [];
        const unscoutedRooms = [];
        const exits = Game.map.describeExits(this.room.name);
        for (const exitType in exits) {
            const roomName = exits[exitType];
            if (Game.map.getRoomStatus(roomName).status !== Game.map.getRoomStatus(this.room.name).status)
                continue;
            if (commune.scoutTargets.has(roomName))
                continue;
            if (Memory.rooms[roomName] && Memory.rooms[roomName].LST) {
                scoutedRooms.push(roomName);
                continue;
            }
            unscoutedRooms.push(roomName);
        }
        const scoutTarget = unscoutedRooms.length
            ? unscoutedRooms.sort((a, b) => Game.map.getRoomLinearDistance(this.commune.name, a) -
                Game.map.getRoomLinearDistance(this.commune.name, b))[0]
            : scoutedRooms.sort((a, b) => Memory.rooms[a].LST - Memory.rooms[b].LST)[0];
        if (!scoutTarget)
            return false;
        this.memory.scoutTarget = scoutTarget;
        commune.scoutTargets.add(scoutTarget);
        return true;
    }
    recordDeposits() {
        const { room } = this;
        if (room.memory.T != 'highway')
            return;
        if (room.memory.commune) {
            if (!global.communes.has(room.memory.commune)) {
                room.memory.commune = findClosestCommuneName(room.name);
            }
        }
        else {
            room.memory.commune = findClosestCommuneName(room.name);
        }
        const communeMemory = Memory.rooms[room.memory.commune];
        const deposits = room.find(FIND_DEPOSITS);
        const unAssignedDeposits = deposits.filter(function (deposit) {
            return !communeMemory.deposits[deposit.id] && deposit.lastCooldown <= 100 && deposit.ticksToDecay > 500;
        });
        for (const deposit of unAssignedDeposits)
            communeMemory.deposits[deposit.id] = {
                decay: deposit.ticksToDecay,
                needs: [1, 1],
            };
    }
    advancedSignController() {
        const { room } = this;
        const { controller } = room;
        if (!controller)
            return true;
        if (room.name !== this.memory.signTarget)
            return true;
        let signMessage;
        if (room.memory.T === 'ally' || room.memory.T === 'enemy')
            return true;
        if (controller.reservation && controller.reservation.username != Memory.me)
            return true;
        if (room.memory.T === 'commune') {
            if (controller.sign && communeSigns.includes(controller.sign.text))
                return true;
            signMessage = communeSigns[0];
        }
        else {
            if (controller.sign && nonCommuneSigns.includes(controller.sign.text))
                return true;
            signMessage = nonCommuneSigns[Math.floor(Math.random() * nonCommuneSigns.length)];
        }
        if (getRange(this.pos.x, controller.pos.x, this.pos.y, controller.pos.y) > 1) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: room.controller.pos, range: 1 }],
                avoidEnemyRanges: true,
                plainCost: 1,
                swampCost: 1,
            });
            if (!this.moveRequest)
                return true;
            this.say(this.moveRequest.toString());
            return false;
        }
        this.signController(room.controller, signMessage);
        return true;
    }
    preTickManager() {
        if (!this.memory.scoutTarget)
            return;
        const commune = this.commune;
        if (!commune)
            return;
        commune.scoutTargets.add(this.memory.scoutTarget);
    }
    constructor(creepID) {
        super(creepID);
    }
    static scoutManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (creep.ticksToLive === CREEP_LIFE_TIME - 1)
                creep.notifyWhenAttacked(false);
            const commune = creep.commune;
            if (!commune)
                continue;
            if (creep.memory.scoutTarget === room.name) {
                creep.say('👁️');
                room.findType(commune);
                room.cleanMemory();
                delete creep.memory.scoutTarget;
            }
            if (!creep.findScoutTarget())
                return;
            creep.say(`🔭${creep.memory.scoutTarget.toString()}`);
            if (!creep.advancedSignController())
                continue;
            creep.memory.signTarget = creep.memory.scoutTarget;
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [
                    {
                        pos: new RoomPosition(25, 25, creep.memory.scoutTarget),
                        range: 25,
                    },
                ],
                avoidEnemyRanges: true,
                plainCost: 1,
                swampCost: 1,
            });
        }
    }
}

class Vanguard extends Creep {
    constructor(creepID) {
        super(creepID);
    }
    preTickManager() {
        const { room } = this;
        if (this.memory.SI && !this.dying)
            room.creepsOfSourceAmount[this.memory.SI] += 1;
        const claimTarget = Memory.rooms[this.commune.name].claimRequest;
        if (claimTarget)
            Memory.claimRequests[Memory.rooms[this.commune.name].claimRequest].needs[ClaimRequestNeeds.vanguard] -=
                this.parts.work;
    }
    travelToSource(sourceIndex) {
        const { room } = this;
        this.say('FHP');
        if (!this.findSourcePos(sourceIndex))
            return false;
        this.say('🚬');
        const harvestPos = unpackAsPos(this.memory.packedPos);
        if (getRange(this.pos.x, harvestPos.x, this.pos.y, harvestPos.y) === 0)
            return false;
        this.say(`⏩ ${sourceIndex}`);
        this.createMoveRequest({
            origin: this.pos,
            goals: [
                {
                    pos: new RoomPosition(harvestPos.x, harvestPos.y, room.name),
                    range: 0,
                },
            ],
            avoidEnemyRanges: true,
        });
        return true;
    }
    buildRoom() {
        const { room } = this;
        if (this.needsResources()) {
            if (!this.findOptimalSourceIndex())
                return;
            const sourceIndex = this.memory.SI;
            if (this.travelToSource(sourceIndex))
                return;
            if (this.advancedHarvestSource(room.sources[sourceIndex]))
                return;
            return;
        }
        this.advancedBuildCSite();
    }
    static vanguardManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            const claimTarget = Memory.rooms[creep.commune.name].claimRequest;
            if (!claimTarget)
                return;
            creep.say(claimTarget);
            if (room.name === claimTarget) {
                creep.buildRoom();
                continue;
            }
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [{ pos: new RoomPosition(25, 25, claimTarget), range: 25 }],
                avoidEnemyRanges: true,
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                },
            });
        }
    }
}

class VanguardDefender extends Creep {
    advancedAttackEnemies() {
        const { room } = this;
        const enemyAttackers = room.enemyAttackers.filter(function (creep) {
            return !creep.isOnExit();
        });
        if (!enemyAttackers.length) {
            const enemyCreeps = room.enemyCreeps.filter(function (creep) {
                return !creep.isOnExit();
            });
            if (!enemyCreeps.length) {
                return this.aggressiveHeal();
            }
            if (this.passiveHeal())
                return true;
            this.say('EC');
            const enemyCreep = findClosestObject(this.pos, enemyCreeps);
            const range = getRange(this.pos.x, enemyCreep.pos.x, this.pos.y, enemyCreep.pos.y);
            if (range > 1) {
                this.rangedAttack(enemyCreep);
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyCreep.pos, range: 1 }],
                });
                return true;
            }
            this.rangedMassAttack();
            this.moveRequest = pack(enemyCreep.pos);
            return true;
        }
        const enemyAttacker = findClosestObject(this.pos, room.enemyAttackers);
        const range = getRange(this.pos.x, enemyAttacker.pos.x, this.pos.y, enemyAttacker.pos.y);
        if (range > 3) {
            this.passiveHeal();
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 1 }],
            });
            return true;
        }
        this.say('AEA');
        this.heal(this);
        if (range === 1) {
            this.rangedMassAttack();
            this.moveRequest = pack(enemyAttacker.pos);
        }
        else
            this.rangedAttack(enemyAttacker);
        if (this.healStrength < enemyAttacker.attackStrength) {
            if (range === 3)
                return true;
            if (range >= 3) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyAttacker.pos, range: 3 }],
                });
                return true;
            }
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 25 }],
                flee: true,
            });
            return true;
        }
        if (this.healStrength < enemyAttacker.attackStrength) {
            if (range <= 2) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyAttacker.pos, range: 1 }],
                    flee: true,
                });
                return true;
            }
        }
        if (range > 1) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 1 }],
            });
            return true;
        }
        return true;
    }
    constructor(creepID) {
        super(creepID);
    }
    static vanguardDefenderManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            const claimTarget = Memory.rooms[creep.commune.name].claimRequest;
            if (!claimTarget)
                return;
            Memory.claimRequests[Memory.rooms[creep.commune.name].claimRequest].needs[ClaimRequestNeeds.vanguardDefender] -= creep.strength;
            creep.say(claimTarget);
            if (room.name === claimTarget) {
                if (creep.advancedAttackEnemies())
                    continue;
                continue;
            }
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [{ pos: new RoomPosition(25, 25, claimTarget), range: 25 }],
                avoidEnemyRanges: true,
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    commune: 1,
                    neutral: 1,
                    highway: 1,
                },
            });
        }
    }
}

class RemoteCoreAttacker extends Creep {
    constructor(creepID) {
        super(creepID);
    }
    get dying() {
        if (this._dying)
            return true;
        if (!this.ticksToLive)
            return false;
        if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME)
            return false;
        return (this._dying = true);
    }
    preTickManager() {
        if (!this.memory.RN)
            return;
        const role = this.role;
        if (!Memory.rooms[this.commune.name].remotes.includes(this.memory.RN)) {
            delete this.memory.RN;
            if (!this.findRemote())
                return;
        }
        if (this.dying)
            return;
        Memory.rooms[this.memory.RN].needs[RemoteNeeds[role]] -= 1;
        const commune = this.commune;
        if (commune.creepsFromRoomWithRemote[this.memory.RN])
            commune.creepsFromRoomWithRemote[this.memory.RN][role].push(this.name);
    }
    findRemote() {
        var _a;
        const creep = this;
        if (creep.memory.RN)
            return true;
        const role = creep.role;
        const remoteNamesByEfficacy = (_a = creep.commune) === null || _a === void 0 ? void 0 : _a.remoteNamesBySourceEfficacy;
        for (const roomName of remoteNamesByEfficacy) {
            const roomMemory = Memory.rooms[roomName];
            if (roomMemory.needs[RemoteNeeds[role]] <= 0)
                continue;
            creep.memory.RN = roomName;
            roomMemory.needs[RemoteNeeds[role]] -= 1;
            return true;
        }
        return false;
    }
    advancedAttackCores() {
        const { room } = this;
        if (!room.structures.invaderCore.length)
            return false;
        const closestCore = room.structures.invaderCore[0];
        if (getRange(this.pos.x, closestCore.pos.x, this.pos.y, closestCore.pos.y) === 1) {
            this.say('🗡️C');
            this.attack(closestCore);
            return true;
        }
        this.say('⏩C');
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: closestCore.pos, range: 1 }],
            avoidEnemyRanges: true,
        });
        return true;
    }
    static remoteCoreAttackerManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (!creep.findRemote()) {
                if (room.name === creep.commune.name) {
                    creep.advancedRecycle();
                    continue;
                }
                creep.createMoveRequest({
                    origin: creep.pos,
                    goals: [
                        {
                            pos: new RoomPosition(25, 25, creep.commune.name),
                            range: 25,
                        },
                    ],
                });
                continue;
            }
            creep.say(creep.memory.RN);
            if (creep.advancedAttackCores())
                continue;
            if (room.name === creep.memory.RN) {
                delete creep.memory.RN;
                continue;
            }
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [
                    {
                        pos: new RoomPosition(25, 25, creep.memory.RN),
                        range: 25,
                    },
                ],
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity
                },
            });
        }
    }
}

class RemoteDefender extends Creep {
    get dying() {
        if (this._dying)
            return true;
        if (!this.ticksToLive)
            return false;
        if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME)
            return false;
        return (this._dying = true);
    }
    preTickManager() {
        if (!this.memory.RN)
            return;
        const role = this.role;
        if (!Memory.rooms[this.commune.name].remotes.includes(this.memory.RN)) {
            delete this.memory.RN;
            if (!this.findRemote())
                return;
        }
        if (this.dying)
            return;
        Memory.rooms[this.memory.RN].needs[RemoteNeeds.minDamage] -= this.attackStrength;
        Memory.rooms[this.memory.RN].needs[RemoteNeeds.minHeal] -= this.healStrength;
        const commune = this.commune;
        if (commune.creepsFromRoomWithRemote[this.memory.RN])
            commune.creepsFromRoomWithRemote[this.memory.RN][role].push(this.name);
    }
    findRemote() {
        var _a;
        const creep = this;
        if (creep.memory.RN)
            return true;
        const remoteNamesByEfficacy = (_a = creep.commune) === null || _a === void 0 ? void 0 : _a.remoteNamesBySourceEfficacy;
        let roomMemory;
        for (const roomName of remoteNamesByEfficacy) {
            roomMemory = Memory.rooms[roomName];
            if (roomMemory.needs[RemoteNeeds.minDamage] + roomMemory.needs[RemoteNeeds.minHeal] <= 0)
                continue;
            creep.memory.RN = roomName;
            roomMemory.needs[RemoteNeeds.minDamage] -= creep.attackStrength;
            roomMemory.needs[RemoteNeeds.minHeal] -= creep.healStrength;
            return true;
        }
        return false;
    }
    advancedAttackEnemies() {
        const { room } = this;
        const enemyAttackers = room.enemyAttackers;
        if (!enemyAttackers.length) {
            const enemyCreeps = room.enemyCreeps;
            if (!enemyCreeps.length) {
                return this.aggressiveHeal();
            }
            if (this.passiveHeal())
                return true;
            this.say('EC');
            const enemyCreep = findClosestObject(this.pos, enemyCreeps);
            const range = getRange(this.pos.x, enemyCreep.pos.x, this.pos.y, enemyCreep.pos.y);
            if (range > 1) {
                this.rangedAttack(enemyCreep);
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyCreep.pos, range: 1 }],
                });
                return true;
            }
            this.rangedMassAttack();
            this.moveRequest = pack(enemyCreep.pos);
            return true;
        }
        const enemyAttacker = findClosestObject(this.pos, enemyAttackers);
        const range = getRange(this.pos.x, enemyAttacker.pos.x, this.pos.y, enemyAttacker.pos.y);
        if (range > 3) {
            this.passiveHeal();
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 1 }],
            });
            return true;
        }
        this.say('AEA');
        this.heal(this);
        if (range === 1) {
            this.rangedMassAttack();
            this.moveRequest = pack(enemyAttacker.pos);
        }
        else
            this.rangedAttack(enemyAttacker);
        if (this.healStrength < enemyAttacker.attackStrength) {
            if (range === 3)
                return true;
            if (range >= 3) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyAttacker.pos, range: 3 }],
                });
                return true;
            }
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 25 }],
                flee: true,
            });
            return true;
        }
        if (this.healStrength < enemyAttacker.attackStrength) {
            if (range <= 2) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [{ pos: enemyAttacker.pos, range: 1 }],
                    flee: true,
                });
                return true;
            }
        }
        if (range > 1) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: enemyAttacker.pos, range: 1 }],
            });
            return true;
        }
        return true;
    }
    constructor(creepID) {
        super(creepID);
    }
    static remoteDefenderManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (!creep.findRemote()) {
                if (room.name === creep.commune.name) {
                    creep.advancedRecycle();
                    continue;
                }
                creep.createMoveRequest({
                    origin: creep.pos,
                    goals: [
                        {
                            pos: new RoomPosition(25, 25, creep.commune.name),
                            range: 25,
                        },
                    ],
                    typeWeights: {
                        enemy: Infinity,
                        ally: Infinity,
                        keeper: Infinity,
                        enemyRemote: Infinity,
                        allyRemote: Infinity,
                    },
                });
                continue;
            }
            creep.say(creep.memory.RN);
            if (creep.advancedAttackEnemies()) {
                delete creep.memory.TW;
                continue;
            }
            if (room.name === creep.memory.RN) {
                if (!creep.memory.TW)
                    creep.memory.TW = 0;
                else
                    creep.memory.TW += 1;
                if (creep.memory.TW > randomIntRange(20, 100)) {
                    delete creep.memory.RN;
                    if (creep.moveRequest)
                        continue;
                    if (!creep.findRemote())
                        continue;
                }
            }
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [
                    {
                        pos: new RoomPosition(25, 25, creep.memory.RN),
                        range: 25,
                    },
                ],
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity,
                },
            });
        }
    }
}

class RemoteDismantler extends Creep {
    constructor(creepID) {
        super(creepID);
    }
    get dying() {
        if (this._dying)
            return true;
        if (!this.ticksToLive)
            return false;
        if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME)
            return false;
        return (this._dying = true);
    }
    preTickManager() {
        if (!this.memory.RN)
            return;
        const role = this.role;
        if (!Memory.rooms[this.commune.name].remotes.includes(this.memory.RN)) {
            delete this.memory.RN;
            if (!this.findRemote())
                return;
        }
        if (this.dying)
            return;
        Memory.rooms[this.memory.RN].needs[RemoteNeeds[role]] -= 1;
        const commune = this.commune;
        if (commune.creepsFromRoomWithRemote[this.memory.RN])
            commune.creepsFromRoomWithRemote[this.memory.RN][role].push(this.name);
    }
    findRemote() {
        var _a;
        const creep = this;
        if (creep.memory.RN)
            return true;
        const role = creep.role;
        const remoteNamesByEfficacy = (_a = creep.commune) === null || _a === void 0 ? void 0 : _a.remoteNamesBySourceEfficacy;
        for (const roomName of remoteNamesByEfficacy) {
            const roomMemory = Memory.rooms[roomName];
            if (roomMemory.needs[RemoteNeeds[role]] <= 0)
                continue;
            creep.memory.RN = roomName;
            roomMemory.needs[RemoteNeeds[role]] -= 1;
            return true;
        }
        return false;
    }
    advancedDismantle() {
        const { room } = this;
        let target;
        let range;
        if (this.memory.dismantleTarget) {
            target = findObjectWithID(this.memory.dismantleTarget);
            if (target) {
                range = getRange(this.pos.x, target.pos.x, this.pos.y, target.pos.y);
                if (range > 1) {
                    this.createMoveRequest({
                        origin: this.pos,
                        goals: [
                            {
                                pos: target.pos,
                                range: 1,
                            },
                        ],
                        avoidEnemyRanges: true,
                    });
                    return true;
                }
                this.dismantle(target);
                return true;
            }
        }
        let targets = room.actionableWalls;
        targets = targets.concat(room.find(FIND_HOSTILE_STRUCTURES).filter(function (structure) {
            return structure.structureType != STRUCTURE_INVADER_CORE;
        }));
        if (targets.length) {
            target = this.pos.findClosestByPath(targets, { ignoreRoads: true, ignoreCreeps: true });
            range = getRange(this.pos.x, target.pos.x, this.pos.y, target.pos.y);
            if (range > 1) {
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [
                        {
                            pos: target.pos,
                            range: 1,
                        },
                    ],
                    avoidEnemyRanges: true,
                });
                return true;
            }
            this.memory.dismantleTarget = target.id;
            this.dismantle(target);
            return true;
        }
        return false;
    }
    static remoteDismantlerManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (!creep.findRemote()) {
                if (room.name === creep.commune.name) {
                    creep.advancedRecycle();
                    continue;
                }
                creep.createMoveRequest({
                    origin: creep.pos,
                    goals: [
                        {
                            pos: new RoomPosition(25, 25, creep.commune.name),
                            range: 25,
                        },
                    ],
                });
                continue;
            }
            creep.say(creep.memory.RN);
            if (creep.advancedDismantle())
                continue;
            if (room.name === creep.memory.RN) {
                delete creep.memory.RN;
                continue;
            }
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [
                    {
                        pos: new RoomPosition(25, 25, creep.memory.RN),
                        range: 25,
                    },
                ],
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity
                },
            });
        }
    }
}

class RemoteHarvester extends Creep {
    constructor(creepID) {
        super(creepID);
    }
    get dying() {
        if (this._dying)
            return true;
        if (!this.ticksToLive)
            return false;
        if (this.memory.RN) {
            if (this.ticksToLive >
                this.body.length * CREEP_SPAWN_TIME +
                    Memory.rooms[this.memory.RN].SE[this.memory.SI] -
                    1 +
                    20)
                return false;
        }
        else if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME)
            return false;
        return (this._dying = true);
    }
    preTickManager() {
        if (!this.findRemote())
            return;
        const role = this.role;
        if (!Memory.rooms[this.commune.name].remotes.includes(this.memory.RN)) {
            this.removeRemote();
            if (!this.findRemote())
                return;
        }
        if (this.dying)
            return;
        Memory.rooms[this.memory.RN].needs[RemoteNeeds[role]] -= this.parts.work;
        const commune = this.commune;
        if (commune && commune.creepsFromRoomWithRemote[this.memory.RN])
            commune.creepsFromRoomWithRemote[this.memory.RN][role].push(this.name);
    }
    findRemote() {
        var _a;
        if (this.memory.RN)
            return true;
        const role = this.role;
        for (const remoteInfo of (_a = this.commune) === null || _a === void 0 ? void 0 : _a.remoteSourceIndexesByEfficacy) {
            const splitRemoteInfo = remoteInfo.split(' ');
            const remoteName = splitRemoteInfo[0];
            const sourceIndex = parseInt(splitRemoteInfo[1]);
            const remoteMemory = Memory.rooms[remoteName];
            if (sourceIndex !== this.memory.SI)
                continue;
            if (remoteMemory.needs[RemoteNeeds[role]] <= 0)
                continue;
            this.assignRemote(remoteName);
            return true;
        }
        return false;
    }
    assignRemote(remoteName) {
        this.memory.RN = remoteName;
        if (this.dying)
            return;
        const role = this.role;
        const needs = Memory.rooms[remoteName].needs;
        needs[RemoteNeeds[role]] -= this.parts.work;
    }
    removeRemote() {
        if (!this.dying) {
            const role = this.role;
            const needs = Memory.rooms[this.memory.RN].needs;
            needs[RemoteNeeds[role]] += this.parts.work;
        }
        delete this.memory.RN;
    }
    remoteActions() {
        if (this.travelToSource(this.memory.SI))
            return;
        if (this.advancedHarvestSource(this.room.sources[this.memory.SI]))
            return;
    }
    travelToSource(sourceIndex) {
        const { room } = this;
        if (!this.findSourcePos(sourceIndex))
            return false;
        this.say('🚬');
        const harvestPos = unpackAsRoomPos(this.memory.packedPos, room.name);
        if (getRange(this.pos.x, harvestPos.x, this.pos.y, harvestPos.y) === 0)
            return false;
        this.say(`⏩ ${sourceIndex}`);
        this.createMoveRequest({
            origin: this.pos,
            goals: [
                {
                    pos: harvestPos,
                    range: 0,
                },
            ],
            avoidEnemyRanges: true,
        });
        return true;
    }
    static RemoteHarvesterManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (!creep.findRemote())
                continue;
            if (room.name === creep.memory.RN) {
                creep.remoteActions();
                continue;
            }
            creep.say(creep.memory.RN);
            const sourcePos = unpackPosList(Memory.rooms[creep.memory.RN].SP[creep.memory.SI])[0];
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [
                    {
                        pos: sourcePos,
                        range: 1,
                    },
                ],
                avoidEnemyRanges: true,
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity,
                },
            });
        }
    }
}

class RemoteHauler extends Creep {
    get dying() {
        if (this._dying)
            return true;
        if (!this.ticksToLive)
            return false;
        if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME)
            return false;
        return (this._dying = true);
    }
    preTickManager() {
        if (!this.memory.RN)
            return;
        if (!Memory.rooms[this.commune.name].remotes.includes(this.memory.RN)) {
            this.removeRemote();
            if (!this.findRemote())
                return;
        }
        if (this.dying)
            return;
        if (Memory.rooms[this.memory.RN])
            Memory.rooms[this.memory.RN].needs[RemoteNeeds[`remoteHauler${this.memory.SI}`]] -= this.parts.carry;
    }
    findRemote() {
        var _a;
        if (this.memory.RN)
            return true;
        for (const remoteInfo of (_a = this.commune) === null || _a === void 0 ? void 0 : _a.remoteSourceIndexesByEfficacy) {
            const splitRemoteInfo = remoteInfo.split(' ');
            const remoteName = splitRemoteInfo[0];
            const sourceIndex = parseInt(splitRemoteInfo[1]);
            const remoteMemory = Memory.rooms[remoteName];
            if (remoteMemory.needs[RemoteNeeds[`remoteHauler${sourceIndex}`]] <= 0)
                continue;
            this.assignRemote(remoteName, sourceIndex);
            return true;
        }
        return false;
    }
    assignRemote(remoteName, sourceIndex) {
        this.memory.RN = remoteName;
        this.memory.SI = sourceIndex;
        if (this.dying)
            return;
        Memory.rooms[remoteName].needs[RemoteNeeds[`remoteHauler${this.memory.SI}`]] -= this.parts.carry;
    }
    removeRemote() {
        if (!this.dying) {
            Memory.rooms[this.memory.RN].needs[RemoteNeeds[`remoteHauler${this.memory.SI}`]] += this.parts.carry;
        }
        delete this.memory.RN;
        delete this.memory.SI;
    }
    getDroppedEnergy() {
        for (const resource of this.pos.lookFor(LOOK_RESOURCES)) {
            if (resource.resourceType !== RESOURCE_ENERGY)
                continue;
            if (resource.amount < this.store.getCapacity() * 0.5)
                return false;
            this.pickup(resource);
            this.movedResource = true;
            return true;
        }
        return false;
    }
    getResources() {
        if (!this.findRemote())
            return false;
        const sourcePos = unpackPosList(Memory.rooms[this.memory.RN].SP[this.memory.SI])[0];
        if (this.room.name === this.memory.RN) {
            if (getRange(this.pos.x, sourcePos.x, this.pos.y, sourcePos.y) > 1) {
                this.say('M');
                this.getDroppedEnergy();
                this.createMoveRequest({
                    origin: this.pos,
                    goals: [
                        {
                            pos: sourcePos,
                            range: 1,
                        },
                    ],
                    avoidEnemyRanges: true,
                });
                return true;
            }
            this.reserveWithdrawEnergy();
            if (!this.fulfillReservation()) {
                this.say(this.message);
                return false;
            }
            this.reserveWithdrawEnergy();
            if (!this.fulfillReservation()) {
                this.say(this.message);
                return false;
            }
            if (this.needsResources()) {
                this.moved = -2;
                return false;
            }
            if (!this.commune)
                return false;
            this.message += this.commune.name;
            this.say(this.message);
            this.createMoveRequest({
                origin: this.pos,
                goals: [
                    {
                        pos: this.commune.anchor,
                        range: 3,
                    },
                ],
                avoidEnemyRanges: true,
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity,
                },
            });
            return true;
        }
        this.message += this.memory.RN;
        this.say(this.message);
        this.getDroppedEnergy();
        this.createMoveRequest({
            origin: this.pos,
            goals: [
                {
                    pos: sourcePos,
                    range: 1,
                },
            ],
            avoidEnemyRanges: true,
            typeWeights: {
                enemy: Infinity,
                ally: Infinity,
                keeper: Infinity,
                enemyRemote: Infinity,
                allyRemote: Infinity,
            },
        });
        return true;
    }
    reserveWithdrawEnergy() {
        var _a;
        if (this.memory.reservations && ((_a = this.memory.reservations) === null || _a === void 0 ? void 0 : _a.length))
            return;
        if (!this.needsResources())
            return;
        const { room } = this;
        const sourcePos = room.sources[this.memory.SI].pos;
        if (this.freeCapacityNextTick === undefined)
            this.freeCapacityNextTick = this.store.getFreeCapacity();
        let withdrawTargets = room.MAWT.filter(target => {
            if (getRange(target.pos.x, sourcePos.x, target.pos.y, sourcePos.y) > 1)
                return false;
            if (target instanceof Resource)
                return true;
            return target.store.energy >= this.freeCapacityNextTick;
        });
        for (const creepName of room.myCreeps[`source${(this.memory.SI + 1)}RemoteHarvester`]) {
            const harvester = Game.creeps[creepName];
            if (harvester.store.getFreeCapacity(RESOURCE_ENERGY) > harvester.parts.work * HARVEST_POWER || harvester.store.getCapacity(RESOURCE_ENERGY) < this.store.getFreeCapacity())
                continue;
            withdrawTargets.push(harvester);
        }
        let target;
        let amount;
        if (withdrawTargets.length) {
            target = findClosestObject(this.pos, withdrawTargets);
            if (target instanceof Resource)
                amount = target.reserveAmount;
            else
                amount = Math.min(this.freeCapacityNextTick, target.store.energy);
            this.createReservation('withdraw', target.id, amount, RESOURCE_ENERGY);
            return;
        }
        withdrawTargets = room.OAWT.filter(target => {
            if (getRange(target.pos.x, sourcePos.x, target.pos.y, sourcePos.y) > 1)
                return false;
            if (target instanceof Resource)
                return true;
            return target.store.energy >= this.freeCapacityNextTick;
        });
        if (!withdrawTargets.length)
            return;
        target = findClosestObject(this.pos, withdrawTargets);
        if (target instanceof Resource)
            amount = target.reserveAmount;
        else
            amount = Math.min(this.freeCapacityNextTick, target.store.energy);
        this.createReservation('withdraw', target.id, amount, RESOURCE_ENERGY);
    }
    deliverResources() {
        if (this.room.name === this.commune.name) {
            this.advancedRenew();
            let store = this.commune.storage;
            if (!store)
                store = this.commune.terminal;
            if (store) {
                if (!this.memory.reservations || this.memory.reservations.length == 0)
                    this.createReservation('transfer', store.id, this.store[RESOURCE_ENERGY], RESOURCE_ENERGY);
                if (!this.fulfillReservation()) {
                    this.say(this.message);
                    return true;
                }
            }
            else {
                this.reserveTransferEnergy();
                if (this.fulfillReservation()) {
                    this.say(this.message);
                    return true;
                }
                this.reserveTransferEnergy();
                if (!this.fulfillReservation()) {
                    this.say(this.message);
                    return true;
                }
            }
            if (!this.needsResources())
                return true;
            if (!this.findRemote())
                return false;
            this.message += this.memory.RN;
            this.say(this.message);
            const sourcePos = unpackPosList(Memory.rooms[this.memory.RN].SP[this.memory.SI])[0];
            this.createMoveRequest({
                origin: this.pos,
                goals: [
                    {
                        pos: sourcePos,
                        range: 1,
                    },
                ],
                avoidEnemyRanges: true,
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity,
                },
            });
            return false;
        }
        if (!this.commune)
            return false;
        this.message += this.commune.name;
        this.say(this.message);
        this.createMoveRequest({
            origin: this.pos,
            goals: [
                {
                    pos: this.commune.anchor,
                    range: 3,
                },
            ],
            avoidEnemyRanges: true,
            typeWeights: {
                enemy: Infinity,
                ally: Infinity,
                keeper: Infinity,
                enemyRemote: Infinity,
                allyRemote: Infinity,
            },
        });
        return true;
    }
    relayCoord(coord) {
        if (Memory.roomVisuals)
            this.room.visual.circle(coord.x, coord.y, { fill: myColors.lightBlue });
        const creepAtPosName = this.room.creepPositions.get(pack(coord));
        if (!creepAtPosName)
            return false;
        const creepAtPos = Game.creeps[creepAtPosName];
        if (creepAtPos.role !== 'remoteHauler')
            return false;
        if (creepAtPos.movedResource)
            return false;
        if (creepAtPos.store.getFreeCapacity() !== this.store.getUsedCapacity(RESOURCE_ENERGY))
            return false;
        this.transfer(creepAtPos, RESOURCE_ENERGY);
        this.movedResource = true;
        creepAtPos.movedResource = true;
        this.store.energy -= creepAtPos.store.getFreeCapacity();
        creepAtPos.store.energy += this.store.getUsedCapacity(RESOURCE_ENERGY);
        delete this.moveRequest;
        delete creepAtPos.moveRequest;
        const newCreepAtPosRemote = this.memory.RN || creepAtPos.memory.RN;
        const newCreepAtPosSourceIndex = this.memory.SI !== undefined ? this.memory.SI : creepAtPos.memory.SI;
        this.memory.RN = creepAtPos.memory.RN || this.memory.RN;
        this.memory.SI = creepAtPos.memory.SI !== undefined ? creepAtPos.memory.SI : this.memory.SI;
        creepAtPos.memory.RN = newCreepAtPosRemote;
        creepAtPos.memory.SI = newCreepAtPosSourceIndex;
        this.getResources();
        const remoteHauler = creepAtPos;
        remoteHauler.deliverResources();
        return true;
    }
    relayCardinal(moveCoord) {
        let offsets = relayOffsets.horizontal;
        if (this.pos.y === moveCoord.y)
            offsets = relayOffsets.vertical;
        for (const offset of offsets) {
            const coord = {
                x: moveCoord.x + offset.x,
                y: moveCoord.y + offset.y,
            };
            if (this.relayCoord(coord))
                return true;
        }
        return false;
    }
    relayDiagonal(moveCoord) {
        let offsets;
        if (this.pos.y > moveCoord.y) {
            offsets = relayOffsets.topLeft;
            if (this.pos.x < moveCoord.x)
                offsets = relayOffsets.topRight;
        }
        else {
            offsets = relayOffsets.bottomLeft;
            if (this.pos.x < moveCoord.x)
                offsets = relayOffsets.bottomRight;
        }
        for (const offset of offsets) {
            const coord = {
                x: moveCoord.x + offset.x,
                y: moveCoord.y + offset.y,
            };
            if (coord.x !== moveCoord.x && coord.y !== moveCoord.y)
                continue;
            if (this.relayCoord(coord))
                return true;
        }
        return false;
    }
    relayAsFull() {
        if (!this.moveRequest && (!this.memory.path || !this.memory.path.length))
            return;
        if (this.movedResource)
            return;
        if (this.store.getUsedCapacity(RESOURCE_ENERGY) === 0)
            return;
        const moveCoord = this.moveRequest ? unpackAsPos(this.moveRequest) : unpackPosList(this.memory.path)[0];
        if (this.pos.x === moveCoord.x || this.pos.y === moveCoord.y) {
            this.relayCardinal(moveCoord);
            return;
        }
        this.relayDiagonal(moveCoord);
    }
    constructor(creepID) {
        super(creepID);
    }
    static remoteHaulerManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            let returnTripTime = 0;
            if (creep.memory.RN && creep.memory.SI !== undefined) {
                returnTripTime = Memory.rooms[creep.memory.RN].SE[creep.memory.SI] * 1.1;
            }
            if (creep.needsResources() && creep.ticksToLive > returnTripTime) {
                creep.getResources();
                continue;
            }
            if (creep.deliverResources())
                creep.relayAsFull();
        }
    }
}

class RemoteReserver extends Creep {
    get dying() {
        if (this._dying)
            return true;
        if (!this.ticksToLive)
            return false;
        if (this.memory.RN) {
            if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME + Memory.rooms[this.memory.RN].RE - 1)
                return false;
        }
        else if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME)
            return false;
        return (this._dying = true);
    }
    findRemote() {
        var _a;
        if (this.memory.RN)
            return true;
        const remoteNamesByEfficacy = (_a = this.commune) === null || _a === void 0 ? void 0 : _a.remoteNamesBySourceEfficacy;
        let roomMemory;
        for (const roomName of remoteNamesByEfficacy) {
            roomMemory = Memory.rooms[roomName];
            if (roomMemory.needs[RemoteNeeds.remoteReserver] <= 0)
                continue;
            this.memory.RN = roomName;
            roomMemory.needs[RemoteNeeds.remoteReserver] -= 1;
            return true;
        }
        return false;
    }
    preTickManager() {
        if (!this.memory.RN)
            return;
        const role = this.role;
        if (!Memory.rooms[this.commune.name].remotes.includes(this.memory.RN)) {
            delete this.memory.RN;
            if (!this.findRemote())
                return;
        }
        if (this.dying)
            return;
        Memory.rooms[this.memory.RN].needs[RemoteNeeds[role]] -= 1;
        const commune = this.commune;
        if (commune.creepsFromRoomWithRemote[this.memory.RN])
            commune.creepsFromRoomWithRemote[this.memory.RN][role].push(this.name);
    }
    constructor(creepID) {
        super(creepID);
    }
    static remoteReserverManager(room, creepsOfRole) {
        for (const creepName of creepsOfRole) {
            const creep = Game.creeps[creepName];
            if (!creep.findRemote())
                continue;
            creep.say(creep.memory.RN);
            if (room.name === creep.memory.RN) {
                creep.advancedReserveController();
                continue;
            }
            creep.createMoveRequest({
                origin: creep.pos,
                goals: [
                    {
                        pos: new RoomPosition(25, 25, creep.memory.RN),
                        range: 25,
                    },
                ],
                avoidEnemyRanges: true,
                plainCost: 1,
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity
                },
            });
            continue;
        }
    }
}

const creepClasses = {};
creepClasses.source1Harvester = SourceHarvester;
creepClasses.source2Harvester = SourceHarvester;
creepClasses.hauler = Hauler;
creepClasses.controllerUpgrader = ControllerUpgrader;
creepClasses.builder = Builder;
creepClasses.maintainer = Maintainer;
creepClasses.mineralHarvester = MineralHarvester;
creepClasses.hubHauler = HubHauler;
creepClasses.fastFiller = FastFiller;
creepClasses.meleeDefender = MeleeDefender;
creepClasses.source1RemoteHarvester = RemoteHarvester;
creepClasses.source2RemoteHarvester = RemoteHarvester;
creepClasses.remoteHauler = RemoteHauler;
creepClasses.remoteReserver = RemoteReserver;
creepClasses.remoteDefender = RemoteDefender;
creepClasses.remoteCoreAttacker = RemoteCoreAttacker;
creepClasses.remoteDismantler = RemoteDismantler;
creepClasses.scout = Scout;
creepClasses.claimer = Claimer;
creepClasses.vanguard = Vanguard;
creepClasses.allyVanguard = AllyVanguard;
creepClasses.vanguardDefender = VanguardDefender;
creepClasses.antifaAssaulter = AntifaAssaulter;

InternationalManager.prototype.creepOrganizer = function () {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    function processSingleCreep(creepName) {
        let creep = Game.creeps[creepName];
        if (!creep) {
            delete Memory.creeps[creepName];
            return;
        }
        const { role } = creep;
        if (!role || role.startsWith('shard'))
            return;
        const creepClass = creepClasses[role];
        if (!creepClass)
            return;
        creep = Game.creeps[creepName] = new creepClass(creep.id);
        const { room } = creep;
        room.myCreeps[role].push(creepName);
        room.myCreepsAmount += 1;
        if (!creep.spawning)
            room.creepPositions.set(pack(creep.pos), creep.name);
        const commune = creep.commune;
        if (!commune)
            return;
        if (!commune.controller.my) {
            creep.suicide();
            return;
        }
        creep.preTickManager();
        creep.reservationManager();
        if (!creep.dying)
            commune.creepsFromRoom[role].push(creepName);
        commune.creepsFromRoomAmount += 1;
    }
    for (const creepName in Memory.creeps) {
        try {
            processSingleCreep(creepName);
        }
        catch (err) {
            customLog('Exception processing creep: ' + creepName + err, err.stack, myColors.white, myColors.red);
        }
    }
    if (Memory.CPULogging)
        customLog('Creep Organizer', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.midGrey);
};

let cSiteID;
let cSite;
let cSiteAge;
InternationalManager.prototype.constructionSiteManager = function () {
    for (cSiteID in Game.constructionSites) {
        if (Memory.constructionSites[cSiteID])
            continue;
        Memory.constructionSites[cSiteID] = 0;
    }
    for (cSiteID in Memory.constructionSites) {
        cSite = Game.constructionSites[cSiteID];
        if (!cSite) {
            delete Memory.constructionSites[cSiteID];
            continue;
        }
        cSiteAge = Memory.constructionSites[cSiteID];
        if (cSiteAge > 20000 + cSiteAge * cSite.progress) {
            Game.constructionSites[cSiteID].remove();
            delete Memory.constructionSites[cSiteID];
        }
        Memory.constructionSites[cSiteID] += 1;
    }
};

InternationalManager.prototype.mapVisualsManager = function () {
    if (!Memory.mapVisuals)
        return;
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    for (const roomName in Memory.rooms) {
        const roomMemory = Memory.rooms[roomName];
        Game.map.visual.text(roomMemory.T, new RoomPosition(2, 45, roomName), {
            align: 'left',
            fontSize: 5,
        });
        if (roomMemory.T === 'commune') {
            const room = Game.rooms[roomName];
            if (!room)
                continue;
            Game.map.visual.text(`⚡${room.findStoredResourceAmount(RESOURCE_ENERGY)}`, new RoomPosition(2, 8, roomName), {
                align: 'left',
                fontSize: 8,
            });
            if (roomMemory.claimRequest) {
                Game.map.visual.line(room.anchor || new RoomPosition(25, 25, roomName), new RoomPosition(25, 25, roomMemory.claimRequest), {
                    color: myColors.lightBlue,
                    width: 1.2,
                    opacity: 0.3,
                });
            }
            if (roomMemory.allyCreepRequest) {
                Game.map.visual.line(room.anchor || new RoomPosition(25, 25, roomName), new RoomPosition(25, 25, roomMemory.allyCreepRequest), {
                    color: myColors.green,
                    width: 1.2,
                    opacity: 0.3,
                });
            }
            if (roomMemory.attackRequests.length) {
                for (const requestName of roomMemory.attackRequests) {
                    Game.map.visual.line(room.anchor || new RoomPosition(25, 25, roomName), new RoomPosition(25, 25, requestName), {
                        color: myColors.red,
                        width: 1.2,
                        opacity: 0.3,
                    });
                }
            }
            continue;
        }
        if (roomMemory.T === 'remote') {
            const commune = Game.rooms[roomMemory.commune];
            if (commune) {
                const possibleReservation = commune.energyCapacityAvailable >= 650;
                for (const sourceIndex in roomMemory.SP) {
                    const positions = unpackPosList(roomMemory.SP[sourceIndex]);
                    Game.map.visual.line(positions[0], commune.anchor || new RoomPosition(25, 25, commune.name), {
                        color: myColors.yellow,
                        width: 1.2,
                        opacity: 0.3,
                    });
                    const income = (possibleReservation ? 10 : 5) -
                        Math.floor(roomMemory.needs[RemoteNeeds[remoteHarvesterRoles[sourceIndex]]] * minHarvestWorkRatio);
                    Game.map.visual.text(`⛏️${income},🚶‍♀️${roomMemory.SE[sourceIndex]}`, new RoomPosition(positions[0].x, positions[0].y, roomName), {
                        align: 'center',
                        fontSize: 5,
                    });
                }
            }
            if (roomMemory.abandoned) {
                Game.map.visual.text(`❌${roomMemory.abandoned.toString()}`, new RoomPosition(2, 16, roomName), {
                    align: 'left',
                    fontSize: 8,
                });
            }
            continue;
        }
        if (roomMemory.notClaimable) {
            Game.map.visual.circle(new RoomPosition(25, 25, roomName), {
                stroke: myColors.red,
                strokeWidth: 2,
                fill: 'transparent',
            });
            continue;
        }
    }
    for (const roomName in Memory.claimRequests) {
        Game.map.visual.text(`💵${Memory.claimRequests[roomName].score.toFixed(2)}`, new RoomPosition(2, 24, roomName), {
            align: 'left',
            fontSize: 8,
        });
    }
    if (Memory.CPULogging)
        customLog('Map Visuals Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
};

InternationalManager.prototype.endTickManager = function () {
    allyManager.endTickManager();
    statsManager.internationalEndTick();
    if (!Memory.isMainShard)
        return;
    for (let i = 0; i < 99; i += 1)
        console.log();
    const CPUColor = findCPUColor();
    customLog('Total CPU', `${Game.cpu.getUsed().toFixed(2)} / ${Game.cpu.limit} CPU Bucket: ${Game.cpu.bucket}`, myColors.white, CPUColor);
    console.log(global.logs);
};

class RoomCacheObject {
    constructor(opts) {
        const roomObject = this;
        for (const propertyName in opts)
            roomObject[propertyName] = opts[propertyName];
        roomObject.room.roomObjects[roomObject.name] = roomObject;
    }
}
RoomCacheObject.prototype.formatValue = function () {
    const roomObject = this;
    const { room } = roomObject;
    if (roomObject.valueType === 'id') {
        roomObject.value = findObjectWithID(roomObject.value);
        return;
    }
    if (roomObject.valueType === 'pos') {
        if (!roomObject.value)
            return;
        roomObject.value = new RoomPosition(roomObject.value.x, roomObject.value.y, room.name);
    }
};
RoomCacheObject.prototype.getCachedValue = function () {
    const roomObject = this;
    const { room } = roomObject;
    if (roomObject.cacheType === 'memory') {
        const cachedValue = room.memory[roomObject.name];
        if (!cachedValue)
            return false;
        roomObject.value = cachedValue;
        return true;
    }
    if (roomObject.cacheType === 'global') {
        const cachedRoomObject = room.global[roomObject.name];
        if (!cachedRoomObject)
            return false;
        if (cachedRoomObject.lastCache + roomObject.cacheAmount <= Game.time) {
            delete room.global[roomObject.name];
            return false;
        }
        roomObject.value = cachedRoomObject.value;
        return true;
    }
    return false;
};
RoomCacheObject.prototype.getValue = function () {
    const roomObject = this;
    if (roomObject.getCachedValue()) {
        roomObject.formatValue();
        if (roomObject.value)
            return roomObject.value;
    }
    roomObject.value = roomObject.valueConstructor();
    roomObject.cache();
    roomObject.formatValue();
    return roomObject.value;
};
RoomCacheObject.prototype.cache = function () {
    const roomObject = this;
    const { room } = roomObject;
    room.roomObjects[roomObject.name] = roomObject;
    if (roomObject.cacheType === 'memory') {
        room.memory[roomObject.name] = roomObject.value;
        return;
    }
    if (roomObject.cacheType === 'global') {
        const roomObjectCopy = new RoomCacheObject({
            name: roomObject.name,
            valueType: roomObject.valueType,
            cacheType: roomObject.cacheType,
            cacheAmount: roomObject.cacheAmount,
            room,
            valueConstructor: undefined,
        });
        roomObjectCopy.lastCache = Game.time;
        roomObjectCopy.value = roomObject.value;
        room.global[roomObject.name] = roomObjectCopy;
    }
};

Room.prototype.get = function (roomObjectName) {
    const room = this;
    function findHarvestPositions(source) {
        if (!source)
            return [];
        const harvestPositions = [];
        const terrain = Game.map.getRoomTerrain(room.name);
        const adjacentPositions = findCoordsInsideRect(source.pos.x - 1, source.pos.y - 1, source.pos.x + 1, source.pos.y + 1);
        for (const pos of adjacentPositions) {
            if (terrain.get(pos.x, pos.y) === TERRAIN_MASK_WALL)
                continue;
            harvestPositions.push(new RoomPosition(pos.x, pos.y, room.name));
        }
        return harvestPositions;
    }
    function findClosestHarvestPos(harvestPositions) {
        if (!room.anchor)
            return;
        return room.anchor.findClosestByPath(harvestPositions, {
            ignoreCreeps: true,
            ignoreDestructibleStructures: true,
            ignoreRoads: true,
        });
    }
    new RoomCacheObject({
        name: 'mineralHarvestPositions',
        valueType: 'object',
        cacheType: 'global',
        cacheAmount: Infinity,
        room,
        valueConstructor() {
            return findHarvestPositions(room.mineral);
        },
    });
    new RoomCacheObject({
        name: 'closestMineralHarvestPos',
        valueType: 'pos',
        cacheType: 'global',
        cacheAmount: Infinity,
        room,
        valueConstructor() {
            return findClosestHarvestPos(room.roomObjects.mineralHarvestPositions.getValue());
        },
    });
    function findCenterUpgradePos() {
        if (!room.anchor)
            return false;
        const distanceCoords = room.distanceTransform(undefined, false, 255, room.controller.pos.x - 2, room.controller.pos.y - 2, room.controller.pos.x + 2, room.controller.pos.y + 2);
        return room.findClosestPosOfValue({
            coordMap: distanceCoords,
            startCoords: [room.anchor],
            requiredValue: 2,
            reduceIterations: 1,
            visuals: false,
            cardinalFlood: true,
        });
    }
    new RoomCacheObject({
        name: 'centerUpgradePos',
        valueType: 'pos',
        cacheType: 'global',
        cacheAmount: Infinity,
        room,
        valueConstructor: findCenterUpgradePos,
    });
    function findUpgradePositions() {
        const centerUpgradePos = room.roomObjects.centerUpgradePos.getValue();
        if (!centerUpgradePos)
            return [];
        if (!room.anchor)
            return [];
        const upgradePositions = [];
        const terrain = internationalManager.getTerrainCoords(room.name);
        const adjacentPositions = findCoordsInsideRect(centerUpgradePos.x - 1, centerUpgradePos.y - 1, centerUpgradePos.x + 1, centerUpgradePos.y + 1);
        for (const coord of adjacentPositions) {
            if (terrain[pack(coord)] === TERRAIN_MASK_WALL)
                continue;
            upgradePositions.push(new RoomPosition(coord.x, coord.y, room.name));
        }
        upgradePositions.sort(function (a, b) {
            return getRange(a.x, room.anchor.x, a.y, room.anchor.y) - getRange(b.x, room.anchor.x, b.y, room.anchor.y);
        });
        upgradePositions.push(upgradePositions.shift());
        return upgradePositions;
    }
    new RoomCacheObject({
        name: 'upgradePositions',
        valueType: 'object',
        cacheType: 'global',
        cacheAmount: Infinity,
        room,
        valueConstructor: findUpgradePositions,
    });
    function findFastFillerPositions() {
        if (!room.anchor)
            return [];
        const fastFillerPositions = [
            {
                x: room.anchor.x - 1,
                y: room.anchor.y - 1,
            },
            {
                x: room.anchor.x + 1,
                y: room.anchor.y - 1,
            },
            {
                x: room.anchor.x - 1,
                y: room.anchor.y + 1,
            },
            {
                x: room.anchor.x + 1,
                y: room.anchor.y + 1,
            },
        ];
        let adjacentStructures;
        let adjacentStructuresByType;
        for (let index = fastFillerPositions.length - 1; index >= 0; index -= 1) {
            const pos = fastFillerPositions[index];
            adjacentStructures = room.lookForAtArea(LOOK_STRUCTURES, pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1, true);
            adjacentStructuresByType = {
                spawn: 0,
                extension: 0,
                container: 0,
                link: 0,
            };
            for (const adjacentPosData of adjacentStructures) {
                const { structureType } = adjacentPosData.structure;
                if (adjacentStructuresByType[structureType] === undefined)
                    continue;
                adjacentStructuresByType[structureType] += 1;
            }
            if (adjacentStructuresByType[STRUCTURE_CONTAINER] + adjacentStructuresByType[STRUCTURE_LINK] > 0 &&
                (adjacentStructuresByType[STRUCTURE_SPAWN] > 0 || adjacentStructuresByType[STRUCTURE_EXTENSION] > 1))
                continue;
            fastFillerPositions.splice(index, 1);
        }
        return fastFillerPositions;
    }
    new RoomCacheObject({
        name: 'fastFillerPositions',
        valueType: 'object',
        cacheType: 'global',
        cacheAmount: 1,
        room,
        valueConstructor: findFastFillerPositions,
    });
    function findUsedMineralHarvestPositions() {
        const usedHarvestPositions = new Set();
        for (const creepName of room.creepsFromRoom.mineralHarvester) {
            const creep = Game.creeps[creepName];
            if (creep.dying)
                continue;
            if (creep.memory.packedPos)
                usedHarvestPositions.add(creep.memory.packedPos);
        }
        return usedHarvestPositions;
    }
    new RoomCacheObject({
        name: 'usedMineralHarvestPositions',
        valueType: 'object',
        cacheType: 'global',
        cacheAmount: 1,
        room,
        valueConstructor: findUsedMineralHarvestPositions,
    });
    function findUsedUpgradePositions() {
        const usedUpgradePositions = new Set();
        const controllerContainer = room.controllerContainer;
        if (!controllerContainer) {
            const centerUpgadePos = room.roomObjects.centerUpgradePos.getValue();
            usedUpgradePositions.add(pack(centerUpgadePos));
        }
        const hubAnchor = unpackAsRoomPos(room.memory.stampAnchors.hub[0], room.name);
        if (!hubAnchor)
            return false;
        const upgradePositions = room.roomObjects.upgradePositions.getValue();
        if (!upgradePositions.length)
            return false;
        usedUpgradePositions.add(pack(hubAnchor.findClosestByPath(upgradePositions, {
            ignoreCreeps: true,
            ignoreDestructibleStructures: true,
            ignoreRoads: true,
        })));
        for (const creepName of room.myCreeps.controllerUpgrader) {
            const creep = Game.creeps[creepName];
            if (creep.dying)
                continue;
            if (creep.memory.packedPos)
                usedUpgradePositions.add(creep.memory.packedPos);
        }
        return usedUpgradePositions;
    }
    new RoomCacheObject({
        name: 'usedUpgradePositions',
        valueType: 'object',
        cacheType: 'global',
        cacheAmount: 1,
        room,
        valueConstructor: findUsedUpgradePositions,
    });
    function findUsedFastFillerPositions() {
        const usedFastFillerPositions = new Set();
        for (const creepName of room.creepsFromRoom.fastFiller) {
            const creep = Game.creeps[creepName];
            if (creep.dying)
                continue;
            if (creep.memory.packedPos)
                usedFastFillerPositions.add(creep.memory.packedPos);
        }
        return usedFastFillerPositions;
    }
    new RoomCacheObject({
        name: 'usedFastFillerPositions',
        valueType: 'object',
        cacheType: 'global',
        cacheAmount: 1,
        room,
        valueConstructor: findUsedFastFillerPositions,
    });
    new RoomCacheObject({
        name: 'labContainer',
        valueType: 'id',
        cacheType: 'global',
        cacheAmount: Infinity,
        room,
        valueConstructor() { },
    });
    const roomObject = room.roomObjects[roomObjectName];
    return roomObject.getValue();
};
Room.prototype.actionVisual = function (pos1, pos2, type) {
    const room = this;
    if (!Memory.roomVisuals)
        return;
    const colorsForTypes = {
        success: myColors.lightBlue,
        fail: myColors.red,
    };
    if (!type)
        type = 'success';
    const color = colorsForTypes[type];
    room.visual.circle(pos2.x, pos2.y, { stroke: color });
    room.visual.line(pos1, pos2, { color });
};
Room.prototype.advancedFindPath = function (opts) {
    const room = this;
    const allowedRoomNames = new Set();
    allowedRoomNames.add(opts.origin.roomName);
    function generateRoute() {
        for (const goal of opts.goals) {
            if (opts.origin.roomName === goal.pos.roomName)
                continue;
            const route = Game.map.findRoute(opts.origin.roomName, goal.pos.roomName, {
                routeCallback(roomName) {
                    if (roomName === goal.pos.roomName)
                        return 1;
                    const roomMemory = Memory.rooms[roomName];
                    if (!roomMemory)
                        return Infinity;
                    if (opts.typeWeights && opts.typeWeights[roomMemory.T])
                        return opts.typeWeights[roomMemory.T];
                    return 2;
                },
            });
            if (route === ERR_NO_PATH)
                continue;
            for (const roomRoute of route)
                allowedRoomNames.add(roomRoute.room);
        }
    }
    generateRoute();
    function generatePath() {
        const pathFinderResult = PathFinder.search(opts.origin, opts.goals, {
            plainCost: opts.plainCost || 2,
            swampCost: opts.swampCost || 8,
            maxRooms: allowedRoomNames.size,
            maxOps: 100000,
            flee: opts.flee,
            roomCallback(roomName) {
                const room = Game.rooms[roomName];
                if (!allowedRoomNames.has(roomName))
                    return false;
                const cm = new PathFinder.CostMatrix();
                if (allowedRoomNames.size <= 1) {
                    let x;
                    let y = 0;
                    for (x = 0; x < roomDimensions; x += 1)
                        cm.set(x, y, 255);
                    x = 0;
                    for (y = 0; y < roomDimensions; y += 1)
                        cm.set(x, y, 255);
                    y = roomDimensions - 1;
                    for (x = 0; x < roomDimensions; x += 1)
                        cm.set(x, y, 255);
                    x = roomDimensions - 1;
                    for (y = 0; y < roomDimensions; y += 1)
                        cm.set(x, y, 255);
                }
                for (const weight in opts.weightPositions) {
                    const positions = opts.weightPositions[weight];
                    const weightNum = parseInt(weight);
                    for (const pos of positions)
                        cm.set(pos.x, pos.y, weightNum);
                }
                if (opts.weightCostMatrixes) {
                    for (let x = 0; x < roomDimensions; x += 1) {
                        for (let y = 0; y < roomDimensions; y += 1) {
                            for (const weightCM of opts.weightCostMatrixes)
                                if (weightCM)
                                    cm.set(x, y, weightCM.get(x, y));
                        }
                    }
                }
                if (opts.weightCoordMaps) {
                    for (const coordMap of opts.weightCoordMaps) {
                        for (const index in coordMap) {
                            const packedCoord = parseInt(index);
                            if (coordMap[packedCoord] === 0)
                                continue;
                            const coord = unpackAsPos(packedCoord);
                            cm.set(coord.x, coord.y, coordMap[packedCoord]);
                        }
                    }
                }
                if (opts.weightStampAnchors) {
                    if (room.memory.T === 'commune') ;
                    else if (room.memory.T === 'remote') ;
                }
                if (!room)
                    return cm;
                if (opts.creep && opts.creep.memory.R)
                    for (const road of room.structures.road)
                        cm.set(road.pos.x, road.pos.y, 1);
                for (const weight in opts.weightStructures) {
                    const weightNum = parseInt(weight);
                    for (const structureType of opts.weightStructures[weight]) {
                        for (const structure of room.structures[structureType])
                            cm.set(structure.pos.x, structure.pos.y, weightNum);
                    }
                }
                for (const portal of room.structures.portal)
                    cm.set(portal.pos.x, portal.pos.y, 255);
                for (const cSite of room.allyCSites)
                    cm.set(cSite.pos.x, cSite.pos.y, 255);
                avoidEnemyRanges();
                function avoidEnemyRanges() {
                    if (!opts.avoidEnemyRanges)
                        return;
                    if (room.controller && room.controller.my && room.controller.safeMode)
                        return;
                    const enemyAttackers = [];
                    const enemyRangedAttackers = [];
                    for (const enemyCreep of room.enemyAttackers) {
                        if (enemyCreep.parts.ranged_attack > 0) {
                            enemyRangedAttackers.push(enemyCreep);
                            continue;
                        }
                        if (enemyCreep.parts.attack > 0)
                            enemyAttackers.push(enemyCreep);
                    }
                    for (const enemyAttacker of enemyAttackers) {
                        const positions = findCoordsInsideRect(enemyAttacker.pos.x - 2, enemyAttacker.pos.y - 2, enemyAttacker.pos.x + 2, enemyAttacker.pos.y + 2);
                        for (const pos of positions)
                            cm.set(pos.x, pos.y, 255);
                    }
                    for (const enemyAttacker of enemyRangedAttackers) {
                        const positions = findCoordsInsideRect(enemyAttacker.pos.x - 3, enemyAttacker.pos.y - 3, enemyAttacker.pos.x + 3, enemyAttacker.pos.y + 3);
                        for (const pos of positions)
                            cm.set(pos.x, pos.y, 255);
                    }
                }
                if (opts.avoidNotMyCreeps) {
                    for (const creep of room.enemyCreeps)
                        cm.set(creep.pos.x, creep.pos.y, 255);
                    for (const creep of room.allyCreeps)
                        cm.set(creep.pos.x, creep.pos.y, 255);
                    for (const creep of room.find(FIND_HOSTILE_POWER_CREEPS))
                        cm.set(creep.pos.x, creep.pos.y, 255);
                }
                if (opts.avoidImpassibleStructures) {
                    const ramparts = room.structures.rampart;
                    for (const rampart of ramparts) {
                        if (rampart.my) {
                            if (!opts.myRampartWeight)
                                continue;
                            cm.set(rampart.pos.x, rampart.pos.y, opts.myRampartWeight);
                            continue;
                        }
                        if (rampart.isPublic)
                            continue;
                        cm.set(rampart.pos.x, rampart.pos.y, 255);
                    }
                    for (const structureType of impassibleStructureTypes) {
                        for (const structure of room.structures[structureType]) {
                            cm.set(structure.pos.x, structure.pos.y, 255);
                        }
                        for (const cSite of room.cSites[structureType]) {
                            cm.set(cSite.pos.x, cSite.pos.y, 255);
                        }
                    }
                }
                if (opts.avoidStationaryPositions) {
                    for (const index in room.sources) {
                        for (const pos of room.sourcePositions[index])
                            cm.set(pos.x, pos.y, 10);
                    }
                    if (room.anchor) {
                        const upgradePositions = room.get('upgradePositions');
                        const deliverUpgradePos = room.anchor.findClosestByPath(upgradePositions, {
                            ignoreCreeps: true,
                            ignoreDestructibleStructures: true,
                            ignoreRoads: true,
                        });
                        for (const pos of upgradePositions) {
                            if (areCoordsEqual(pos, deliverUpgradePos))
                                continue;
                            cm.set(pos.x, pos.y, 10);
                        }
                    }
                    const hubAnchor = room.memory.stampAnchors && room.memory.stampAnchors.hub[0]
                        ? unpackAsRoomPos(room.memory.stampAnchors.hub[0], roomName)
                        : undefined;
                    if (hubAnchor)
                        cm.set(hubAnchor.x, hubAnchor.y, 10);
                    const fastFillerPositions = room.get('fastFillerPositions');
                    if (fastFillerPositions.length) {
                        for (const pos of fastFillerPositions)
                            cm.set(pos.x, pos.y, 10);
                    }
                }
                return cm;
            },
        });
        if (pathFinderResult.incomplete) {
            customLog('Incomplete Path', `${pathFinderResult.path}, ${JSON.stringify(opts.goals)}`, myColors.white, myColors.red);
            room.pathVisual(pathFinderResult.path, 'red');
            let lastPos = opts.origin;
            for (const goal of opts.goals) {
                room.visual.line(lastPos, goal.pos, {
                    color: myColors.red,
                    width: 0.15,
                    opacity: 0.3,
                    lineStyle: 'solid',
                });
                lastPos = goal.pos;
            }
            return [];
        }
        return pathFinderResult.path;
    }
    return generatePath();
};
Room.prototype.findType = function (scoutingRoom) {
    const room = this;
    const { controller } = room;
    room.memory.LST = Game.time;
    const [EWstring, NSstring] = room.name.match(/\d+/g);
    const EW = parseInt(EWstring);
    const NS = parseInt(NSstring);
    if (EW % 10 === 0 && NS % 10 === 0) {
        room.memory.T = 'intersection';
        return;
    }
    if (EW % 10 === 0 || NS % 10 === 0) {
        room.memory.T = 'highway';
        return;
    }
    if (EW % 5 === 0 && NS % 5 === 0) {
        room.memory.T = 'keeperCenter';
        return;
    }
    if (Math.abs(5 - (EW % 10)) <= 1 && Math.abs(5 - (NS % 10)) <= 1) {
        room.memory.T = 'keeper';
        return;
    }
    if (controller) {
        if (controller.owner) {
            if (controller.my)
                return;
            const owner = controller.owner.username;
            room.memory.owner = owner;
            if (Memory.allyList.includes(owner)) {
                room.memory.T = 'ally';
                return;
            }
            room.memory.T = 'enemy';
            const playerInfo = Memory.players[owner];
            if (!playerInfo)
                Memory.players[owner] = {};
            const level = controller.level;
            if (level)
                Memory.players[owner].GRCL = Math.max(level, playerInfo.GRCL);
            room.memory.level = level;
            let threat = 0;
            threat += Math.pow(level, 2);
            threat += room.structures.spawn.length * 50;
            threat += room.structures.nuker.length * 300;
            threat += Math.pow(room.structures.lab.length * 10000, 0.4);
            room.memory.OT = threat;
            Memory.players[owner].OT = Math.max(threat, playerInfo.OT);
            threat = 0;
            const energy = room.findStoredResourceAmount(RESOURCE_ENERGY);
            room.memory.energy = energy;
            threat += Math.pow(energy, 0.5);
            const ramparts = room.structures.rampart;
            const avgRampartHits = ramparts.reduce((total, rampart) => total + rampart.hits, 0) / ramparts.length;
            threat += Math.pow(avgRampartHits, 0.5);
            threat += room.structures.spawn.length * 100;
            threat += room.structures.tower.length * 300;
            threat += Math.pow(room.structures.extension.length * 400, 0.8);
            const hasTerminal = room.terminal !== undefined;
            if (hasTerminal) {
                threat += 800;
                room.memory.terminal = true;
            }
            room.memory.powerEnabled = controller.isPowerEnabled;
            room.memory.DT = threat;
            Memory.players[owner].DT = Math.max(threat, playerInfo.DT);
            return;
        }
        const harvestedSources = room.find(FIND_SOURCES).filter(source => source.ticksToRegeneration > 0);
        if (isReservedRemote())
            return;
        function isReservedRemote() {
            if (!controller.reservation)
                return false;
            if (controller.reservation.username === Memory.me)
                return false;
            if (controller.reservation.username === 'Invader')
                return false;
            const roads = room.structures.road;
            const containers = room.structures.container;
            if (roads.length === 0 && containers.length === 0 && !harvestedSources)
                return false;
            if (!Memory.allyList.includes(controller.reservation.username)) {
                room.memory.T = 'enemyRemote';
                room.memory.owner = controller.reservation.username;
                return true;
            }
            room.memory.T = 'allyRemote';
            room.memory.owner = controller.reservation.username;
            return true;
        }
        if (isUnReservedRemote())
            return;
        function isUnReservedRemote() {
            if (controller.reservation) {
                if (controller.reservation.username === Memory.me)
                    return false;
                if (controller.reservation.username === 'Invader')
                    return false;
            }
            if (harvestedSources.length === 0)
                return false;
            const creepsNotMine = room.enemyCreeps.concat(room.allyCreeps);
            for (const creep of creepsNotMine) {
                if (creep.owner.username === 'Invader')
                    continue;
                if (creep.parts.work > 0) {
                    if (Memory.allyList.includes(creep.owner.username)) {
                        room.memory.T = 'allyRemote';
                        room.memory.owner = creep.owner.username;
                        return true;
                    }
                    room.memory.T = 'enemyRemote';
                    room.memory.owner = creep.owner.username;
                    return true;
                }
            }
            return false;
        }
        if (room.makeRemote(scoutingRoom))
            return;
        room.memory.T = 'neutral';
        room.createClaimRequest();
    }
};
Room.prototype.makeRemote = function (scoutingRoom) {
    const room = this;
    let distance = Game.map.getRoomLinearDistance(scoutingRoom.name, room.name);
    if (distance <= 5)
        distance = advancedFindDistance(scoutingRoom.name, room.name, {
            keeper: Infinity,
            enemy: Infinity,
            enemyRemote: Infinity,
            ally: Infinity,
            allyRemote: Infinity,
        });
    if (distance <= 5) {
        if (room.memory.T === 'remote' && scoutingRoom.name === room.memory.commune)
            return true;
        if (!scoutingRoom.anchor)
            return true;
        const newSourceEfficacies = [];
        let newSourceEfficaciesTotal = 0;
        for (const source of room.sources) {
            const path = room.advancedFindPath({
                origin: source.pos,
                goals: [{ pos: scoutingRoom.anchor, range: 1 }],
                typeWeights: {
                    enemy: Infinity,
                    ally: Infinity,
                    keeper: Infinity,
                    enemyRemote: Infinity,
                    allyRemote: Infinity,
                },
            });
            if (path.length >= 300)
                return true;
            const uniqueRoomNames = [...new Set(path.map(rp => rp.roomName))];
            let terrianDictionary = {};
            for (let roomName of uniqueRoomNames) {
                terrianDictionary[roomName] = new Room.Terrain(roomName);
            }
            let sourceEfficancy = path
                .map(roomPos => terrianDictionary[roomPos.roomName].get(roomPos.x, roomPos.y) == TERRAIN_MASK_SWAMP ? 5 : 1)
                .reduce((partialSum, a) => partialSum + a, 0);
            newSourceEfficacies.push(sourceEfficancy);
            newSourceEfficaciesTotal += sourceEfficancy;
        }
        const newReservationEfficacy = room.advancedFindPath({
            origin: room.controller.pos,
            goals: [{ pos: scoutingRoom.anchor, range: 3 }],
            typeWeights: {
                enemy: Infinity,
                ally: Infinity,
                keeper: Infinity,
                enemyRemote: Infinity,
                allyRemote: Infinity,
            },
        }).length;
        if (room.memory.T !== 'remote' || !global.communes.has(room.memory.commune)) {
            room.memory.T = 'remote';
            room.memory.commune = scoutingRoom.name;
            delete room.memory.SP;
            delete room._sourcePositions;
            room.sourcePositions;
            delete room.memory.CP;
            delete room._controllerPositions;
            room.controllerPositions;
            scoutingRoom.memory.remotes.push(room.name);
            room.memory.SE = newSourceEfficacies;
            room.memory.RE = newReservationEfficacy;
            room.memory.needs = [];
            for (const key in RemoteNeeds)
                room.memory.needs[parseInt(key)] = 0;
            return true;
        }
        const currentRemoteEfficacy = room.memory.SE.reduce((sum, el) => sum + el) / room.memory.SE.length + room.memory.RE;
        const newRemoteEfficacy = newSourceEfficaciesTotal / newSourceEfficacies.length + newReservationEfficacy;
        if (newRemoteEfficacy >= currentRemoteEfficacy)
            return true;
        room.memory.T = 'remote';
        room.memory.commune = scoutingRoom.name;
        delete room.memory.SP;
        delete room._sourcePositions;
        room.sourcePositions;
        delete room.memory.CP;
        delete room._controllerPositions;
        room.controllerPositions;
        scoutingRoom.memory.remotes.push(room.name);
        room.memory.SE = newSourceEfficacies;
        room.memory.RE = newReservationEfficacy;
        room.memory.needs = [];
        for (const key in RemoteNeeds)
            room.memory.needs[parseInt(key)] = 0;
        return true;
    }
    if (room.memory.T !== 'remote')
        return false;
    if (!global.communes.has(room.memory.commune))
        return false;
    return true;
};
Room.prototype.cleanMemory = function () {
    const room = this;
    if (!room.memory.T)
        return;
    for (const key in room.memory) {
        if (!roomTypeProperties[key])
            continue;
        if (roomTypes[room.memory.T][key])
            continue;
        delete room.memory[key];
    }
};
Room.prototype.findStoredResourceAmount = function (resourceType) {
    const room = this;
    if (!room.storedResources)
        room.storedResources = {};
    else if (room.storedResources[resourceType])
        return room.storedResources[resourceType];
    room.storedResources[resourceType] = 0;
    const storageStructures = [room.storage, room.terminal, ...room.structures.factory];
    for (const storageStructure of storageStructures) {
        if (!storageStructure)
            continue;
        room.storedResources[resourceType] += storageStructure.store.getUsedCapacity(resourceType);
    }
    return room.storedResources[resourceType];
};
Room.prototype.distanceTransform = function (initialCoords, visuals, minAvoid = 1, x1 = 0, y1 = 0, x2 = roomDimensions - 1, y2 = roomDimensions - 1) {
    const distanceCoords = new Uint8Array(2500);
    if (!initialCoords)
        initialCoords = new Uint8Array(internationalManager.getTerrainCoords(this.name));
    let x;
    let y;
    let minX = Math.max(x1 - 1, 0);
    let minY = Math.max(y1 - 1, 0);
    let maxX = Math.min(x2 + 1, roomDimensions - 1);
    let maxY = Math.min(y2 + 1, roomDimensions - 1);
    let packedCoord;
    for (x = minX; x <= maxX; x += 1) {
        for (y = minY; y <= maxY; y += 1) {
            packedCoord = packXY(x, y);
            distanceCoords[packedCoord] = initialCoords[packedCoord] >= minAvoid ? 0 : 255;
        }
    }
    let top;
    let left;
    let topLeft;
    let topRight;
    let bottomLeft;
    for (x = x1; x <= x2; x += 1) {
        for (y = y1; y <= y2; y += 1) {
            top = distanceCoords[packXY(x, y - 1)] || 0;
            left = distanceCoords[packXY(x - 1, y)] || 0;
            topLeft = distanceCoords[packXY(x - 1, y - 1)] || 0;
            topRight = distanceCoords[packXY(x + 1, y - 1)] || 0;
            bottomLeft = distanceCoords[packXY(x - 1, y + 1)] || 0;
            packedCoord = packXY(x, y);
            distanceCoords[packedCoord] = Math.min(Math.min(top, left, topLeft, topRight, bottomLeft) + 1, distanceCoords[packedCoord]);
        }
    }
    let bottom;
    let right;
    let bottomRight;
    for (x = x2; x >= x1; x -= 1) {
        for (y = y2; y >= y1; y -= 1) {
            bottom = distanceCoords[packXY(x, y + 1)] || 0;
            right = distanceCoords[packXY(x + 1, y)] || 0;
            bottomRight = distanceCoords[packXY(x + 1, y + 1)] || 0;
            topRight = distanceCoords[packXY(x + 1, y - 1)] || 0;
            bottomLeft = distanceCoords[packXY(x - 1, y + 1)] || 0;
            packedCoord = packXY(x, y);
            distanceCoords[packedCoord] = Math.min(Math.min(bottom, right, bottomRight, topRight, bottomLeft) + 1, distanceCoords[packedCoord]);
        }
    }
    if (visuals) {
        for (x = x1; x <= x2; x += 1) {
            for (y = y1; y <= y2; y += 1) {
                this.visual.rect(x - 0.5, y - 0.5, 1, 1, {
                    fill: `hsl(${200}${distanceCoords[packXY(x, y)] * 10}, 100%, 60%)`,
                    opacity: 0.4,
                });
                this.visual.text(distanceCoords[packXY(x, y)].toString(), x, y);
            }
        }
    }
    return distanceCoords;
};
Room.prototype.diagonalDistanceTransform = function (initialCoords, visuals, minAvoid = 1, x1 = 0, y1 = 0, x2 = roomDimensions - 1, y2 = roomDimensions - 1) {
    const distanceCoords = new Uint8Array(2500);
    if (!initialCoords)
        initialCoords = new Uint8Array(internationalManager.getTerrainCoords(this.name));
    let x;
    let y;
    let packedCoord;
    for (x = x1; x <= x2; x += 1) {
        for (y = y1; y <= y2; y += 1) {
            packedCoord = packXY(x, y);
            distanceCoords[packedCoord] = initialCoords[packedCoord] >= minAvoid ? 0 : 255;
        }
    }
    let top;
    let left;
    for (x = x1; x <= x2; x += 1) {
        for (y = y1; y <= y2; y += 1) {
            top = distanceCoords[packXY(x, y - 1)] || 0;
            left = distanceCoords[packXY(x - 1, y)] || 0;
            packedCoord = packXY(x, y);
            distanceCoords[packedCoord] = Math.min(Math.min(top, left) + 1, distanceCoords[packedCoord]);
        }
    }
    let bottom;
    let right;
    for (x = x2; x >= x1; x -= 1) {
        for (y = y2; y >= y1; y -= 1) {
            bottom = distanceCoords[packXY(x, y + 1)] || 0;
            right = distanceCoords[packXY(x + 1, y)] || 0;
            packedCoord = packXY(x, y);
            distanceCoords[packedCoord] = Math.min(Math.min(bottom, right) + 1, distanceCoords[packedCoord]);
        }
    }
    if (visuals) {
        for (x = x1; x <= x2; x += 1) {
            for (y = y1; y <= y2; y += 1) {
                this.visual.rect(x - 0.5, y - 0.5, 1, 1, {
                    fill: `hsl(${200}${distanceCoords[packXY(x, y)] * 10}, 100%, 60%)`,
                    opacity: 0.4,
                });
                this.visual.text(distanceCoords[packXY(x, y)].toString(), x, y);
            }
        }
    }
    return distanceCoords;
};
Room.prototype.floodFill = function (seeds, coordMap, visuals) {
    const floodCoords = new Uint8Array(2500);
    const terrainCoords = new Uint8Array(internationalManager.getTerrainCoords(this.name));
    const visitedCoords = new Uint8Array(2500);
    let depth = 0;
    let thisGeneration = seeds;
    let nextGeneration = [];
    for (const coord of seeds)
        visitedCoords[pack(coord)] = 1;
    while (thisGeneration.length) {
        nextGeneration = [];
        for (const coord1 of thisGeneration) {
            if (depth > 0) {
                const packedCoord1 = pack(coord1);
                if (terrainCoords[packedCoord1] === 255)
                    continue;
                if (coordMap && coordMap[pack(coord1)] > 0)
                    continue;
                floodCoords[packedCoord1] = depth;
            }
            for (const coord2 of findCoordsInsideRect(coord1.x - 1, coord1.y - 1, coord1.x + 1, coord1.y + 1)) {
                const packedCoord2 = pack(coord2);
                if (visitedCoords[packedCoord2] === 1)
                    continue;
                visitedCoords[packedCoord2] = 1;
                nextGeneration.push(coord2);
            }
        }
        thisGeneration = nextGeneration;
        depth += 1;
    }
    return floodCoords;
};
Room.prototype.findClosestPosOfValue = function (opts) {
    const room = this;
    if (opts.visuals) {
        for (const coord of opts.startCoords)
            this.visual.circle(coord.x, coord.y, {
                stroke: myColors.yellow,
            });
    }
    function isViableAnchor(coord1) {
        const posValue = opts.coordMap[pack(coord1)];
        if (posValue === 255)
            return false;
        if (posValue === 0)
            return false;
        if (posValue < opts.requiredValue)
            return false;
        if (!opts.adjacentToRoads)
            return true;
        if (opts.roadCoords[pack(coord1)] > 0)
            return false;
        for (const coord2 of findCoordsInsideRect(coord1.x - 1, coord1.y - 1, coord1.x + 1, coord1.y + 1)) {
            if (opts.roadCoords[pack(coord2)] !== 1)
                continue;
            return true;
        }
        return false;
    }
    while (opts.reduceIterations >= 0) {
        let visitedCoords = new Uint8Array(2500);
        for (const coord of opts.startCoords)
            visitedCoords[pack(coord)] = 1;
        let thisGeneration = opts.startCoords;
        let nextGeneration = [];
        while (thisGeneration.length) {
            nextGeneration = [];
            let localVisitedCoords = new Uint8Array(visitedCoords);
            if (opts.cardinalFlood) {
                for (const coord1 of thisGeneration) {
                    if (isViableAnchor(coord1))
                        return new RoomPosition(coord1.x, coord1.y, room.name);
                    const adjacentCoords = [
                        {
                            x: coord1.x - 1,
                            y: coord1.y,
                        },
                        {
                            x: coord1.x + 1,
                            y: coord1.y,
                        },
                        {
                            x: coord1.x,
                            y: coord1.y - 1,
                        },
                        {
                            x: coord1.x,
                            y: coord1.y + 1,
                        },
                    ];
                    for (const coord2 of adjacentCoords) {
                        if (coord2.x < 0 || coord2.x >= roomDimensions || coord2.y < 0 || coord2.y >= roomDimensions)
                            continue;
                        if (localVisitedCoords[pack(coord2)] === 1)
                            continue;
                        localVisitedCoords[pack(coord2)] = 1;
                        if (opts.coordMap[pack(coord2)] === 0)
                            continue;
                        nextGeneration.push(coord2);
                    }
                }
            }
            if (!nextGeneration.length) {
                localVisitedCoords = new Uint8Array(visitedCoords);
                for (const coord1 of thisGeneration) {
                    if (isViableAnchor(coord1))
                        return new RoomPosition(coord1.x, coord1.y, room.name);
                    const adjacentCoords = findCoordsInsideRect(coord1.x - 1, coord1.y - 1, coord1.x + 1, coord1.y + 1);
                    for (const coord2 of adjacentCoords) {
                        if (coord2.x < 0 || coord2.x >= roomDimensions || coord2.y < 0 || coord2.y >= roomDimensions)
                            continue;
                        if (localVisitedCoords[pack(coord2)] === 1)
                            continue;
                        localVisitedCoords[pack(coord2)] = 1;
                        if (opts.coordMap[pack(coord2)] === 0)
                            continue;
                        nextGeneration.push(coord2);
                    }
                }
            }
            if (!nextGeneration.length) {
                localVisitedCoords = new Uint8Array(visitedCoords);
                for (const coord1 of thisGeneration) {
                    if (isViableAnchor(coord1))
                        return new RoomPosition(coord1.x, coord1.y, room.name);
                    const adjacentCoords = findCoordsInsideRect(coord1.x - 1, coord1.y - 1, coord1.x + 1, coord1.y + 1);
                    for (const coord2 of adjacentCoords) {
                        if (coord2.x < 0 || coord2.x >= roomDimensions || coord2.y < 0 || coord2.y >= roomDimensions)
                            continue;
                        if (localVisitedCoords[pack(coord2)] === 1)
                            continue;
                        localVisitedCoords[pack(coord2)] = 1;
                        nextGeneration.push(coord2);
                    }
                }
            }
            if (opts.visuals) {
                for (const coord of nextGeneration)
                    this.visual.text(opts.coordMap[pack(coord)].toString(), coord.x, coord.y, {
                        font: 0.5,
                        color: myColors.yellow,
                    });
            }
            visitedCoords = new Uint8Array(localVisitedCoords);
            thisGeneration = nextGeneration;
        }
        opts.reduceIterations -= 1;
        opts.requiredValue -= 1;
    }
    return false;
};
Room.prototype.findClosestPosOfValueAsym = function (opts) {
    const room = this;
    if (opts.visuals) {
        for (const coord of opts.startCoords)
            this.visual.circle(coord.x, coord.y, {
                stroke: myColors.yellow,
            });
    }
    function isViableAnchor(coord1) {
        const posValue = opts.coordMap[pack(coord1)];
        if (posValue === 255)
            return false;
        if (posValue === 0)
            return false;
        if (posValue < opts.requiredValue)
            return false;
        for (const coord2 of findCoordsInsideRect(coord1.x - opts.offset, coord1.y - opts.offset, coord1.x + opts.offset + opts.asymOffset, coord1.y + opts.offset + opts.asymOffset)) {
            if (opts.coordMap[pack(coord2)] === 0)
                return false;
        }
        if (!opts.adjacentToRoads)
            return true;
        if (opts.roadCoords[pack(coord1)] > 0)
            return false;
        for (const coord2 of findCoordsInsideRect(coord1.x - 1, coord1.y - 1, coord1.x + 1, coord1.y + 1)) {
            if (opts.roadCoords[pack(coord2)] !== 1)
                continue;
            return true;
        }
        return false;
    }
    while (opts.reduceIterations >= 0) {
        let visitedCoords = new Uint8Array(2500);
        for (const coord of opts.startCoords)
            visitedCoords[pack(coord)] = 1;
        let thisGeneration = opts.startCoords;
        let nextGeneration = [];
        while (thisGeneration.length) {
            nextGeneration = [];
            let localVisitedCoords = new Uint8Array(visitedCoords);
            if (opts.cardinalFlood) {
                for (const coord1 of thisGeneration) {
                    if (isViableAnchor(coord1))
                        return new RoomPosition(coord1.x, coord1.y, room.name);
                    const adjacentCoords = [
                        {
                            x: coord1.x - 1,
                            y: coord1.y,
                        },
                        {
                            x: coord1.x + 1,
                            y: coord1.y,
                        },
                        {
                            x: coord1.x,
                            y: coord1.y - 1,
                        },
                        {
                            x: coord1.x,
                            y: coord1.y + 1,
                        },
                    ];
                    for (const coord2 of adjacentCoords) {
                        if (coord2.x < 0 || coord2.x >= roomDimensions || coord2.y < 0 || coord2.y >= roomDimensions)
                            continue;
                        if (localVisitedCoords[pack(coord2)] === 1)
                            continue;
                        localVisitedCoords[pack(coord2)] = 1;
                        if (opts.coordMap[pack(coord2)] === 0)
                            continue;
                        nextGeneration.push(coord2);
                    }
                }
            }
            if (!nextGeneration.length) {
                localVisitedCoords = new Uint8Array(visitedCoords);
                for (const coord1 of thisGeneration) {
                    if (isViableAnchor(coord1))
                        return new RoomPosition(coord1.x, coord1.y, room.name);
                    const adjacentCoords = findCoordsInsideRect(coord1.x - 1, coord1.y - 1, coord1.x + 1, coord1.y + 1);
                    for (const coord2 of adjacentCoords) {
                        if (coord2.x < 0 || coord2.x >= roomDimensions || coord2.y < 0 || coord2.y >= roomDimensions)
                            continue;
                        if (localVisitedCoords[pack(coord2)] === 1)
                            continue;
                        localVisitedCoords[pack(coord2)] = 1;
                        if (opts.coordMap[pack(coord2)] === 0)
                            continue;
                        nextGeneration.push(coord2);
                    }
                }
            }
            if (!nextGeneration.length) {
                localVisitedCoords = new Uint8Array(visitedCoords);
                for (const coord1 of thisGeneration) {
                    if (isViableAnchor(coord1))
                        return new RoomPosition(coord1.x, coord1.y, room.name);
                    const adjacentCoords = findCoordsInsideRect(coord1.x - 1, coord1.y - 1, coord1.x + 1, coord1.y + 1);
                    for (const coord2 of adjacentCoords) {
                        if (coord2.x < 0 || coord2.x >= roomDimensions || coord2.y < 0 || coord2.y >= roomDimensions)
                            continue;
                        if (localVisitedCoords[pack(coord2)] === 1)
                            continue;
                        localVisitedCoords[pack(coord2)] = 1;
                        nextGeneration.push(coord2);
                    }
                }
            }
            if (opts.visuals) {
                for (const coord of nextGeneration)
                    this.visual.text(opts.coordMap[pack(coord)].toString(), coord.x, coord.y, {
                        font: 0.5,
                        color: myColors.yellow,
                    });
            }
            visitedCoords = new Uint8Array(localVisitedCoords);
            thisGeneration = nextGeneration;
        }
        opts.reduceIterations -= 1;
        opts.requiredValue -= 1;
    }
    return false;
};
Room.prototype.pathVisual = function (path, color) {
    const room = this;
    if (!Memory.roomVisuals)
        return;
    if (!path.length)
        return;
    const currentRoomName = path[0].roomName;
    for (let index = 0; index < path.length; index += 1) {
        const pos = path[index];
        if (pos.roomName === currentRoomName)
            continue;
        path.splice(index, path.length - 1);
        break;
    }
    room.visual.poly(path, {
        stroke: myColors[color],
        strokeWidth: 0.15,
        opacity: 0.3,
    });
};
Room.prototype.findAllyCSiteTargetID = function (creep) {
    if (!this.allyCSites.length)
        return false;
    for (const structureType of structureTypesByBuildPriority) {
        const cSitesOfType = this.allyCSitesByType[structureType];
        if (!cSitesOfType.length)
            continue;
        const anchor = this.anchor || (creep === null || creep === void 0 ? void 0 : creep.pos) || new RoomPosition(25, 25, this.name);
        this.memory.cSiteTargetID = anchor.findClosestByPath(cSitesOfType, {
            ignoreCreeps: true,
            ignoreDestructibleStructures: true,
            ignoreRoads: true,
            range: 3,
        }).id;
        return true;
    }
    return false;
};
Room.prototype.findUnprotectedCoords = function (visuals) {
    this.unprotectedCoords = new Uint8Array(2500);
    const visitedCoords = new Uint8Array(2500);
    let depth = 0;
    let thisGeneration = this.find(FIND_EXIT);
    let nextGeneration = [];
    for (const coord of thisGeneration)
        visitedCoords[pack(coord)] = 1;
    while (thisGeneration.length) {
        nextGeneration = [];
        for (const coord1 of thisGeneration) {
            if (depth > 0) {
                const packedCoord1 = pack(coord1);
                if (this.rampartCoords[packedCoord1] > 0)
                    continue;
                this.unprotectedCoords[packedCoord1] = depth * 10 + 10;
            }
            for (const coord2 of findCoordsInsideRect(coord1.x - 1, coord1.y - 1, coord1.x + 1, coord1.y + 1)) {
                const packedCoord2 = pack(coord2);
                if (visitedCoords[packedCoord2] === 1)
                    continue;
                visitedCoords[packedCoord2] = 1;
                nextGeneration.push(coord2);
            }
        }
        thisGeneration = nextGeneration;
        depth += 1;
    }
};
Room.prototype.groupRampartPositions = function (rampartPositions) {
    const room = this;
    const visitedCoords = new Uint8Array(2500);
    const groupedPositions = [];
    let groupIndex = 0;
    for (const packedPos of rampartPositions) {
        const pos = unpackAsPos(packedPos);
        if (visitedCoords[pack(pos)] === 1)
            continue;
        visitedCoords[pack(pos)] = 1;
        groupedPositions[groupIndex] = [new RoomPosition(pos.x, pos.y, room.name)];
        let thisGeneration = [pos];
        let nextGeneration = [];
        let groupSize = 0;
        while (thisGeneration.length) {
            nextGeneration = [];
            for (const pos of thisGeneration) {
                const adjacentPositions = findCoordsInsideRect(pos.x - 1, pos.y - 1, pos.x + 1, pos.y + 1);
                for (const adjacentPos of adjacentPositions) {
                    if (adjacentPos.x <= 0 ||
                        adjacentPos.x >= roomDimensions ||
                        adjacentPos.y <= 0 ||
                        adjacentPos.y >= roomDimensions)
                        continue;
                    const packedAdjacentCoord = pack(adjacentPos);
                    if (visitedCoords[packedAdjacentCoord] === 1)
                        continue;
                    visitedCoords[packedAdjacentCoord] = 1;
                    if (this.rampartCoords[pack(adjacentPos)] !== 1)
                        continue;
                    groupedPositions[groupIndex].push(new RoomPosition(adjacentPos.x, adjacentPos.y, room.name));
                    groupSize += 1;
                    nextGeneration.push(adjacentPos);
                }
            }
            if (groupSize >= maxRampartGroupSize)
                break;
            thisGeneration = nextGeneration;
        }
        groupIndex += 1;
    }
    return groupedPositions;
};
Room.prototype.createPullTask = function (creator) {
};
Room.prototype.createPickupTasks = function (creator) {
};
Room.prototype.createOfferTasks = function (creator) {
};
Room.prototype.createTransferTasks = function (creator) {
};
Room.prototype.createWithdrawTasks = function (creator) {
};
Room.prototype.estimateIncome = function () {
    const harvesterNames = this.creepsFromRoom.source1Harvester
        .concat(this.creepsFromRoom.source2Harvester)
        .concat(this.creepsFromRoom.source1RemoteHarvester)
        .concat(this.creepsFromRoom.source2RemoteHarvester);
    let income = 0;
    for (const creepName of harvesterNames) {
        const creep = Game.creeps[creepName];
        income += Math.min(6, creep.parts.work) * minHarvestWorkRatio;
    }
    return income;
};
Room.prototype.findRoomPositionsInsideRect = function (x1, y1, x2, y2) {
    const positions = [];
    for (let x = x1; x <= x2; x += 1) {
        for (let y = y1; y <= y2; y += 1) {
            if (x < 0 || x >= roomDimensions || y < 0 || y >= roomDimensions)
                continue;
            positions.push(new RoomPosition(x, y, this.name));
        }
    }
    return positions;
};
Room.prototype.getPartsOfRoleAmount = function (role, type) {
    let partsAmount = 0;
    let creep;
    for (const creepName of this.creepsFromRoom[role]) {
        creep = Game.creeps[creepName];
        if (!type) {
            partsAmount += creep.body.length;
            continue;
        }
        partsAmount += creep.body.filter(part => part.type === type).length;
    }
    return partsAmount;
};
Room.prototype.createClaimRequest = function () {
    if (this.sources.length !== 2)
        return false;
    if (this.memory.notClaimable)
        return false;
    if (Memory.claimRequests[this.name])
        return false;
    if (basePlanner(this) === 'failed')
        return false;
    let score = 0;
    const closestClaimTypeName = findClosestClaimType(this.name);
    const closestCommuneRange = Game.map.getRoomLinearDistance(closestClaimTypeName, this.name);
    score += Math.abs(prefferedCommuneRange - closestCommuneRange);
    score += this.sourcePaths[0].length / 10;
    score += this.sourcePaths[1].length / 10;
    score += this.upgradePathLength / 10;
    score += this.findSwampPlainsRatio() * 10;
    Memory.claimRequests[this.name] = {
        needs: [1, 20, 0],
        score,
    };
    return true;
};
Room.prototype.findSwampPlainsRatio = function () {
    const terrainAmounts = [0, 0, 0];
    const terrain = this.getTerrain();
    for (let x = 0; x < roomDimensions; x += 1) {
        for (let y = 0; y < roomDimensions; y += 1) {
            terrainAmounts[terrain.get(x, y)] += 1;
        }
    }
    return terrainAmounts[TERRAIN_MASK_SWAMP] / terrainAmounts[0];
};
Room.prototype.visualizeCoordMap = function (coordMap) {
    for (let x = 0; x < roomDimensions; x += 1) {
        for (let y = 0; y < roomDimensions; y += 1) {
            this.visual.text(coordMap[packXY(x, y)].toString(), x, y, {
                font: 0.5,
            });
        }
    }
};
Room.prototype.visualizeCostMatrix = function (cm) {
    for (let x = 0; x < roomDimensions; x += 1) {
        for (let y = 0; y < roomDimensions; y += 1) {
            this.visual.text(cm.get(x, y).toString(), x, y, {
                font: 0.5,
            });
        }
    }
};

class RoomVisualsManager {
    constructor(roomManager) {
        this.roomManager = roomManager;
    }
    run() {
        if (Memory.CPULogging)
            var managerCPUStart = Game.cpu.getUsed();
        this.roomVisuals();
        this.baseVisuals();
        if (Memory.CPULogging)
            customLog('Room Visuals Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
    }
    roomVisuals() {
        if (!Memory.roomVisuals)
            return;
        this.controllerVisuals();
        this.spawnVisuals();
        this.cSiteTargetVisuals();
        this.sourceVisuals();
    }
    controllerVisuals() {
        if (!this.roomManager.room.controller)
            return;
        if (this.roomManager.room.controller.my) {
            if (this.roomManager.room.controller.level < 8)
                this.roomManager.room.visual.text(`%${((this.roomManager.room.controller.progress /
                    this.roomManager.room.controller.progressTotal) *
                    100).toFixed(2)}`, this.roomManager.room.controller.pos.x, this.roomManager.room.controller.pos.y - 1, {
                    backgroundColor: 'rgb(255, 0, 0, 0)',
                    font: 0.5,
                    opacity: 1,
                    color: myColors.lightBlue,
                    stroke: myColors.darkBlue,
                    strokeWidth: 0.04,
                });
            this.roomManager.room.visual.text(`${this.roomManager.room.controller.level}`, this.roomManager.room.controller.pos, {
                backgroundColor: 'rgb(255, 0, 0, 0)',
                font: 0.5,
                opacity: 0.8,
            });
            return;
        }
        if (this.roomManager.room.controller.reservation) {
            const color = () => {
                if (this.roomManager.room.controller.reservation.username === Memory.me) {
                    return myColors.lightBlue;
                }
                if (Memory.allyList.includes(this.roomManager.room.controller.reservation.username)) {
                    return myColors.green;
                }
                return myColors.red;
            };
            this.roomManager.room.visual.text(`${this.roomManager.room.controller.reservation.ticksToEnd}`, this.roomManager.room.controller.pos, {
                backgroundColor: 'rgb(255, 0, 0, 0)',
                font: 0.5,
                opacity: 0.8,
                color: color(),
                stroke: myColors.darkBlue,
                strokeWidth: 0.04,
            });
        }
    }
    spawnVisuals() {
        const spawns = this.roomManager.room.structures.spawn;
        for (const spawn of spawns) {
            if (!spawn.spawning)
                continue;
            const creep = Game.creeps[spawn.spawning.name];
            if (!creep)
                continue;
            this.roomManager.room.visual.text(creep.role, spawn.pos, {
                backgroundColor: 'rgb(255, 0, 0, 0)',
                font: 0.5,
                opacity: 1,
                color: myColors.lightBlue,
                stroke: myColors.darkBlue,
                strokeWidth: 0.04,
            });
            this.roomManager.room.visual.text((spawn.spawning.remainingTime - 1).toString(), spawn.pos.x, spawn.pos.y - 1, {
                backgroundColor: 'rgb(255, 0, 0, 0)',
                font: 0.5,
                opacity: 1,
                color: myColors.lightBlue,
                stroke: myColors.darkBlue,
                strokeWidth: 0.04,
            });
        }
    }
    cSiteTargetVisuals() {
        if (!this.roomManager.room.memory.cSiteTargetID)
            return;
        const constructionTarget = findObjectWithID(this.roomManager.room.memory.cSiteTargetID);
        if (constructionTarget)
            this.roomManager.room.visual.text('🚧', constructionTarget.pos);
    }
    sourceVisuals() {
        for (const source of this.roomManager.room.sources) {
            if (this.roomManager.room.memory.T == 'remote') {
                if (this.roomManager.room.memory.needs && this.roomManager.room.memory.needs.length > 10) ;
                this.roomManager.room.visual.text(`${this.roomManager.room.memory.needs[RemoteNeeds_HarvesterByIndex[source.index]]} / ${this.roomManager.room.memory.needs[RemoteNeeds_HaulerByIndex[source.index]]}`, source.pos, {
                    backgroundColor: 'rgb(255, 0, 0, 0)',
                    font: 0.5,
                    opacity: 0.8,
                    stroke: myColors.darkBlue,
                    strokeWidth: 0.04,
                    color: myColors.lightBlue,
                });
            }
        }
    }
    baseVisuals() {
        if (!Memory.baseVisuals)
            return;
        if (!this.roomManager.room.memory.PC)
            return;
        for (const stampType in stamps) {
            const stamp = stamps[stampType];
            for (const packedStampAnchor of this.roomManager.room.memory.stampAnchors[stampType]) {
                const stampAnchor = unpackAsPos(packedStampAnchor);
                for (const structureType in stamp.structures) {
                    if (structureType === 'empty')
                        continue;
                    for (const pos of stamp.structures[structureType]) {
                        const x = pos.x + stampAnchor.x - stamp.offset;
                        const y = pos.y + stampAnchor.y - stamp.offset;
                        this.roomManager.room.visual.structure(x, y, structureType, {
                            opacity: 0.3,
                        });
                    }
                }
            }
        }
        this.roomManager.room.visual.connectRoads({
            opacity: 0.3,
        });
    }
}

class EndTickCreepManager {
    constructor(roomManager) {
        this.roomManager = roomManager;
    }
    run() {
        if (!this.roomManager.room.myCreepsAmount)
            return;
        if (Memory.CPULogging)
            var managerCPUStart = Game.cpu.getUsed();
        for (const role in this.roomManager.room.myCreeps)
            for (const creepName of this.roomManager.room.myCreeps[role]) {
                const creep = Game.creeps[creepName];
                creep.endTickManager();
                creep.recurseMoveRequest();
            }
        if (Memory.CPULogging)
            customLog('End Tick Creep Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), undefined, myColors.lightGrey);
    }
}

Creep.prototype.preTickManager = function () { };
Creep.prototype.endTickManager = function () { };
Creep.prototype.advancedTransfer = function (target, resourceType = RESOURCE_ENERGY, amount) {
    if (this.pos.getRangeTo(target.pos) > 1) {
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: target.pos, range: 1 }],
            avoidEnemyRanges: true,
        });
        return false;
    }
    if (this.movedResource)
        return false;
    const transferResult = this.transfer(target, resourceType, amount);
    this.message += transferResult;
    if (transferResult === OK || transferResult === ERR_NOT_ENOUGH_RESOURCES) {
        this.movedResource = true;
        return true;
    }
    return false;
};
Creep.prototype.advancedWithdraw = function (target, resourceType = RESOURCE_ENERGY, amount) {
    if (this.pos.getRangeTo(target.pos) > 1) {
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: target.pos, range: 1 }],
            avoidEnemyRanges: true,
        });
        return false;
    }
    if (this.movedResource)
        return false;
    const withdrawResult = this.withdraw(target, resourceType, amount);
    this.message += withdrawResult;
    if (withdrawResult === OK || withdrawResult === ERR_FULL) {
        this.movedResource = true;
        return true;
    }
    return false;
};
Creep.prototype.advancedPickup = function (target) {
    if (this.pos.getRangeTo(target.pos) > 1) {
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: target.pos, range: 1 }],
            avoidEnemyRanges: true,
        });
        return false;
    }
    if (this.movedResource)
        return false;
    const pickupResult = this.pickup(target);
    this.message += pickupResult;
    if (pickupResult === OK || pickupResult === ERR_FULL) {
        this.movedResource = true;
        return true;
    }
    return false;
};
Creep.prototype.advancedHarvestSource = function (source) {
    const harvestResult = this.harvest(source);
    if (harvestResult !== OK) {
        this.say(`⛏️${harvestResult} ${source.index}`);
        return false;
    }
    this.worked = true;
    const energyHarvested = Math.min(this.parts.work * HARVEST_POWER, source.energy);
    if (global.roomStats.commune[this.room.name])
        global.roomStats.commune[this.room.name].eih += energyHarvested;
    else if (global.roomStats.remote[this.room.name])
        global.roomStats.remote[this.room.name].reih += energyHarvested;
    this.say(`⛏️${energyHarvested}`);
    return true;
};
Creep.prototype.advancedUpgradeController = function () {
    const { room } = this;
    const controllerStructure = room.controllerContainer || room.controllerLink;
    if (controllerStructure) {
        if (!this.memory.packedPos) {
            const upgradePositions = room.get('upgradePositions');
            const usedUpgradePositions = room.get('usedUpgradePositions');
            if (!usedUpgradePositions)
                return false;
            let packedPos;
            for (const pos of upgradePositions) {
                packedPos = pack(pos);
                if (usedUpgradePositions.has(packedPos))
                    continue;
                this.memory.packedPos = packedPos;
                usedUpgradePositions.add(packedPos);
                break;
            }
        }
        if (!this.memory.packedPos)
            return false;
        const upgradePos = unpackAsRoomPos(this.memory.packedPos, room.name);
        const upgradePosRange = getRange(this.pos.x, upgradePos.x, this.pos.y, upgradePos.y);
        if (upgradePosRange > 0) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [
                    {
                        pos: upgradePos,
                        range: 0,
                    },
                ],
                avoidEnemyRanges: true,
            });
            this.message += '➡️';
        }
        const workPartCount = this.parts.work;
        const controllerRange = getRange(this.pos.x, room.controller.pos.x, this.pos.y, room.controller.pos.y);
        if (controllerRange <= 3 && this.store.energy > 0) {
            if (this.upgradeController(room.controller) === OK) {
                this.store.energy -= workPartCount;
                const controlPoints = workPartCount * UPGRADE_CONTROLLER_POWER;
                if (global.roomStats.commune[this.room.name])
                    global.roomStats.commune[this.room.name].eou += controlPoints;
                this.message += `🔋${controlPoints}`;
            }
        }
        const controllerStructureRange = getRange(this.pos.x, controllerStructure.pos.x, this.pos.y, controllerStructure.pos.y);
        if (controllerStructureRange <= 3) {
            if (this.store.energy > 0 &&
                controllerStructure.structureType === STRUCTURE_CONTAINER &&
                controllerStructure.hitsMax - controllerStructure.hits >= workPartCount * REPAIR_POWER) {
                if (this.repair(controllerStructure) === OK) {
                    const energySpentOnRepairs = Math.min(workPartCount, (controllerStructure.hitsMax - controllerStructure.hits) / REPAIR_POWER);
                    this.store.energy -= workPartCount;
                    if (global.roomStats.commune[this.room.name])
                        global.roomStats.commune[this.room.name].eoro += energySpentOnRepairs;
                    else if (global.roomStats.remote[this.room.name])
                        global.roomStats.remote[this.room.name].reoro += energySpentOnRepairs;
                    this.message += `🔧${energySpentOnRepairs * REPAIR_POWER}`;
                }
            }
            if (controllerStructureRange <= 1 && this.store.energy <= 0) {
                if (this.withdraw(controllerStructure, RESOURCE_ENERGY) !== OK)
                    return false;
                this.store.energy += Math.min(this.store.getCapacity(), controllerStructure.store.energy);
                controllerStructure.store.energy -= this.store.energy;
                this.message += `⚡`;
            }
        }
        this.say(this.message);
        return true;
    }
    if (this.needsResources()) {
        if (!this.memory.reservations || !this.memory.reservations.length)
            this.reserveWithdrawEnergy();
        if (!this.fulfillReservation()) {
            this.say(this.message);
            return false;
        }
        this.reserveWithdrawEnergy();
        if (!this.fulfillReservation()) {
            this.say(this.message);
            return false;
        }
        if (this.needsResources())
            return false;
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: room.controller.pos, range: 3 }],
            avoidEnemyRanges: true,
        });
        return false;
    }
    if (this.pos.getRangeTo(room.controller.pos) > 3) {
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: room.controller.pos, range: 3 }],
            avoidEnemyRanges: true,
        });
        return false;
    }
    if (this.upgradeController(room.controller) === OK) {
        if (global.roomStats.commune[this.room.name])
            global.roomStats.commune[this.room.name].eou += this.parts.work;
        this.say(`🔋${this.parts.work}`);
        return true;
    }
    return false;
};
Creep.prototype.advancedBuildCSite = function () {
    const { room } = this;
    const cSiteTarget = room.cSiteTarget;
    if (!cSiteTarget)
        return false;
    this.say('ABCS');
    if (getRange(this.pos.x, cSiteTarget.pos.x, this.pos.y, cSiteTarget.pos.y) > 3) {
        this.say('➡️CS');
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: cSiteTarget.pos, range: 3 }],
            avoidEnemyRanges: true,
        });
        return true;
    }
    if (this.build(cSiteTarget) === OK) {
        const energySpentOnConstruction = Math.min(this.parts.work * BUILD_POWER, (cSiteTarget.progressTotal - cSiteTarget.progress) * BUILD_POWER);
        if (this.store.energy - energySpentOnConstruction <= 0)
            this.memory.NR = true;
        if (global.roomStats.commune[this.room.name])
            global.roomStats.commune[this.room.name].eob += energySpentOnConstruction;
        else if (global.roomStats.remote[this.room.name])
            global.roomStats.remote[this.room.name].reob += energySpentOnConstruction;
        this.say(`🚧${energySpentOnConstruction}`);
        return true;
    }
    return false;
};
Creep.prototype.advancedBuildAllyCSite = function () {
    const { room } = this;
    if (!room.memory.cSiteTargetID) {
        room.findAllyCSiteTargetID(this);
    }
    let cSiteTarget = findObjectWithID(room.memory.cSiteTargetID);
    if (!cSiteTarget) {
        room.findAllyCSiteTargetID(this);
    }
    cSiteTarget = findObjectWithID(room.memory.cSiteTargetID);
    if (!cSiteTarget)
        return false;
    this.say('ABCS');
    if (getRange(this.pos.x, cSiteTarget.pos.x, this.pos.y, cSiteTarget.pos.y) > 3) {
        this.say('➡️CS');
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: cSiteTarget.pos, range: 3 }],
            avoidEnemyRanges: true,
        });
        return true;
    }
    const buildResult = this.build(cSiteTarget);
    if (buildResult === OK) {
        const energySpentOnConstruction = Math.min(this.parts.work * BUILD_POWER, (cSiteTarget.progressTotal - cSiteTarget.progress) * BUILD_POWER);
        this.store.energy -= energySpentOnConstruction;
        if (global.roomStats.commune[this.room.name])
            global.roomStats.commune[this.room.name].eob += energySpentOnConstruction;
        else if (global.roomStats.remote[this.room.name])
            global.roomStats.remote[this.room.name].reob += energySpentOnConstruction;
        this.say(`🚧${energySpentOnConstruction}`);
        return true;
    }
    return true;
};
Creep.prototype.findRampartRepairTarget = function (workPartCount) {
    const { room } = this;
    const repairTarget = findObjectWithID(this.memory.repairTarget);
    const rampartRepairExpectation = (workPartCount * REPAIR_POWER * this.store.getCapacity()) / CARRY_CAPACITY;
    if (repairTarget && repairTarget.hits < this.memory.quota + rampartRepairExpectation)
        return repairTarget;
    const ramparts = room.structures.rampart;
    if (!ramparts.length)
        return false;
    for (let quota = this.memory.quota || rampartRepairExpectation; quota < ramparts[0].hitsMax; quota += rampartRepairExpectation) {
        const rampartsUnderQuota = ramparts.filter(r => r.hits < quota);
        if (!rampartsUnderQuota.length)
            continue;
        this.memory.quota = quota;
        return this.pos.findClosestByPath(rampartsUnderQuota, {
            ignoreCreeps: true,
            range: 3,
        });
    }
    return false;
};
Creep.prototype.findRepairTarget = function (excludedIDs = new Set()) {
    const { room } = this;
    const possibleRepairTargets = [...room.structures.road, ...room.structures.container];
    const viableRepairTargets = possibleRepairTargets.filter(function (structure) {
        if (excludedIDs.has(structure.id))
            return false;
        return structure.hitsMax * 0.2 >= structure.hits;
    });
    this.say('FRT');
    if (!viableRepairTargets.length)
        return false;
    return this.pos.findClosestByPath(viableRepairTargets, {
        ignoreCreeps: true,
        range: 3,
    });
};
Creep.prototype.findOptimalSourceIndex = function () {
    const { room } = this;
    this.say('FOSN');
    if (this.memory.SI)
        return true;
    if (!room.anchor)
        return false;
    let creepThreshold = 1;
    while (creepThreshold < 4) {
        for (const source of room.sourcesByEfficacy) {
            const index = source.index;
            if (Math.min(creepThreshold, room.sourcePositions[index].length) - room.creepsOfSourceAmount[index] > 0) {
                this.memory.SI = index;
                return true;
            }
        }
        creepThreshold += 1;
    }
    return false;
};
Creep.prototype.findSourcePos = function (index) {
    const { room } = this;
    this.say('FSHP');
    if (this.memory.packedPos)
        return true;
    const usedSourceCoords = room.usedSourceCoords[index];
    const openSourcePositions = room.sourcePositions[index].filter(pos => !usedSourceCoords.has(pack(pos)));
    if (!openSourcePositions.length)
        return false;
    const packedPos = pack(openSourcePositions[0]);
    this.memory.packedPos = packedPos;
    room._usedSourceCoords[index].add(packedPos);
    return true;
};
Creep.prototype.findMineralHarvestPos = function () {
    const { room } = this;
    this.say('FMHP');
    if (this.memory.packedPos)
        return true;
    const anchor = room.anchor || this.pos;
    const usedHarvestPositions = room.get('usedMineralHarvestPositions');
    const closestHarvestPos = room.get('closestMineralHarvestPos');
    let packedPos = pack(closestHarvestPos);
    if (closestHarvestPos) {
        packedPos = pack(closestHarvestPos);
        if (!usedHarvestPositions.has(packedPos)) {
            this.memory.packedPos = packedPos;
            usedHarvestPositions.add(packedPos);
            return true;
        }
    }
    const harvestPositions = room.get('mineralHarvestPositions');
    const openHarvestPositions = harvestPositions.filter(pos => !usedHarvestPositions.has(pack(pos)));
    if (!openHarvestPositions.length)
        return false;
    openHarvestPositions.sort((a, b) => getRange(anchor.x, anchor.y, a.x, a.y) - getRange(anchor.x, anchor.y, b.x, b.y));
    packedPos = pack(openHarvestPositions[0]);
    this.memory.packedPos = packedPos;
    usedHarvestPositions.add(packedPos);
    return true;
};
Creep.prototype.findFastFillerPos = function () {
    const { room } = this;
    this.say('FFP');
    if (this.memory.packedPos)
        return true;
    const usedFastFillerPositions = room.get('usedFastFillerPositions');
    const fastFillerPositions = room.get('fastFillerPositions');
    const openFastFillerPositions = fastFillerPositions.filter(pos => !usedFastFillerPositions.has(pack(pos)));
    if (!openFastFillerPositions.length)
        return false;
    const packedPos = pack(findClosestPos(this.pos, openFastFillerPositions));
    this.memory.packedPos = packedPos;
    usedFastFillerPositions.add(packedPos);
    return true;
};
Creep.prototype.needsNewPath = function (goalPos, cacheAmount, path) {
    if (!path)
        return true;
    if (path.length === 0)
        return true;
    if (!this.memory.lastCache)
        return true;
    if (this.memory.lastCache + cacheAmount <= Game.time)
        return true;
    if (path[0].roomName !== this.room.name)
        return true;
    if (!this.memory.goalPos)
        return true;
    if (!areCoordsEqual(unpackPos(this.memory.goalPos), goalPos))
        return true;
    if (this.pos.getRangeTo(path[0]) > 1)
        return true;
    return false;
};
Creep.prototype.createMoveRequest = function (opts) {
    const { room } = this;
    if (this.fatigue > 0)
        return false;
    if (this.spawning)
        return false;
    if (this.moveRequest)
        return false;
    if (!opts.cacheAmount)
        opts.cacheAmount = internationalManager.defaultMinCacheAmount;
    let path;
    if (this.memory.path) {
        path = unpackPosList(this.memory.path);
        while (path[0] && areCoordsEqual(this.pos, path[0])) {
            path.shift();
        }
    }
    const needsNewPathResult = this.needsNewPath(opts.goals[0].pos, opts.cacheAmount, path);
    if (needsNewPathResult) {
        opts.creep = this;
        opts.avoidImpassibleStructures = true;
        opts.avoidStationaryPositions = true;
        opts.avoidNotMyCreeps = true;
        path = room.advancedFindPath(opts);
        path.splice(opts.cacheAmount);
        this.memory.lastCache = Game.time;
        if (Memory.roomVisuals)
            room.visual.text('NP', path[0], {
                align: 'center',
                color: myColors.lightBlue,
                opacity: 0.5,
                font: 0.5,
            });
        while (path[0] && areCoordsEqual(this.pos, path[0])) {
            path.shift();
        }
    }
    if (!path.length)
        return false;
    if (Memory.roomVisuals)
        path.length > 1
            ? room.pathVisual(path, 'lightBlue')
            : room.visual.line(this.pos, path[0], {
                color: myColors.lightBlue,
                opacity: 0.3,
            });
    const packedCoord = pack(path[0]);
    room.moveRequests.get(packedCoord)
        ? room.moveRequests.get(packedCoord).push(this.name)
        : room.moveRequests.set(packedCoord, [this.name]);
    this.moveRequest = packedCoord;
    this.pathOpts = opts;
    this.memory.goalPos = packPos(opts.goals[0].pos);
    this.memory.path = packPosList(path);
    return true;
};
Creep.prototype.findShovePositions = function (avoidPackedPositions) {
    const { room } = this;
    const x = this.pos.x;
    const y = this.pos.y;
    const adjacentPackedPositions = [
        packXY(x - 1, y - 1),
        packXY(x - 1, y),
        packXY(x - 1, y + 1),
        packXY(x, y - 1),
        packXY(x, y + 1),
        packXY(x + 1, y - 1),
        packXY(x + 1, y + 1),
        packXY(x + 1, y - 1),
    ];
    const shovePositions = [];
    const terrain = room.getTerrain();
    for (let index = 0; index < adjacentPackedPositions.length; index++) {
        const packedPos = adjacentPackedPositions[index];
        if (room.creepPositions.get(packedPos))
            continue;
        if (avoidPackedPositions.has(packedPos))
            continue;
        let coord = unpackAsPos(packedPos);
        if (coord.x < 1 || coord.x >= roomDimensions - 1 || coord.y < 1 || coord.y >= roomDimensions - 1)
            continue;
        let pos = new RoomPosition(coord.x, coord.y, room.name);
        if (terrain.get(pos.x, pos.y) === TERRAIN_MASK_WALL)
            continue;
        let hasImpassibleStructure;
        for (const structure of pos.lookFor(LOOK_STRUCTURES)) {
            if (!impassibleStructureTypes.includes(structure.structureType))
                continue;
            hasImpassibleStructure = true;
            break;
        }
        if (hasImpassibleStructure)
            continue;
        for (const cSite of pos.lookFor(LOOK_CONSTRUCTION_SITES)) {
            if (!cSite.my && !Memory.allyList.includes(cSite.owner.username))
                continue;
            if (impassibleStructureTypes.includes(cSite.structureType)) {
                hasImpassibleStructure = true;
                break;
            }
        }
        if (hasImpassibleStructure)
            continue;
        if (this.memory.ROS) {
            let hasRampart;
            for (const structure of pos.lookFor(LOOK_STRUCTURES)) {
                if (structure.structureType !== STRUCTURE_RAMPART)
                    continue;
                hasRampart = true;
                break;
            }
            if (!hasRampart)
                continue;
        }
        shovePositions.push(pos);
    }
    return shovePositions;
};
Creep.prototype.shove = function (shoverPos) {
    const { room } = this;
    const shovePositions = this.findShovePositions(new Set([pack(shoverPos), pack(this.pos)]));
    if (!shovePositions.length)
        return false;
    let goalPos;
    if (this.memory.goalPos) {
        goalPos = unpackPos(this.memory.goalPos);
        goalPos = shovePositions.sort((a, b) => {
            return getRange(goalPos.x, a.x, goalPos.y, a.y) - getRange(goalPos.x, b.x, goalPos.y, b.y);
        })[0];
    }
    else
        goalPos = shovePositions[0];
    const packedCoord = pack(goalPos);
    room.moveRequests.get(packedCoord)
        ? room.moveRequests.get(packedCoord).push(this.name)
        : room.moveRequests.set(packedCoord, [this.name]);
    this.moveRequest = packedCoord;
    if (Memory.roomVisuals)
        room.visual.circle(this.pos, {
            fill: '',
            stroke: myColors.red,
            radius: 0.5,
            strokeWidth: 0.15,
        });
    if (!this.moveRequest)
        return false;
    if (Memory.roomVisuals) {
        room.visual.circle(this.pos, {
            fill: '',
            stroke: myColors.yellow,
            radius: 0.5,
            strokeWidth: 0.15,
        });
        room.visual.line(this.pos, unpackAsRoomPos(this.moveRequest, this.room.name), {
            color: myColors.yellow,
        });
    }
    this.recurseMoveRequest();
    if (this.moved)
        return true;
    return false;
};
Creep.prototype.runMoveRequest = function () {
    const { room } = this;
    if (!room.moveRequests.get(this.moveRequest))
        return false;
    if (this.move(this.pos.getDirectionTo(unpackAsRoomPos(this.moveRequest, room.name))) !== OK)
        return false;
    if (Memory.roomVisuals)
        room.visual.rect(this.pos.x - 0.5, this.pos.y - 0.5, 1, 1, {
            fill: myColors.lightBlue,
            opacity: 0.2,
        });
    this.moved = this.moveRequest;
    room.moveRequests.delete(this.moveRequest);
    delete this.moveRequest;
    return true;
};
Creep.prototype.recurseMoveRequest = function (queue = []) {
    const { room } = this;
    if (!this.moveRequest)
        return;
    if (!room.moveRequests.get(this.moveRequest)) {
        this.moved = -1;
        return;
    }
    queue.push(this.name);
    const creepNameAtPos = room.creepPositions.get(this.moveRequest);
    if (!creepNameAtPos) {
        if (Memory.roomVisuals) {
            const moveRequestPos = unpackAsRoomPos(this.moveRequest, room.name);
            room.visual.rect(moveRequestPos.x - 0.5, moveRequestPos.y - 0.5, 1, 1, {
                fill: myColors.green,
                opacity: 0.2,
            });
            for (let index = queue.length - 1; index >= 0; index--)
                room.visual.rect(Game.creeps[queue[index]].pos.x - 0.5, Game.creeps[queue[index]].pos.y - 0.5, 1, 1, {
                    fill: myColors.yellow,
                    opacity: 0.2,
                });
        }
        for (let index = queue.length - 1; index >= 0; index--)
            Game.creeps[queue[index]].runMoveRequest();
        return;
    }
    const packedCoord = pack(this.pos);
    const creepAtPos = Game.creeps[creepNameAtPos];
    if (creepAtPos.moved) {
        if (creepAtPos.moved === -1) {
            delete this.moveRequest;
            this.moved = -1;
            return;
        }
        if (creepAtPos.moved === -2) {
            if (TrafficPriorities[this.role] + (this.freeStore() === 0 ? 0.1 : 0) >
                TrafficPriorities[creepAtPos.role] + (creepAtPos.freeStore() === 0 ? 0.1 : 0)) {
                this.runMoveRequest();
                creepAtPos.moveRequest = packedCoord;
                room.moveRequests.set(packedCoord, [creepAtPos.name]);
                creepAtPos.runMoveRequest();
                return;
            }
            delete this.moveRequest;
            this.moved = -2;
            return;
        }
        if (Memory.roomVisuals)
            room.visual.rect(creepAtPos.pos.x - 0.5, creepAtPos.pos.y - 0.5, 1, 1, {
                fill: myColors.white,
                opacity: 0.2,
            });
        for (let index = queue.length - 1; index >= 0; index--)
            Game.creeps[queue[index]].runMoveRequest();
        if (Memory.roomVisuals)
            for (let index = queue.length - 1; index >= 0; index--)
                room.visual.rect(creepAtPos.pos.x - 0.5, creepAtPos.pos.y - 0.5, 1, 1, {
                    fill: myColors.yellow,
                    opacity: 0.2,
                });
        return;
    }
    if (creepAtPos.moveRequest) {
        if (!room.moveRequests.get(creepAtPos.moveRequest)) {
            return;
        }
        if (packedCoord === creepAtPos.moveRequest) {
            if (Memory.roomVisuals)
                room.visual.rect(creepAtPos.pos.x - 0.5, creepAtPos.pos.y - 0.5, 1, 1, {
                    fill: myColors.teal,
                    opacity: 0.2,
                });
            this.runMoveRequest();
            creepAtPos.runMoveRequest();
            return;
        }
        if (this.moveRequest === creepAtPos.moveRequest) {
            if (Memory.roomVisuals)
                room.visual.rect(creepAtPos.pos.x - 0.5, creepAtPos.pos.y - 0.5, 1, 1, {
                    fill: myColors.pink,
                    opacity: 0.2,
                });
            if (TrafficPriorities[this.role] + (this.freeStore() === 0 ? 0.1 : 0) >
                TrafficPriorities[creepAtPos.role] + (creepAtPos.freeStore() === 0 ? 0.1 : 0)) {
                this.runMoveRequest();
                delete creepAtPos.moveRequest;
                creepAtPos.moved = -1;
                return;
            }
            delete this.moveRequest;
            this.moved = -1;
            creepAtPos.runMoveRequest();
            return;
        }
        if (TrafficPriorities[this.role] + (this.freeStore() === 0 ? 0.1 : 0) >
            TrafficPriorities[creepAtPos.role] + (creepAtPos.freeStore() === 0 ? 0.1 : 0)) {
            if (Memory.roomVisuals)
                room.visual.rect(creepAtPos.pos.x - 0.5, creepAtPos.pos.y - 0.5, 1, 1, {
                    fill: myColors.pink,
                    opacity: 0.2,
                });
            this.runMoveRequest();
            creepAtPos.moveRequest = packedCoord;
            room.moveRequests.set(packedCoord, [creepAtPos.name]);
            creepAtPos.runMoveRequest();
            return;
        }
        if (queue.includes(creepAtPos.name)) {
            for (let index = queue.length - 1; index >= 0; index--)
                Game.creeps[queue[index]].runMoveRequest();
            if (Memory.roomVisuals)
                for (let index = queue.length - 1; index >= 0; index--)
                    room.visual.rect(creepAtPos.pos.x - 0.5, creepAtPos.pos.y - 0.5, 1, 1, {
                        fill: myColors.yellow,
                        opacity: 0.2,
                    });
            return;
        }
        creepAtPos.recurseMoveRequest(queue);
        return;
    }
    if (creepAtPos.fatigue > 0)
        return;
    if (creepAtPos.shove(this.pos)) {
        this.runMoveRequest();
        return;
    }
    if (Memory.roomVisuals)
        room.visual.rect(creepAtPos.pos.x - 0.5, creepAtPos.pos.y - 0.5, 1, 1, {
            fill: myColors.teal,
            opacity: 0.2,
        });
    this.runMoveRequest();
    creepAtPos.moveRequest = packedCoord;
    room.moveRequests.set(packedCoord, [creepAtPos.name]);
    creepAtPos.runMoveRequest();
};
Creep.prototype.needsResources = function () {
    if (!this.freeCapacityNextTick)
        this.freeCapacityNextTick = this.store.getFreeCapacity();
    if (this.freeCapacityNextTick === this.store.getCapacity())
        return (this.memory.NR = true);
    if (this.freeCapacityNextTick == 0) {
        delete this.memory.NR;
        return false;
    }
    return this.memory.NR;
};
Creep.prototype.isOnExit = function () {
    const { x } = this.pos;
    const { y } = this.pos;
    if (x <= 0 || x >= 49 || y <= 0 || y >= 49)
        return true;
    return false;
};
Creep.prototype.findTotalHealPower = function (range = 1) {
    let heal = 0;
    for (const part of this.body) {
        if (part.type !== HEAL)
            continue;
        heal +=
            (part.boost ? BOOSTS[part.type][part.boost][part.type] : 1) * (range <= 1 ? HEAL_POWER : RANGED_HEAL_POWER);
    }
    return heal;
};
Creep.prototype.findRecycleTarget = function () {
    const { room } = this;
    const spawns = room.structures.spawn;
    if (!spawns.length)
        return false;
    if (this.memory.RecT) {
        const spawn = findObjectWithID(this.memory.RecT);
        if (spawn)
            return spawn;
    }
    const fastFillerContainers = [room.fastFillerContainerLeft, room.fastFillerContainerRight];
    for (const container of fastFillerContainers) {
        if (!container)
            continue;
        if (!findClosestObjectInRange(container.pos, spawns, 1))
            continue;
        return findObjectWithID((this.memory.RecT = container.id));
    }
    const spawn = findClosestObject(this.pos, spawns);
    return findObjectWithID((this.memory.RecT = spawn.id));
};
Creep.prototype.advancedRecycle = function () {
    const { room } = this;
    const recycleTarget = this.findRecycleTarget();
    if (!recycleTarget)
        return false;
    const range = getRange(this.pos.x, recycleTarget.pos.x, this.pos.y, recycleTarget.pos.y);
    if (recycleTarget instanceof StructureSpawn) {
        this.say('♻️ S');
        if (range > 1) {
            this.createMoveRequest({
                origin: this.pos,
                goals: [{ pos: recycleTarget.pos, range: 1 }],
                avoidEnemyRanges: true,
            });
            return true;
        }
        return recycleTarget.recycleCreep(this) === OK;
    }
    this.say('♻️ C');
    if (range === 0) {
        const spawn = findClosestObject(this.pos, room.structures.spawn);
        return spawn.recycleCreep(this) === OK;
    }
    this.createMoveRequest({
        origin: this.pos,
        goals: [{ pos: recycleTarget.pos, range: 0 }],
        avoidEnemyRanges: true,
    });
    return true;
};
Creep.prototype.advancedRenew = function () {
    const { room } = this;
    if (this.body.length > 8)
        return;
    if (Game.cpu.bucket < CPUBucketRenewThreshold)
        return;
    if (!room.myCreeps.fastFiller.length)
        return;
    if (this.dying)
        return;
    const energyCost = Math.ceil(this.findCost() / 2.5 / this.body.length);
    if (CREEP_LIFE_TIME - this.ticksToLive < energyCost)
        return;
    const spawns = room.structures.spawn;
    const spawn = spawns.find(spawn => getRange(this.pos.x, spawn.pos.x, this.pos.y, spawn.pos.y) === 1);
    if (!spawn)
        return;
    if (spawn.hasRenewed)
        return;
    if (spawn.spawning)
        return;
    const result = spawn.renewCreep(this);
    if (result === OK) {
        global.roomStats.commune[this.room.name].eosp += energyCost;
        spawn.hasRenewed = true;
    }
};
Creep.prototype.advancedReserveController = function () {
    const { room } = this;
    const { controller } = room;
    if (this.pos.getRangeTo(controller.pos) === 1) {
        if (controller.reservation && controller.reservation.username !== Memory.me) {
            this.say('🗡️');
            return this.attackController(controller) === OK;
        }
        this.say('🤳');
        return this.reserveController(controller) === OK;
    }
    this.say('⏩🤳');
    this.createMoveRequest({
        origin: this.pos,
        goals: [{ pos: controller.pos, range: 1 }],
        avoidEnemyRanges: true,
        plainCost: 1,
    });
    return true;
};
Creep.prototype.findCost = function () {
    let cost = 0;
    for (const part of this.body)
        cost += BODYPART_COST[part.type];
    return cost;
};
Creep.prototype.passiveHeal = function () {
    const { room } = this;
    this.say('PH');
    if (!this.meleed) {
        if (this.hitsMax > this.hits) {
            this.heal(this);
            return false;
        }
        let top = Math.max(Math.min(this.pos.y - 1, roomDimensions - 1), 0);
        let left = Math.max(Math.min(this.pos.x - 1, roomDimensions - 1), 0);
        let bottom = Math.max(Math.min(this.pos.y + 1, roomDimensions - 1), 0);
        let right = Math.max(Math.min(this.pos.x + 1, roomDimensions - 1), 0);
        const adjacentCreeps = room.lookForAtArea(LOOK_CREEPS, top, left, bottom, right, true);
        for (const posData of adjacentCreeps) {
            if (this.id === posData.creep.id)
                continue;
            if (!posData.creep.my && !Memory.allyList.includes(posData.creep.owner.username))
                continue;
            if (posData.creep.hitsMax === posData.creep.hits)
                continue;
            this.heal(posData.creep);
            return false;
        }
    }
    if (this.ranged)
        return false;
    let top = Math.max(Math.min(this.pos.y - 3, roomDimensions - 2), 2);
    let left = Math.max(Math.min(this.pos.x - 3, roomDimensions - 2), 2);
    let bottom = Math.max(Math.min(this.pos.y + 3, roomDimensions - 2), 2);
    let right = Math.max(Math.min(this.pos.x + 3, roomDimensions - 2), 2);
    const nearbyCreeps = room.lookForAtArea(LOOK_CREEPS, top, left, bottom, right, true);
    for (const posData of nearbyCreeps) {
        if (this.id === posData.creep.id)
            continue;
        if (!posData.creep.my && !Memory.allyList.includes(posData.creep.owner.username))
            continue;
        if (posData.creep.hitsMax === posData.creep.hits)
            continue;
        this.rangedHeal(posData.creep);
        return true;
    }
    return false;
};
Creep.prototype.aggressiveHeal = function () {
    const { room } = this;
    this.say('AH');
    if (this.meleed) {
        if (this.hitsMax > this.hits) {
            this.heal(this);
            return false;
        }
    }
    const healTargets = room
        .find(FIND_MY_CREEPS)
        .concat(room.allyCreeps)
        .filter(function (creep) {
        return creep.hitsMax > creep.hits;
    });
    if (!healTargets.length)
        return false;
    const healTarget = findClosestObject(this.pos, healTargets);
    const range = getRange(this.pos.x, healTarget.pos.x, this.pos.y, healTarget.pos.y);
    if (range > 1) {
        if (this.ranged)
            return false;
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: healTarget.pos, range: 1 }],
        });
        if (range <= 3) {
            this.rangedHeal(healTarget);
            return true;
        }
    }
    if (this.meleed)
        return false;
    this.heal(healTarget);
    return true;
};
Creep.prototype.passiveRangedAttack = function () {
    return true;
};
Creep.prototype.deleteReservation = function (index) {
    this.memory.reservations.splice(index, 1);
    this.message += '❌';
};
Creep.prototype.createReservation = function (type, targetID, amount, resourceType = RESOURCE_ENERGY) {
    if (!this.memory.reservations)
        this.memory.reservations = [];
    if (amount <= 0)
        return;
    this.memory.reservations.push({
        type,
        targetID,
        amount,
        resourceType,
    });
    const reservation = this.memory.reservations[0];
    const target = findObjectWithID(reservation.targetID);
    this.message += '➕' + type[0];
    if (target instanceof Resource) {
        target.reserveAmount -= reservation.amount;
        return;
    }
    if (reservation.type === 'transfer') {
        return;
    }
};
Creep.prototype.reservationManager = function () {
    if (!this.memory.reservations)
        return;
    for (let index = 0; index < this.memory.reservations.length; index++) {
        const reservation = this.memory.reservations[index];
        const target = findObjectWithID(reservation.targetID);
        if (!target || target.room.name !== this.room.name) {
            this.deleteReservation(index);
            continue;
        }
        if (target instanceof Resource) {
            let { amount } = reservation;
            target.reserveAmount -= amount;
            if (amount <= 0) {
                target.reserveAmount += amount;
                this.deleteReservation(0);
            }
            continue;
        }
        if (reservation.type === 'transfer') {
            let amount = Math.min(reservation.amount, target.store.getFreeCapacity(reservation.resourceType));
            if (amount <= 0) {
                this.deleteReservation(0);
            }
            reservation.amount = amount;
            continue;
        }
        reservation.amount;
    }
};
Creep.prototype.fulfillReservation = function () {
    if (!this.memory.reservations)
        return true;
    const reservation = this.memory.reservations[0];
    if (!reservation)
        return true;
    const target = findObjectWithID(reservation.targetID);
    const { room } = this;
    if (Memory.roomVisuals)
        room.visual.line(this.pos, target.pos, {
            color: myColors.green,
            opacity: 0.2,
        });
    this.message += '📲';
    if (getRange(this.pos.x, target.pos.x, this.pos.y, target.pos.y) > 1) {
        this.createMoveRequest({
            origin: this.pos,
            goals: [{ pos: target.pos, range: 1 }],
            avoidEnemyRanges: true,
        });
        return false;
    }
    if (this.movedResource)
        return false;
    if (target instanceof Resource) {
        const pickupResult = this.pickup(target);
        this.message += pickupResult;
        if (pickupResult === ERR_FULL) {
            this.deleteReservation(0);
            return true;
        }
        if (pickupResult === OK) {
            this.movedResource = true;
            this.freeCapacityNextTick = Math.max(this.store.getFreeCapacity() - target.amount, 0);
            this.deleteReservation(0);
            return true;
        }
        return false;
    }
    let amount = 0;
    if (reservation.type === 'transfer') {
        amount = Math.min(reservation.amount, target.store.getFreeCapacity(reservation.resourceType), this.store[reservation.resourceType]);
        this.message += amount;
        const transferResult = this.transfer(target, reservation.resourceType, amount);
        this.message += transferResult;
        if (transferResult === ERR_FULL || transferResult === ERR_NOT_ENOUGH_RESOURCES) {
            this.deleteReservation(0);
            return true;
        }
        if (transferResult === OK) {
            this.movedResource = true;
            this.freeCapacityNextTick = this.store.getFreeCapacity() + amount;
            this.deleteReservation(0);
            return true;
        }
        return false;
    }
    amount = Math.min(Math.min(amount, this.store.getFreeCapacity(reservation.resourceType)), target.store[reservation.resourceType] + reservation.amount);
    let withdrawResult;
    if (target instanceof Creep) {
        withdrawResult = target.transfer(this, reservation.resourceType, amount);
    }
    else
        withdrawResult = this.withdraw(target, reservation.resourceType, amount);
    this.message += withdrawResult;
    if (withdrawResult === ERR_NOT_ENOUGH_RESOURCES) {
        this.deleteReservation(0);
        return true;
    }
    if (withdrawResult === ERR_INVALID_TARGET) {
        this.deleteReservation(0);
        return true;
    }
    if (withdrawResult === ERR_FULL) {
        this.deleteReservation(0);
        return true;
    }
    if (withdrawResult === OK) {
        this.movedResource = true;
        this.freeCapacityNextTick = this.store.getFreeCapacity() - amount;
        this.deleteReservation(0);
        return true;
    }
    return false;
};
Creep.prototype.reserveWithdrawEnergy = function () {
    var _a;
    if (this.memory.reservations && ((_a = this.memory.reservations) === null || _a === void 0 ? void 0 : _a.length))
        return;
    const { room } = this;
    if (!this.needsResources())
        return;
    if (this.freeCapacityNextTick === undefined)
        this.freeCapacityNextTick = this.store.getFreeCapacity();
    let withdrawTargets = room.MAWT.filter(target => {
        if (target instanceof Resource)
            return (target.reserveAmount >= this.store.getCapacity(RESOURCE_ENERGY) * 0.2 ||
                target.reserveAmount >= this.freeCapacityNextTick);
        return target.store.energy >= this.freeCapacityNextTick;
    });
    if (!room.storage && !room.terminal) {
        withdrawTargets = withdrawTargets.concat([room.fastFillerContainerLeft, room.fastFillerContainerRight, room.controllerContainer].filter(target => {
            return target && target.store.energy >= target.store.getCapacity(RESOURCE_ENERGY) * 0.5;
        }));
    }
    let target;
    let amount;
    if (withdrawTargets.length) {
        target = findClosestObject(this.pos, withdrawTargets);
        if (target instanceof Resource)
            amount = target.reserveAmount;
        else
            amount = Math.min(this.freeCapacityNextTick, target.store.energy);
        this.createReservation('withdraw', target.id, amount, RESOURCE_ENERGY);
        return;
    }
    withdrawTargets = room.OAWT.filter(target => {
        if (target instanceof Resource)
            return (target.reserveAmount >= this.store.getCapacity(RESOURCE_ENERGY) * 0.2 ||
                target.reserveAmount >= this.freeCapacityNextTick);
        return target.store.energy >= this.freeCapacityNextTick;
    });
    if (!withdrawTargets.length)
        return;
    target = findClosestObject(this.pos, withdrawTargets);
    if (target instanceof Resource)
        amount = target.reserveAmount;
    else
        amount = Math.min(this.freeCapacityNextTick, target.store.energy);
    this.createReservation('withdraw', target.id, amount, RESOURCE_ENERGY);
};
Creep.prototype.reserveTransferEnergy = function () {
    var _a;
    if ((_a = this.memory.reservations) === null || _a === void 0 ? void 0 : _a.length)
        return;
    const { room } = this;
    if (this.usedStore() === 0)
        return;
    let transferTargets = room.MATT.filter(function (target) {
        return target.freeSpecificStore(RESOURCE_ENERGY) > 0;
    });
    transferTargets = transferTargets.concat(room.MEFTT.filter(target => {
        return ((target.freeStore() >= this.store.energy && this.store.energy > 0) ||
            target.freeSpecificStore(RESOURCE_ENERGY) >= this.store.energy + this.freeStore());
    }));
    let target;
    let amount;
    if (transferTargets.length) {
        target = findClosestObject(this.pos, transferTargets);
        amount = Math.min(Math.max(this.usedStore(), 0), target.freeSpecificStore(RESOURCE_ENERGY));
        this.createReservation('transfer', target.id, amount, RESOURCE_ENERGY);
        return;
    }
    transferTargets = room.OATT.filter(target => {
        return target.freeStore() >= this.usedStore();
    });
    if (!transferTargets.length)
        return;
    target = findClosestObject(this.pos, transferTargets);
    amount = Math.min(Math.max(this.usedStore(), 0), target.freeStore());
    this.createReservation('transfer', target.id, amount, RESOURCE_ENERGY);
};

const managers = {
    meleeDefender: MeleeDefender.meleeDefenderManager,
    allyVanguard: AllyVanguard.allyVanguardManager,
    antifaAssaulter: AntifaAssaulter.antifaAssaulterManager,
    claimer: Claimer.claimerManager,
    vanguardDefender: VanguardDefender.vanguardDefenderManager,
    remoteDefender: RemoteDefender.remoteDefenderManager,
    source1Harvester: SourceHarvester.sourceHarvesterManager,
    source2Harvester: SourceHarvester.sourceHarvesterManager,
    hauler: Hauler.haulerManager,
    maintainer: Maintainer.maintainerManager,
    fastFiller: FastFiller.fastFillerManager,
    hubHauler: HubHauler.hubHaulerManager,
    controllerUpgrader: ControllerUpgrader.controllerUpgraderManager,
    builder: Builder.builderManager,
    mineralHarvester: MineralHarvester.mineralHarvesterManager,
    source1RemoteHarvester: RemoteHarvester.RemoteHarvesterManager,
    source2RemoteHarvester: RemoteHarvester.RemoteHarvesterManager,
    remoteHauler: RemoteHauler.remoteHaulerManager,
    remoteReserver: RemoteReserver.remoteReserverManager,
    remoteCoreAttacker: RemoteCoreAttacker.remoteCoreAttackerManager,
    remoteDismantler: RemoteDismantler.remoteDismantlerManager,
    scout: Scout.scoutManager,
    vanguard: Vanguard.vanguardManager,
};
class CreepRoleManager {
    constructor(roomManager) {
        this.roomManager = roomManager;
    }
    run() {
        if (Memory.CPULogging)
            var managerCPUStart = Game.cpu.getUsed();
        for (const role of creepRoles)
            this.runManager(role);
        if (Memory.CPULogging)
            customLog('Role Manager', `CPU: ${(Game.cpu.getUsed() - managerCPUStart).toFixed(2)}, CPU Per Creep: ${(this.roomManager.room.myCreepsAmount
                ? (Game.cpu.getUsed() - managerCPUStart) / this.roomManager.room.myCreepsAmount
                : 0).toFixed(2)}`, undefined, myColors.lightGrey);
    }
    runManager(role) {
        const roleCPUStart = Game.cpu.getUsed();
        const creepsOfRoleAmount = this.roomManager.room.myCreeps[role].length;
        if (!this.roomManager.room.myCreeps[role].length)
            return;
        try {
            managers[role](this.roomManager.room, this.roomManager.room.myCreeps[role]);
        }
        catch (err) {
            customLog('Exception processing creep role: ' + role + ' in ' + this.roomManager.room.name + '. ', err + '\n' + err.stack, myColors.white, myColors.red);
        }
        customLog(`${role}s`, `Creeps: ${creepsOfRoleAmount}, CPU: ${(Game.cpu.getUsed() - roleCPUStart).toFixed(2)}, CPU Per Creep: ${((Game.cpu.getUsed() - roleCPUStart) /
            creepsOfRoleAmount).toFixed(2)}`, undefined);
    }
}

class RoomManager {
    constructor() {
        this.creepRoleManager = new CreepRoleManager(this);
        this.endTickCreepManager = new EndTickCreepManager(this);
        this.roomVisualsManager = new RoomVisualsManager(this);
    }
    update(room) {
        this.room = room;
    }
    run() {
        this.creepRoleManager.run();
        this.endTickCreepManager.run();
        this.roomVisualsManager.run();
    }
}

function roomsManager() {
    if (Memory.CPULogging)
        var managerCPUStart = Game.cpu.getUsed();
    for (const roomName in Game.rooms) {
        const roomCPUStart = Game.cpu.getUsed();
        const room = Game.rooms[roomName];
        const roomType = room.memory.T;
        const statsActive = Memory.roomStats > 0 && roomTypesUsedForStats.includes(roomType);
        if (statsActive)
            statsManager.roomPreTick(room.name, roomType);
        room.roomManager = global.roomManagers[room.name];
        if (!room.roomManager) {
            room.roomManager = new RoomManager();
            global.roomManagers[room.name] = room.roomManager;
        }
        room.roomManager.update(room);
        if (room.memory.T === 'commune')
            room.communeManager.run();
        room.roomManager.run();
        let logMessage = `Creeps: ${room.myCreepsAmount}`;
        if (Memory.CPULogging)
            logMessage += `, CPU: ${(Game.cpu.getUsed() - roomCPUStart).toFixed(2)}`;
        customLog(room.name + ' ' + roomType, logMessage, undefined, myColors.midGrey);
        if (statsActive)
            statsManager.roomEndTick(room.name, roomType);
    }
    if (Memory.CPULogging)
        customLog('Room Manager', (Game.cpu.getUsed() - managerCPUStart).toFixed(2), myColors.white, myColors.lightBlue);
}

Object.defineProperties(Room.prototype, {
    global: {
        get() {
            if (global[this.name])
                return global[this.name];
            return (global[this.name] = {});
        },
    },
    anchor: {
        get() {
            if (this._anchor)
                return this._anchor;
            return (this._anchor =
                this.memory.stampAnchors && this.memory.stampAnchors.fastFiller.length
                    ? unpackAsRoomPos(this.memory.stampAnchors.fastFiller[0], this.name)
                    : undefined);
        },
    },
    sources: {
        get() {
            if (this._sources)
                return this._sources;
            this._sources = [];
            if (this.memory.SIDs) {
                for (const index in this.memory.SIDs) {
                    const source = findObjectWithID(this.memory.SIDs[index]);
                    source.index = parseInt(index);
                    this._sources.push(source);
                }
                return this._sources;
            }
            this.memory.SIDs = [];
            const sources = this.find(FIND_SOURCES);
            for (const index in sources) {
                const source = sources[index];
                source.index = parseInt(index);
                this.memory.SIDs.push(source.id);
                this._sources.push(source);
            }
            return this._sources;
        },
    },
    sourcesByEfficacy: {
        get() {
            if (this._sourcesByEfficacy)
                return this._sourcesByEfficacy;
            this._sourcesByEfficacy = [].concat(this.sources);
            return this._sourcesByEfficacy.sort((a, b) => {
                return this.sourcePaths[a.index].length - this.sourcePaths[b.index].length;
            });
        },
    },
    mineral: {
        get() {
            if (this._mineral)
                return this._mineral;
            return (this._mineral = this.find(FIND_MINERALS)[0]);
        },
    },
    enemyCreeps: {
        get() {
            if (this._enemyCreeps)
                return this._enemyCreeps;
            return (this._enemyCreeps = this.find(FIND_HOSTILE_CREEPS, {
                filter: creep => !Memory.allyList.includes(creep.owner.username),
            }));
        },
    },
    enemyAttackers: {
        get() {
            if (this._enemyAttackers)
                return this._enemyAttackers;
            return this.enemyCreeps.filter(function (creep) {
                return creep.parts.attack + creep.parts.ranged_attack + creep.parts.work > 0;
            });
        },
    },
    allyCreeps: {
        get() {
            if (this._allyCreeps)
                return this._allyCreeps;
            return (this._allyCreeps = this.find(FIND_HOSTILE_CREEPS, {
                filter: creep => Memory.allyList.includes(creep.owner.username),
            }));
        },
    },
    myDamagedCreeps: {
        get() {
            if (this._myDamagedCreeps)
                return this._myDamagedCreeps;
            return (this._myDamagedCreeps = this.find(FIND_MY_CREEPS, {
                filter: creep => creep.hits < creep.hitsMax,
            }));
        },
    },
    allyDamagedCreeps: {
        get() {
            if (this._allyDamagedCreeps)
                return this._allyDamagedCreeps;
            return (this._allyDamagedCreeps = this.allyCreeps.filter(creep => {
                return creep.hits < creep.hitsMax;
            }));
        },
    },
    structures: {
        get() {
            if (this._structures)
                return this._structures;
            this._structures = {};
            for (const structureType of allStructureTypes)
                this._structures[structureType] = [];
            for (const structure of this.find(FIND_STRUCTURES))
                this._structures[structure.structureType].push(structure);
            return this._structures;
        },
    },
    cSites: {
        get() {
            if (this._cSites)
                return this._cSites;
            this._cSites = {};
            for (const structureType of allStructureTypes)
                this._cSites[structureType] = [];
            for (const cSite of this.find(FIND_MY_CONSTRUCTION_SITES))
                this._cSites[cSite.structureType].push(cSite);
            return this._cSites;
        },
    },
    cSiteTarget: {
        get() {
            if (this.memory.cSiteTargetID) {
                const cSiteTarget = findObjectWithID(this.memory.cSiteTargetID);
                if (cSiteTarget)
                    return cSiteTarget;
            }
            if (!this.find(FIND_MY_CONSTRUCTION_SITES).length)
                return false;
            let totalX = 0;
            let totalY = 0;
            let count = 1;
            if (this.anchor) {
                totalX += this.anchor.x;
                totalY += this.anchor.y;
            }
            else {
                totalX += 25;
                totalX += 25;
            }
            for (const creepName of this.myCreeps.builder) {
                const pos = Game.creeps[creepName].pos;
                totalX += pos.x;
                totalY += pos.y;
                count += 1;
            }
            const searchAnchor = new RoomPosition(Math.floor(totalX / count), Math.floor(totalY / count), this.name);
            for (const structureType of structureTypesByBuildPriority) {
                const cSitesOfType = this.cSites[structureType];
                if (!cSitesOfType.length)
                    continue;
                let target = searchAnchor.findClosestByPath(cSitesOfType, {
                    ignoreCreeps: true,
                    ignoreDestructibleStructures: true,
                    range: 3,
                });
                if (!target)
                    target = findClosestObject(searchAnchor, cSitesOfType);
                this.memory.cSiteTargetID = target.id;
                return target;
            }
            return false;
        },
    },
    enemyCSites: {
        get() {
            if (this._enemyCSites)
                return this._enemyCSites;
            return (this._enemyCSites = this.find(FIND_HOSTILE_CONSTRUCTION_SITES, {
                filter: cSite => !Memory.allyList.includes(cSite.owner.username),
            }));
        },
    },
    allyCSites: {
        get() {
            if (this._allyCSites)
                return this._allyCSites;
            return (this._allyCSites = this.find(FIND_HOSTILE_CONSTRUCTION_SITES, {
                filter: cSite => Memory.allyList.includes(cSite.owner.username),
            }));
        },
    },
    allyCSitesByType: {
        get() {
            if (this._allyCSitesByType)
                return this._allyCSitesByType;
            this._allyCSitesByType = {};
            for (const structureType of allStructureTypes)
                this._allyCSitesByType[structureType] = [];
            for (const cSite of this.allyCSites)
                this._allyCSitesByType[cSite.structureType].push(cSite);
            return this._allyCSitesByType;
        },
    },
    spawningStructures: {
        get() {
            if (this._spawningStructures)
                return this._spawningStructures;
            if (!this.anchor)
                return [];
            return (this._spawningStructures = [...this.structures.spawn, ...this.structures.extension]);
        },
    },
    spawningStructuresByPriority: {
        get() {
            if (this._spawningStructuresByPriority)
                return this._spawningStructuresByPriority;
            return (this._spawningStructuresByPriority = this.spawningStructures.sort((a, b) => getRange(a.pos.x, this.anchor.x, a.pos.y, this.anchor.y) -
                getRange(b.pos.x, this.anchor.x, b.pos.y, this.anchor.y)));
        },
    },
    spawningStructuresByNeed: {
        get() {
            if (this._spawningStructuresByNeed)
                return this._spawningStructuresByNeed;
            this._spawningStructuresByNeed = this.spawningStructures;
            for (const index in this.sources) {
                const closestSourcePos = this.sourcePositions[index][0];
                this._spawningStructuresByNeed = this._spawningStructuresByNeed.filter(structure => getRange(structure.pos.x, closestSourcePos.x, structure.pos.y, closestSourcePos.y) > 1);
            }
            if (this.anchor &&
                this.myCreeps.fastFiller.length &&
                ((this.fastFillerLink && this.hubLink && this.storage) ||
                    (this.fastFillerContainerLeft && this.fastFillerContainerRight))) {
                this._spawningStructuresByNeed = this._spawningStructuresByNeed.filter(structure => getRange(structure.pos.x, this.anchor.x, structure.pos.y, this.anchor.y) > 2);
            }
            return this._spawningStructuresByNeed;
        },
    },
    sourcePositions: {
        get() {
            if (this._sourcePositions && this._sourcePositions.length)
                return this._sourcePositions;
            if (this.memory.SP && this.memory.SP.length) {
                this._sourcePositions = [];
                for (const positions of this.memory.SP)
                    this._sourcePositions.push(unpackPosList(positions));
                return this._sourcePositions;
            }
            this.memory.SP = [];
            this._sourcePositions = [];
            if (this.memory.T === 'remote') {
                const commune = Game.rooms[this.memory.commune];
                if (!commune)
                    return [];
                const terrain = Game.map.getRoomTerrain(this.name);
                const anchor = commune.anchor || new RoomPosition(25, 25, commune.name);
                for (const source of this.sources) {
                    const positions = [];
                    const adjacentPositions = findCoordsInsideRect(source.pos.x - 1, source.pos.y - 1, source.pos.x + 1, source.pos.y + 1);
                    for (const coord of adjacentPositions) {
                        if (terrain.get(coord.x, coord.y) === TERRAIN_MASK_WALL)
                            continue;
                        positions.push(new RoomPosition(coord.x, coord.y, this.name));
                    }
                    positions.sort((a, b) => {
                        return (this.advancedFindPath({
                            origin: a,
                            goals: [{ pos: anchor, range: 3 }],
                        }).length -
                            this.advancedFindPath({
                                origin: b,
                                goals: [{ pos: anchor, range: 3 }],
                            }).length);
                    });
                    this.memory.SP.push(packPosList(positions));
                    this._sourcePositions.push(positions);
                }
                return this._sourcePositions;
            }
            const anchor = this.anchor || new RoomPosition(25, 25, this.name);
            const terrain = Game.map.getRoomTerrain(this.name);
            for (const source of this.sources) {
                const positions = [];
                const adjacentPositions = findCoordsInsideRect(source.pos.x - 1, source.pos.y - 1, source.pos.x + 1, source.pos.y + 1);
                for (const coord of adjacentPositions) {
                    if (terrain.get(coord.x, coord.y) === TERRAIN_MASK_WALL)
                        continue;
                    positions.push(new RoomPosition(coord.x, coord.y, this.name));
                }
                positions.sort((a, b) => {
                    return (this.advancedFindPath({
                        origin: a,
                        goals: [{ pos: anchor, range: 3 }],
                    }).length -
                        this.advancedFindPath({
                            origin: b,
                            goals: [{ pos: anchor, range: 3 }],
                        }).length);
                });
                this.memory.SP.push(packPosList(positions));
                this._sourcePositions.push(positions);
            }
            return this._sourcePositions;
        },
    },
    usedSourceCoords: {
        get() {
            if (this._usedSourceCoords)
                return this._usedSourceCoords;
            this._usedSourceCoords = [];
            for (const source of this.sources)
                this._usedSourceCoords.push(new Set());
            let harvesterNames;
            if (this.memory.T === 'commune') {
                harvesterNames = this.myCreeps.source1Harvester;
                if (this.sources.length >= 2)
                    harvesterNames = harvesterNames.concat(this.myCreeps.source2Harvester);
                harvesterNames = harvesterNames.concat(this.myCreeps.vanguard);
            }
            else {
                harvesterNames = this.myCreeps.source1RemoteHarvester;
                if (this.sources.length >= 2)
                    harvesterNames = harvesterNames.concat(this.myCreeps.source2RemoteHarvester);
            }
            for (const creepName of harvesterNames) {
                const creep = Game.creeps[creepName];
                if (creep.dying)
                    continue;
                if (creep.memory.SI === undefined)
                    continue;
                if (!creep.memory.packedPos)
                    continue;
                this._usedSourceCoords[creep.memory.SI].add(creep.memory.packedPos);
            }
            return this._usedSourceCoords;
        },
    },
    sourcePaths: {
        get() {
            var _a, _b;
            if ((_a = this._sourcePaths) === null || _a === void 0 ? void 0 : _a.length)
                return this._sourcePaths;
            this._sourcePaths = [];
            if ((_b = this.global.sourcePaths) === null || _b === void 0 ? void 0 : _b.length) {
                for (const path of this.global.sourcePaths)
                    this._sourcePaths.push(unpackPosList(path));
                return this._sourcePaths;
            }
            this.global.sourcePaths = [];
            if (this.memory.T === 'remote') {
                const commune = Game.rooms[this.memory.commune];
                if (!commune)
                    return [];
                for (const source of this.sources) {
                    const path = this.advancedFindPath({
                        origin: source.pos,
                        goals: [{ pos: commune.anchor, range: 3 }],
                    });
                    this._sourcePaths.push(path);
                    this.global.sourcePaths.push(packPosList(path));
                }
                return this._sourcePaths;
            }
            for (const source of this.sources) {
                const path = this.advancedFindPath({
                    origin: source.pos,
                    goals: [{ pos: this.anchor, range: 3 }],
                });
                this._sourcePaths.push(path);
                this.global.sourcePaths.push(packPosList(path));
            }
            return this._sourcePaths;
        },
    },
    controllerPositions: {
        get() {
            if (this._controllerPositions)
                return this._controllerPositions;
            if (this.memory.CP) {
                return (this._controllerPositions = unpackPosList(this.memory.CP));
            }
            this._controllerPositions = [];
            const { controller } = this;
            if (this.memory.T === 'remote') {
                const commune = Game.rooms[this.memory.commune];
                if (!commune)
                    return undefined;
                const terrain = Game.map.getRoomTerrain(this.name);
                const anchor = commune.anchor || new RoomPosition(25, 25, commune.name);
                const adjacentPositions = findCoordsInsideRect(controller.pos.x - 1, controller.pos.y - 1, controller.pos.x + 1, controller.pos.y + 1);
                for (const coord of adjacentPositions) {
                    if (terrain.get(coord.x, coord.y) === TERRAIN_MASK_WALL)
                        continue;
                    this._controllerPositions.push(new RoomPosition(coord.x, coord.y, this.name));
                }
                this._controllerPositions.sort((a, b) => {
                    return (this.advancedFindPath({
                        origin: a,
                        goals: [{ pos: anchor, range: 3 }],
                    }).length -
                        this.advancedFindPath({
                            origin: b,
                            goals: [{ pos: anchor, range: 3 }],
                        }).length);
                });
                this.memory.CP = packPosList(this._controllerPositions);
                return this._controllerPositions;
            }
            const anchor = this.anchor || new RoomPosition(25, 25, this.name);
            const terrain = Game.map.getRoomTerrain(this.name);
            const adjacentPositions = findCoordsInsideRect(controller.pos.x - 1, controller.pos.y - 1, controller.pos.x + 1, controller.pos.y + 1);
            for (const coord of adjacentPositions) {
                if (terrain.get(coord.x, coord.y) === TERRAIN_MASK_WALL)
                    continue;
                this._controllerPositions.push(new RoomPosition(coord.x, coord.y, this.name));
            }
            this._controllerPositions.sort((a, b) => {
                return (this.advancedFindPath({
                    origin: a,
                    goals: [{ pos: anchor, range: 3 }],
                }).length -
                    this.advancedFindPath({
                        origin: b,
                        goals: [{ pos: anchor, range: 3 }],
                    }).length);
            });
            this.memory.CP = packPosList(this._controllerPositions);
            return this._controllerPositions;
        },
    },
    upgradePathLength: {
        get() {
            if (this.global.upgradePathLength)
                return this.global.upgradePathLength;
            if (!this.anchor)
                return 0;
            const centerUpgradePos = this.get('centerUpgradePos');
            if (!centerUpgradePos)
                return 0;
            return (this.global.upgradePathLength = this.advancedFindPath({
                origin: centerUpgradePos,
                goals: [{ pos: this.anchor, range: 3 }],
            }).length);
        },
    },
    remoteNamesBySourceEfficacy: {
        get() {
            if (this._remoteNamesBySourceEfficacy)
                return this._remoteNamesBySourceEfficacy;
            this._remoteNamesBySourceEfficacy = this.memory.remotes.filter(function (roomName) {
                return Memory.rooms[roomName].SE.length;
            });
            return this._remoteNamesBySourceEfficacy.sort(function (a1, b1) {
                return (Memory.rooms[a1].SE.reduce((a2, b2) => a2 + b2) / Memory.rooms[a1].SE.length -
                    Memory.rooms[b1].SE.reduce((a2, b2) => a2 + b2) / Memory.rooms[b1].SE.length);
            });
        },
    },
    remoteSourceIndexesByEfficacy: {
        get() {
            if (this._remoteSourceIndexesByEfficacy)
                return this._remoteSourceIndexesByEfficacy;
            this._remoteSourceIndexesByEfficacy = [];
            for (let remoteIndex = 0; remoteIndex < this.memory.remotes.length; remoteIndex++) {
                const remoteName = this.memory.remotes[remoteIndex];
                const remoteMemory = Memory.rooms[remoteName];
                for (let sourceIndex = 0; sourceIndex < remoteMemory.SIDs.length; sourceIndex++) {
                    this._remoteSourceIndexesByEfficacy.push(remoteName + ' ' + sourceIndex);
                }
            }
            return this._remoteSourceIndexesByEfficacy.sort(function (a, b) {
                const aSplit = a.split(' ');
                const bSplit = b.split(' ');
                return Memory.rooms[aSplit[0]].SE[parseInt(aSplit[1])] - Memory.rooms[bSplit[0]].SE[parseInt(bSplit[1])];
            });
        },
    },
    sourceContainers: {
        get() {
            if (this._sourceContainers)
                return this._sourceContainers;
            if (this.global.sourceContainers) {
                const containers = [];
                for (const ID of this.global.sourceContainers) {
                    const container = findObjectWithID(ID);
                    if (!container)
                        break;
                    containers.push(container);
                }
                if (containers.length === this.sources.length)
                    return (this._sourceContainers = containers);
            }
            this.global.sourceContainers = [];
            const containers = [];
            for (const positions of this.sourcePositions) {
                for (let structure of positions[0].lookFor(LOOK_STRUCTURES)) {
                    if (structure.structureType !== STRUCTURE_CONTAINER)
                        continue;
                    this.global.sourceContainers.push(structure.id);
                    containers.push(structure);
                    break;
                }
            }
            return (this._sourceContainers = containers);
        },
    },
    sourceLinks: {
        get() {
            if (this._sourceLinks)
                return this._sourceLinks;
            if (this.global.sourceLinks) {
                const links = [];
                for (const ID of this.global.sourceLinks) {
                    const link = findObjectWithID(ID);
                    if (!link)
                        break;
                    links.push(link);
                }
                if (links.length === this.sources.length)
                    return (this._sourceLinks = links);
            }
            this.global.sourceLinks = [];
            const links = [];
            for (const positions of this.sourcePositions) {
                const anchor = positions[0];
                const adjacentStructures = this.lookForAtArea(LOOK_STRUCTURES, anchor.y - 1, anchor.x - 1, anchor.y + 1, anchor.x + 1, true);
                for (const posData of adjacentStructures) {
                    const structure = posData.structure;
                    if (structure.structureType !== STRUCTURE_LINK)
                        continue;
                    this.global.sourceLinks.push(structure.id);
                    links.push(structure);
                    break;
                }
            }
            return (this._sourceLinks = links);
        },
    },
    fastFillerContainerLeft: {
        get() {
            if (this.global.fastFillerContainerLeft) {
                const container = findObjectWithID(this.global.fastFillerContainerLeft);
                if (container)
                    return container;
            }
            if (!this.anchor)
                return false;
            for (const structure of this.lookForAt(LOOK_STRUCTURES, this.anchor.x - 2, this.anchor.y)) {
                if (structure.structureType !== STRUCTURE_CONTAINER)
                    continue;
                this.global.fastFillerContainerLeft = structure.id;
                return structure;
            }
            return false;
        },
    },
    fastFillerContainerRight: {
        get() {
            if (this.global.fastFillerContainerRight) {
                const container = findObjectWithID(this.global.fastFillerContainerRight);
                if (container)
                    return container;
            }
            if (!this.anchor)
                return false;
            for (const structure of this.lookForAt(LOOK_STRUCTURES, this.anchor.x + 2, this.anchor.y)) {
                if (structure.structureType !== STRUCTURE_CONTAINER)
                    continue;
                this.global.fastFillerContainerRight = structure.id;
                return structure;
            }
            return false;
        },
    },
    controllerContainer: {
        get() {
            if (this.global.controllerContainer) {
                const container = findObjectWithID(this.global.controllerContainer);
                if (container)
                    return container;
            }
            const centerUpgradePos = this.get('centerUpgradePos');
            if (!centerUpgradePos)
                return false;
            for (const structure of centerUpgradePos.lookFor(LOOK_STRUCTURES)) {
                if (structure.structureType !== STRUCTURE_CONTAINER)
                    continue;
                this.global.controllerContainer = structure.id;
                return structure;
            }
            return false;
        },
    },
    mineralContainer: {
        get() {
            if (this.global.mineralContainer) {
                const container = findObjectWithID(this.global.mineralContainer);
                if (container)
                    return container;
            }
            const mineralHarvestPos = this.get('closestMineralHarvestPos');
            if (!mineralHarvestPos)
                return false;
            for (const structure of mineralHarvestPos.lookFor(LOOK_STRUCTURES)) {
                if (structure.structureType !== STRUCTURE_CONTAINER)
                    continue;
                this.global.mineralContainer = structure.id;
                return structure;
            }
            return false;
        },
    },
    controllerLink: {
        get() {
            if (this.global.controllerLink) {
                const container = findObjectWithID(this.global.controllerLink);
                if (container)
                    return container;
            }
            const centerUpgradePos = this.get('centerUpgradePos');
            if (!centerUpgradePos)
                return false;
            for (const structure of centerUpgradePos.lookFor(LOOK_STRUCTURES)) {
                if (structure.structureType !== STRUCTURE_LINK)
                    continue;
                this.global.controllerLink = structure.id;
                return structure;
            }
            return false;
        },
    },
    fastFillerLink: {
        get() {
            if (this.global.fastFillerLink) {
                const container = findObjectWithID(this.global.fastFillerLink);
                if (container)
                    return container;
            }
            if (!this.anchor)
                return false;
            for (const structure of this.anchor.lookFor(LOOK_STRUCTURES)) {
                if (structure.structureType !== STRUCTURE_LINK)
                    continue;
                this.global.fastFillerLink = structure.id;
                return structure;
            }
            return false;
        },
    },
    hubLink: {
        get() {
            if (this.global.hubLink) {
                const structure = findObjectWithID(this.global.hubLink);
                if (structure)
                    return structure;
            }
            if (!this.memory.stampAnchors.hub)
                return false;
            const hubAnchor = unpackAsPos(this.memory.stampAnchors.hub[0]);
            if (!hubAnchor)
                return false;
            for (const structure of new RoomPosition(hubAnchor.x, hubAnchor.y + 1, this.name).lookFor(LOOK_STRUCTURES)) {
                if (structure.structureType !== STRUCTURE_LINK)
                    continue;
                this.global.hubLink = structure.id;
                return structure;
            }
            for (const structure of this.lookForAtArea(LOOK_STRUCTURES, hubAnchor.y - 1, hubAnchor.x - 1, hubAnchor.y + 1, hubAnchor.x + 1, true)) {
                if (structure.structure.structureType !== STRUCTURE_LINK)
                    continue;
                this.global.hubLink = structure.structure.id;
                return structure.structure;
            }
            return false;
        },
    },
    droppedEnergy: {
        get() {
            if (this._droppedEnergy)
                return this._droppedEnergy;
            return (this._droppedEnergy = this.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType === RESOURCE_ENERGY,
            }));
        },
    },
    actionableWalls: {
        get() {
            if (this._actionableWalls)
                return this._actionableWalls;
            return (this._actionableWalls = this.structures.constructedWall.filter(function (structure) {
                return structure.hits;
            }));
        },
    },
    MEWT: {
        get() {
            if (this._MEWT)
                return this._MEWT;
            this._MEWT = [
                ...this.droppedEnergy,
                ...this.find(FIND_TOMBSTONES),
                ...this.find(FIND_RUINS).filter(ru => ru.ticksToDecay < 10000),
                ...this.sourceContainers,
                ...this.find(FIND_RUINS).filter(ru => ru.ticksToDecay >= 10000),
                ...this.find(FIND_HOSTILE_STRUCTURES).filter(structure => {
                    return (structure.store &&
                        !structure.pos
                            .lookFor(LOOK_STRUCTURES)
                            .filter(structure2 => structure2.structureType === STRUCTURE_RAMPART &&
                            !structure2.my));
                }),
            ];
            return this._MEWT;
        },
    },
    OEWT: {
        get() {
            if (this._OEWT)
                return this._OEWT;
            this._OEWT = [];
            if (this.storage) {
                if (this.controller.my)
                    this._OEWT.push(this.storage);
                else if (!this.storage.pos
                    .lookFor(LOOK_STRUCTURES)
                    .find(structure => structure.structureType === STRUCTURE_RAMPART && !structure.my))
                    this._OEWT.push(this.storage);
            }
            if (this.terminal) {
                if (this.controller.my)
                    this._OEWT.push(this.terminal);
                else if (!this.terminal.pos
                    .lookFor(LOOK_STRUCTURES)
                    .find(structure => structure.structureType === STRUCTURE_RAMPART && !structure.my))
                    this._OEWT.push(this.terminal);
            }
            return this._OEWT;
        },
    },
    MAWT: {
        get() {
            if (this._MAWT)
                return this._MAWT;
            this._MAWT = this.MEWT;
            return this._MAWT;
        },
    },
    OAWT: {
        get() {
            if (this._OAWT)
                return this._OAWT;
            this._OAWT = this.OEWT;
            return this._OAWT;
        },
    },
    METT: {
        get() {
            if (this._METT)
                return this._METT;
            this._METT = [...this.spawningStructuresByNeed];
            if (!this.fastFillerContainerLeft && !this.fastFillerContainerRight) {
                for (const creepName of this.myCreeps.builder) {
                    const creep = Game.creeps[creepName];
                    if (creep.spawning)
                        continue;
                    if (creep.store.getCapacity() * 0.5 >= creep.store.getUsedCapacity())
                        this._METT.push(creep);
                }
            }
            this._METT = this._METT.concat(this.structures.tower.filter(tower => {
                return tower.store.energy <= tower.store.getCapacity(RESOURCE_ENERGY) * 0.5;
            }));
            return this._METT;
        },
    },
    OETT: {
        get() {
            if (this._OETT)
                return this._OETT;
            this._OETT = [];
            if (this.storage)
                this._OETT.push(this.storage);
            if (this.terminal)
                this._OETT.push(this.terminal);
            return this._OETT;
        },
    },
    MATT: {
        get() {
            if (this._MATT)
                return this._MATT;
            this._MATT = this.METT;
            return this._MATT;
        },
    },
    OATT: {
        get() {
            if (this._OATT)
                return this._OATT;
            this._OATT = this.OETT;
            return this._OATT;
        },
    },
    MEFTT: {
        get() {
            if (this._MEFTT)
                return this._MEFTT;
            this._MEFTT = [];
            if (this.controllerContainer)
                this._MEFTT.push(this.controllerContainer);
            if (this.controllerLink && !this.hubLink)
                this._MEFTT.push(this.controllerLink);
            if (this.fastFillerContainerLeft)
                this._MEFTT.push(this.fastFillerContainerLeft);
            if (this.fastFillerContainerRight)
                this._MEFTT.push(this.fastFillerContainerRight);
            return this._MEFTT;
        },
    },
    MOFTT: {
        get() {
            if (this._MOFTT)
                return this._MOFTT;
            this._MOFTT = [];
            return this._MOFTT;
        },
    },
});

Object.defineProperties(Resource.prototype, {
    reserveAmount: {
        get() {
            if (this._reserveAmount !== undefined)
                return this._reserveAmount;
            return this._reserveAmount = this.amount;
        },
        set(newAmount) {
            this._reserveAmount = newAmount;
        },
    },
});

RoomObject.prototype.usedStore = function (resourceType) {
    if (!this.store)
        return 0;
    let amount = 0;
    if (resourceType)
        return this.store[resourceType];
    for (const type in this.store)
        amount += this.store[type];
    return amount;
};
RoomObject.prototype.freeStore = function () {
    return this.store.getCapacity() - this.usedStore();
};
RoomObject.prototype.freeSpecificStore = function (resourceType = RESOURCE_ENERGY) {
    return this.store.getCapacity(resourceType) - this.store[resourceType];
};

Object.defineProperties(Creep.prototype, {
    role: {
        get() {
            if (this._role)
                return this._role;
            return (this._role = this.name.split(' ')[0]);
        },
    },
    cost: {
        get() {
            if (this._cost)
                return this._cost;
            return (this._cost = parseInt(this.name.split(' ')[1]));
        },
    },
    commune: {
        get() {
            if (this._commune)
                return this._commune;
            return (this._commune = Game.rooms[this.name.split(' ')[2]]);
        },
    },
    dying: {
        get() {
            if (this._dying)
                return true;
            if (!this.ticksToLive)
                return false;
            if (this.ticksToLive > this.body.length * CREEP_SPAWN_TIME)
                return false;
            return (this._dying = true);
        },
    },
    reservation: {
        get() {
            if (!this.memory.reservations[0])
                return false;
            return (this._reservation = this.memory.reservations[0]);
        },
    },
    strength: {
        get() {
            if (this._strength)
                return this._strength;
            this._strength = 1;
            for (const part of this.body) {
                switch (part.type) {
                    case RANGED_ATTACK:
                        this._strength +=
                            RANGED_ATTACK_POWER * (part.boost ? BOOSTS[part.type][part.boost].rangedAttack : 1);
                        break;
                    case ATTACK:
                        this._strength += ATTACK_POWER * (part.boost ? BOOSTS[part.type][part.boost].attack : 1);
                        break;
                    case HEAL:
                        this._strength += HEAL_POWER * (part.boost ? BOOSTS[part.type][part.boost].heal : 1);
                        break;
                    case TOUGH:
                        this._strength += 1 + 5 / (part.boost ? BOOSTS[part.type][part.boost].damage : 1);
                        break;
                    default:
                        this._strength += 1;
                }
            }
            return this._strength;
        },
    },
    attackStrength: {
        get() {
            if (this._attackStrength)
                return this._attackStrength;
            this._attackStrength = 1;
            for (const part of this.body) {
                switch (part.type) {
                    case RANGED_ATTACK:
                        this._attackStrength +=
                            RANGED_ATTACK_POWER * (part.boost ? BOOSTS[part.type][part.boost].rangedAttack : 1);
                        break;
                    case ATTACK:
                        this._attackStrength += ATTACK_POWER * (part.boost ? BOOSTS[part.type][part.boost].attack : 1);
                        break;
                    default:
                        this._attackStrength += 1;
                }
            }
            return this._attackStrength;
        },
    },
    healStrength: {
        get() {
            if (this._healStrength)
                return this._healStrength;
            this._healStrength = 0;
            let toughBoost = 0;
            for (const part of this.body) {
                if (part.type === TOUGH) {
                    toughBoost = Math.max(part.boost ? BOOSTS[part.type][part.boost].damage : 0, toughBoost);
                    continue;
                }
                if (part.type === HEAL)
                    this._healStrength += HEAL_POWER * (part.boost ? BOOSTS[part.type][part.boost].heal : 1);
            }
            return (this._healStrength += this._healStrength * toughBoost);
        },
    },
    parts: {
        get() {
            if (this._parts)
                return this._parts;
            this._parts = {};
            for (const partType of BODYPARTS_ALL)
                this._parts[partType] = 0;
            for (const part of this.body)
                this._parts[part.type] += 1;
            return this._parts;
        },
    },
    boosts: {
        get() {
            if (this._boosts)
                return this._boosts;
            this._boosts = {};
            let boost;
            for (const part of this.body) {
                boost = part.boost;
                if (!boost)
                    continue;
                this._boosts[boost] ? (this._boosts[boost] += 1) : (this._boosts[boost] = 1);
            }
            return this._boosts;
        },
    },
    towerDamage: {
        get() {
            if (this._towerDamage)
                return this._towerDamage;
            const { room } = this;
            this._towerDamage = 0;
            for (const tower of room.structures.tower) {
                if (tower.store.getUsedCapacity(RESOURCE_ENERGY) <= 0)
                    continue;
                const range = getRange(this.pos.x, tower.pos.x, this.pos.y, tower.pos.y);
                if (range <= TOWER_OPTIMAL_RANGE) {
                    this._towerDamage += TOWER_POWER_ATTACK;
                    continue;
                }
                const factor = range < TOWER_FALLOFF_RANGE
                    ? (range - TOWER_OPTIMAL_RANGE) / (TOWER_FALLOFF_RANGE - TOWER_OPTIMAL_RANGE)
                    : 1;
                this._towerDamage += Math.floor(TOWER_POWER_ATTACK * (1 - TOWER_FALLOFF * factor));
            }
            let top = Math.max(Math.min(this.pos.y - 3, roomDimensions - 1), 0);
            let left = Math.max(Math.min(this.pos.x - 3, roomDimensions - 1), 0);
            let bottom = Math.max(Math.min(this.pos.y + 3, roomDimensions - 1), 0);
            let right = Math.max(Math.min(this.pos.x + 3, roomDimensions - 1), 0);
            const adjacentCreeps = room.lookForAtArea(LOOK_CREEPS, top, left, bottom, right, true);
            for (const posData of adjacentCreeps) {
                if (posData.creep.my || Memory.allyList.includes(posData.creep.owner.username))
                    continue;
                const range = getRange(this.pos.x, posData.creep.pos.x, this.pos.y, posData.creep.pos.y);
                if (range > 3)
                    continue;
                this._towerDamage -= posData.creep.findTotalHealPower(range);
            }
            if (this.boosts.XGHO2 > 0)
                this._towerDamage *= BOOSTS.tough.XGHO2.damage;
            else if (this.boosts.GHO2 > 0)
                this._towerDamage *= BOOSTS.tough.GHO2.damage;
            else if (this.boosts.GO > 0)
                this._towerDamage *= BOOSTS.tough.GO.damage;
            return this._towerDamage;
        },
    },
    message: {
        get() {
            if (this._message)
                return this._message;
            return (this._message = '');
        },
        set(newMessage) {
            this._message = newMessage;
        },
    },
    freeCapacityNextTick: {
        get() {
            if (this._freeCapacityNextTick !== undefined)
                return this._freeCapacityNextTick;
            return (this._freeCapacityNextTick = this.store.getFreeCapacity());
        },
        set(newFreeCapacityNextNext) {
            this._freeCapacityNextTick = newFreeCapacityNextNext;
        },
    }
});

class MemHack {
    constructor() {
        this.memory = Memory;
        this.memory = RawMemory._parsed;
    }
    run() {
        delete global.Memory;
        global.Memory = this.memory;
        RawMemory._parsed = this.memory;
    }
}
const memHack = new MemHack();

function initProfiler() {
    const defaults = {
        data: {},
        total: 0,
    };
    if (!Memory.profiler) {
        Memory.profiler = defaults;
    }
    const cli = {
        clear() {
            const running = isEnabled();
            Memory.profiler = defaults;
            if (running) {
                Memory.profiler.start = Game.time;
            }
            return 'Profiler Memory cleared';
        },
        output() {
            outputProfilerData();
            return 'Done';
        },
        start() {
            Memory.profiler.start = Game.time;
            return 'Profiler started';
        },
        status() {
            if (isEnabled()) {
                return 'Profiler is running';
            }
            return 'Profiler is stopped';
        },
        stop() {
            if (!isEnabled()) {
                return undefined;
            }
            const timeRunning = Game.time - Memory.profiler.start;
            Memory.profiler.total += timeRunning;
            delete Memory.profiler.start;
            return 'Profiler stopped';
        },
        toString() {
            return ('Profiler.start() - Starts the profiler\n' +
                'Profiler.stop() - Stops/Pauses the profiler\n' +
                'Profiler.status() - Returns whether is profiler is currently running or not\n' +
                'Profiler.output() - Pretty-prints the collected profiler data to the console\n' +
                this.status());
        },
    };
    return cli;
}
function isEnabled() {
    return Memory.profiler.start !== undefined;
}
function outputProfilerData() {
    let totalTicks = Memory.profiler.total;
    if (Memory.profiler.start)
        totalTicks += Game.time - Memory.profiler.start;
    let totalCpu = 0;
    let calls;
    let time;
    let result;
    const data = Reflect.ownKeys(Memory.profiler.data).map(rawKey => {
        const key = rawKey;
        calls = Memory.profiler.data[key].calls;
        time = Memory.profiler.data[key].time;
        result = {};
        result.name = `${key}`;
        result.calls = calls;
        result.cpuPerCall = time / calls;
        result.callsPerTick = calls / totalTicks;
        result.cpuPerTick = time / totalTicks;
        totalCpu += result.cpuPerTick;
        return result;
    });
    data.sort((lhs, rhs) => rhs.cpuPerTick - lhs.cpuPerTick);
    let output = '';
    const longestName = _.max(data, d => d.name.length).name.length + 2;
    output += _.padRight('Function', longestName);
    output += _.padLeft('Tot Calls', 12);
    output += _.padLeft('CPU/Call', 12);
    output += _.padLeft('Calls/Tick', 12);
    output += _.padLeft('CPU/Tick', 12);
    output += _.padLeft('% of Tot\n', 12);
    data.forEach(d => {
        output += _.padRight(`${d.name}`, longestName);
        output += _.padLeft(`${d.calls}`, 12);
        output += _.padLeft(`${d.cpuPerCall.toFixed(2)}ms`, 12);
        output += _.padLeft(`${d.callsPerTick.toFixed(2)}`, 12);
        output += _.padLeft(`${d.cpuPerTick.toFixed(2)}ms`, 12);
        output += _.padLeft(`${((d.cpuPerTick / totalCpu) * 100).toFixed(0)} %\n`, 12);
    });
    output += `${totalTicks} total ticks measured`;
    output += `\t\t\t${totalCpu.toFixed(2)} average CPU profiled per tick`;
    console.log(output);
}

global.profiler = initProfiler();
const loop = function () {
    try {
        memHack.run();
        internationalManager.tickReset();
        configManager.run();
        internationalManager.run();
        roomsManager();
        internationalManager.mapVisualsManager();
        internationalManager.advancedGeneratePixel();
        internationalManager.advancedSellPixels();
    }
    catch (error) {
        customLog('ERROR', error, undefined, myColors.red);
    }
    internationalManager.endTickManager();
};

exports.loop = loop;

import GameGroup from "@/models/GameGroup";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";

const emerald: GameGroup = {
    generation: "generation-iii",
    versionGroup: "emerald",
    pokedex: pokedex.slice(0, 386),
    splits: [
        {
            name: "Roxanne Split",
            segments: [
                {
                    slug: "littleroot-town",
                    name: "Littleroot Town",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "may-1",
                    name: "May 1",
                    type: "battle",
                    segment: {
                        battle: {
                            treecko: battles.emerald.may_1_treecko,
                            torchic: battles.emerald.may_1_torchic,
                            mudkip: battles.emerald.may_1_mudkip,
                        },
                    },
                },
                {
                    slug: "hoenn-route-101",
                    name: "Route 101",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "oldale-town",
                    name: "Oldale Town",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-103",
                    name: "Route 103",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-102",
                    name: "Route 102",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "petalburg-city",
                    name: "Petalburg City",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-104",
                    name: "Route 104",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "petalburg-woods",
                    name: "Petalburg Woods",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-116",
                    name: "Route 116",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "rusturf-tunnel",
                    name: "Rusturf Tunnel",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "roxanne",
                    name: "Roxanne",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.roxanne,
                        levelCap: 15,
                    },
                },
            ],
        },
        {
            name: "Brawly Split",
            segments: [
                {
                    slug: "dewford-town",
                    name: "Dewford Town",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-106",
                    name: "Route 106",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "granite-cave",
                    name: "Granite Cave",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-107",
                    name: "Route 107",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-109",
                    name: "Route 109",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "slateport-city",
                    name: "Slateport City",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "brawly",
                    name: "Brawly",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.brawly,
                        levelCap: 19,
                    },
                },
            ],
        },
        {
            name: "Wattson Split",
            segments: [
                {
                    slug: "hoenn-route-110",
                    name: "Route 110",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "may-2",
                    name: "May 2",
                    type: "battle",
                    segment: {
                        battle: {
                            treecko: battles.emerald.may_2_treecko,
                            torchic: battles.emerald.may_2_torchic,
                            mudkip: battles.emerald.may_2_mudkip,
                        },
                    },
                },
                {
                    slug: "mauville-city",
                    name: "Mauville City",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "wally-1",
                    name: "Wally 1",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.wally_1,
                    },
                },
                {
                    slug: "hoenn-route-117",
                    name: "Route 117",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "verdanturf-town",
                    name: "Verdanturf Town",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-118",
                    name: "Route 118",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "wattson",
                    name: "Wattson",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.wattson,
                        levelCap: 24,
                    },
                },
            ],
        },
        {
            name: "Flannery Split",
            segments: [
                {
                    slug: "hoenn-route-111",
                    name: "Route 111",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-112",
                    name: "Route 112",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "fiery-path",
                    name: "Fiery Path",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-113",
                    name: "Route 113",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "fallarbor-town",
                    name: "Fallarbor Town",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-114",
                    name: "Route 114",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "meteor-falls",
                    name: "Meteor Falls",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "hoenn-route-115",
                    name: "Route 115",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "tabitha-1",
                    name: "Tabitha 1",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.tabitha_1,
                    },
                },
                {
                    slug: "maxie-1",
                    name: "Maxie 1",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.maxie_1,
                    },
                },
                {
                    slug: "jagged-pass",
                    name: "Jagged Pass",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "lavaridge-town",
                    name: "Lavaridge Town",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "flannery",
                    name: "Flannery",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.flannery,
                        levelCap: 29,
                    },
                },
            ],
        },
        {
            name: "Norman Split",
            segments: [
                {
                    slug: "mirage-tower",
                    name: "Mirage Tower",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "norman",
                    name: "Norman",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.norman,
                        levelCap: 31,
                    },
                },
            ],
        },
        {
            name: "Winona Split",
            segments: [
                {
                    slug: "shelly",
                    name: "Shelly",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.shelly,
                    },
                },
                {
                    slug: "may-3",
                    name: "May 3",
                    type: "battle",
                    segment: {
                        battle: {
                            treecko: battles.emerald.may_3_treecko,
                            torchic: battles.emerald.may_3_torchic,
                            mudkip: battles.emerald.may_3_mudkip,
                        },
                    },
                },
                {
                    slug: "winona",
                    name: "Winona",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.winona,
                        levelCap: 33,
                    },
                },
            ],
        },
        {
            name: "Tate & Liza Split",
            segments: [
                {
                    slug: "tabitha-2",
                    name: "Tabitha 2",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.tabitha_2,
                    },
                },
                {
                    slug: "maxie-2",
                    name: "Maxie 2",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.maxie_2,
                    },
                },
                {
                    slug: "matt",
                    name: "Matt",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.matt,
                    },
                },
                {
                    slug: "tate-and-liza",
                    name: "Tate and Liza",
                    type: "battle",
                    segment: {
                        battle: battles.emerald["tate-and-liza"],
                        levelCap: 42,
                    },
                },
            ],
        },
        {
            name: "Juan Split",
            segments: [
                {
                    slug: "archie",
                    name: "Archie",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.archie,
                    },
                },
                {
                    slug: "juan",
                    name: "Juan",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.juan,
                        levelCap: 46,
                    },
                },
            ],
        },
        {
            name: "Champion Split",
            segments: [
                {
                    slug: "wally-2",
                    name: "Wally 2",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.wally_2,
                    },
                },
                {
                    slug: "sidney",
                    name: "Sidney",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.sidney,
                    },
                },
                {
                    slug: "phoebe",
                    name: "Phoebe",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.phoebe,
                    },
                },
                {
                    slug: "glacia",
                    name: "Glacia",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.glacia,
                    },
                },
                {
                    slug: "drake",
                    name: "Drake",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.drake,
                    },
                },
                {
                    slug: "wallace",
                    name: "Wallace",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.wallace,
                        levelCap: 58,
                    },
                },
            ],
        },
    ],
    starterSlugs: ["treecko", "torchic", "mudkip"],
    startingTownSlug: "littleroot-town",
    invalidConditions: [],
};

export default emerald;

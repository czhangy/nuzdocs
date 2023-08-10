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
    ],
    starterSlugs: ["treecko", "torchic", "mudkip"],
    startingTownSlug: "littleroot-town",
    invalidConditions: [],
};

export default emerald;

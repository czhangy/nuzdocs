import GameData from "@/models/GameData";
import pokedex from "@/static/pokedex";
import trainers from "./trainers";
import battles from "./battles";

const emerald: GameData = {
    generation: "generation-iii",
    group: "emerald",
    pokedex: pokedex.slice(0, 386),
    characters: [trainers.emerald_brendan, trainers.emerald_may],
    starters: ["treecko", "torchic", "mudkip"],
    startingTown: "littleroot-town",
    invalidConditions: [],
    splits: [
        {
            name: "Roxanne Split",
            segments: [
                {
                    slug: "littleroot-town",
                    name: "Littleroot Town",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "rival-1",
                    name: "Rival 1",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.emerald.may_treecko_1,
                    },
                },
                {
                    slug: "rival-1",
                    name: "Rival 1",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.emerald.may_torchic_1,
                    },
                },
                {
                    slug: "rival-1",
                    name: "Rival 1",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.emerald.may_mudkip_1,
                    },
                },
                {
                    slug: "rival-1",
                    name: "Rival 1",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.emerald.brendan_treecko_1,
                    },
                },
                {
                    slug: "rival-1",
                    name: "Rival 1",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.emerald.brendan_torchic_1,
                    },
                },
                {
                    slug: "rival-1",
                    name: "Rival 1",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.emerald.brendan_mudkip_1,
                    },
                },
                {
                    slug: "hoenn-route-101",
                    name: "Route 101",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "oldale-town",
                    name: "Oldale Town",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-103",
                    name: "Route 103 (West)",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-102",
                    name: "Route 102",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.youngster_calvin,
                            battles.emerald.bug_catcher_rick,
                            battles.emerald.youngster_allen,
                            battles.emerald.lass_tiana,
                        ],
                    },
                },
                {
                    slug: "petalburg-city",
                    name: "Petalburg City",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-104",
                    name: "Route 104 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.youngster_billy,
                            battles.emerald.fisherman_darian,
                            battles.emerald.lady_cindy,
                        ],
                    },
                },
                {
                    slug: "petalburg-woods",
                    name: "Petalburg Woods",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.bug_catcher_lyle,
                            battles.emerald.team_aqua_m_grunt_8,
                            battles.emerald.bug_catcher_james,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-104",
                    name: "Route 104 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.rich_boy_winston,
                            battles.emerald.lass_haley,
                            battles.emerald.twins_gina_and_mia,
                            battles.emerald.fisherman_ivan,
                        ],
                    },
                },
                {
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "rustboro-gym",
                    name: "Rustboro Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.youngster_josh,
                            battles.emerald.youngster_tommy,
                            battles.emerald.hiker_marc,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "roxanne",
                    name: "Roxanne",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.roxanne,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Brawly Split",
            segments: [
                {
                    slug: "hoenn-route-116",
                    name: "Route 116",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.youngster_joey,
                            battles.emerald.bug_catcher_jose,
                            battles.emerald.school_kid_f_karen,
                            battles.emerald.hiker_clark,
                            battles.emerald.youngster_johnson,
                            battles.emerald.hiker_devan,
                            battles.emerald.lady_sarah,
                            battles.emerald.rich_boy_dawson,
                            battles.emerald.school_kid_m_jerry,
                            battles.emerald.lass_janice,
                        ],
                    },
                },
                {
                    slug: "rusturf-tunnel",
                    name: "Rusturf Tunnel (West)",
                    type: "location",
                    segment: { battles: [battles.emerald.team_aqua_m_grunt_9] },
                },
                {
                    slug: "dewford-town",
                    name: "Dewford Town",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-106",
                    name: "Route 106 (Beach)",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.fisherman_ned, battles.emerald.fisherman_elliot],
                    },
                },
                {
                    slug: "granite-cave",
                    name: "Granite Cave",
                    type: "location",
                    segment: {
                        battles: [],
                    },
                },
                {
                    slug: "hoenn-route-107",
                    name: "Route 107 (Beach)",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "dewford-gym",
                    name: "Dewford Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.battle_girl_laura,
                            battles.emerald.lilith_and_brenden,
                            battles.emerald.black_belt_takao,
                            battles.emerald.black_belt_cristian,
                            battles.emerald.battle_girl_jocelyn,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "brawly",
                    name: "Brawly",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.brawly,
                        levelCap: true,
                    },
                },
            ],
        },
    ],
};

export default emerald;

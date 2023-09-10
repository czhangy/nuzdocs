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
        {
            name: "Wattson Split",
            segments: [
                {
                    slug: "hoenn-route-109",
                    name: "Route 109 (Beach)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.sailor_huey,
                            battles.emerald.sailor_edmond,
                            battles.emerald.tuber_f_hailey,
                            battles.emerald.tuber_m_ricky,
                            battles.emerald.tuber_f_lola,
                            battles.emerald.tuber_m_chandler,
                            battles.emerald.tuber_m_simon,
                            battles.emerald.beauty_johanna,
                            battles.emerald.sailor_dwayne,
                        ],
                    },
                },
                {
                    slug: "slateport-city",
                    name: "Slateport City",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.team_aqua_m_grunt_13, battles.emerald.team_aqua_m_grunt_14],
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110 (South)",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.pokefan_f_isabel, battles.emerald.pokefan_m_kaleb],
                    },
                },
                {
                    slug: "hoenn-route-103",
                    name: "Route 103 (East)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.aroma_lady_daisy,
                            battles.emerald.twins_amy_and_liv,
                            battles.emerald.pokefan_m_miguel,
                            battles.emerald.fisherman_andrew,
                            battles.emerald.black_belt_rhett,
                            battles.emerald.guitarist_marcos,
                        ],
                    },
                },
                {
                    slug: "trick-house-1",
                    name: "Trick House 1",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.lass_sally,
                            battles.emerald.lass_robin,
                            battles.emerald.youngster_eddie,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110 (South)",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.youngster_timmy],
                    },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.emerald.may_treecko_2,
                    },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.emerald.may_torchic_2,
                    },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.emerald.may_mudkip_2,
                    },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.emerald.brendan_treecko_2,
                    },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.emerald.brendan_torchic_2,
                    },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.emerald.brendan_mudkip_2,
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.collector_edwin,
                            battles.emerald.guitarist_joseph,
                            battles.emerald.triathlete_biker_f_alyssa,
                            battles.emerald.psychic_m_edward,
                            battles.emerald.fisherman_dale,
                        ],
                    },
                },
                {
                    slug: "mauville-city",
                    name: "Mauville City",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "wally-1",
                    name: "Wally 1",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.wally_2,
                    },
                },
                {
                    slug: "cycling-road",
                    name: "Cycling Road",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.psychic_f_jaclyn,
                            battles.emerald.triathlete_biker_f_abigail,
                            battles.emerald.triathlete_biker_m_anthony,
                            battles.emerald.triathlete_biker_m_benjamin,
                            battles.emerald.triathlete_biker_f_jasmine,
                            battles.emerald.triathlete_biker_m_jacob,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "mauville-gym",
                    name: "Mauville Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.guitarist_kirk,
                            battles.emerald.battle_girl_vivian,
                            battles.emerald.youngster_ben,
                            battles.emerald.bug_maniac_angelo,
                            battles.emerald.guitarist_shawn,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "wattson",
                    name: "Wattson",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.wattson,
                        levelCap: true,
                    },
                },
            ],
        },
    ],
};

export default emerald;

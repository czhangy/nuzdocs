import GameData from "@/models/GameData";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";
import trainers from "@/static/trainers";

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
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    conditions: {
                        character: "may",
                        starter: "treecko",
                    },
                    segment: { battles: [battles.emerald.brendan_treecko_4] },
                },
                {
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    conditions: {
                        character: "may",
                        starter: "torchic",
                    },
                    segment: { battles: [battles.emerald.brendan_torchic_4] },
                },
                {
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    conditions: {
                        character: "may",
                        starter: "mudkip",
                    },
                    segment: { battles: [battles.emerald.brendan_mudkip_4] },
                },
                {
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    conditions: {
                        character: "brendan",
                        starter: "treecko",
                    },
                    segment: { battles: [battles.emerald.may_treecko_5] },
                },
                {
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    conditions: {
                        character: "brendan",
                        starter: "torchic",
                    },
                    segment: { battles: [battles.emerald.may_torchic_5] },
                },
                {
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    conditions: {
                        character: "brendan",
                        starter: "mudkip",
                    },
                    segment: { battles: [battles.emerald.may_mudkip_4] },
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
                            battles.emerald.battle_girl_and_sailor_lilith_and_brenden,
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
        {
            name: "Flannery Split",
            segments: [
                {
                    slug: "trick-house-2",
                    name: "Trick House 2",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.school_kid_m_ted,
                            battles.emerald.school_kid_m_paul,
                            battles.emerald.school_kid_f_georgia,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "hoenn-route-117",
                    name: "Route 117",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.sr_and_jr_anna_and_meg,
                            battles.emerald.triathlete_runner_m_dylan,
                            battles.emerald.pokemon_breeder_m_isaac,
                            battles.emerald.triathlete_runner_f_maria,
                            battles.emerald.battle_girl_aisha,
                            battles.emerald.triathlete_runner_f_melina,
                            battles.emerald.psychic_f_brandi,
                            battles.emerald.bug_maniac_derek,
                            battles.emerald.pokemon_breeder_f_lydia,
                        ],
                    },
                },
                {
                    slug: "verdanturf-town",
                    name: "Verdanturf Town",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "rusturf-tunnel",
                    name: "Rusturf Tunnel (East)",
                    type: "location",
                    segment: { battles: [battles.emerald.hiker_mike] },
                },
                {
                    slug: "hoenn-route-111",
                    name: "Route 111 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.aroma_lady_celina,
                            battles.emerald.camper_tyron,
                            battles.emerald.picnicker_bianca,
                            battles.emerald.kindler_hayden,
                            battles.emerald.winstrate_victor,
                            battles.emerald.winstrate_victoria,
                            battles.emerald.winstrate_vivi,
                            battles.emerald.winstrate_vicky,
                            battles.emerald.interviewers_gabby_and_ty_1,
                            battles.emerald.picnicker_irene,
                            battles.emerald.camper_travis,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-112",
                    name: "Route 112 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.camper_larry,
                            battles.emerald.picnicker_carol,
                            battles.emerald.hiker_trent,
                            battles.emerald.hiker_brice,
                        ],
                    },
                },
                {
                    slug: "fiery-path",
                    name: "Fiery Path",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-112",
                    name: "Route 112 (North)",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.aroma_lady_shayla, battles.emerald.kindler_bryant],
                    },
                },
                {
                    slug: "hoenn-route-111",
                    name: "Route 111 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.cool_trainer_m_wilton,
                            battles.emerald.black_belt_daisuke,
                            battles.emerald.cool_trainer_f_brooke,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-113",
                    name: "Route 113",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.youngster_jaylen,
                            battles.emerald.ninja_boy_lung,
                            battles.emerald.camper_lawrence,
                            battles.emerald.pokemaniac_wyatt,
                            battles.emerald.parasol_lady_madeline,
                            battles.emerald.twins_tori_and_tia,
                            battles.emerald.ninja_boy_lao,
                            battles.emerald.youngster_dillon,
                            battles.emerald.picnicker_sophie,
                            battles.emerald.bird_keeper_coby,
                        ],
                    },
                },
                {
                    slug: "fallarbor-town",
                    name: "Fallarbor Town",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-114",
                    name: "Route 114",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.fisherman_nolan,
                            battles.emerald.picnicker_charlotte,
                            battles.emerald.fisherman_kai,
                            battles.emerald.fisherman_claude,
                            battles.emerald.picnicker_nancy,
                            battles.emerald.sr_and_jr_tyra_and_ivy,
                            battles.emerald.camper_shane,
                            battles.emerald.pokemaniac_steve,
                            battles.emerald.kindler_bernie,
                            battles.emerald.hiker_lucas,
                            battles.emerald.picnicker_angelina,
                            battles.emerald.hiker_lenny,
                        ],
                    },
                },
                {
                    slug: "meteor-falls",
                    name: "Meteor Falls",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-115",
                    name: "Route 115 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.black_belt_nob,
                            battles.emerald.battle_girl_cyndy,
                            battles.emerald.collector_hector,
                            battles.emerald.psychic_f_marlene,
                        ],
                    },
                },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.team_magma_f_grunt_1, battles.emerald.team_magma_m_grunt_4],
                    },
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
                        battle: battles.emerald.maxie_2,
                    },
                },
                {
                    slug: "jagged-pass",
                    name: "Jagged Pass",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.hiker_eric,
                            battles.emerald.team_magma_m_grunt_3,
                            battles.emerald.picnicker_diana,
                            battles.emerald.picnicker_autumn,
                            battles.emerald.triathlete_biker_m_julio,
                            battles.emerald.camper_ethan,
                        ],
                    },
                },
                {
                    slug: "lavaridge-town",
                    name: "Lavaridge Town",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.beauty_shirley,
                            battles.emerald.beauty_sheila,
                            battles.emerald.expert_f_shelby,
                            battles.emerald.hiker_sawyer,
                            battles.emerald.beauty_melissa,
                        ],
                    },
                },
                {
                    slug: "lavaridge-gym",
                    name: "Lavaridge Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.kindler_jeff,
                            battles.emerald.hiker_eli,
                            battles.emerald.kindler_jace,
                            battles.emerald.kindler_cole,
                            battles.emerald.cool_trainer_m_gerald,
                            battles.emerald.kindler_axle,
                            battles.emerald.kindler_keegan,
                            battles.emerald.battle_girl_danielle,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "flannery",
                    name: "Flannery",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.flannery,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Norman Split",
            segments: [
                {
                    slug: "hoenn-route-111",
                    name: "Route 111 (Desert)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.camper_beau,
                            battles.emerald.camper_drew,
                            battles.emerald.picnicker_heidi,
                            battles.emerald.picnicker_becky,
                            battles.emerald.ruin_maniac_dusty,
                            battles.emerald.picnicker_celia,
                            battles.emerald.ruin_maniac_bryan,
                            battles.emerald.camper_branden,
                        ],
                    },
                },
                {
                    slug: "trick-house-3",
                    name: "Trick House 3",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.camper_justin,
                            battles.emerald.picnicker_martha,
                            battles.emerald.hiker_alan,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "petalburg-gym",
                    name: "Petalburg Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.cool_trainer_m_randall,
                            battles.emerald.cool_trainer_f_mary,
                            battles.emerald.cool_trainer_m_parker,
                            battles.emerald.cool_trainer_f_alexia,
                            battles.emerald.cool_trainer_m_george,
                            battles.emerald.cool_trainer_f_jody,
                            battles.emerald.cool_trainer_m_berke,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "norman",
                    name: "Norman",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.norman,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Winona Split",
            segments: [
                {
                    slug: "hoenn-route-115",
                    name: "Route 115 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.ninja_boy_jaiden,
                            battles.emerald.expert_m_timothy,
                            battles.emerald.triathlete_runner_f_kyra,
                            battles.emerald.black_belt_koichi,
                            battles.emerald.battle_girl_helene,
                            battles.emerald.psychic_f_alix,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-105",
                    name: "Route 105",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_f_imani,
                            battles.emerald.swimmer_m_dominik,
                            battles.emerald.ruin_maniac_foster,
                            battles.emerald.swimmer_f_beverly,
                            battles.emerald.ruin_maniac_andres,
                            battles.emerald.bird_keeper_josue,
                            battles.emerald.swimmer_m_luis,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-106",
                    name: "Route 106 (Ocean)",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.swimmer_m_douglas, battles.emerald.swimmer_f_kyla],
                    },
                },
                {
                    slug: "hoenn-route-107",
                    name: "Route 107 (Ocean)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_f_denise,
                            battles.emerald.swimmer_m_tony,
                            battles.emerald.sis_and_bro_lisa_and_ray,
                            battles.emerald.swimmer_m_darrin,
                            battles.emerald.swimmer_f_beth,
                            battles.emerald.triathlete_swimmer_m_camron,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-108",
                    name: "Route 108",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_f_missy,
                            battles.emerald.swimmer_m_matthew,
                            battles.emerald.swimmer_f_tara,
                            battles.emerald.cool_trainer_f_carolina,
                            battles.emerald.sailor_cory,
                            battles.emerald.swimmer_m_jerome,
                        ],
                    },
                },
                {
                    slug: "abandoned-ship",
                    name: "Abandoned Ship",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.beauty_thalia,
                            battles.emerald.youngster_demetrius,
                            battles.emerald.sailor_duncan,
                            battles.emerald.tuber_m_charlie,
                            battles.emerald.ruin_maniac_garrison,
                            battles.emerald.tuber_f_jani,
                            battles.emerald.young_couple_kira_and_dan,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-109",
                    name: "Route 109 (Ocean)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.tuber_f_austina,
                            battles.emerald.tuber_f_gwen,
                            battles.emerald.swimmer_m_david,
                            battles.emerald.swimmer_f_alice,
                            battles.emerald.fisherman_carter,
                            battles.emerald.bird_keeper_elijah,
                            battles.emerald.young_couple_mel_and_paul,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-103",
                    name: "Route 103 (Middle)",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.swimmer_f_isabelle, battles.emerald.swimmer_m_pete],
                    },
                },
                {
                    slug: "trick-house-4",
                    name: "Trick House 4",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.black_belt_yuji,
                            battles.emerald.battle_girl_cora,
                            battles.emerald.battle_girl_paula,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "new-mauville",
                    name: "New Mauville",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-118",
                    name: "Route 118",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.aroma_lady_rose,
                            battles.emerald.youngster_deandre,
                            battles.emerald.fisherman_wade,
                            battles.emerald.guitarist_dalton,
                            battles.emerald.interviewers_gabby_and_ty_2,
                            battles.emerald.fisherman_barny,
                            battles.emerald.bird_keeper_chester,
                            battles.emerald.bird_keeper_perry,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-123",
                    name: "Route 123 (West)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.bug_catcher_davis,
                            battles.emerald.cool_trainer_f_jazmyn,
                            battles.emerald.aroma_lady_violet,
                            battles.emerald.twins_miu_and_yuki,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-119",
                    name: "Route 119 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.bug_catcher_kent,
                            battles.emerald.bug_maniac_donald,
                            battles.emerald.bug_catcher_greg,
                            battles.emerald.bug_maniac_taylor,
                            battles.emerald.bug_catcher_doug,
                            battles.emerald.bug_maniac_brent,
                            battles.emerald.fisherman_chris,
                            battles.emerald.pokemon_ranger_f_catherine,
                            battles.emerald.pokemon_ranger_m_jackson,
                            battles.emerald.parasol_lady_rachel,
                            battles.emerald.bird_keeper_phil,
                            battles.emerald.ninja_boy_takashi,
                            battles.emerald.kindler_dayton,
                            battles.emerald.bird_keeper_hugh,
                        ],
                    },
                },
                {
                    slug: "weather-institute",
                    name: "Weather Institute",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.team_aqua_f_grunt_2,
                            battles.emerald.team_aqua_m_grunt_10,
                            battles.emerald.team_aqua_m_grunt_11,
                            battles.emerald.team_aqua_f_grunt_6,
                            battles.emerald.team_aqua_m_grunt_12,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "shelly-1",
                    name: "Shelly 1",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.shelly_1,
                    },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.emerald.may_treecko_3,
                    },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.emerald.may_torchic_3,
                    },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: {
                        character: "brendan",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.emerald.may_mudkip_3,
                    },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.emerald.brendan_treecko_3,
                    },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.emerald.brendan_torchic_3,
                    },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: {
                        character: "may",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.emerald.brendan_mudkip_3,
                    },
                },
                {
                    slug: "hoenn-route-119",
                    name: "Route 119 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.guitarist_fabian,
                            battles.emerald.ninja_boy_yasu,
                            battles.emerald.ninja_boy_hideo,
                        ],
                    },
                },
                {
                    slug: "fortree-city",
                    name: "Fortree City",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-120",
                    name: "Route 120 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.parasol_lady_clarissa,
                            battles.emerald.interviewers_gabby_and_ty_3,
                            battles.emerald.bird_keeper_robert,
                        ],
                    },
                },
                {
                    slug: "scorched-slab",
                    name: "Scorched Slab",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "fortree-gym",
                    name: "Fortree Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.bird_keeper_humberto,
                            battles.emerald.bird_keeper_jared,
                            battles.emerald.picnicker_ashley,
                            battles.emerald.camper_and_bird_keeper_flint_and_edwardo,
                            battles.emerald.bird_keeper_darius,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "winona",
                    name: "Winona",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.winona,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Tate & Liza Split",
            segments: [
                {
                    slug: "trick-house-5",
                    name: "Trick House 5",
                    type: "location",
                    segment: {
                        battles: [],
                        custom: true,
                    },
                },
                {
                    slug: "hoenn-route-120",
                    name: "Route 120 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.bird_keeper_colin,
                            battles.emerald.cool_trainer_m_leonel,
                            battles.emerald.parasol_lady_angelica,
                            battles.emerald.ninja_boy_riley,
                            battles.emerald.battle_girl_callie,
                            battles.emerald.cool_trainer_f_jennifer,
                            battles.emerald.pokemon_ranger_f_jenna,
                            battles.emerald.pokemon_ranger_m_lorenzo,
                            battles.emerald.bug_maniac_jeffrey,
                            battles.emerald.ninja_boy_keigo,
                            battles.emerald.ruin_maniac_chip,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-121",
                    name: "Route 121",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.bug_maniac_cale,
                            battles.emerald.hex_maniac_tammy,
                            battles.emerald.beauty_jessica,
                            battles.emerald.sr_and_jr_kate_and_joy,
                            battles.emerald.pokemon_breeder_f_pat,
                            battles.emerald.pokemon_breeder_m_myles,
                            battles.emerald.gentleman_walter,
                            battles.emerald.pokefan_f_vanessa,
                            battles.emerald.cool_trainer_m_marcel,
                            battles.emerald.cool_trainer_f_cristin,
                        ],
                    },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        character: "may",
                        starter: "treecko",
                    },
                    segment: { battles: [battles.emerald.brendan_treecko_5] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        character: "may",
                        starter: "torchic",
                    },
                    segment: { battles: [battles.emerald.brendan_torchic_5] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        character: "may",
                        starter: "mudkip",
                    },
                    segment: { battles: [battles.emerald.brendan_mudkip_5] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        character: "brendan",
                        starter: "treecko",
                    },
                    segment: { battles: [battles.emerald.may_treecko_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        character: "brendan",
                        starter: "torchic",
                    },
                    segment: { battles: [battles.emerald.may_torchic_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        character: "brendan",
                        starter: "mudkip",
                    },
                    segment: { battles: [battles.emerald.may_mudkip_5] },
                },
                {
                    slug: "hoenn-safari-zone",
                    name: "Safari Zone",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-122",
                    name: "Route 122",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "mt-pyre",
                    name: "Mt. Pyre (Interior)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.pokemaniac_mark,
                            battles.emerald.hex_maniac_leah,
                            battles.emerald.black_belt_zander,
                            battles.emerald.young_couple_dez_and_luke,
                            battles.emerald.psychic_f_kayla,
                            battles.emerald.pokemon_breeder_f_gabrielle,
                            battles.emerald.psychic_m_william,
                            battles.emerald.hex_maniac_tasha,
                            battles.emerald.black_belt_atsushi,
                            battles.emerald.hex_maniac_valerie,
                            battles.emerald.psychic_m_cedric,
                        ],
                    },
                },
                {
                    slug: "mt-pyre",
                    name: "Mt. Pyre (Summit)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.team_aqua_m_grunt_4,
                            battles.emerald.team_aqua_m_grunt_3,
                            battles.emerald.team_aqua_grunts,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-123",
                    name: "Route 123 (East)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.psychic_m_cameron,
                            battles.emerald.ninja_boy_and_parasol_lady_jonas_and_kayley,
                            battles.emerald.hex_maniac_kindra,
                            battles.emerald.collector_ed,
                            battles.emerald.cool_trainer_f_wendy,
                            battles.emerald.cool_trainer_m_braxton,
                            battles.emerald.guitarist_fernando,
                            battles.emerald.bird_keeper_alberto,
                            battles.emerald.psychic_f_jacki,
                            battles.emerald.expert_m_fredrick,
                        ],
                    },
                },
                {
                    slug: "magma-hideout",
                    name: "Magma Hideout",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.team_magma_m_grunt_10,
                            battles.emerald.team_magma_m_grunt_11,
                            battles.emerald.team_magma_f_grunt_3,
                            battles.emerald.team_magma_m_grunt_13,
                            battles.emerald.team_magma_m_grunt_12,
                            battles.emerald.team_magma_m_grunt_9,
                            battles.emerald.team_magma_m_grunt_14,
                            battles.emerald.team_magma_m_grunt_15,
                            battles.emerald.team_magma_grunts,
                            battles.emerald.team_magma_m_grunt_16,
                            battles.emerald.team_magma_m_grunt_17,
                            battles.emerald.team_magma_f_grunt_4,
                            battles.emerald.team_magma_m_grunt_18,
                            battles.emerald.team_magma_m_grunt_19,
                            battles.emerald.team_magma_m_grunt_20,
                        ],
                    },
                },
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
                        battle: battles.emerald.maxie_1,
                    },
                },
                {
                    slug: "team-aqua-hideout",
                    name: "Aqua Hideout",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.team_aqua_m_grunt_1,
                            battles.emerald.team_aqua_f_grunt_3,
                            battles.emerald.team_aqua_m_grunt_2,
                            battles.emerald.team_aqua_f_grunt_5,
                            battles.emerald.team_aqua_m_grunt_16,
                            battles.emerald.team_aqua_m_grunt_15,
                            battles.emerald.team_aqua_f_grunt_4,
                            battles.emerald.team_aqua_m_grunt_17,
                        ],
                    },
                },
                {
                    slug: "Matt",
                    name: "Matt",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.matt,
                    },
                },
                {
                    slug: "hoenn-route-124",
                    name: "Route 124",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_f_grace,
                            battles.emerald.swimmer_m_declan,
                            battles.emerald.sis_and_bro_lila_and_roy,
                            battles.emerald.swimmer_m_spencer,
                            battles.emerald.swimmer_f_jenny,
                            battles.emerald.swimmer_m_chad,
                            battles.emerald.triathlete_swimmer_f_isabella,
                            battles.emerald.swimmer_m_roland,
                        ],
                    },
                },
                {
                    slug: "mossdeep-city",
                    name: "Mossdeep City",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-125",
                    name: "Route 125",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.sailor_ernest,
                            battles.emerald.swimmer_m_nolen,
                            battles.emerald.swimmer_f_sharon,
                            battles.emerald.swimmer_f_tanya,
                            battles.emerald.bird_keeper_presley,
                            battles.emerald.expert_m_auron,
                            battles.emerald.swimmer_m_stan,
                            battles.emerald.sr_and_jr_kim_and_iris,
                        ],
                    },
                },
                {
                    slug: "shoal-cave",
                    name: "Shoal Cave",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "mossdeep-gym",
                    name: "Mossdeep Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.psychic_m_preston,
                            battles.emerald.psychic_f_maura,
                            battles.emerald.psychic_f_samantha,
                            battles.emerald.psychic_m_blake,
                            battles.emerald.psychic_f_macey,
                            battles.emerald.gentleman_clifford,
                            battles.emerald.hex_maniac_kathleen,
                            battles.emerald.psychic_m_nicholas,
                            battles.emerald.gentleman_nate,
                            battles.emerald.psychic_m_virgil,
                            battles.emerald.hex_maniac_sylvia,
                            battles.emerald.psychic_f_hannah,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "tate-and-liza",
                    name: "Tate and Liza",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.tate_and_liza,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Juan Split",
            segments: [
                {
                    slug: "trick-house-6",
                    name: "Trick House 6",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.pokemon_ranger_f_sophia,
                            battles.emerald.pokemon_ranger_m_sebastian,
                            battles.emerald.bird_keeper_benny,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "mossdeep-space-center",
                    name: "Mossdeep Space Center",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.team_magma_f_grunt_2,
                            battles.emerald.team_magma_m_grunt_1,
                            battles.emerald.team_magma_m_grunt_5,
                            battles.emerald.team_magma_m_grunt_2,
                            battles.emerald.team_magma_m_grunt_6,
                            battles.emerald.team_magma_m_grunt_7,
                            battles.emerald.team_magma_m_grunt_8,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "maxie-and-tabitha",
                    name: "Maxie & Tabitha",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.maxie_and_tabitha,
                    },
                },
                {
                    slug: "hoenn-route-126",
                    name: "Route 126",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_m_leonardo,
                            battles.emerald.triathlete_swimmer_f_isobel,
                            battles.emerald.swimmer_m_dean,
                            battles.emerald.swimmer_f_nikki,
                            battles.emerald.swimmer_m_barry,
                            battles.emerald.swimmer_f_sienna,
                            battles.emerald.triathlete_swimmer_m_pablo,
                            battles.emerald.swimmer_f_brenda,
                        ],
                    },
                },
                {
                    slug: "underwater",
                    name: "Underwater",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "sootopolis-city",
                    name: "Sootopolis City",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-127",
                    name: "Route 127",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.bird_keeper_aidan,
                            battles.emerald.cool_trainer_f_athena,
                            battles.emerald.fisherman_jonah,
                            battles.emerald.fisherman_roger,
                            battles.emerald.fisherman_henry,
                            battles.emerald.triathlete_swimmer_m_camden,
                            battles.emerald.black_belt_koji,
                            battles.emerald.triathlete_swimmer_f_donny,
                        ],
                    },
                },
                {
                    slug: "seafloor-cavern",
                    name: "Seafloor Cavern",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.team_aqua_m_grunt_5,
                            battles.emerald.team_aqua_m_grunt_6,
                            battles.emerald.team_aqua_m_grunt_7,
                            battles.emerald.team_aqua_f_grunt_1,
                            battles.emerald.team_aqua_m_grunt_18,
                            battles.emerald.shelly_2,
                        ],
                    },
                },
                {
                    slug: "archie",
                    name: "Archie",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.archie,
                    },
                },
                {
                    slug: "hoenn-route-128",
                    name: "Route 128",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.cool_trainer_m_ruben,
                            battles.emerald.cool_trainer_f_alexa,
                            battles.emerald.fisherman_wayne,
                            battles.emerald.triathlete_swimmer_m_isaiah,
                            battles.emerald.triathlete_swimmer_f_katelyn,
                            battles.emerald.swimmer_f_carlee,
                            battles.emerald.swimmer_m_harrison,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-129",
                    name: "Route 129",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_m_reed,
                            battles.emerald.triathlete_swimmer_m_chase,
                            battles.emerald.triathlete_swimmer_f_allison,
                            battles.emerald.swimmer_m_clarence,
                            battles.emerald.swimmer_f_tisha,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-130",
                    name: "Route 130",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_m_rodney,
                            battles.emerald.swimmer_f_katie,
                            battles.emerald.swimmer_m_santiago,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-131",
                    name: "Route 131",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_m_kevin,
                            battles.emerald.triathlete_swimmer_f_talia,
                            battles.emerald.swimmer_m_richard,
                            battles.emerald.swimmer_f_kara,
                            battles.emerald.swimmer_m_herman,
                            battles.emerald.swimmer_f_susie,
                            battles.emerald.sis_and_bro_reli_and_ian,
                        ],
                    },
                },
                {
                    slug: "pacifidlog-town",
                    name: "Pacifidlog Town",
                    type: "location",
                    segment: {
                        battles: [],
                    },
                },
                {
                    slug: "cave-of-origin",
                    name: "Cave of Origin",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "sky-pillar",
                    name: "Sky Pillar",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "sootopolis-gym",
                    name: "Sootopolis Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.beauty_connie,
                            battles.emerald.lass_andrea,
                            battles.emerald.lady_daphne,
                            battles.emerald.pokefan_f_annika,
                            battles.emerald.beauty_tiffany,
                            battles.emerald.lass_crissy,
                            battles.emerald.pokefan_f_bethany,
                            battles.emerald.beauty_olivia,
                            battles.emerald.lady_brianna,
                            battles.emerald.beauty_bridget,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "juan",
                    name: "Juan",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.juan,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Champion Split",
            segments: [
                {
                    slug: "trick-house-7",
                    name: "Trick House 7",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.psychic_and_hex_maniac_joshua_and_patricia,
                            battles.emerald.psychic_and_gentleman_mariela_and_everett,
                            battles.emerald.psychic_f_alexis,
                            battles.emerald.psychic_m_alvaro,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "hoenn-route-132",
                    name: "Route 132",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_m_gilbert,
                            battles.emerald.swimmer_f_dana,
                            battles.emerald.fisherman_ronald,
                            battles.emerald.black_belt_kiyo,
                            battles.emerald.expert_m_paxton,
                            battles.emerald.cool_trainer_f_darcy,
                            battles.emerald.expert_f_makayla,
                            battles.emerald.cool_trainer_m_jonathan,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-133",
                    name: "Route 133",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_f_linda,
                            battles.emerald.bird_keeper_beck,
                            battles.emerald.expert_m_conor,
                            battles.emerald.expert_f_mollie,
                            battles.emerald.cool_trainer_m_warren,
                            battles.emerald.swimmer_f_debra,
                            battles.emerald.swimmer_m_franklin,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-134",
                    name: "Route 134",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.swimmer_f_laurel,
                            battles.emerald.swimmer_m_jack,
                            battles.emerald.black_belt_hitoshi,
                            battles.emerald.battle_girl_reyna,
                            battles.emerald.sailor_hudson,
                            battles.emerald.dragon_tamer_aaron,
                            battles.emerald.cool_trainer_f_marley,
                            battles.emerald.bird_keeper_alex,
                            battles.emerald.sailor_kelvin,
                        ],
                    },
                },
                {
                    slug: "meteor-falls",
                    name: "Meteor Falls",
                    type: "location",
                    segment: {
                        battles: [battles.emerald.old_couple_john_and_jay, battles.emerald.dragon_tamer_nicolas],
                    },
                },
                {
                    slug: "ever-grande-city",
                    name: "Ever Grande City",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "wally-2",
                    name: "Wally 2",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.wally_1,
                    },
                },
                {
                    slug: "hoenn-victory-road",
                    name: "Victory Road",
                    type: "location",
                    segment: {
                        battles: [
                            battles.emerald.cool_trainer_m_albert,
                            battles.emerald.cool_trainer_f_hope,
                            battles.emerald.cool_trainer_f_shannon,
                            battles.emerald.cool_trainer_m_samuel,
                            battles.emerald.cool_trainer_f_julie,
                            battles.emerald.cool_trainer_m_owen,
                            battles.emerald.cool_trainer_f_dianne,
                            battles.emerald.cool_trainer_m_felix,
                            battles.emerald.cool_trainer_f_caroline,
                            battles.emerald.cool_trainer_m_vito,
                            battles.emerald.cool_trainer_f_michelle,
                            battles.emerald.cool_trainer_m_mitchell,
                            battles.emerald.cool_trainer_f_halle,
                            battles.emerald.cool_trainer_m_edgar,
                            battles.emerald.cool_trainer_f_katelynn,
                            battles.emerald.cool_trainer_m_quincy,
                        ],
                    },
                },
                {
                    slug: "sidney",
                    name: "Sidney",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.sidney,
                        levelCap: true,
                    },
                },
                {
                    slug: "phoebe",
                    name: "Phoebe",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.phoebe,
                        levelCap: true,
                    },
                },
                {
                    slug: "glacia",
                    name: "Glacia",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.glacia,
                        levelCap: true,
                    },
                },
                {
                    slug: "drake",
                    name: "Drake",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.drake,
                        levelCap: true,
                    },
                },
                {
                    slug: "wallace",
                    name: "Wallace",
                    type: "battle",
                    segment: {
                        battle: battles.emerald.wallace,
                        levelCap: true,
                    },
                },
            ],
        },
    ],
};

export default emerald;

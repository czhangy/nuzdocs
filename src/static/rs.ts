import GameData from "@/models/GameData";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";
import trainers from "@/static/trainers";

const rs: GameData = {
    generation: "generation-iii",
    group: "ruby-sapphire",
    pokedex: pokedex.slice(0, 386),
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
                    slug: "may-1",
                    name: "May 1",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_treecko_1,
                    },
                },
                {
                    slug: "may-1",
                    name: "May 1",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_torchic_1,
                    },
                },
                {
                    slug: "may-1",
                    name: "May 1",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_mudkip_1,
                    },
                },
                {
                    slug: "brendan-1",
                    name: "Brendan 1",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_treecko_1,
                    },
                },
                {
                    slug: "brendan-1",
                    name: "Brendan 1",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_torchic_1,
                    },
                },
                {
                    slug: "brendan-1",
                    name: "Brendan 1",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_mudkip_1,
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
                    segment: {
                        battles: [
                            battles.ruby_sapphire.aroma_lady_daisy,
                            battles.ruby_sapphire.twins_amy_and_liv,
                            battles.ruby_sapphire.pokefan_miguel,
                            battles.ruby_sapphire.fisherman_andrew,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-102",
                    name: "Route 102",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.youngster_calvin,
                            battles.ruby_sapphire.bug_catcher_rick,
                            battles.ruby_sapphire.youngster_allen,
                            battles.ruby_sapphire.lass_tiana,
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
                        battles: [battles.ruby_sapphire.youngster_billy, battles.ruby_sapphire.rich_boy_winston],
                    },
                },
                {
                    slug: "petalburg-woods",
                    name: "Petalburg Woods",
                    type: "location",
                    conditions: {
                        game: "ruby",
                    },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bug_catcher_lyle,
                            battles.ruby_sapphire.team_magma_grunt_1,
                            battles.ruby_sapphire.bug_catcher_james,
                        ],
                    },
                },
                {
                    slug: "petalburg-woods",
                    name: "Petalburg Woods",
                    type: "location",
                    conditions: {
                        game: "sapphire",
                    },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bug_catcher_lyle,
                            battles.ruby_sapphire.team_aqua_grunt_1,
                            battles.ruby_sapphire.bug_catcher_james,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-104",
                    name: "Route 104 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.youngster_billy,
                            battles.ruby_sapphire.rich_boy_winston,
                            battles.ruby_sapphire.lady_cindy,
                            battles.ruby_sapphire.lass_haley,
                            battles.ruby_sapphire.twins_gia_and_mia,
                            battles.ruby_sapphire.fisherman_ivan,
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
                        battles: [battles.ruby_sapphire.youngster_josh, battles.ruby_sapphire.youngster_tommy],
                        custom: true,
                    },
                },
                {
                    slug: "roxanne",
                    name: "Roxanne",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.gym_leader_roxanne,
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
                            battles.ruby_sapphire.youngster_joey,
                            battles.ruby_sapphire.bug_catcher_jose,
                            battles.ruby_sapphire.lass_janice,
                            battles.ruby_sapphire.hiker_clark,
                            battles.ruby_sapphire.school_kid_jerry,
                            battles.ruby_sapphire.school_kid_karen,
                        ],
                    },
                },
                {
                    slug: "rusturf-tunnel",
                    name: "Rusturf Tunnel (West)",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: { battles: [battles.ruby_sapphire.team_magma_grunt_2] },
                },
                {
                    slug: "rusturf-tunnel",
                    name: "Rusturf Tunnel (West)",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: { battles: [battles.ruby_sapphire.team_aqua_grunt_2] },
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
                        battles: [battles.ruby_sapphire.fisherman_ned, battles.ruby_sapphire.fisherman_elliot],
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
                            battles.ruby_sapphire.battle_girl_laura,
                            battles.ruby_sapphire.black_belt_hideki,
                            battles.ruby_sapphire.battle_girl_tessa,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "brawly",
                    name: "Brawly",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.gym_leader_brawly,
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
                            battles.ruby_sapphire.sailor_huey,
                            battles.ruby_sapphire.tuber_ricky,
                            battles.ruby_sapphire.sailor_edmond,
                            battles.ruby_sapphire.tuber_lola,
                            battles.ruby_sapphire.sailor_dwayne,
                            battles.ruby_sapphire.beauty_johanna,
                            battles.ruby_sapphire.tuber_simon,
                        ],
                    },
                },
                {
                    slug: "slateport-city",
                    name: "Slateport City",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [battles.ruby_sapphire.team_magma_grunt_3, battles.ruby_sapphire.team_magma_grunt_4],
                    },
                },
                {
                    slug: "slateport-city",
                    name: "Slateport City",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [battles.ruby_sapphire.team_aqua_grunt_3, battles.ruby_sapphire.team_aqua_grunt_4],
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.pokefan_isabel,
                            battles.ruby_sapphire.lass_sally,
                            battles.ruby_sapphire.youngster_eddie,
                            battles.ruby_sapphire.lass_robin,
                            battles.ruby_sapphire.youngster_timmy,
                            battles.ruby_sapphire.collector_edwin,
                            battles.ruby_sapphire.psychic_edward,
                            battles.ruby_sapphire.fisherman_dale,
                        ],
                    },
                },
                {
                    slug: "may-2",
                    name: "May 2",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_treecko_2,
                    },
                },
                {
                    slug: "may-2",
                    name: "May 2",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_torchic_2,
                    },
                },
                {
                    slug: "may-2",
                    name: "May 2",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_mudkip_2,
                    },
                },
                {
                    slug: "brendan-2",
                    name: "Brendan 2",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_treecko_2,
                    },
                },
                {
                    slug: "brendan-2",
                    name: "Brendan 2",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_torchic_2,
                    },
                },
                {
                    slug: "brendan-2",
                    name: "Brendan 2",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_mudkip_2,
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
                        battle: battles.ruby_sapphire.pokemon_trainer_wally_1,
                    },
                },
                {
                    slug: "hoenn-route-118",
                    name: "Route 118 (West)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.aroma_lady_rose,
                            battles.ruby_sapphire.guitarist_dalton,
                            battles.ruby_sapphire.fisherman_wade,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.psychic_jaclyn,
                            battles.ruby_sapphire.triathlete_jacob,
                            battles.ruby_sapphire.triathlete_jasmine,
                            battles.ruby_sapphire.triathlete_benjamin,
                            battles.ruby_sapphire.triathlete_abigail,
                            battles.ruby_sapphire.triathlete_anthony,
                        ],
                    },
                },
                {
                    slug: "mauville-gym",
                    name: "Mauville Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.guitarist_kirk,
                            battles.ruby_sapphire.youngster_ben,
                            battles.ruby_sapphire.battle_girl_vivian,
                            battles.ruby_sapphire.guitarist_shawn,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "wattson",
                    name: "Wattson",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.gym_leader_wattson,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Flannery Split",
            segments: [
                {
                    slug: "hoenn-route-110",
                    name: "Route 110",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.school_kid_ted,
                            battles.ruby_sapphire.school_kid_paul,
                            battles.ruby_sapphire.school_kid_georgia,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-117",
                    name: "Route 117",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.sr_and_jr_anna_and_meg,
                            battles.ruby_sapphire.triathlete_dylan,
                            battles.ruby_sapphire.pokemon_breeder_lydia,
                            battles.ruby_sapphire.triathlete_maria,
                            battles.ruby_sapphire.bug_maniac_derek,
                            battles.ruby_sapphire.pokemon_breeder_isaac,
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
                    segment: { battles: [battles.ruby_sapphire.hiker_mike] },
                },
                {
                    slug: "hoenn-route-111",
                    name: "Route 111 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.pokefan_victor,
                            battles.ruby_sapphire.pokefan_victoria,
                            battles.ruby_sapphire.lass_vivi,
                            battles.ruby_sapphire.expert_vicky,
                            battles.ruby_sapphire.interviewers_gabby_and_ty_1,
                            battles.ruby_sapphire.camper_travis,
                            battles.ruby_sapphire.picnicker_irene,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-112",
                    name: "Route 112",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.camper_larry,
                            battles.ruby_sapphire.picnicker_carol,
                            battles.ruby_sapphire.hiker_trent,
                            battles.ruby_sapphire.hiker_brice,
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
                    slug: "hoenn-route-111",
                    name: "Route 111 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.cool_trainer_wilton,
                            battles.ruby_sapphire.black_belt_daisuke,
                            battles.ruby_sapphire.cool_trainer_brooke,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-113",
                    name: "Route 113",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.youngster_neal,
                            battles.ruby_sapphire.ninja_boy_lao,
                            battles.ruby_sapphire.parasol_lady_madeline,
                            battles.ruby_sapphire.twins_tori_and_tia,
                            battles.ruby_sapphire.ninja_boy_lung,
                            battles.ruby_sapphire.youngster_dillon,
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
                            battles.ruby_sapphire.fisherman_nolan,
                            battles.ruby_sapphire.fisherman_claude,
                            battles.ruby_sapphire.picnicker_nancy,
                            battles.ruby_sapphire.sr_and_jr_tyra_and_ivy,
                            battles.ruby_sapphire.camper_shane,
                            battles.ruby_sapphire.pokemaniac_steve,
                            battles.ruby_sapphire.kindler_bernie,
                            battles.ruby_sapphire.hiker_lucas,
                            battles.ruby_sapphire.hiker_lenny,
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
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.black_belt_nob,
                            battles.ruby_sapphire.collector_hector_ruby,
                            battles.ruby_sapphire.battle_girl_cyndy,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-115",
                    name: "Route 115 (South)",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.black_belt_nob,
                            battles.ruby_sapphire.collector_hector_sapphire,
                            battles.ruby_sapphire.battle_girl_cyndy,
                        ],
                    },
                },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [battles.ruby_sapphire.team_magma_grunt_5],
                    },
                },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [battles.ruby_sapphire.team_aqua_grunt_5],
                    },
                },
                {
                    slug: "tabitha-1",
                    name: "Tabitha 1",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: {
                        battle: battles.ruby_sapphire.magma_admin_tabitha_1,
                    },
                },
                {
                    slug: "matt-1",
                    name: "Matt 1",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: {
                        battle: battles.ruby_sapphire.aqua_admin_matt_1,
                    },
                },
                {
                    slug: "maxie-1",
                    name: "Maxie 1",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: {
                        battle: battles.ruby_sapphire.magma_leader_maxie_1,
                    },
                },
                {
                    slug: "archie-1",
                    name: "Archie 1",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: {
                        battle: battles.ruby_sapphire.aqua_leader_archie_1,
                    },
                },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.expert_shelby,
                            battles.ruby_sapphire.beauty_melissa,
                            battles.ruby_sapphire.beauty_shirley,
                            battles.ruby_sapphire.beauty_sheila,
                        ],
                    },
                },
                {
                    slug: "jagged-pass",
                    name: "Jagged Pass",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.hiker_eric,
                            battles.ruby_sapphire.camper_ethan,
                            battles.ruby_sapphire.picnicker_diana,
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
                    slug: "lavaridge-gym",
                    name: "Lavaridge Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.kindler_cole,
                            battles.ruby_sapphire.cool_trainer_zane,
                            battles.ruby_sapphire.kindler_axle,
                            battles.ruby_sapphire.battle_girl_sadie,
                            battles.ruby_sapphire.kindler_andy,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "flannery",
                    name: "Flannery",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.gym_leader_flannery,
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
                            battles.ruby_sapphire.camper_cliff,
                            battles.ruby_sapphire.picnicker_heidi,
                            battles.ruby_sapphire.camper_drew,
                            battles.ruby_sapphire.ruin_maniac_dusty,
                            battles.ruby_sapphire.picnicker_becky,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.camper_justin,
                            battles.ruby_sapphire.picnicker_martha,
                            battles.ruby_sapphire.hiker_alan,
                        ],
                    },
                },
                {
                    slug: "petalburg-gym",
                    name: "Petalburg Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.cool_trainer_randall,
                            battles.ruby_sapphire.cool_trainer_mary,
                            battles.ruby_sapphire.cool_trainer_parker,
                            battles.ruby_sapphire.cool_trainer_lori,
                            battles.ruby_sapphire.cool_trainer_george,
                            battles.ruby_sapphire.cool_trainer_berke,
                            battles.ruby_sapphire.cool_trainer_jody,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "norman",
                    name: "Norman",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.gym_leader_norman,
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
                        battles: [battles.ruby_sapphire.expert_timothy, battles.ruby_sapphire.black_belt_koichi],
                    },
                },
                {
                    slug: "hoenn-route-105",
                    name: "Route 105",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_dawn,
                            battles.ruby_sapphire.swimmer_beverly,
                            battles.ruby_sapphire.ruin_maniac_foster,
                            battles.ruby_sapphire.swimmer_austin,
                            battles.ruby_sapphire.swimmer_luis,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-106",
                    name: "Route 106 (Ocean)",
                    type: "location",
                    segment: {
                        battles: [battles.ruby_sapphire.swimmer_douglas, battles.ruby_sapphire.swimmer_nicole],
                    },
                },
                {
                    slug: "hoenn-route-107",
                    name: "Route 107 (Ocean)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_beth,
                            battles.ruby_sapphire.swimmer_darrin,
                            battles.ruby_sapphire.sis_and_bro_lisa_and_ray,
                            battles.ruby_sapphire.swimmer_tony,
                            battles.ruby_sapphire.swimmer_denise,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-108",
                    name: "Route 108",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_tara,
                            battles.ruby_sapphire.swimmer_jerome,
                            battles.ruby_sapphire.swimmer_missy,
                            battles.ruby_sapphire.swimmer_matthew,
                        ],
                    },
                },
                {
                    slug: "abandoned-ship",
                    name: "Abandoned Ship",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.sailor_duncan,
                            battles.ruby_sapphire.tuber_charlie,
                            battles.ruby_sapphire.young_couple_lois_and_hal,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-109",
                    name: "Route 109 (Ocean)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.tuber_gwen,
                            battles.ruby_sapphire.tuber_carmen,
                            battles.ruby_sapphire.swimmer_alice,
                            battles.ruby_sapphire.swimmer_david,
                            battles.ruby_sapphire.young_couple_mel_and_paul,
                            battles.ruby_sapphire.fisherman_carter,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.black_belt_yuji,
                            battles.ruby_sapphire.battle_girl_cora,
                            battles.ruby_sapphire.battle_girl_jill,
                        ],
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
                    name: "Route 118 (East)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.interviewers_gabby_and_ty_2,
                            battles.ruby_sapphire.fisherman_barny,
                            battles.ruby_sapphire.bird_keeper_perry,
                            battles.ruby_sapphire.bird_keeper_chester,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-119",
                    name: "Route 119 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bug_catcher_doug,
                            battles.ruby_sapphire.bug_catcher_kent,
                            battles.ruby_sapphire.bug_maniac_taylor,
                            battles.ruby_sapphire.bug_maniac_donald,
                            battles.ruby_sapphire.bug_catcher_greg,
                            battles.ruby_sapphire.bug_maniac_brent,
                            battles.ruby_sapphire.fisherman_eugene,
                            battles.ruby_sapphire.pokemon_ranger_jackson,
                            battles.ruby_sapphire.pokemon_ranger_catherine,
                        ],
                    },
                },
                {
                    slug: "weather-institute",
                    name: "Weather Institute",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_magma_grunt_6,
                            battles.ruby_sapphire.team_magma_grunt_7,
                            battles.ruby_sapphire.team_magma_grunt_8,
                            battles.ruby_sapphire.team_magma_grunt_9,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "weather-institute",
                    name: "Weather Institute",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_aqua_grunt_6,
                            battles.ruby_sapphire.team_aqua_grunt_7,
                            battles.ruby_sapphire.team_aqua_grunt_8,
                            battles.ruby_sapphire.team_aqua_grunt_9,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "courtney-1",
                    name: "Courtney 1",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: {
                        battle: battles.ruby_sapphire.magma_admin_courtney_1,
                    },
                },
                {
                    slug: "shelly-1",
                    name: "Shelly",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: {
                        battle: battles.ruby_sapphire.aqua_admin_shelly_1,
                    },
                },
                {
                    slug: "may-3",
                    name: "May 3",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_treecko_3,
                    },
                },
                {
                    slug: "may-3",
                    name: "May 3",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_torchic_3,
                    },
                },
                {
                    slug: "may-3",
                    name: "May 3",
                    type: "battle",
                    conditions: {
                        gender: "male",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_may_mudkip_3,
                    },
                },
                {
                    slug: "brendan-3",
                    name: "Brendan 3",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "treecko",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_treecko_3,
                    },
                },
                {
                    slug: "brendan-3",
                    name: "Brendan 3",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "torchic",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_torchic_3,
                    },
                },
                {
                    slug: "brendan-3",
                    name: "Brendan 3",
                    type: "battle",
                    conditions: {
                        gender: "female",
                        starter: "mudkip",
                    },
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_brendan_mudkip_3,
                    },
                },
                {
                    slug: "hoenn-route-119",
                    name: "Route 119 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bird_keeper_phil,
                            battles.ruby_sapphire.ninja_boy_takashi,
                            battles.ruby_sapphire.bird_keeper_hugh,
                            battles.ruby_sapphire.ninja_boy_yasu,
                            battles.ruby_sapphire.ninja_boy_hideo,
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
                            battles.ruby_sapphire.parasol_lady_clarissa,
                            battles.ruby_sapphire.interviewers_gabby_and_ty_3,
                            battles.ruby_sapphire.bird_keeper_robert,
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
                            battles.ruby_sapphire.bird_keeper_jared,
                            battles.ruby_sapphire.picnicker_kylee,
                            battles.ruby_sapphire.camper_terrell,
                            battles.ruby_sapphire.bird_keeper_will,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "winona",
                    name: "Winona",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.gym_leader_winona,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Tate & Liza Split",
            segments: [
                {
                    slug: "hoenn-route-120",
                    name: "Route 120 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bird_keeper_colin,
                            battles.ruby_sapphire.parasol_lady_angelica,
                            battles.ruby_sapphire.ninja_boy_tsunao,
                            battles.ruby_sapphire.cool_trainer_jennifer,
                            battles.ruby_sapphire.pokemon_ranger_jenna,
                            battles.ruby_sapphire.pokemon_ranger_carlos,
                            battles.ruby_sapphire.bug_maniac_brandon,
                            battles.ruby_sapphire.ninja_boy_keigo,
                            battles.ruby_sapphire.ruin_maniac_chip,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-121",
                    name: "Route 121",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.hex_maniac_tammy,
                            battles.ruby_sapphire.beauty_jessica,
                            battles.ruby_sapphire.sr_and_jr_kate_and_joy,
                            battles.ruby_sapphire.gentleman_walter,
                            battles.ruby_sapphire.pokefan_vanessa,
                        ],
                    },
                },
                {
                    slug: "hoenn-safari-zone",
                    name: "Safari Zone",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        gender: "male",
                        starter: "treecko",
                    },
                    segment: { battles: [battles.ruby_sapphire.pokemon_trainer_may_treecko_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        gender: "male",
                        starter: "torchic",
                    },
                    segment: { battles: [battles.ruby_sapphire.pokemon_trainer_may_torchic_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        gender: "male",
                        starter: "mudkip",
                    },
                    segment: { battles: [battles.ruby_sapphire.pokemon_trainer_may_mudkip_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        gender: "female",
                        starter: "treecko",
                    },
                    segment: { battles: [battles.ruby_sapphire.pokemon_trainer_brendan_treecko_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        gender: "female",
                        starter: "torchic",
                    },
                    segment: { battles: [battles.ruby_sapphire.pokemon_trainer_brendan_torchic_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: {
                        gender: "female",
                        starter: "mudkip",
                    },
                    segment: { battles: [battles.ruby_sapphire.pokemon_trainer_brendan_mudkip_4] },
                },
                {
                    slug: "hoenn-route-122",
                    name: "Route 122",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "mt-pyre",
                    name: "Mt. Pyre (Inner)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.pokemaniac_mark,
                            battles.ruby_sapphire.young_couple_dez_and_luke,
                            battles.ruby_sapphire.psychic_kayla,
                            battles.ruby_sapphire.psychic_william,
                            battles.ruby_sapphire.black_belt_atsushi,
                            battles.ruby_sapphire.hex_maniac_tasha,
                            battles.ruby_sapphire.hex_maniac_valerie,
                        ],
                    },
                },
                {
                    slug: "mt-pyre",
                    name: "Mt. Pyre (Outer)",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_magma_grunt_10,
                            battles.ruby_sapphire.team_magma_grunt_11,
                            battles.ruby_sapphire.team_magma_grunt_12,
                        ],
                    },
                },
                {
                    slug: "mt-pyre",
                    name: "Mt. Pyre (Outer)",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_aqua_grunt_10,
                            battles.ruby_sapphire.team_aqua_grunt_11,
                            battles.ruby_sapphire.team_aqua_grunt_12,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-123",
                    name: "Route 123",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.psychic_cameron,
                            battles.ruby_sapphire.hex_maniac_kindra,
                            battles.ruby_sapphire.cool_trainer_wendy,
                            battles.ruby_sapphire.cool_trainer_clyde,
                            battles.ruby_sapphire.psychic_jacki,
                            battles.ruby_sapphire.twins_miu_and_yuki,
                            battles.ruby_sapphire.aroma_lady_violet,
                        ],
                    },
                },
                {
                    slug: "team-magma-hideout",
                    name: "Magma Hideout",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_magma_grunt_13,
                            battles.ruby_sapphire.team_magma_grunt_14,
                            battles.ruby_sapphire.team_magma_grunt_15,
                            battles.ruby_sapphire.team_magma_grunt_16,
                            battles.ruby_sapphire.team_magma_grunt_17,
                            battles.ruby_sapphire.team_magma_grunt_18,
                        ],
                    },
                },
                {
                    slug: "team-aqua-hideout",
                    name: "Aqua Hideout",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_aqua_grunt_13,
                            battles.ruby_sapphire.team_aqua_grunt_14,
                            battles.ruby_sapphire.team_aqua_grunt_15,
                            battles.ruby_sapphire.team_aqua_grunt_16,
                            battles.ruby_sapphire.team_aqua_grunt_17,
                            battles.ruby_sapphire.team_aqua_grunt_18,
                        ],
                    },
                },
                {
                    slug: "tabitha-2",
                    name: "Tabitha 2",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: {
                        battle: battles.ruby_sapphire.magma_admin_tabitha_2,
                    },
                },
                {
                    slug: "matt-2",
                    name: "Matt 2",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: {
                        battle: battles.ruby_sapphire.aqua_admin_matt_2,
                    },
                },
                {
                    slug: "hoenn-route-124",
                    name: "Route 124",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_jenny,
                            battles.ruby_sapphire.sis_and_bro_rita_and_sam,
                            battles.ruby_sapphire.swimmer_roland,
                            battles.ruby_sapphire.swimmer_grace,
                            battles.ruby_sapphire.swimmer_spencer,
                            battles.ruby_sapphire.swimmer_chad,
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
                            battles.ruby_sapphire.swimmer_tanya,
                            battles.ruby_sapphire.sailor_ernest,
                            battles.ruby_sapphire.swimmer_stan,
                            battles.ruby_sapphire.sr_and_jr_kim_and_iris,
                            battles.ruby_sapphire.swimmer_sharon,
                            battles.ruby_sapphire.swimmer_cody,
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
                            battles.ruby_sapphire.psychic_preston,
                            battles.ruby_sapphire.psychic_maura,
                            battles.ruby_sapphire.psychic_samantha,
                            battles.ruby_sapphire.psychic_fritz,
                            battles.ruby_sapphire.psychic_virgil,
                            battles.ruby_sapphire.psychic_hannah,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "tate-and-liza",
                    name: "Tate and Liza",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.gym_leader_tate_and_liza,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Wallace Split",
            segments: [
                {
                    slug: "hoenn-route-110",
                    name: "Route 110",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.pokemon_ranger_sebastian,
                            battles.ruby_sapphire.pokemon_ranger_sophia,
                            battles.ruby_sapphire.bird_keeper_benny,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-126",
                    name: "Route 126",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_brenda,
                            battles.ruby_sapphire.swimmer_barry,
                            battles.ruby_sapphire.swimmer_dean,
                            battles.ruby_sapphire.swimmer_nikki,
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
                            battles.ruby_sapphire.bird_keeper_byron,
                            battles.ruby_sapphire.fisherman_jonah,
                            battles.ruby_sapphire.fisherman_henry,
                            battles.ruby_sapphire.fisherman_roger,
                            battles.ruby_sapphire.triathlete_connor,
                            battles.ruby_sapphire.triathlete_caleb,
                            battles.ruby_sapphire.black_belt_koji,
                        ],
                    },
                },
                {
                    slug: "seafloor-cavern",
                    name: "Seafloor Cavern",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [battles.ruby_sapphire.team_magma_grunt_19, battles.ruby_sapphire.team_magma_grunt_20],
                    },
                },
                {
                    slug: "seafloor-cavern",
                    name: "Seafloor Cavern",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [battles.ruby_sapphire.team_aqua_grunt_19, battles.ruby_sapphire.team_aqua_grunt_20],
                    },
                },
                {
                    slug: "courtney-2",
                    name: "Courtney 2",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: {
                        battle: battles.ruby_sapphire.magma_admin_courtney_2,
                    },
                },
                {
                    slug: "shelly-2",
                    name: "Shelly 2",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: {
                        battle: battles.ruby_sapphire.aqua_admin_shelly_2,
                    },
                },
                {
                    slug: "maxie-2",
                    name: "Maxie 2",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: {
                        battle: battles.ruby_sapphire.magma_leader_maxie_2,
                    },
                },
                {
                    slug: "archie-2",
                    name: "Archie 2",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: {
                        battle: battles.ruby_sapphire.aqua_leader_archie_2,
                    },
                },
                {
                    slug: "cave-of-origin",
                    name: "Cave of Origin",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "sootopolis-gym",
                    name: "Sootopolis Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.lass_crissy,
                            battles.ruby_sapphire.beauty_olivia,
                            battles.ruby_sapphire.beauty_tiffany,
                            battles.ruby_sapphire.pokefan_marissa,
                            battles.ruby_sapphire.beauty_bridget,
                            battles.ruby_sapphire.lady_brianna,
                            battles.ruby_sapphire.beauty_connie,
                            battles.ruby_sapphire.lass_andrea,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "wallace",
                    name: "Wallace",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.gym_leader_wallace,
                        levelCap: true,
                    },
                },
            ],
        },
        {
            name: "Champion Split",
            segments: [
                {
                    slug: "hoenn-route-110",
                    name: "Route 110",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.psychic_joshua,
                            battles.ruby_sapphire.hex_maniac_patricia,
                            battles.ruby_sapphire.psychic_alexis,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-128",
                    name: "Route 128",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.cool_trainer_ruben,
                            battles.ruby_sapphire.cool_trainer_alexa,
                            battles.ruby_sapphire.triathlete_isaiah,
                            battles.ruby_sapphire.fisherman_wayne,
                            battles.ruby_sapphire.triathlete_katelyn,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-129",
                    name: "Route 129",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.triathlete_allison,
                            battles.ruby_sapphire.swimmer_reed,
                            battles.ruby_sapphire.triathlete_chase,
                            battles.ruby_sapphire.swimmer_tisha,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-130",
                    name: "Route 130",
                    type: "location",
                    segment: {
                        battles: [battles.ruby_sapphire.swimmer_katie, battles.ruby_sapphire.swimmer_rodney],
                    },
                },
                {
                    slug: "hoenn-route-131",
                    name: "Route 131",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_kara,
                            battles.ruby_sapphire.swimmer_herman,
                            battles.ruby_sapphire.swimmer_susie,
                            battles.ruby_sapphire.swimmer_richard,
                            battles.ruby_sapphire.sis_and_bro_reli_and_ian,
                        ],
                    },
                },
                {
                    slug: "pacifidlog-town",
                    name: "Pacifidlog Town",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-route-132",
                    name: "Route 132",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_dana,
                            battles.ruby_sapphire.swimmer_gilbert,
                            battles.ruby_sapphire.black_belt_kiyo,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-133",
                    name: "Route 133",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_franklin,
                            battles.ruby_sapphire.swimmer_debra,
                            battles.ruby_sapphire.swimmer_linda,
                            battles.ruby_sapphire.fisherman_ronald,
                            battles.ruby_sapphire.cool_trainer_warren,
                            battles.ruby_sapphire.bird_keeper_beck,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-134",
                    name: "Route 134",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_jack,
                            battles.ruby_sapphire.swimmer_laurel,
                            battles.ruby_sapphire.dragon_tamer_aaron,
                            battles.ruby_sapphire.bird_keeper_alex,
                            battles.ruby_sapphire.black_belt_hitoshi,
                        ],
                    },
                },
                {
                    slug: "meteor-falls",
                    name: "Meteor Falls",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.old_couple_john_and_jay,
                            battles.ruby_sapphire.dragon_tamer_nicolas,
                        ],
                    },
                },
                {
                    slug: "ever-grande-city",
                    name: "Ever Grande City",
                    type: "location",
                    segment: { battles: [] },
                },
                {
                    slug: "hoenn-victory-road",
                    name: "Victory Road",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.cool_trainer_albert,
                            battles.ruby_sapphire.cool_trainer_hope,
                            battles.ruby_sapphire.cool_trainer_edgar,
                            battles.ruby_sapphire.cool_trainer_samuel,
                            battles.ruby_sapphire.cool_trainer_shannon,
                            battles.ruby_sapphire.cool_trainer_michelle,
                            battles.ruby_sapphire.cool_trainer_julie,
                            battles.ruby_sapphire.cool_trainer_owen,
                            battles.ruby_sapphire.cool_trainer_vito,
                            battles.ruby_sapphire.cool_trainer_caroline,
                        ],
                    },
                },
                {
                    slug: "wally-2",
                    name: "Wally 2",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_wally_2,
                    },
                },
                {
                    slug: "sidney",
                    name: "Sidney",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.elite_four_sidney,
                        levelCap: true,
                    },
                },
                {
                    slug: "phoebe",
                    name: "Phoebe",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.elite_four_phoebe,
                        levelCap: true,
                    },
                },
                {
                    slug: "glacia",
                    name: "Glacia",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.elite_four_glacia,
                        levelCap: true,
                    },
                },
                {
                    slug: "drake",
                    name: "Drake",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.elite_four_drake,
                        levelCap: true,
                    },
                },
                {
                    slug: "steven",
                    name: "Steven",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.champion_steven,
                        levelCap: true,
                    },
                },
            ],
        },
    ],
    characters: [trainers.rs_brendan, trainers.rs_may],
    starters: ["treecko", "torchic", "mudkip"],
    startingTown: "littleroot-town",
    invalidConditions: [],
};

export default rs;

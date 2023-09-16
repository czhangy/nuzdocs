import GameData from "@/models/GameData";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";
import trainers from "@/static/trainers";

const ruby_sapphire: GameData = {
    generation: "generation-iii",
    group: "ruby-sapphire",
    pokedex: pokedex.slice(0, 386),
    characters: [trainers.rs_brendan, trainers.rs_may],
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
                        battle: battles.ruby_sapphire.may_treecko_1,
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
                        battle: battles.ruby_sapphire.may_torchic_1,
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
                        battle: battles.ruby_sapphire.may_mudkip_1,
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
                        battle: battles.ruby_sapphire.brendan_treecko_1,
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
                        battle: battles.ruby_sapphire.brendan_torchic_1,
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
                        battle: battles.ruby_sapphire.brendan_mudkip_1,
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
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bug_catcher_lyle,
                            battles.ruby_sapphire.team_magma_m_grunt_1,
                            battles.ruby_sapphire.bug_catcher_james,
                        ],
                    },
                },
                {
                    slug: "petalburg-woods",
                    name: "Petalburg Woods",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bug_catcher_lyle,
                            battles.ruby_sapphire.team_aqua_m_grunt_1,
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
                            battles.ruby_sapphire.lady_cindy,
                            battles.ruby_sapphire.lass_haley,
                            battles.ruby_sapphire.twins_gina_and_mia,
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
                        battle: battles.ruby_sapphire.roxanne,
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
                            battles.ruby_sapphire.school_kid_m_jerry,
                            battles.ruby_sapphire.school_kid_f_karen,
                        ],
                    },
                },
                {
                    slug: "rusturf-tunnel",
                    name: "Rusturf Tunnel (West)",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: { battles: [battles.ruby_sapphire.team_magma_m_grunt_2] },
                },
                {
                    slug: "rusturf-tunnel",
                    name: "Rusturf Tunnel (West)",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: { battles: [battles.ruby_sapphire.team_aqua_m_grunt_2] },
                },
                { slug: "dewford-town", name: "Dewford Town", type: "location", segment: { battles: [] } },
                {
                    slug: "hoenn-route-106",
                    name: "Route 106 (Beach)",
                    type: "location",
                    segment: { battles: [battles.ruby_sapphire.fisherman_ned, battles.ruby_sapphire.fisherman_elliot] },
                },
                { slug: "granite-cave", name: "Granite Cave", type: "location", segment: { battles: [] } },
                { slug: "hoenn-route-107", name: "Route 107 (Beach)", type: "location", segment: { battles: [] } },
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
                    segment: { battle: battles.ruby_sapphire.brawly, levelCap: true },
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
                            battles.ruby_sapphire.sailor_edmond,
                            battles.ruby_sapphire.tuber_m_ricky,
                            battles.ruby_sapphire.tuber_f_lola,
                            battles.ruby_sapphire.tuber_m_simon,
                            battles.ruby_sapphire.beauty_johanna,
                            battles.ruby_sapphire.sailor_dwayne,
                        ],
                    },
                },
                {
                    slug: "slateport-city",
                    name: "Slateport City",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_magma_m_grunt_3,
                            battles.ruby_sapphire.team_magma_m_grunt_4,
                        ],
                    },
                },
                {
                    slug: "slateport-city",
                    name: "Slateport City",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [battles.ruby_sapphire.team_aqua_m_grunt_3, battles.ruby_sapphire.team_aqua_m_grunt_4],
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110 (South)",
                    type: "location",
                    segment: { battles: [battles.ruby_sapphire.pokefan_f_isabel] },
                },
                {
                    slug: "hoenn-route-103",
                    name: "Route 103 (East)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.aroma_lady_daisy,
                            battles.ruby_sapphire.twins_amy_and_liv,
                            battles.ruby_sapphire.pokefan_m_miguel,
                            battles.ruby_sapphire.fisherman_andrew,
                        ],
                    },
                },
                {
                    slug: "trick-house-1",
                    name: "Trick House 1",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.lass_sally,
                            battles.ruby_sapphire.lass_robin,
                            battles.ruby_sapphire.youngster_eddie,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110 (South)",
                    type: "location",
                    segment: { battles: [battles.ruby_sapphire.youngster_timmy] },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: { character: "brendan", starter: "treecko" },
                    segment: { battle: battles.ruby_sapphire.may_treecko_2 },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: { character: "brendan", starter: "torchic" },
                    segment: { battle: battles.ruby_sapphire.may_torchic_2 },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: { character: "brendan", starter: "mudkip" },
                    segment: { battle: battles.ruby_sapphire.may_mudkip_2 },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: { character: "may", starter: "treecko" },
                    segment: { battle: battles.ruby_sapphire.brendan_treecko_2 },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: { character: "may", starter: "torchic" },
                    segment: { battle: battles.ruby_sapphire.brendan_torchic_2 },
                },
                {
                    slug: "rival-2",
                    name: "Rival 2",
                    type: "battle",
                    conditions: { character: "may", starter: "mudkip" },
                    segment: { battle: battles.ruby_sapphire.brendan_mudkip_2 },
                },
                {
                    slug: "hoenn-route-110",
                    name: "Route 110 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.collector_edwin,
                            battles.ruby_sapphire.psychic_m_edward,
                            battles.ruby_sapphire.fisherman_dale,
                        ],
                    },
                },
                { slug: "mauville-city", name: "Mauville City", type: "location", segment: { battles: [] } },
                {
                    slug: "wally-1",
                    name: "Wally 1",
                    type: "battle",
                    segment: { battle: battles.ruby_sapphire.wally_1 },
                },
                {
                    slug: "cycling-road",
                    name: "Cycling Road",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.psychic_f_jaclyn,
                            battles.ruby_sapphire.triathlete_biker_f_abigail,
                            battles.ruby_sapphire.triathlete_biker_m_anthony,
                            battles.ruby_sapphire.triathlete_biker_m_benjamin,
                            battles.ruby_sapphire.triathlete_biker_f_jasmine,
                            battles.ruby_sapphire.triathlete_biker_m_jacob,
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
                            battles.ruby_sapphire.guitarist_kirk,
                            battles.ruby_sapphire.youngster_ben,
                            battles.ruby_sapphire.guitarist_shawn,
                            battles.ruby_sapphire.battle_girl_vivian,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "wattson",
                    name: "Wattson",
                    type: "battle",
                    segment: { battle: battles.emerald.wattson, levelCap: true },
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
                            battles.ruby_sapphire.school_kid_m_ted,
                            battles.ruby_sapphire.school_kid_m_paul,
                            battles.ruby_sapphire.school_kid_f_georgia,
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
                            battles.ruby_sapphire.sr_and_jr_anna_and_meg,
                            battles.ruby_sapphire.triathlete_runner_m_dylan,
                            battles.ruby_sapphire.pokemon_breeder_f_lydia,
                            battles.ruby_sapphire.triathlete_runner_f_maria,
                            battles.ruby_sapphire.bug_maniac_derek,
                            battles.ruby_sapphire.pokemon_breeder_m_isaac,
                        ],
                    },
                },
                { slug: "verdanturf-town", name: "Verdanturf Town", type: "location", segment: { battles: [] } },
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
                            battles.ruby_sapphire.winstrate_victor,
                            battles.ruby_sapphire.winstrate_victoria,
                            battles.ruby_sapphire.winstrate_vivi,
                            battles.ruby_sapphire.winstrate_vicky,
                            battles.ruby_sapphire.interviewers_gabby_and_ty_1,
                            battles.ruby_sapphire.picnicker_irene,
                            battles.ruby_sapphire.camper_travis,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-112",
                    name: "Route 112 (South)",
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
                { slug: "fiery-path", name: "Fiery Path", type: "location", segment: { battles: [] } },
                {
                    slug: "hoenn-route-112",
                    name: "Route 112 (North)",
                    type: "location",
                    segment: {
                        battles: [],
                    },
                },
                {
                    slug: "hoenn-route-111",
                    name: "Route 111 (North)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.cool_trainer_m_wilton,
                            battles.ruby_sapphire.cool_trainer_f_brooke,
                            battles.ruby_sapphire.black_belt_daisuke,
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
                { slug: "fallarbor-town", name: "Fallarbor Town", type: "location", segment: { battles: [] } },
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
                { slug: "meteor-falls", name: "Meteor Falls", type: "location", segment: { battles: [] } },
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
                    segment: { battles: [battles.ruby_sapphire.team_magma_m_grunt_5] },
                },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: { battles: [battles.ruby_sapphire.team_aqua_m_grunt_5] },
                },
                {
                    slug: "tabitha-1",
                    name: "Tabitha 1",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: { battle: battles.ruby_sapphire.tabitha_1 },
                },
                {
                    slug: "matt-1",
                    name: "Matt 1",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: { battle: battles.ruby_sapphire.matt_1 },
                },
                {
                    slug: "maxie-1",
                    name: "Maxie 1",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: { battle: battles.ruby_sapphire.maxie_1 },
                },
                {
                    slug: "archie-1",
                    name: "Archie 1",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: { battle: battles.ruby_sapphire.archie_1 },
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
                { slug: "lavaridge-town", name: "Lavaridge Town", type: "location", segment: { battles: [] } },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.beauty_shirley,
                            battles.ruby_sapphire.beauty_sheila,
                            battles.ruby_sapphire.expert_f_shelby,
                            battles.ruby_sapphire.beauty_melissa,
                        ],
                    },
                },
                {
                    slug: "lavaridge-gym",
                    name: "Lavaridge Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.kindler_cole,
                            battles.ruby_sapphire.cool_trainer_m_zane,
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
                    segment: { battle: battles.ruby_sapphire.flannery, levelCap: true },
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
                    slug: "trick-house-3",
                    name: "Trick House 3",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.camper_justin,
                            battles.ruby_sapphire.picnicker_martha,
                            battles.ruby_sapphire.hiker_alan,
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
                            battles.ruby_sapphire.cool_trainer_m_randall,
                            battles.ruby_sapphire.cool_trainer_f_mary,
                            battles.ruby_sapphire.cool_trainer_m_parker,
                            battles.ruby_sapphire.cool_trainer_f_lori,
                            battles.ruby_sapphire.cool_trainer_m_george,
                            battles.ruby_sapphire.cool_trainer_f_jody,
                            battles.ruby_sapphire.cool_trainer_m_berke,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "norman",
                    name: "Norman",
                    type: "battle",
                    segment: { battle: battles.ruby_sapphire.norman, levelCap: true },
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
                        battles: [battles.ruby_sapphire.expert_m_timothy, battles.ruby_sapphire.black_belt_koichi],
                    },
                },
                {
                    slug: "hoenn-route-105",
                    name: "Route 105",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_f_dawn,
                            battles.ruby_sapphire.swimmer_f_beverly,
                            battles.ruby_sapphire.swimmer_m_austin,
                            battles.ruby_sapphire.ruin_maniac_foster,
                            battles.ruby_sapphire.swimmer_m_luis,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-106",
                    name: "Route 106 (Ocean)",
                    type: "location",
                    segment: {
                        battles: [battles.ruby_sapphire.swimmer_m_douglas, battles.ruby_sapphire.swimmer_f_nicole],
                    },
                },
                {
                    slug: "hoenn-route-107",
                    name: "Route 107 (Ocean)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_f_beth,
                            battles.ruby_sapphire.swimmer_m_darrin,
                            battles.ruby_sapphire.sis_and_bro_lisa_and_ray,
                            battles.ruby_sapphire.swimmer_m_tony,
                            battles.ruby_sapphire.swimmer_f_denise,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-108",
                    name: "Route 108",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_m_jerome,
                            battles.ruby_sapphire.swimmer_f_tara,
                            battles.ruby_sapphire.swimmer_m_matthew,
                            battles.ruby_sapphire.swimmer_f_missy,
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
                            battles.ruby_sapphire.tuber_m_charlie,
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
                            battles.ruby_sapphire.tuber_f_gwen,
                            battles.ruby_sapphire.tuber_f_carmen,
                            battles.ruby_sapphire.swimmer_f_alice,
                            battles.ruby_sapphire.swimmer_m_david,
                            battles.ruby_sapphire.young_couple_mel_and_paul,
                            battles.ruby_sapphire.fisherman_carter,
                        ],
                    },
                },
                {
                    slug: "trick-house-4",
                    name: "Trick House 4",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.black_belt_yuji,
                            battles.ruby_sapphire.battle_girl_cora,
                            battles.ruby_sapphire.battle_girl_jill,
                        ],
                        custom: true,
                    },
                },
                { slug: "new-mauville", name: "New Mauville", type: "location", segment: { battles: [] } },
                {
                    slug: "hoenn-route-118",
                    name: "Route 118",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.aroma_lady_rose,
                            battles.ruby_sapphire.fisherman_wade,
                            battles.ruby_sapphire.guitarist_dalton,
                            battles.ruby_sapphire.interviewers_gabby_and_ty_2,
                            battles.ruby_sapphire.fisherman_barny,
                            battles.ruby_sapphire.bird_keeper_chester,
                            battles.ruby_sapphire.bird_keeper_perry,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-123",
                    name: "Route 123 (West)",
                    type: "location",
                    segment: {
                        battles: [battles.ruby_sapphire.twins_miu_and_yuki, battles.ruby_sapphire.aroma_lady_violet],
                    },
                },
                {
                    slug: "hoenn-route-119",
                    name: "Route 119 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bug_catcher_kent,
                            battles.ruby_sapphire.bug_maniac_donald,
                            battles.ruby_sapphire.bug_catcher_greg,
                            battles.ruby_sapphire.bug_maniac_taylor,
                            battles.ruby_sapphire.bug_catcher_doug,
                            battles.ruby_sapphire.bug_maniac_brent,
                            battles.ruby_sapphire.fisherman_eugene,
                            battles.ruby_sapphire.pokemon_ranger_f_catherine,
                            battles.ruby_sapphire.pokemon_ranger_m_jackson,
                            battles.ruby_sapphire.bird_keeper_phil,
                            battles.ruby_sapphire.ninja_boy_takashi,
                            battles.ruby_sapphire.bird_keeper_hugh,
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
                            battles.ruby_sapphire.team_magma_f_grunt_1,
                            battles.ruby_sapphire.team_magma_m_grunt_6,
                            battles.ruby_sapphire.team_magma_m_grunt_7,
                            battles.ruby_sapphire.team_magma_m_grunt_8,
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
                            battles.ruby_sapphire.team_aqua_f_grunt_1,
                            battles.ruby_sapphire.team_aqua_m_grunt_6,
                            battles.ruby_sapphire.team_aqua_m_grunt_7,
                            battles.ruby_sapphire.team_aqua_m_grunt_8,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "courtney-1",
                    name: "Courtney 1",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: { battle: battles.ruby_sapphire.courtney_1 },
                },
                {
                    slug: "shelly-1",
                    name: "Shelly 1",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: { battle: battles.ruby_sapphire.shelly_1 },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: { character: "brendan", starter: "treecko" },
                    segment: { battle: battles.ruby_sapphire.may_treecko_3 },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: { character: "brendan", starter: "torchic" },
                    segment: { battle: battles.ruby_sapphire.may_torchic_3 },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: { character: "brendan", starter: "mudkip" },
                    segment: { battle: battles.ruby_sapphire.may_mudkip_3 },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: { character: "may", starter: "treecko" },
                    segment: { battle: battles.ruby_sapphire.brendan_treecko_3 },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: { character: "may", starter: "torchic" },
                    segment: { battle: battles.ruby_sapphire.brendan_torchic_3 },
                },
                {
                    slug: "rival-3",
                    name: "Rival 3",
                    type: "battle",
                    conditions: { character: "may", starter: "mudkip" },
                    segment: { battle: battles.ruby_sapphire.brendan_mudkip_3 },
                },
                {
                    slug: "hoenn-route-119",
                    name: "Route 119 (North)",
                    type: "location",
                    segment: {
                        battles: [battles.ruby_sapphire.ninja_boy_yasu, battles.ruby_sapphire.ninja_boy_hideo],
                    },
                },
                { slug: "fortree-city", name: "Fortree City", type: "location", segment: { battles: [] } },
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
                { slug: "scorched-slab", name: "Scorched Slab", type: "location", segment: { battles: [] } },
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
                    segment: { battle: battles.ruby_sapphire.winona, levelCap: true },
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
                    segment: { battles: [], custom: true },
                },
                {
                    slug: "hoenn-route-120",
                    name: "Route 120 (South)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bird_keeper_colin,
                            battles.ruby_sapphire.parasol_lady_angelica,
                            battles.ruby_sapphire.ninja_boy_tsunao,
                            battles.ruby_sapphire.cool_trainer_f_jennifer,
                            battles.ruby_sapphire.pokemon_ranger_f_jenna,
                            battles.ruby_sapphire.pokemon_ranger_m_carlos,
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
                            battles.ruby_sapphire.pokefan_f_vanessa,
                        ],
                    },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: { character: "may", starter: "treecko" },
                    segment: { battles: [battles.ruby_sapphire.brendan_treecko_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: { character: "may", starter: "torchic" },
                    segment: { battles: [battles.ruby_sapphire.brendan_torchic_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: { character: "may", starter: "mudkip" },
                    segment: { battles: [battles.ruby_sapphire.brendan_mudkip_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: { character: "brendan", starter: "treecko" },
                    segment: { battles: [battles.ruby_sapphire.may_treecko_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: { character: "brendan", starter: "torchic" },
                    segment: { battles: [battles.ruby_sapphire.may_torchic_4] },
                },
                {
                    slug: "lilycove-city",
                    name: "Lilycove City",
                    type: "location",
                    conditions: { character: "brendan", starter: "mudkip" },
                    segment: { battles: [battles.ruby_sapphire.may_mudkip_4] },
                },
                { slug: "hoenn-safari-zone", name: "Safari Zone", type: "location", segment: { battles: [] } },
                { slug: "hoenn-route-122", name: "Route 122", type: "location", segment: { battles: [] } },
                {
                    slug: "mt-pyre",
                    name: "Mt. Pyre (Interior)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.pokemaniac_mark,
                            battles.ruby_sapphire.young_couple_dez_and_luke,
                            battles.ruby_sapphire.psychic_f_kayla,
                            battles.ruby_sapphire.psychic_m_william,
                            battles.ruby_sapphire.black_belt_atsushi,
                            battles.ruby_sapphire.hex_maniac_tasha,
                            battles.ruby_sapphire.hex_maniac_valerie,
                        ],
                    },
                },
                {
                    slug: "mt-pyre",
                    name: "Mt. Pyre (Summit)",
                    type: "location",
                    conditions: { game: "ruby" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_magma_m_grunt_9,
                            battles.ruby_sapphire.team_magma_m_grunt_10,
                            battles.ruby_sapphire.team_magma_m_grunt_11,
                        ],
                    },
                },
                {
                    slug: "mt-pyre",
                    name: "Mt. Pyre (Summit)",
                    type: "location",
                    conditions: { game: "sapphire" },
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_aqua_m_grunt_9,
                            battles.ruby_sapphire.team_aqua_m_grunt_10,
                            battles.ruby_sapphire.team_aqua_m_grunt_11,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-123",
                    name: "Route 123 (East)",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.psychic_m_cameron,
                            battles.ruby_sapphire.hex_maniac_kindra,
                            battles.ruby_sapphire.cool_trainer_f_wendy,
                            battles.ruby_sapphire.cool_trainer_m_clyde,
                            battles.ruby_sapphire.psychic_f_jacki,
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
                            battles.ruby_sapphire.team_magma_m_grunt_12,
                            battles.ruby_sapphire.team_magma_f_grunt_2,
                            battles.ruby_sapphire.team_magma_m_grunt_13,
                            battles.ruby_sapphire.team_magma_m_grunt_14,
                            battles.ruby_sapphire.team_magma_m_grunt_15,
                            battles.ruby_sapphire.team_magma_f_grunt_3,
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
                            battles.ruby_sapphire.team_aqua_m_grunt_12,
                            battles.ruby_sapphire.team_aqua_f_grunt_2,
                            battles.ruby_sapphire.team_aqua_m_grunt_13,
                            battles.ruby_sapphire.team_aqua_m_grunt_14,
                            battles.ruby_sapphire.team_aqua_m_grunt_15,
                            battles.ruby_sapphire.team_aqua_f_grunt_3,
                        ],
                    },
                },
                {
                    slug: "tabitha-2",
                    name: "Tabitha 2",
                    type: "battle",
                    conditions: { game: "ruby" },
                    segment: { battle: battles.ruby_sapphire.tabitha_2 },
                },
                {
                    slug: "matt-2",
                    name: "Matt 2",
                    type: "battle",
                    conditions: { game: "sapphire" },
                    segment: { battle: battles.ruby_sapphire.matt_2 },
                },
                {
                    slug: "hoenn-route-124",
                    name: "Route 124",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_f_grace,
                            battles.ruby_sapphire.sis_and_bro_rita_and_sam,
                            battles.ruby_sapphire.swimmer_m_spencer,
                            battles.ruby_sapphire.swimmer_f_jenny,
                            battles.ruby_sapphire.swimmer_m_chad,
                            battles.ruby_sapphire.swimmer_m_roland,
                        ],
                    },
                },
                { slug: "mossdeep-city", name: "Mossdeep City", type: "location", segment: { battles: [] } },
                {
                    slug: "hoenn-route-125",
                    name: "Route 125",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.swimmer_f_sharon,
                            battles.ruby_sapphire.sailor_ernest,
                            battles.ruby_sapphire.swimmer_f_tanya,
                            battles.ruby_sapphire.sr_and_jr_kim_and_iris,
                            battles.ruby_sapphire.swimmer_m_stan,
                            battles.ruby_sapphire.swimmer_m_cody,
                        ],
                    },
                },
                { slug: "shoal-cave", name: "Shoal Cave", type: "location", segment: { battles: [] } },
                {
                    slug: "mossdeep-gym",
                    name: "Mossdeep Gym",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.psychic_m_preston,
                            battles.ruby_sapphire.psychic_f_maura,
                            battles.ruby_sapphire.psychic_f_samantha,
                            battles.ruby_sapphire.psychic_m_fritz,
                            battles.ruby_sapphire.psychic_m_virgil,
                            battles.ruby_sapphire.psychic_f_hannah,
                        ],
                        custom: true,
                    },
                },
                {
                    slug: "tate-and-liza",
                    name: "Tate and Liza",
                    type: "battle",
                    segment: { battle: battles.ruby_sapphire.tate_and_liza, levelCap: true },
                },
            ],
        },
    ],
};

export default ruby_sapphire;

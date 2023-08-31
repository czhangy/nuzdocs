import GameData from "@/models/GameData";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";

const ruby: GameData = {
    generation: "generation-iii",
    versionGroup: "ruby-sapphire",
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
                    segment: {
                        battle: {
                            treecko: battles.ruby_sapphire.pokemon_trainer_may_treecko_1,
                            torchic: battles.ruby_sapphire.pokemon_trainer_may_torchic_1,
                            mudkip: battles.ruby_sapphire.pokemon_trainer_may_mudkip_1,
                        },
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
                    version: "ruby",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bug_catcher_lyle,
                            battles.ruby_sapphire.team_magma_grunt_1,
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
                    slug: "petalburg-woods",
                    name: "Petalburg Woods",
                    type: "location",
                    version: "sapphire",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.bug_catcher_lyle,
                            battles.ruby_sapphire.team_aqua_grunt_1,
                            battles.ruby_sapphire.bug_catcher_james,
                        ],
                    },
                },
                {
                    slug: "rustboro-city",
                    name: "Rustboro City",
                    type: "location",
                    segment: {
                        battles: [battles.ruby_sapphire.youngster_josh, battles.ruby_sapphire.youngster_tommy],
                    },
                },
                // FIX
                {
                    slug: "hoenn-route-115",
                    name: "Route 115",
                    type: "location",
                    version: "ruby",
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
                    name: "Route 115",
                    type: "location",
                    version: "sapphire",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.black_belt_nob,
                            battles.ruby_sapphire.collector_hector_sapphire,
                            battles.ruby_sapphire.battle_girl_cyndy,
                        ],
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
                    name: "Rusturf Tunnel",
                    type: "location",
                    version: "ruby",
                    segment: { battles: [battles.ruby_sapphire.team_magma_grunt_2, battles.ruby_sapphire.hiker_mike] },
                },
                {
                    slug: "rusturf-tunnel",
                    name: "Rusturf Tunnel",
                    type: "location",
                    version: "sapphire",
                    segment: { battles: [battles.ruby_sapphire.team_aqua_grunt_2] },
                },
                {
                    slug: "dewford-town",
                    name: "Dewford Town",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.battle_girl_laura,
                            battles.ruby_sapphire.black_belt_hideki,
                            battles.ruby_sapphire.battle_girl_tessa,
                        ],
                    },
                },
                {
                    slug: "hoenn-route-106",
                    name: "Route 106",
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
                // FIX
                {
                    slug: "hoenn-route-107",
                    name: "Route 107",
                    type: "location",
                    segment: { battles: [] },
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
                    name: "Route 109",
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
                    version: "ruby",
                    segment: {
                        battles: [battles.ruby_sapphire.team_magma_grunt_3, battles.ruby_sapphire.team_magma_grunt_4],
                    },
                },
                {
                    slug: "slateport-city",
                    name: "Slateport City",
                    type: "location",
                    version: "sapphire",
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
                            battles.ruby_sapphire.psychic_jaclyn,
                            battles.ruby_sapphire.triathlete_jacob,
                            battles.ruby_sapphire.triathlete_jasmine,
                            battles.ruby_sapphire.triathlete_benjamin,
                            battles.ruby_sapphire.triathlete_abigail,
                            battles.ruby_sapphire.triathlete_anthony,
                            battles.ruby_sapphire.school_kid_ted,
                            battles.ruby_sapphire.school_kid_paul,
                            battles.ruby_sapphire.school_kid_georgia,
                            battles.ruby_sapphire.camper_justin,
                            battles.ruby_sapphire.picnicker_martha,
                            battles.ruby_sapphire.hiker_alan,
                        ],
                    },
                },
                {
                    slug: "may-2",
                    name: "May 2",
                    type: "battle",
                    segment: {
                        battle: {
                            treecko: battles.ruby_sapphire.pokemon_trainer_may_treecko_2,
                            torchic: battles.ruby_sapphire.pokemon_trainer_may_torchic_2,
                            mudkip: battles.ruby_sapphire.pokemon_trainer_may_mudkip_2,
                        },
                    },
                },
                {
                    slug: "mauville-city",
                    name: "Mauville City",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.guitarist_kirk,
                            battles.ruby_sapphire.youngster_ben,
                            battles.ruby_sapphire.battle_girl_vivian,
                            battles.ruby_sapphire.guitarist_shawn,
                        ],
                    },
                },
                {
                    slug: "wally-1",
                    name: "Wally 1",
                    type: "battle",
                    segment: {
                        battle: battles.ruby_sapphire.pokemon_trainer_wally_1,
                    },
                },
                // FIX
                {
                    slug: "hoenn-route-118",
                    name: "Route 118",
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
                    slug: "hoenn-route-111",
                    name: "Route 111",
                    type: "location",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.pokefan_victor,
                            battles.ruby_sapphire.pokefan_victoria,
                            battles.ruby_sapphire.lass_vivi,
                            battles.ruby_sapphire.expert_vicky,
                            battles.ruby_sapphire.camper_travis,
                            battles.ruby_sapphire.picnicker_irene,
                            battles.ruby_sapphire.cool_trainer_wilton,
                            battles.ruby_sapphire.black_belt_daisuke,
                            battles.ruby_sapphire.cool_trainer_brooke,
                            battles.ruby_sapphire.camper_cliff,
                            battles.ruby_sapphire.picnicker_heidi,
                            battles.ruby_sapphire.camper_drew,
                            battles.ruby_sapphire.ruin_maniac_dusty,
                            battles.ruby_sapphire.picnicker_becky,
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
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    version: "ruby",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_magma_grunt_5,
                            battles.ruby_sapphire.expert_shelby,
                            battles.ruby_sapphire.beauty_melissa,
                            battles.ruby_sapphire.beauty_shirley,
                            battles.ruby_sapphire.beauty_sheila,
                        ],
                    },
                },
                {
                    slug: "mt-chimney",
                    name: "Mt. Chimney",
                    type: "location",
                    version: "sapphire",
                    segment: {
                        battles: [
                            battles.ruby_sapphire.team_aqua_grunt_5,
                            battles.ruby_sapphire.expert_shelby,
                            battles.ruby_sapphire.beauty_melissa,
                            battles.ruby_sapphire.beauty_shirley,
                            battles.ruby_sapphire.beauty_sheila,
                        ],
                    },
                },
                {
                    slug: "tabitha-1",
                    name: "Tabitha 1",
                    type: "battle",
                    version: "ruby",
                    segment: {
                        battle: battles.ruby_sapphire.magma_admin_tabitha_1,
                    },
                },
                {
                    slug: "matt-1",
                    name: "Matt 1",
                    type: "battle",
                    version: "sapphire",
                    segment: {
                        battle: battles.ruby_sapphire.aqua_admin_matt_1,
                    },
                },
                {
                    slug: "maxie-1",
                    name: "Maxie 1",
                    type: "battle",
                    version: "ruby",
                    segment: {
                        battle: battles.ruby_sapphire.magma_leader_maxie_1,
                    },
                },
                {
                    slug: "archie-1",
                    name: "Archie 1",
                    type: "battle",
                    version: "sapphire",
                    segment: {
                        battle: battles.ruby_sapphire.aqua_leader_archie_1,
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
                    segment: {
                        battles: [
                            battles.ruby_sapphire.kindler_cole,
                            battles.ruby_sapphire.cool_trainer_zane,
                            battles.ruby_sapphire.kindler_axle,
                            battles.ruby_sapphire.battle_girl_sadie,
                            battles.ruby_sapphire.kindler_andy,
                        ],
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
        // {
        //     name: "Winona Split",
        //     segments: [
        //         {
        //             slug: "hoenn-route-105",
        //             name: "Route 105",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-108",
        //             name: "Route 108",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "abandoned-ship",
        //             name: "Abandoned Ship",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-134",
        //             name: "Route 134",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "new-mauville",
        //             name: "New Mauville",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-123",
        //             name: "Route 123",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-119",
        //             name: "Route 119",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "shelly",
        //             name: "Shelly",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.shelly,
        //             },
        //         },
        //         {
        //             slug: "may-3",
        //             name: "May 3",
        //             type: "battle",
        //             segment: {
        //                 battle: {
        //                     treecko: battles.emerald.may_3_treecko,
        //                     torchic: battles.emerald.may_3_torchic,
        //                     mudkip: battles.emerald.may_3_mudkip,
        //                 },
        //             },
        //         },
        //         {
        //             slug: "fortree-city",
        //             name: "Fortree City",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-120",
        //             name: "Route 120",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "scorched-slab",
        //             name: "Scorched Slab",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-121",
        //             name: "Route 121",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-122",
        //             name: "Route 122",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "mt-pyre",
        //             name: "Mt. Pyre",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "lilycove-city",
        //             name: "Lilycove City",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-safari-zone",
        //             name: "Safari Zone",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "team-aqua-hideout",
        //             name: "Aqua Hideout",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "winona",
        //             name: "Winona",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.winona,
        //                 levelCap: true,
        //             },
        //         },
        //     ],
        // },
        // {
        //     name: "Tate & Liza Split",
        //     segments: [
        //         {
        //             slug: "magma-hideout",
        //             name: "Magma Hideout",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "tabitha-2",
        //             name: "Tabitha 2",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.tabitha_2,
        //             },
        //         },
        //         {
        //             slug: "maxie-2",
        //             name: "Maxie 2",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.maxie_2,
        //             },
        //         },
        //         {
        //             slug: "matt",
        //             name: "Matt",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.matt,
        //             },
        //         },
        //         {
        //             slug: "hoenn-route-124",
        //             name: "Route 124",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-126",
        //             name: "Route 126",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "mossdeep-city",
        //             name: "Mossdeep City",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-125",
        //             name: "Route 125",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "shoal-cave",
        //             name: "Shoal Cave",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-127",
        //             name: "Route 127",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-128",
        //             name: "Route 128",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "ever-grande-city",
        //             name: "Ever Grande City",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-129",
        //             name: "Route 129",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-130",
        //             name: "Route 130",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-131",
        //             name: "Route 131",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "sky-pillar",
        //             name: "Sky Pillar",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "pacifidlog-town",
        //             name: "Pacifidlog Town",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-132",
        //             name: "Route 132",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "hoenn-route-133",
        //             name: "Route 133",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "tate-and-liza",
        //             name: "Tate and Liza",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald["tate-and-liza"],
        //                 levelCap: true,
        //             },
        //         },
        //     ],
        // },
        // {
        //     name: "Wallace Split",
        //     segments: [
        //         {
        //             slug: "tabitha-and-maxie",
        //             name: "Tabitha & Maxie",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.tabitha_maxie,
        //             },
        //         },
        //         {
        //             slug: "underwater",
        //             name: "Underwater",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "sootopolis-city",
        //             name: "Sootopolis City",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "seafloor-cavern",
        //             name: "Seafloor Cavern",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "archie",
        //             name: "Archie",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.archie,
        //             },
        //         },
        //         {
        //             slug: "cave-of-origin",
        //             name: "Cave of Origin",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "juan",
        //             name: "Juan",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.juan,
        //                 levelCap: true,
        //             },
        //         },
        //     ],
        // },
        // {
        //     name: "Champion Split",
        //     segments: [
        //         {
        //             slug: "hoenn-victory-road",
        //             name: "Victory Road",
        //             type: "location",
        //             segment: {},
        //         },
        //         {
        //             slug: "wally-2",
        //             name: "Wally 2",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.wally_2,
        //             },
        //         },
        //         {
        //             slug: "sidney",
        //             name: "Sidney",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.sidney,
        //             },
        //         },
        //         {
        //             slug: "phoebe",
        //             name: "Phoebe",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.phoebe,
        //             },
        //         },
        //         {
        //             slug: "glacia",
        //             name: "Glacia",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.glacia,
        //             },
        //         },
        //         {
        //             slug: "drake",
        //             name: "Drake",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.drake,
        //             },
        //         },
        //         {
        //             slug: "wallace",
        //             name: "Wallace",
        //             type: "battle",
        //             segment: {
        //                 battle: battles.emerald.wallace,
        //                 levelCap: true,
        //             },
        //         },
        //     ],
        // },
    ],
    starterSlugs: ["treecko", "torchic", "mudkip"],
    startingTownSlug: "littleroot-town",
    invalidConditions: [],
};

export default ruby;

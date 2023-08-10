import Battle from "@/models/Battle";
import trainers from "@/static/trainers";

const battles: { [versionGroup: string]: { [battleSlug: string]: Battle } } = {
    emerald: {
        may_1_treecko: {
            trainer: trainers.emerald_may,
            team: [
                {
                    slug: "torchic",
                    species: "torchic",
                    level: 5,
                    abilitySlug: "blaze",
                    moveSlugs: ["scratch", "growl"],
                },
            ],
            items: [],
        },
        may_1_torchic: {
            trainer: trainers.emerald_may,
            team: [
                {
                    slug: "mudkip",
                    species: "mudkip",
                    level: 5,
                    abilitySlug: "torrent",
                    moveSlugs: ["tackle", "growl"],
                },
            ],
            items: [],
        },
        may_1_mudkip: {
            trainer: trainers.emerald_may,
            team: [
                {
                    slug: "treecko",
                    species: "treecko",
                    level: 5,
                    abilitySlug: "overgrow",
                    moveSlugs: ["pound", "leer"],
                },
            ],
            items: [],
        },
        roxanne: {
            trainer: trainers.emerald_roxanne,
            team: [
                {
                    slug: "geodude",
                    species: "geodude",
                    level: 12,
                    abilitySlug: "rock-head",
                    moveSlugs: ["tackle", "defense-curl", "rock-throw", "rock-tomb"],
                },
                {
                    slug: "geodude",
                    species: "geodude",
                    level: 12,
                    abilitySlug: "rock-head",
                    moveSlugs: ["tackle", "defense-curl", "rock-throw", "rock-tomb"],
                },
                {
                    slug: "nosepass",
                    species: "nosepass",
                    level: 15,
                    abilitySlug: "sturdy",
                    moveSlugs: ["block", "harden", "tackle", "rock-tomb"],
                },
            ],
            items: [],
        },
        brawly: {
            trainer: trainers.emerald_brawly,
            team: [
                {
                    slug: "machop",
                    species: "machop",
                    level: 16,
                    abilitySlug: "guts",
                    moveSlugs: ["karate-chop", "low-kick", "seismic-toss", "bulk-up"],
                },
                {
                    slug: "meditite",
                    species: "meditite",
                    level: 16,
                    abilitySlug: "pure-power",
                    moveSlugs: ["focus-punch", "light-screen", "reflect", "bulk-up"],
                },
                {
                    slug: "makuhita",
                    species: "makuhita",
                    level: 19,
                    abilitySlug: "guts",
                    moveSlugs: ["arm-thrust", "vital-throw", "reversal", "bulk-up"],
                    heldItemSlug: "sitrus-berry",
                },
            ],
            items: [],
        },
    },
    "heartgold-soulsilver": {
        silver_1_chikorita: {
            trainer: trainers.silver,
            team: [
                {
                    slug: "cyndaquil",
                    species: "cyndaquil",
                    level: 5,
                    abilitySlug: "blaze",
                    moveSlugs: ["tackle", "leer"],
                },
            ],
            items: [],
        },
        silver_1_cyndaquil: {
            trainer: trainers.silver,
            team: [
                {
                    slug: "totodile",
                    species: "totodile",
                    level: 5,
                    abilitySlug: "torrent",
                    moveSlugs: ["scratch", "leer"],
                },
            ],
            items: [],
        },
        silver_1_totodile: {
            trainer: trainers.silver,
            team: [
                {
                    slug: "chikorita",
                    species: "chikorita",
                    level: 5,
                    abilitySlug: "overgrow",
                    moveSlugs: ["tackle", "growl"],
                },
            ],
            items: [],
        },
        elder_li: {
            trainer: trainers.elder_li,
            team: [
                {
                    slug: "bellsprout",
                    species: "bellsprout",
                    level: 7,
                    abilitySlug: "chlorophyll",
                    moveSlugs: ["vine-whip", "growth"],
                },
                {
                    slug: "bellsprout",
                    species: "bellsprout",
                    level: 7,
                    abilitySlug: "chlorophyll",
                    moveSlugs: ["vine-whip", "growth"],
                },
                {
                    slug: "hoothoot",
                    species: "hoothoot",
                    level: 10,
                    abilitySlug: "insomnia",
                    moveSlugs: ["growl", "hypnosis", "peck"],
                },
            ],
            items: [],
        },
        falkner: {
            trainer: trainers.falkner,
            team: [
                {
                    slug: "pidgey",
                    species: "pidgey",
                    level: 9,
                    abilitySlug: "keen-eye",
                    moveSlugs: ["tackle", "sand-attack"],
                },
                {
                    slug: "pidgeotto",
                    species: "pidgeotto",
                    level: 13,
                    abilitySlug: "keen-eye",
                    moveSlugs: ["tackle", "roost", "gust"],
                },
            ],
            items: [],
        },
    },
};

export default battles;

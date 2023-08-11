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
        may_2_treecko: {
            trainer: trainers.emerald_may,
            team: [
                {
                    slug: "wingull",
                    species: "wingull",
                    level: 18,
                    abilitySlug: "keen-eye",
                    moveSlugs: ["growl", "water-gun", "supersonic", "wing-attack"],
                },
                {
                    slug: "lombre",
                    species: "lombre",
                    level: 18,
                    abilitySlug: "swift-swim",
                    moveSlugs: ["astonish", "growl", "absorb", "nature-power"],
                },
                {
                    slug: "combusken",
                    species: "combusken",
                    level: 20,
                    abilitySlug: "blaze",
                    moveSlugs: ["focus-energy", "ember", "double-kick", "peck"],
                },
            ],
            items: [],
        },
        may_2_torchic: {
            trainer: trainers.emerald_may,
            team: [
                {
                    slug: "lombre",
                    species: "lombre",
                    level: 18,
                    abilitySlug: "swift-swim",
                    moveSlugs: ["astonish", "growl", "absorb", "nature-power"],
                },
                {
                    slug: "slugma",
                    species: "slugma",
                    level: 18,
                    abilitySlug: "flame-body",
                    moveSlugs: ["yawn", "smog", "ember", "rock-tomb"],
                },
                {
                    slug: "marshtomp",
                    species: "marshtomp",
                    level: 20,
                    abilitySlug: "torrent",
                    moveSlugs: ["water-gun", "bide", "mud-shot", "foresight"],
                },
            ],
            items: [],
        },
        may_2_mudkip: {
            trainer: trainers.emerald_may,
            team: [
                {
                    slug: "slugma",
                    species: "slugma",
                    level: 18,
                    abilitySlug: "flame-body",
                    moveSlugs: ["yawn", "smog", "ember", "rock-tomb"],
                },
                {
                    slug: "wingull",
                    species: "wingull",
                    level: 18,
                    abilitySlug: "keen-eye",
                    moveSlugs: ["growl", "water-gun", "supersonic", "wing-attack"],
                },
                {
                    slug: "grovyle",
                    species: "grovyle",
                    level: 20,
                    abilitySlug: "overgrow",
                    moveSlugs: ["absorb", "quick-attack", "fury-cutter", "pursuit"],
                },
            ],
            items: [],
        },
        wally_1: {
            trainer: trainers.rse_wally,
            team: [
                {
                    slug: "ralts",
                    species: "ralts",
                    level: 16,
                    abilitySlug: "synchronize",
                    moveSlugs: ["growl", "confusion", "double-team", "teleport"],
                },
            ],
            items: [],
        },
        roxanne: {
            trainer: trainers.rse_roxanne,
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
                    heldItemSlug: "oran-berry",
                },
            ],
            items: ["potion", "potion"],
        },
        brawly: {
            trainer: trainers.rse_brawly,
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
            items: ["super-potion", "super-potion"],
        },
        wattson: {
            trainer: trainers.rse_wattson,
            team: [
                {
                    slug: "voltorb",
                    species: "voltorb",
                    level: 20,
                    abilitySlug: "soundproof",
                    moveSlugs: ["rollout", "spark", "self-destruct", "shock-wave"],
                },
                {
                    slug: "electrike",
                    species: "electrike",
                    level: 20,
                    abilitySlug: "soundproof",
                    moveSlugs: ["shock-wave", "leer", "quick-attack", "howl"],
                },
                {
                    slug: "magneton",
                    species: "magneton",
                    level: 22,
                    abilitySlug: "magnet-pull",
                    moveSlugs: ["supersonic", "thunder-wave", "shock-wave", "sonic-boom"],
                },
                {
                    slug: "manectric",
                    species: "manectric",
                    level: 24,
                    abilitySlug: "static",
                    moveSlugs: ["quick-attack", "shock-wave", "thunder-wave", "howl"],
                    heldItemSlug: "sitrus-berry",
                },
            ],
            items: ["super-potion", "super-potion"],
        },
        flannery: {
            trainer: trainers.rse_flannery,
            team: [
                {
                    slug: "numel",
                    species: "numel",
                    level: 20,
                    abilitySlug: "soundproof",
                    moveSlugs: ["rollout", "spark", "self-destruct", "shock-wave"],
                },
                {
                    slug: "slugma",
                    species: "slugma",
                    level: 20,
                    abilitySlug: "soundproof",
                    moveSlugs: ["shock-wave", "leer", "quick-attack", "howl"],
                },
                {
                    slug: "camerupt",
                    species: "camerupt",
                    level: 22,
                    abilitySlug: "magnet-pull",
                    moveSlugs: ["supersonic", "thunder-wave", "shock-wave", "sonic-boom"],
                },
                {
                    slug: "torkoal",
                    species: "torkoal",
                    level: 29,
                    abilitySlug: "white-smoke",
                    moveSlugs: ["overheat", "sunny-day", "body-slam", "attract"],
                    heldItemSlug: "white-herb",
                },
            ],
            items: ["super-potion", "super-potion"],
        },
        tabitha_1: {
            trainer: trainers.rse_tabitha,
            team: [
                {
                    slug: "numel",
                    species: "numel",
                    level: 18,
                    abilitySlug: "oblivious",
                    moveSlugs: ["growl", "tackle", "ember"],
                },
                {
                    slug: "poochyena",
                    species: "poochyena",
                    level: 20,
                    abilitySlug: "run-away",
                    moveSlugs: ["howl", "sand-attack", "bite", "odor-sleuth"],
                },
                {
                    slug: "numel",
                    species: "numel",
                    level: 22,
                    abilitySlug: "oblivious",
                    moveSlugs: ["growl", "tackle", "ember", "magnitude"],
                },
                {
                    slug: "zubat",
                    species: "zubat",
                    level: 22,
                    abilitySlug: "inner-focus",
                    moveSlugs: ["supersonic", "astonish", "bite", "wing-attack"],
                },
            ],
            items: [],
        },
    },
    "heartgold-soulsilver": {
        silver_1_chikorita: {
            trainer: trainers.hgss_silver,
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
            trainer: trainers.hgss_silver,
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
            trainer: trainers.hgss_silver,
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
            trainer: trainers.hgss_elder_li,
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
            trainer: trainers.hgss_falkner,
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

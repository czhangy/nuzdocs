import Battle from "@/models/Battle";
import trainers from "@/static/trainers";

const battles: { [versionGroup: string]: { [battleSlug: string]: Battle } } = {
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
        },
    },
};

export default battles;

import Battle from "@/models/Battle";
import trainers from "@/static/trainers";

const battles: { [versionGroup: string]: { [battleSlug: string]: Battle } } = {
    "heartgold-soulsilver": {
        silver_1_chikorita: {
            trainer: trainers.silver,
            team: [
                {
                    slug: "cyndaquil",
                    form: "cyndaquil",
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
                    form: "totodile",
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
                    form: "chikorita",
                    level: 5,
                    abilitySlug: "overgrow",
                    moveSlugs: ["tackle", "growl"],
                },
            ],
        },
    },
};

export default battles;

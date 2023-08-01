import Battle from "@/models/Battle";
import trainers from "@/static/trainers";

const battles: { [versionGroup: string]: { [battleSlug: string]: Battle } } = {
    "heartgold-soulsilver": {
        rival_1_chikorita: {
            trainer: trainers.hgss_rival,
            team: [
                {
                    slug: "cyndaquil",
                    level: 5,
                    abilitySlug: "blaze",
                    moveSlugs: ["tackle", "leer"],
                },
            ],
        },
        rival_1_cyndaquil: {
            trainer: trainers.hgss_rival,
            team: [
                {
                    slug: "totodile",
                    level: 5,
                    abilitySlug: "torrent",
                    moveSlugs: ["scratch", "leer"],
                },
            ],
        },
        rival_1_totodile: {
            trainer: trainers.hgss_rival,
            team: [
                {
                    slug: "chikorita",
                    level: 5,
                    abilitySlug: "overgrow",
                    moveSlugs: ["tackle", "growl"],
                },
            ],
        },
    },
};

export default battles;

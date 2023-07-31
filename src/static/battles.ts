import Battle from "@/models/Battle";
import trainers from "@/static/trainers";

const battles: { [versionGroup: string]: { [battleSlug: string]: Battle } } = {
    "heartgold-soulsilver": {
        rival_1: {
            trainer: trainers.hgss_rival,
            team: [
                {
                    slug: "totodile",
                    level: 5,
                },
            ],
        },
    },
};

export default battles;

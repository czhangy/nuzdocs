import Nature from "@/models/Nature";

export const natures: { [nature: string]: Nature } = {
    Adamant: {
        increase: "ATK",
        decrease: "SPA",
    },
    Bashful: {},
    Bold: {
        increase: "DEF",
        decrease: "ATK",
    },
    Brave: {
        increase: "ATK",
        decrease: "SPE",
    },
    Calm: {
        increase: "SPD",
        decrease: "ATK",
    },
    Careful: {
        increase: "SPD",
        decrease: "SPA",
    },
    Docile: {},
    Gentle: {
        increase: "SPD",
        decrease: "DEF",
    },
    Hardy: {},
    Hasty: {
        increase: "SPE",
        decrease: "DEF",
    },
    Impish: {
        increase: "DEF",
        decrease: "SPA",
    },
    Jolly: {
        increase: "SPE",
        decrease: "SPA",
    },
    Lax: {
        increase: "DEF",
        decrease: "SPD",
    },
    Lonely: {
        increase: "ATK",
        decrease: "DEF",
    },
    Mild: {
        increase: "SPA",
        decrease: "DEF",
    },
    Modest: {
        increase: "SPA",
        decrease: "ATK",
    },
    Naive: {
        increase: "SPE",
        decrease: "SPD",
    },
    Naughty: {
        increase: "ATK",
        decrease: "SPD",
    },
    Quiet: {
        increase: "SPA",
        decrease: "SPE",
    },
    Quirky: {},
    Rash: {
        increase: "SPA",
        decrease: "SPD",
    },
    Relaxed: {
        increase: "DEF",
        decrease: "SPE",
    },
    Sassy: {
        increase: "SPD",
        decrease: "SPE",
    },
    Serious: {},
    Timid: {
        increase: "SPE",
        decrease: "ATK",
    },
};

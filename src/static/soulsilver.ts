import Game from "@/models/Game";

const SoulSilver: Game = {
    slug: "soulsilver",
    gameGroup: "hgss",
    locations: [
        {
            slug: "new-bark-town",
        },
    ],
    starterSlugs: ["chikorita", "cyndaquil", "totodile"],
    startingTown: "new-bark-town",
};

export default SoulSilver;

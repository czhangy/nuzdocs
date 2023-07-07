import Game from "@/models/Game";

const SoulSilver: Game = {
    slug: "soulsilver",
    gameGroup: "hgss",
    locations: [
        {
            slug: "new-bark-town",
            name: "New Bark Town",
        },
        {
            slug: "johto-route-29",
            name: "Route 29",
        },
    ],
    starterSlugs: ["chikorita", "cyndaquil", "totodile"],
    startingTown: "new-bark-town",
};

export default SoulSilver;

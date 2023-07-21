import Game from "@/models/Game";

const SoulSilver: Game = {
    slug: "soulsilver",
    gameGroup: "hgss",
    segments: [
        {
            slug: "new-bark-town",
            name: "New Bark Town",
        },
        {
            slug: "johto-route-29",
            name: "Route 29",
        },
        {
            slug: "johto-route-46",
            name: "Route 46",
        },
    ],
    starterSlugs: ["chikorita", "cyndaquil", "totodile"],
    startingTownSlug: "new-bark-town",
    iconURL: "/assets/images/soulsilver.webp",
};

export default SoulSilver;

import GameGroup from "@/models/GameGroup";
import pokedex from "@/static/pokedex";

const hgss: GameGroup = {
    versionGroup: "heartgold-soulsilver",
    pokedex: pokedex.slice(0, 493),
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
    ignoredConditions: ["radio-off"],
    invalidConditions: ["Hoenn Radio", "Sinnoh Radio"],
};

export default hgss;

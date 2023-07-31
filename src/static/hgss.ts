import GameGroup from "@/models/GameGroup";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";

const hgss: GameGroup = {
    versionGroup: "heartgold-soulsilver",
    pokedex: pokedex.slice(0, 493),
    segments: {
        "new-bark-town": {
            type: "location",
            segment: {
                name: "New Bark Town",
            },
        },
        "johto-route-29": {
            type: "location",
            segment: {
                name: "Route 29",
            },
        },
        "johto-route-46": {
            type: "location",
            segment: {
                name: "Route 46",
            },
        },
        "cherrygrove-city": {
            type: "location",
            segment: {
                name: "Cherrygrove City",
            },
        },
        "johto-route-30": {
            type: "location",
            segment: {
                name: "Route 30",
            },
        },
        "rival-1": {
            type: "battle",
            segment: {
                name: "Rival 1",
                battle: battles["heartgold-soulsilver"].rival_1,
            },
        },
    },
    starterSlugs: ["chikorita", "cyndaquil", "totodile"],
    startingTownSlug: "new-bark-town",
    ignoredConditions: ["radio-off"],
    invalidConditions: ["radio-hoenn", "radio-sinnoh"],
};

export default hgss;

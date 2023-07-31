import GameGroup from "@/models/GameGroup";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";

const hgss: GameGroup = {
    versionGroup: "heartgold-soulsilver",
    pokedex: pokedex.slice(0, 493),
    segments: {
        "new-bark-town": {
            name: "New Bark Town",
            type: "location",
            segment: {},
        },
        "johto-route-29": {
            name: "Route 29",
            type: "location",
            segment: {},
        },
        "johto-route-46": {
            name: "Route 46",
            type: "location",
            segment: {},
        },
        "cherrygrove-city": {
            name: "Cherrygrove City",
            type: "location",
            segment: {},
        },
        "johto-route-30": {
            name: "Route 30",
            type: "location",
            segment: {},
        },
        "rival-1": {
            name: "Rival 1",
            type: "battle",
            segment: {
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

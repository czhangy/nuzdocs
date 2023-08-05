import GameGroup from "@/models/GameGroup";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";

const hgss: GameGroup = {
    versionGroup: "heartgold-soulsilver",
    pokedex: pokedex,
    segments: {
        "Falkner Split": {
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
            "silver-1": {
                name: "Silver 1",
                type: "battle",
                segment: {
                    battle: {
                        chikorita: battles["heartgold-soulsilver"].silver_1_chikorita,
                        cyndaquil: battles["heartgold-soulsilver"].silver_1_cyndaquil,
                        totodile: battles["heartgold-soulsilver"].silver_1_totodile,
                    },
                },
            },
        },
        "Bugsy Split": {
            "johto-route-31": {
                name: "Route 31",
                type: "location",
                segment: {},
            },
        },
    },
    starterSlugs: ["chikorita", "cyndaquil", "totodile"],
    startingTownSlug: "new-bark-town",
    ignoredConditions: ["radio-off"],
    invalidConditions: ["radio-hoenn", "radio-sinnoh"],
};

export default hgss;

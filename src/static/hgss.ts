import GameGroup from "@/models/GameGroup";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";

const hgss: GameGroup = {
    versionGroup: "heartgold-soulsilver",
    pokedex: pokedex,
    splits: {
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
            "johto-route-31": {
                name: "Route 31",
                type: "location",
                segment: {},
            },
            "dark-cave": {
                name: "Dark Cave",
                type: "location",
                segment: {},
            },
            "violet-city": {
                name: "Violet City",
                type: "location",
                segment: {},
            },
            "johto-route-32": {
                name: "Route 32",
                type: "location",
                segment: {},
            },
            "ruins-of-alph": {
                name: "Ruins of Alph",
                type: "location",
                segment: {},
            },
            "sprout-tower": {
                name: "Sprout Tower",
                type: "location",
                segment: {},
            },
            "elder-li": {
                name: "Elder Li",
                type: "battle",
                segment: {
                    battle: battles["heartgold-soulsilver"].elder_li,
                },
            },
            "gym-leader-falkner": {
                name: "Gym Leader Falkner",
                type: "battle",
                segment: {
                    battle: battles["heartgold-soulsilver"].falkner,
                    levelCap: 13,
                },
            },
        },
        "Bugsy Split": {
            "union-cave": {
                name: "Union Cave",
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

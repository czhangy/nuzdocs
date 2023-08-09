import GameGroup from "@/models/GameGroup";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";

const hgss: GameGroup = {
    generation: "generation-iv",
    versionGroup: "heartgold-soulsilver",
    pokedex: pokedex,
    splits: [
        {
            name: "Falkner Split",
            segments: [
                {
                    slug: "new-bark-town",
                    name: "New Bark Town",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "johto-route-29",
                    name: "Route 29",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "johto-route-46",
                    name: "Route 46",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "cherrygrove-city",
                    name: "Cherrygrove City",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "johto-route-30",
                    name: "Route 30",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "silver-1",
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
                {
                    slug: "johto-route-31",
                    name: "Route 31",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "dark-cave",
                    name: "Dark Cave",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "violet-city",
                    name: "Violet City",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "johto-route-32",
                    name: "Route 32",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "ruins-of-alph",
                    name: "Ruins of Alph",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "sprout-tower",
                    name: "Sprout Tower",
                    type: "location",
                    segment: {},
                },
                {
                    slug: "elder-li",
                    name: "Elder Li",
                    type: "battle",
                    segment: {
                        battle: battles["heartgold-soulsilver"].elder_li,
                    },
                },
                {
                    slug: "gym-leader-falkner",
                    name: "Gym Leader Falkner",
                    type: "battle",
                    segment: {
                        battle: battles["heartgold-soulsilver"].falkner,
                        levelCap: 13,
                    },
                },
            ],
        },
        {
            name: "Bugsy Split",
            segments: [
                {
                    slug: "union-cave",
                    name: "Union Cave",
                    type: "location",
                    segment: {},
                },
            ],
        },
    ],
    starterSlugs: ["chikorita", "cyndaquil", "totodile"],
    startingTownSlug: "new-bark-town",
    invalidConditions: ["radio-hoenn", "radio-sinnoh", "swarm-yes"],
};

export default hgss;

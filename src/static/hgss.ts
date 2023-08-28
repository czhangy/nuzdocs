import GameData from "@/models/GameData";
import battles from "@/static/battles";
import pokedex from "@/static/pokedex";

const hgss: GameData = {
    generation: "generation-iv",
    versionGroup: "heartgold-soulsilver",
    pokedex: pokedex,
    splits: [],
    starterSlugs: ["chikorita", "cyndaquil", "totodile"],
    startingTownSlug: "new-bark-town",
    invalidConditions: ["radio-hoenn", "radio-sinnoh", "swarm-yes"],
};

export default hgss;

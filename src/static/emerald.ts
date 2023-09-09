import GameData from "@/models/GameData";
import pokedex from "@/static/pokedex";
import trainers from "./trainers";

const emerald: GameData = {
    generation: "generation-iii",
    group: "ruby-sapphire",
    pokedex: pokedex.slice(0, 386),
    characters: [trainers.emerald_brendan, trainers.emerald_may],
    starters: ["treecko", "torchic", "mudkip"],
    startingTown: "littleroot-town",
    invalidConditions: [],
    splits: [],
};

export default emerald;

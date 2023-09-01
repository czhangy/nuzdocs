import PokemonName from "@/models/PokemonName";
import Split from "@/models/Split";
import Trainer from "@/models/Trainer";

export default interface GameData {
    generation: string;
    group: string;
    pokedex: PokemonName[];
    splits: Split[];
    characters: Trainer[];
    starters: string[];
    startingTown: string;
    invalidConditions: string[];
}

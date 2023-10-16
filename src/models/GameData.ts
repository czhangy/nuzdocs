import PokemonName from "@/models/PokemonName";
import Split from "@/models/Split";
import OutdatedTrainer from "@/models/OutdatedTrainer";

export default interface GameData {
    generation: string;
    group: string;
    pokedex: PokemonName[];
    characters: OutdatedTrainer[];
    starters: string[];
    startingTown: string;
    invalidConditions: string[];
    splits: Split[];
}

import PokemonName from "@/models/PokemonName";
import Split from "@/models/Split";
import Trainer from "@/models/Trainer";

export default interface GameData {
    generation: string;
    versionGroup: string;
    pokedex: PokemonName[];
    splits: Split[];
    characters: Trainer[];
    starterSlugs: string[];
    startingTownSlug: string;
    invalidConditions: string[];
}

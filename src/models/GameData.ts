import PokemonName from "@/models/PokemonName";
import Split from "@/models/Split";

export default interface GameData {
    generation: string;
    versionGroup: string;
    pokedex: PokemonName[];
    splits: Split[];
    starterSlugs: string[];
    startingTownSlug: string;
    invalidConditions: string[];
}

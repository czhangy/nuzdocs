import PokemonName from "@/models/PokemonName";
import Stat from "@/models/Stat";

export default interface PokemonData {
    pokemon: PokemonName;
    types: string[];
    sprite: string;
    stats: Stat[];
    evolutions: string[][];
    forms: string[];
}

import PokemonName from "@/models/PokemonName";

export default interface PokemonData {
    pokemon: PokemonName;
    types: string[];
    sprite: string;
    evolutions: string[][];
    forms: string[];
}

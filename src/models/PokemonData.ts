import LocalName from "@/models/LocalName";

export default interface PokemonData {
    pokemon: LocalName;
    form: string;
    types: string[];
    sprite: string;
    evolutions: string[][];
    forms: string[];
}

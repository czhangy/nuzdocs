import LocalName from "@/models/LocalName";

export default interface PokemonData {
    pokemon: LocalName;
    types: string[];
    sprite: string;
}

import Pokemon from "@/models/Pokemon";

export default interface CaughtPokemon {
    pokemon: Pokemon;
    locationSlug: string;
    originalSlug: string;
}

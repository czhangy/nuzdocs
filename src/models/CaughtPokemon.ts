import Pokemon from "@/models/Pokemon";

export default interface CaughtPokemon {
    pokemon: Pokemon;
    nickname: string;
    locationSlug: string;
    pastSlugs: string[];
}

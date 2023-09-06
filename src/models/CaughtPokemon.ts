import Pokemon from "@/models/Pokemon";

export default interface CaughtPokemon {
    id: string;
    pokemon: Pokemon;
    nickname?: string;
    locationSlug: string;
    pastSlugs: string[];
    abilityNum: number;
}

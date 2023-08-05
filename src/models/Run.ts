import CaughtPokemon from "@/models/CaughtPokemon";

export default interface Run {
    gameSlug: string;
    prevSegmentSlug: string;
    starterSlug: string;
    box: CaughtPokemon[];
    rips: CaughtPokemon[];
    caughtPokemonSlugs: string[];
    clearedBattles: string[];
}

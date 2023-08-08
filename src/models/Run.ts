import CaughtPokemon from "@/models/CaughtPokemon";

export default interface Run {
    id: string;
    name: string;
    gameSlug: string;
    prevSegmentSlug: string;
    starterSlug: string;
    box: CaughtPokemon[];
    rips: CaughtPokemon[];
    caughtPokemonSlugs: string[];
    clearedBattles: string[];
}

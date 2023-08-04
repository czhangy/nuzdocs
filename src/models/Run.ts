import CaughtPokemon from "@/models/CaughtPokemon";

export default interface Run {
    gameSlug: string;
    prevLocationSlug: string;
    starterSlug: string;
    box: CaughtPokemon[];
    rips: CaughtPokemon[];
    caughtPokemonSlugs: string[];
    numDead: number;
    numBattles: number;
    battlesCleared: string[];
}

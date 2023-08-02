import CaughtPokemon from "@/models/CaughtPokemon";

export default interface Run {
    gameSlug: string;
    prevLocationSlug: string;
    starterSlug: string;
    box: CaughtPokemon[];
    caughtPokemonSlugs: string[];
    numDead: number;
    numBattles: number;
    battlesCleared: string[];
}

import CaughtPokemon from "@/models/CaughtPokemon";

export default interface Run {
    gameSlug: string;
    prevLocationSlug: string;
    starterSlug: string;
    encounterList: CaughtPokemon[];
    caughtPokemonSlugsList: string[];
    numDead: number;
    numCheckpoints: number;
    numCheckpointsCleared: number;
}

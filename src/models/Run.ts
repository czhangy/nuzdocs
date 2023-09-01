import CaughtPokemon from "@/models/CaughtPokemon";

export default interface Run {
    id: string;
    name: string;
    gameSlug: string;
    character: string;
    prevIdx: number;
    box: CaughtPokemon[];
    rips: CaughtPokemon[];
    caughtPokemonSlugs: string[];
    clearedBattles: string[];
}

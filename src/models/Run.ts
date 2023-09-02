import CaughtPokemon from "@/models/CaughtPokemon";
import Status from "@/models/Status";

export default interface Run {
    id: string;
    name: string;
    gameSlug: string;
    character: string;
    prevIdx: number;
    encounters: { [location: string]: Status };
    box: CaughtPokemon[];
    rips: CaughtPokemon[];
    caughtPokemonSlugs: string[];
    clearedBattles: string[];
}

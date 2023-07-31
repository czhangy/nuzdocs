import CaughtPokemon from "@/models/CaughtPokemon";

export default interface Run {
    gameSlug: string;
    prevLocationSlug: string;
    starterSlug: string;
    encounterList: CaughtPokemon[];
    numDead: number;
    numBattles: number;
    battlesCleared: string[];
}

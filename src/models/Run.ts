import LocalPokemon from "@/models/LocalPokemon";

export default interface Run {
    gameName: string;
    prevLocationName: string;
    starterName: string;
    encounters: LocalPokemon[];
    caughtPokemonNames: string[];
}

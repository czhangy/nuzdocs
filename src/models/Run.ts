import LocalPokemon from "@/models/LocalPokemon";

export default interface Run {
    gameSlug: string;
    prevLocationSlug: string;
    starterSlug: string;
    encounterList: LocalPokemon[];
    caughtPokemonSlugsList: string[];
}

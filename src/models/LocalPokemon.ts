export default interface LocalPokemon {
    pokemonSlug: string;
    status: "caught" | "missed";
    locationSlug: string;
}

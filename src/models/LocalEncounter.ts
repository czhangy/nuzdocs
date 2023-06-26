export default interface LocalEncounter {
    pokemonName: string;
    status: "none" | "missed" | "caught";
    locationName: string;
}

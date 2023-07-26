export const initRun = () => {
    return {
        gameSlug: "soulsilver",
        prevLocationSlug: "new-bark-town",
        starterSlug: "",
        encounterList: [],
        caughtPokemonSlugsList: [],
        numDead: 0,
        numCheckpoints: 10,
        numCheckpointsCleared: 0,
    };
};

export const initLocalName = (slug: string, name: string) => {
    return {
        slug: slug,
        name: name,
    };
};

export const initLocalPokemon = (pokemonSlug: string, locationSlug: string) => {
    return {
        pokemonSlug: pokemonSlug,
        locationSlug: locationSlug,
    };
};

export const initEncounterData = (
    pokemonSlug: string,
    method: string,
    chance: number,
    minLevel: number,
    maxLevel: number
) => {
    return {
        pokemonSlug: pokemonSlug,
        method: method,
        chance: chance,
        minLevel: minLevel,
        maxLevel: maxLevel,
    };
};

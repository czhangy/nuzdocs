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

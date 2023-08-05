import CaughtPokemon from "@/models/CaughtPokemon";
import Run from "@/models/Run";
import games from "@/static/games";

// Constructor
export const initRun = (gameSlug: string): Run => {
    let numBattles = 0;
    for (let key of Object.keys(games[gameSlug].gameGroup.segments)) {
        if (games[gameSlug].gameGroup.segments[key].type === "battle") {
            numBattles++;
        }
    }
    return {
        gameSlug: gameSlug,
        prevLocationSlug: games[gameSlug].gameGroup.startingTownSlug,
        starterSlug: "",
        box: [],
        rips: [],
        caughtPokemonSlugs: [],
        clearedBattles: [],
    };
};

// Getters
export const getRun = (runName: string): Run => {
    return JSON.parse(localStorage.getItem(runName)!);
};

export const getGameSlug = (runName: string): string => {
    return getRun(runName).gameSlug;
};

export const getPrevLocationSlug = (runName: string): string => {
    return getRun(runName).prevLocationSlug;
};

export const getStarterSlug = (runName: string): string => {
    return getRun(runName).starterSlug;
};

export const getBox = (runName: string): CaughtPokemon[] => {
    return getRun(runName).box;
};

export const getRIPs = (runName: string): CaughtPokemon[] => {
    return getRun(runName).rips;
};

export const getCaughtPokemonSlugs = (runName: string): string[] => {
    return getRun(runName).caughtPokemonSlugs;
};

export const getClearedBattles = (runName: string): string[] => {
    return getRun(runName).clearedBattles;
};

// Setters
export const setRun = (runName: string, run: Run): void => {
    localStorage.setItem(runName, JSON.stringify(run));
};

export const setPrevLocationSlug = (runName: string, locationSlug: string): void => {
    let run: Run = getRun(runName);
    run.prevLocationSlug = locationSlug;
    setRun(runName, run);
};

export const setStarterSlug = (runName: string, starterSlug: string): void => {
    let run: Run = getRun(runName);
    run.starterSlug = starterSlug;
    setRun(runName, run);
};

// Mutators
export const updateBox = (runName: string, pokemon: CaughtPokemon, idx: number): void => {
    let run: Run = getRun(runName);
    run.box[idx] = pokemon;
    setRun(runName, run);
};

export const addToBox = (runName: string, pokemon: CaughtPokemon): void => {
    let run: Run = getRun(runName);
    run.box.push(pokemon);
    setRun(runName, run);
};

export const removeFromBox = (runName: string, locationSlug: string): void => {
    let run: Run = getRun(runName);
    run.box = run.box.filter((encounter: CaughtPokemon) => encounter.locationSlug !== locationSlug);
    setRun(runName, run);
};

export const updateRIPs = (runName: string, pokemon: CaughtPokemon, idx: number): void => {
    let run: Run = getRun(runName);
    run.rips[idx] = pokemon;
    setRun(runName, run);
};

export const addToRIPs = (runName: string, pokemon: CaughtPokemon): void => {
    let run: Run = getRun(runName);
    run.rips.push(pokemon);
    setRun(runName, run);
};

export const addToCaughtPokemonSlugs = (runName: string, pokemonSlug: string): void => {
    let run: Run = getRun(runName);
    run.caughtPokemonSlugs.push(pokemonSlug);
    setRun(runName, run);
};

export const removeFromCaughtPokemonSlugs = (runName: string, pokemonSlug: string): void => {
    let run: Run = getRun(runName);
    run.caughtPokemonSlugs.splice(run.caughtPokemonSlugs.indexOf(pokemonSlug), 1);
    setRun(runName, run);
};

export const addToClearedBattles = (runName: string, battleSlug: string): void => {
    let run: Run = getRun(runName);
    run.clearedBattles.push(battleSlug);
    setRun(runName, run);
};

export const removeFromClearedBattles = (runName: string, battleSlug: string): void => {
    let run: Run = getRun(runName);
    run.clearedBattles = run.clearedBattles.filter((clearedBattle: string) => clearedBattle !== battleSlug);
    setRun(runName, run);
};

// Predicates
export const isRun = (runName: string): boolean => {
    const run: string | null = localStorage.getItem(runName);
    return run !== null;
};

// Queries
export const getLocationEncounter = (runName: string, locationSlug: string): CaughtPokemon | null => {
    const encounter: CaughtPokemon | undefined = getRun(runName).box.find(
        (pokemon: CaughtPokemon) => pokemon.locationSlug === locationSlug
    );
    return encounter ? encounter : null;
};

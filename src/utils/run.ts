import CaughtPokemon from "@/models/CaughtPokemon";
import Run from "@/models/Run";
import games from "@/static/games";
import { initCaughtPokemon, initPokemon } from "./initializers";

// Constructors
export const initRun = (gameSlug: string): Run => {
    return {
        gameSlug: gameSlug,
        prevSegmentSlug: games[gameSlug].gameGroup.startingTownSlug,
        starterSlug: "",
        box: [],
        rips: [],
        caughtPokemonSlugs: [],
        clearedBattles: [],
    };
};

export const createRun = (runName: string, gameSlug: string): boolean => {
    let storedRuns: string | null = localStorage.getItem("runs");
    if (storedRuns) {
        let runs: string[] = JSON.parse(storedRuns);
        if (runs.includes(runName)) {
            return false;
        } else {
            runs.push(runName);
            localStorage.setItem("runs", JSON.stringify(runs));
        }
    } else {
        localStorage.setItem("runs", JSON.stringify([runName]));
    }
    const newRun: Run = initRun(gameSlug);
    localStorage.setItem(runName, JSON.stringify(newRun));
    return true;
};

export const loadRun = (runName: string, run: string): void => {
    let storedRuns: string | null = localStorage.getItem("runs");
    if (storedRuns) {
        let runs: string[] = JSON.parse(storedRuns);
        runs.push(runName);
        localStorage.setItem("runs", JSON.stringify(runs));
    } else {
        localStorage.setItem("runs", JSON.stringify([runName]));
    }
    localStorage.setItem(runName, run);
};

// Destructor
export const deleteRun = (runName: string): void => {
    let runNames: string[] = JSON.parse(localStorage.getItem("runs") as string);
    runNames = runNames.filter((name: string) => name !== runName);
    localStorage.setItem("runs", JSON.stringify(runNames));
    localStorage.removeItem(runName);
};

// Getters
export const getRunNamesList = (): string[] => {
    const storedRunNames: string | null = localStorage.getItem("runs");
    if (storedRunNames) {
        let runNamesList: string[] = JSON.parse(storedRunNames);
        runNamesList.reverse();
        return runNamesList;
    } else {
        return [];
    }
};

export const getRun = (runName: string): Run => {
    return JSON.parse(localStorage.getItem(runName)!);
};

export const getBox = (runName: string): CaughtPokemon[] => {
    return getRun(runName).box;
};

export const getRIPs = (runName: string): CaughtPokemon[] => {
    return getRun(runName).rips;
};

// Setters
export const setRun = (runName: string, run: Run): void => {
    localStorage.setItem(runName, JSON.stringify(run));
};

export const setPrevSegmentSlug = (runName: string, locationSlug: string): void => {
    let run: Run = getRun(runName);
    run.prevSegmentSlug = locationSlug;
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

export const addFailedEncounter = (runName: string, locationSlug: string): void => {
    let run: Run = getRun(runName);
    run.box.push(initCaughtPokemon(initPokemon("failed", "failed"), locationSlug));
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

export const removeFromRIPs = (runName: string, locationSlug: string): void => {
    let run: Run = getRun(runName);
    run.rips = run.rips.filter((encounter: CaughtPokemon) => encounter.locationSlug !== locationSlug);
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

export const isCleared = (runName: string, battleSlug: string): boolean => {
    return getRun(runName).clearedBattles.includes(battleSlug);
};

// Queries
export const getLocationEncounter = (runName: string, locationSlug: string): CaughtPokemon | null => {
    const encounter: CaughtPokemon | undefined = getRun(runName).box.find(
        (pokemon: CaughtPokemon) => pokemon.locationSlug === locationSlug
    );
    return encounter ? encounter : null;
};

export const getNumClearedBattles = (runName: string): number => {
    return getRun(runName).clearedBattles.length;
};

export const getNumRIPs = (runName: string): number => {
    return getRIPs(runName).length;
};

export const getPokemonSlugsFromBox = (box: CaughtPokemon[]): string[] => {
    return box
        .filter((pokemon: CaughtPokemon) => pokemon.pastSlugs[0] !== "failed")
        .map((pokemon: CaughtPokemon) => pokemon.pokemon.slug);
};

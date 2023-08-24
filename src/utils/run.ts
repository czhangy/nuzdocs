import CaughtPokemon from "@/models/CaughtPokemon";
import Run from "@/models/Run";
import { getGameData } from "@/utils/game";
import { initCaughtPokemon, initPokemon } from "@/utils/initializers";
import { generateID } from "@/utils/utils";

// Constructors
export const initRun = (id: string, name: string, gameSlug: string): Run => {
    return {
        id: id,
        name: name,
        gameSlug: gameSlug,
        prevSegmentSlug: getGameData(gameSlug).startingTownSlug,
        box: [],
        rips: [],
        caughtPokemonSlugs: [],
        clearedBattles: [],
    };
};

export const createRun = (name: string, gameSlug: string): string => {
    const id: string = generateID(getRunIDs());
    const storedRuns: string | null = localStorage.getItem("runs");
    if (storedRuns) {
        let runs: string[] = JSON.parse(storedRuns);
        runs.push(id);
        localStorage.setItem("runs", JSON.stringify(runs));
    } else {
        localStorage.setItem("runs", JSON.stringify([id]));
    }
    const newRun: Run = initRun(id, name, gameSlug);
    localStorage.setItem(id, JSON.stringify(newRun));
    return id;
};

export const loadRun = (runStr: string): boolean => {
    const id: string = JSON.parse(runStr).id;
    const runIDs = getRunIDs();
    if (runIDs.includes(id)) {
        return false;
    } else {
        runIDs.push(id);
        localStorage.setItem("runs", JSON.stringify(runIDs));
        localStorage.setItem(id, runStr);
        return true;
    }
};

// Destructor
export const deleteRun = (runID: string): void => {
    let runIDs: string[] = JSON.parse(localStorage.getItem("runs") as string);
    runIDs = runIDs.filter((name: string) => name !== runID);
    localStorage.setItem("runs", JSON.stringify(runIDs));
    localStorage.removeItem(runID);
};

// Getters
export const getRunIDs = (): string[] => {
    const storedRunIDs: string | null = localStorage.getItem("runs");
    if (storedRunIDs) {
        let runIDs: string[] = JSON.parse(storedRunIDs);
        runIDs.reverse();
        return runIDs;
    } else {
        return [];
    }
};

export const getRun = (runID: string): Run => {
    return JSON.parse(localStorage.getItem(runID)!);
};

export const getBox = (runID: string): CaughtPokemon[] => {
    return getRun(runID).box;
};

export const getRIPs = (runID: string): CaughtPokemon[] => {
    return getRun(runID).rips;
};

// Setters
export const setRun = (runID: string, run: Run): void => {
    localStorage.setItem(runID, JSON.stringify(run));
};

export const setPrevSegmentSlug = (runID: string, locationSlug: string): void => {
    let run: Run = getRun(runID);
    run.prevSegmentSlug = locationSlug;
    setRun(runID, run);
};

// Mutators
export const updateBox = (runID: string, pokemon: CaughtPokemon): void => {
    let run: Run = getRun(runID);
    const idx: number = run.box.findIndex((boxPokemon: CaughtPokemon) => boxPokemon.id === pokemon.id);
    run.box[idx] = pokemon;
    setRun(runID, run);
};

export const addFailedEncounter = (runID: string, locationSlug: string): void => {
    let run: Run = getRun(runID);
    run.box.push(initCaughtPokemon(initPokemon("failed", "failed"), locationSlug, runID));
    setRun(runID, run);
};

export const addToBox = (runID: string, pokemon: CaughtPokemon): void => {
    let run: Run = getRun(runID);
    run.box.push(pokemon);
    setRun(runID, run);
};

export const removeFromBox = (runID: string, pokemonID: string): void => {
    let run: Run = getRun(runID);
    run.box = run.box.filter((encounter: CaughtPokemon) => encounter.id !== pokemonID);
    setRun(runID, run);
};

export const updateRIPs = (runID: string, pokemon: CaughtPokemon): void => {
    let run: Run = getRun(runID);
    const idx: number = run.rips.findIndex((ripPokemon: CaughtPokemon) => ripPokemon.id === pokemon.id);
    run.rips[idx] = pokemon;
    setRun(runID, run);
};

export const addToRIPs = (runID: string, pokemon: CaughtPokemon): void => {
    let run: Run = getRun(runID);
    run.rips.push(pokemon);
    setRun(runID, run);
};

export const removeFromRIPs = (runID: string, pokemonID: string): void => {
    let run: Run = getRun(runID);
    run.rips = run.rips.filter((encounter: CaughtPokemon) => encounter.id !== pokemonID);
    setRun(runID, run);
};

export const addToCaughtPokemonSlugs = (runID: string, pokemonSlug: string): void => {
    let run: Run = getRun(runID);
    run.caughtPokemonSlugs.push(pokemonSlug);
    setRun(runID, run);
};

export const removeFromCaughtPokemonSlugs = (runID: string, pokemonID: string): void => {
    let run: Run = getRun(runID);
    const allPokemon: CaughtPokemon[] = getBox(runID).concat(getRIPs(runID));
    const pokemon: CaughtPokemon | undefined = allPokemon.find((pokemon: CaughtPokemon) => pokemon.id === pokemonID);
    if (pokemon === undefined) {
        return;
    } else {
        run.caughtPokemonSlugs = run.caughtPokemonSlugs.filter((slug: string) => !pokemon.pastSlugs.includes(slug));
        setRun(runID, run);
    }
};

export const addToClearedBattles = (runID: string, battleSlug: string): void => {
    let run: Run = getRun(runID);
    run.clearedBattles.push(battleSlug);
    setRun(runID, run);
};

export const removeFromClearedBattles = (runID: string, battleSlug: string): void => {
    let run: Run = getRun(runID);
    run.clearedBattles = run.clearedBattles.filter((clearedBattle: string) => clearedBattle !== battleSlug);
    setRun(runID, run);
};

// Predicates
export const isRun = (runID: string): boolean => {
    const run: string | null = localStorage.getItem(runID);
    return run !== null;
};

export const isCleared = (runID: string, battleSlug: string): boolean => {
    return getRun(runID).clearedBattles.includes(battleSlug);
};

export const isAlive = (runID: string, pokemonID: string): boolean => {
    return getBox(runID).find((pokemon: CaughtPokemon) => pokemon.id === pokemonID) !== undefined;
};

export const isPokemon = (runID: string, pokemonID: string): boolean => {
    return (
        getBox(runID).find((pokemon: CaughtPokemon) => pokemon.id === pokemonID) !== undefined ||
        getRIPs(runID).find((pokemon: CaughtPokemon) => pokemon.id === pokemonID) !== undefined
    );
};

// Queries
export const getLocationEncounter = (runID: string, locationSlug: string): CaughtPokemon | null => {
    let encounter: CaughtPokemon | undefined = getBox(runID).find(
        (pokemon: CaughtPokemon) => pokemon.locationSlug === locationSlug
    );
    if (!encounter) {
        encounter = getRIPs(runID).find((pokemon: CaughtPokemon) => pokemon.locationSlug === locationSlug);
    }
    return encounter ? encounter : null;
};

export const getNumClearedBattles = (runID: string): number => {
    return getRun(runID).clearedBattles.length;
};

export const getNumRIPs = (runID: string): number => {
    return getRIPs(runID).length;
};

export const getPokemonSlugsFromBox = (box: CaughtPokemon[]): string[] => {
    return box
        .filter((pokemon: CaughtPokemon) => pokemon.pastSlugs[0] !== "failed")
        .map((pokemon: CaughtPokemon) => pokemon.pokemon.slug);
};

export const getStarterSlug = (runID: string): string => {
    const allPokemon: CaughtPokemon[] = getBox(runID).concat(getRIPs(runID));
    const starterSlug: string | undefined = allPokemon.find(
        (pokemon: CaughtPokemon) => pokemon.locationSlug === "starter"
    )?.pastSlugs[0];
    return starterSlug ? starterSlug : "";
};

export const getStarterID = (runID: string): string => {
    const allPokemon: CaughtPokemon[] = getBox(runID).concat(getRIPs(runID));
    const starterID: string | undefined = allPokemon.find(
        (pokemon: CaughtPokemon) => pokemon.locationSlug === "starter"
    )?.id;
    return starterID ? starterID : "";
};

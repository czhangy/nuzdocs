import CaughtPokemon from "@/models/CaughtPokemon";
import LocationSegment from "@/models/LocationSegment";
import Run from "@/models/Run";
import Status from "@/models/Status";
import { getGameData } from "@/utils/game";
import { generateID } from "@/utils/utils";

// Constructors
export const initEncounters = (run: Run): { [location: string]: Status } => {
    const encounters: { [location: string]: Status } = {};
    for (const split of getGameData(run.gameSlug).splits) {
        for (const segment of split.segments) {
            if (
                segment.type === "location" &&
                (segment.segment as LocationSegment).custom !== true &&
                (segment.conditions === undefined ||
                    segment.conditions.game === undefined ||
                    segment.conditions.game === run.gameSlug)
            ) {
                encounters[segment.slug] = { status: "None" };
            }
        }
    }
    return encounters;
};

export const initRun = (id: string, name: string, game: string): Run => {
    const run: Run = {
        id: id,
        name: name,
        gameSlug: game,
        character: getGameData(game).characters.length > 0 ? getGameData(game).characters[0].name! : "",
        prevIdx: 0,
        encounters: {},
        box: [],
        rips: [],
        caughtPokemonSlugs: [],
        clearedBattles: [],
    };
    run.encounters = initEncounters(run);
    return run;
};

export const createRun = (name: string, game: string): string => {
    const id: string = generateID(getRunIDs());
    const storedRuns: string | null = localStorage.getItem("runs");
    if (storedRuns) {
        const runs: string[] = JSON.parse(storedRuns);
        runs.push(id);
        localStorage.setItem("runs", JSON.stringify(runs));
    } else {
        localStorage.setItem("runs", JSON.stringify([id]));
    }
    const run: Run = initRun(id, name, game);
    localStorage.setItem(id, JSON.stringify(run));
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
export const deleteRun = (id: string): void => {
    const ids: string[] = JSON.parse(localStorage.getItem("runs") as string).filter((runID: string) => runID !== id);
    localStorage.setItem("runs", JSON.stringify(ids));
    localStorage.removeItem(id);
};

// Getters
export const getRunIDs = (): string[] => {
    const storedIDs: string | null = localStorage.getItem("runs");
    if (storedIDs === null) {
        return [];
    } else {
        const ids: string[] = JSON.parse(storedIDs);
        ids.reverse();
        return ids;
    }
};

export const getRun = (id: string): Run => {
    return JSON.parse(localStorage.getItem(id)!);
};

export const getStatus = (id: string, location: string): string => {
    return getRun(id).encounters[location].status;
};

export const getBox = (id: string): CaughtPokemon[] => {
    return getRun(id).box;
};

export const getRIPs = (id: string): CaughtPokemon[] => {
    return getRun(id).rips;
};

// Setters
export const setRun = (id: string, run: Run): void => {
    localStorage.setItem(id, JSON.stringify(run));
};

export const setCharacter = (id: string, character: string): void => {
    const run: Run = getRun(id);
    run.character = character;
    setRun(id, run);
};

export const setPrevIdx = (id: string, idx: number): void => {
    const run: Run = getRun(id);
    run.prevIdx = idx;
    setRun(id, run);
};

// Mutators
export const setEncounterStatus = (
    id: string,
    location: string,
    status: "None" | "Caught" | "Delayed" | "Skipped" | "Failed"
): void => {
    const run: Run = getRun(id);
    run.encounters[location] = { status: status };
    setRun(id, run);
};

export const updateBox = (id: string, pokemon: CaughtPokemon): void => {
    const run: Run = getRun(id);
    const idx: number = run.box.findIndex((boxPokemon: CaughtPokemon) => boxPokemon.id === pokemon.id);
    run.box[idx] = pokemon;
    setRun(id, run);
};

export const addToBox = (id: string, pokemon: CaughtPokemon): void => {
    const run: Run = getRun(id);
    run.box.push(pokemon);
    setRun(id, run);
};

export const removeFromBox = (runID: string, pokemonID: string): void => {
    const run: Run = getRun(runID);
    run.box = run.box.filter((encounter: CaughtPokemon) => encounter.id !== pokemonID);
    setRun(runID, run);
};

export const updateRIPs = (id: string, pokemon: CaughtPokemon): void => {
    const run: Run = getRun(id);
    const idx: number = run.rips.findIndex((ripPokemon: CaughtPokemon) => ripPokemon.id === pokemon.id);
    run.rips[idx] = pokemon;
    setRun(id, run);
};

export const addToRIPs = (id: string, pokemon: CaughtPokemon): void => {
    const run: Run = getRun(id);
    run.rips.push(pokemon);
    setRun(id, run);
};

export const removeFromRIPs = (runID: string, pokemonID: string): void => {
    const run: Run = getRun(runID);
    run.rips = run.rips.filter((encounter: CaughtPokemon) => encounter.id !== pokemonID);
    setRun(runID, run);
};

export const addToCaughtPokemonSlugs = (id: string, pokemon: string): void => {
    const run: Run = getRun(id);
    run.caughtPokemonSlugs.push(pokemon);
    setRun(id, run);
};

export const removeFromCaughtPokemonSlugs = (runID: string, pokemonID: string): void => {
    const run: Run = getRun(runID);
    const pokemon: CaughtPokemon | undefined = getBox(runID)
        .concat(getRIPs(runID))
        .find((pokemon: CaughtPokemon) => pokemon.id === pokemonID);
    if (pokemon !== undefined) {
        run.caughtPokemonSlugs = run.caughtPokemonSlugs.filter((slug: string) => !pokemon.pastSlugs.includes(slug));
        setRun(runID, run);
    }
};

export const addToClearedBattles = (id: string, battle: string): void => {
    const run: Run = getRun(id);
    run.clearedBattles.push(battle);
    setRun(id, run);
};

export const removeFromClearedBattles = (id: string, battle: string): void => {
    let run: Run = getRun(id);
    run.clearedBattles = run.clearedBattles.filter((clearedBattle: string) => clearedBattle !== battle);
    setRun(id, run);
};

// Predicates
export const isRun = (id: string): boolean => {
    return localStorage.getItem(id) !== null;
};

export const isCleared = (id: string, battle: string): boolean => {
    return getRun(id).clearedBattles.includes(battle);
};

export const isAlive = (runID: string, pokemonID: string): boolean => {
    return getBox(runID).find((pokemon: CaughtPokemon) => pokemon.id === pokemonID) !== undefined;
};

export const isPokemon = (runID: string, pokemonID: string): boolean => {
    return (
        getBox(runID)
            .concat(getRIPs(runID))
            .find((pokemon: CaughtPokemon) => pokemon.id === pokemonID) !== undefined
    );
};

// Queries
export const getLocationEncounter = (id: string, location: string): CaughtPokemon => {
    return getBox(id)
        .concat(getRIPs(id))
        .find((pokemon: CaughtPokemon) => pokemon.locationSlug === location)!;
};

export const getNumClearedBattles = (id: string): number => {
    return getRun(id).clearedBattles.length;
};

export const getNumRIPs = (id: string): number => {
    return getRIPs(id).length;
};

export const getStarterSlug = (id: string): string => {
    const starterSlug: string | undefined = getBox(id)
        .concat(getRIPs(id))
        .find((pokemon: CaughtPokemon) => pokemon.locationSlug === "starter")!.pastSlugs[0];
    return starterSlug ? starterSlug : "";
};

export const getStarterID = (id: string): string => {
    const starterID: string | undefined = getBox(id)
        .concat(getRIPs(id))
        .find((pokemon: CaughtPokemon) => pokemon.locationSlug === "starter")?.id;
    return starterID === undefined ? "" : starterID;
};

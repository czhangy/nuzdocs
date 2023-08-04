import Run from "@/models/Run";
import Segment from "@/models/Segment";
import games from "@/static/games";
import tiers from "@/static/tiers";
import { Name } from "pokenode-ts";
import CaughtPokemon from "@/models/CaughtPokemon";
import { initCaughtPokemon, initPokemon } from "./initializers";
import PokemonData from "@/models/PokemonData";

export const getEnglishName: (names: Name[]) => string = (names: Name[]): string => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getPokemonTier = (pokemonSlug: string, versionGroup: string): string => {
    return pokemonSlug in tiers[versionGroup] ? tiers[versionGroup][pokemonSlug] : "?";
};

// Local storage access
export const getRun = (runName: string): Run => {
    return JSON.parse(localStorage.getItem(runName) as string);
};

export const setRun = (runName: string, run: Run): void => {
    localStorage.setItem(runName, JSON.stringify(run));
};

export const getStarterSlug = (runName: string): string => {
    return getRun(runName).starterSlug;
};

export const setStarterSlug = (runName: string, starterSlug: string): void => {
    let run: Run = getRun(runName);
    run.starterSlug = starterSlug;
    setRun(runName, run);
};

export const getCompletedBattles = (runName: string): string[] => {
    return getRun(runName).battlesCleared;
};

export const getBox = (runName: string): CaughtPokemon[] => {
    return getRun(runName).box;
};

export const setBox = (runName: string, box: CaughtPokemon[]): void => {
    let run: Run = getRun(runName);
    run.box = box;
    setRun(runName, run);
};

export const getRIPs = (runName: string): CaughtPokemon[] => {
    return getRun(runName).rips;
};

export const setRIPs = (runName: string, rips: CaughtPokemon[]): void => {
    let run: Run = getRun(runName);
    run.rips = rips;
    setRun(runName, run);
};

export const getEncounter = (runName: string, locationSlug: string): CaughtPokemon | null => {
    const encounter: CaughtPokemon | undefined = getRun(runName).box.find(
        (encounter: CaughtPokemon) => encounter.locationSlug === locationSlug
    );
    return encounter ? encounter : null;
};

export const removeEncounter = (runName: string, locationSlug: string): void => {
    const run: Run = getRun(runName);
    run.box = run.box.filter((encounter: CaughtPokemon) => encounter.locationSlug !== locationSlug);
    setRun(runName, run);
};

export const addEncounter = (runName: string, locationSlug: string, speciesSlug: string, form: string): void => {
    removeEncounter(runName, locationSlug);
    let run: Run = getRun(runName);
    run.box.push(initCaughtPokemon(initPokemon(speciesSlug, form), locationSlug));
    setRun(runName, run);
};

export const getCaughtPokemon = (runName: string): string[] => {
    return getRun(runName).caughtPokemonSlugs;
};

export const addCaughtPokemon = (runName: string, pokemonSlug: string): void => {
    let run: Run = getRun(runName);
    run.caughtPokemonSlugs.push(pokemonSlug);
    setRun(runName, run);
};

export const removeCaughtPokemon = (runName: string, pokemonSlug: string): void => {
    let run: Run = getRun(runName);
    const idx: number = run.caughtPokemonSlugs.indexOf(pokemonSlug);
    run.caughtPokemonSlugs.splice(idx, 1);
    setRun(runName, run);
};

export const completeBattle = (runName: string, battleSlug: string): void => {
    const run: Run = getRun(runName);
    run.battlesCleared.push(battleSlug);
    setRun(runName, run);
};

export const resetBattle = (runName: string, battleSlug: string): void => {
    const run: Run = getRun(runName);
    run.battlesCleared.splice(run.battlesCleared.indexOf(battleSlug), 1);
    setRun(runName, run);
};

// Game access
export const getSegments = (gameSlug: string): Segment[] => {
    return Object.values(games[gameSlug].gameGroup.segments);
};

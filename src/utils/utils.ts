import Run from "@/models/Run";
import Segment from "@/models/Segment";
import games from "@/static/games";
import tiers from "@/static/tiers";
import { Name } from "pokenode-ts";

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

export const getStarterSlug = (runName: string): string => {
    return getRun(runName).starterSlug;
};

export const getCompletedBattles = (runName: string): string[] => {
    return getRun(runName).battlesCleared;
};

export const completeBattle = (runName: string, battleSlug: string): void => {
    const run: Run = getRun(runName);
    run.battlesCleared.push(battleSlug);
    localStorage.setItem(runName, JSON.stringify(run));
};

export const resetBattle = (runName: string, battleSlug: string): void => {
    const run: Run = getRun(runName);
    run.battlesCleared.splice(run.battlesCleared.indexOf(battleSlug), 1);
    localStorage.setItem(runName, JSON.stringify(run));
};

// Game access
export const getSegments = (gameSlug: string): Segment[] => {
    return Object.values(games[gameSlug].gameGroup.segments);
};

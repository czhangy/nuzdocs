import Run from "@/models/Run";
import tiers from "@/static/tiers";
import { Name } from "pokenode-ts";

export const getEnglishName: (names: Name[]) => string = (names: Name[]): string => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getRun = (runName: string): Run => {
    return JSON.parse(localStorage.getItem(runName) as string);
};

export const getPokemonTier = (pokemonSlug: string, versionGroup: string): string => {
    return pokemonSlug in tiers[versionGroup] ? tiers[versionGroup][pokemonSlug] : "?";
};

export const completeSegment = (runName: string, battleSlug: string): void => {
    const run: Run = getRun(runName);
    run.battlesCleared.push(battleSlug);
    localStorage.setItem(runName, JSON.stringify(run));
};

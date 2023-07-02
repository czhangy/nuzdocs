import { Name } from "pokenode-ts";
import encounterMethods from "@/static/encounterMethods";
import tiers from "@/static/tiers";

export const getEnglishName: (names: Name[]) => string = (names: Name[]) => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getRun = (runName: string) => {
    return JSON.parse(localStorage.getItem(runName) as string);
};

export const getEncounterMethodName = (methodSlug: string) => {
    return methodSlug in encounterMethods
        ? encounterMethods[methodSlug]
        : methodSlug;
};

export const getPokemonTier = (pokemonSlug: string, gameGroup: string) => {
    return pokemonSlug in tiers[gameGroup]
        ? tiers[gameGroup][pokemonSlug]
        : "Untiered";
};

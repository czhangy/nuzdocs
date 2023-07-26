import Run from "@/models/Run";
import encounterConditions from "@/static/encounterConditions";
import encounterMethods from "@/static/encounterMethods";
import tiers from "@/static/tiers";
import { Name, NamedAPIResource } from "pokenode-ts";

export const getEnglishName: (names: Name[]) => string = (names: Name[]): string => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getRun = (runName: string): Run => {
    return JSON.parse(localStorage.getItem(runName) as string);
};

export const getEncounterMethodName = (methodSlug: string, conditionValues: NamedAPIResource[]): string => {
    let methodName: string = methodSlug in encounterMethods ? encounterMethods[methodSlug] : methodSlug;
    if (conditionValues.length > 0) {
        methodName += "\n(";
        conditionValues.forEach((cv: NamedAPIResource, i: number) => {
            if (i > 0) {
                methodName += " + ";
            }
            methodName += cv.name in encounterConditions ? encounterConditions[cv.name] : cv.name;
        });
        methodName += ")";
    }

    return methodName;
};

export const getPokemonTier = (pokemonSlug: string, gameGroup: string): string => {
    return pokemonSlug in tiers[gameGroup] ? tiers[gameGroup][pokemonSlug] : "Untiered";
};

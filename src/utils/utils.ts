import Run from "@/models/Run";
import tiers from "@/static/tiers";
import { Name, NamedAPIResource } from "pokenode-ts";
import translations from "@/static/translations";

export const getEnglishName: (names: Name[]) => string = (names: Name[]): string => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getRun = (runName: string): Run => {
    return JSON.parse(localStorage.getItem(runName) as string);
};

export const getEncounterMethodName = (methodSlug: string, conditionValues: NamedAPIResource[]): string => {
    let methodName: string =
        methodSlug in translations.encounter_methods ? translations.encounter_methods[methodSlug] : methodSlug;
    if (conditionValues.length > 0) {
        methodName += "\n(";
        conditionValues.forEach((cv: NamedAPIResource, i: number) => {
            if (i > 0) {
                methodName += " + ";
            }
            methodName +=
                cv.name in translations.encounter_conditions ? translations.encounter_conditions[cv.name] : cv.name;
        });
        methodName += ")";
    }

    return methodName;
};

export const getPokemonTier = (pokemonSlug: string, versionGroup: string): string => {
    return pokemonSlug in tiers[versionGroup] ? tiers[versionGroup][pokemonSlug] : "N/A";
};

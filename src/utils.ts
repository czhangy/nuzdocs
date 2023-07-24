import encounterConditions from "@/static/encounterConditions";
import encounterMethods from "@/static/encounterMethods";
import tiers from "@/static/tiers";
import { Name, NamedAPIResource } from "pokenode-ts";

export const getEnglishName: (names: Name[]) => string = (names: Name[]) => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getRun = (runName: string) => {
    if (localStorage.getItem(runName)) {
        return JSON.parse(localStorage.getItem(runName) as string);
    } else {
        return null;
    }
};

export const getEncounterMethodName = (methodSlug: string, conditionValues: NamedAPIResource[]) => {
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

export const getPokemonTier = (pokemonSlug: string, gameGroup: string) => {
    return pokemonSlug in tiers[gameGroup] ? tiers[gameGroup][pokemonSlug] : "Untiered";
};

// Initializers
export const initRun = () => {
    return {
        gameSlug: "soulsilver",
        prevLocationSlug: "new-bark-town",
        starterSlug: "",
        encounterList: [],
        caughtPokemonSlugsList: [],
        numDead: 0,
        numCheckpoints: 10,
        numCheckpointsCleared: 0,
    };
};

// IDK why but this errors when using import
const axios = require("axios");

// API Wrappers
export const fetchPokemon = async (slug: string) => {
    try {
        const res = await axios.get("/api/pokemon", {
            params: {
                pokemonSlug: slug,
            },
        });
        return JSON.parse(res.data.pokemon);
    } catch (error) {
        console.log(error);
        return null;
    }
};

import PokemonData from "@/models/PokemonData";
import tiers from "@/static/tiers";
import { Name } from "pokenode-ts";

export const getEnglishName: (names: Name[]) => string = (names: Name[]): string => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getPokemonTier = (pokemonSlug: string, versionGroup: string): string => {
    return pokemonSlug in tiers[versionGroup] ? tiers[versionGroup][pokemonSlug] : "?";
};

// Check if the Pokemon is in its final stage
export const isFinalStage = (pokemon: PokemonData) => {
    for (let chain of pokemon.evolutions) {
        if (chain.indexOf(pokemon.pokemon.slug) === chain.length - 1) {
            return true;
        }
    }
    return false;
};

export const generateID = (usedIDs: string[]): string => {
    let id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    while (usedIDs.includes(id)) {
        id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    return id;
};

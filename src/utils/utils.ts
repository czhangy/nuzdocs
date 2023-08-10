import PokemonData from "@/models/PokemonData";
import tiers from "@/static/tiers";
import { Name, VersionGroupFlavorText } from "pokenode-ts";
import { getGameGroup } from "./game";

export const getEnglishName: (names: Name[]) => string = (names: Name[]): string => {
    const nameObj: Name = names.find((name) => name.language.name === "en")!;
    return nameObj.name;
};

export const getPokemonTier = (pokemonSlug: string, gameSlug: string): string => {
    const versionGroup = getGameGroup(gameSlug).versionGroup;
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

export const capitalizeWord = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getTypeCardSrc = (type: string) => {
    return `https://www.serebii.net/pokedex-bw/type/${type}.gif`;
};

export const translateSlug = (slug: string) => {
    return slug
        .replace(/-/g, " ")
        .toLowerCase()
        .split(" ")
        .map((word: string) => capitalizeWord(word))
        .join(" ");
};

export const getItemDescription = (fte: VersionGroupFlavorText[], versionGroup: string): string => {
    return fte.find(
        (vgft: VersionGroupFlavorText) => vgft.language.name === "en" && vgft.version_group.name === versionGroup
    )!.text;
};

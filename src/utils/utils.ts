import CaughtPokemon from "@/models/CaughtPokemon";
import MoveData from "@/models/MoveData";
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

export const getDescription = (fte: VersionGroupFlavorText[], versionGroup: string): string => {
    return fte.find(
        (vgft: VersionGroupFlavorText) => vgft.language.name === "en" && vgft.version_group.name === versionGroup
    )!.text;
};

export const getPreSplitCategories = (move: MoveData, game: string): "physical" | "special" | "other" => {
    const generation: string = getGameGroup(game).generation;
    if (generation === "generation-iii" && move.category !== "other") {
        const special: string[] = ["fire", "water", "electric", "grass", "ice", "psychic", "dragon", "dark"];
        return special.includes(move.type) ? "special" : "physical";
    } else {
        return move.category;
    }
};

export const generateSet = (pokemon: CaughtPokemon, name: string): string => {
    let set = `${pokemon.nickname} (${name})\n`;
    set += `IVs: ${pokemon.pokemon.ivs.hp} HP / ${pokemon.pokemon.ivs.atk} Atk / ${pokemon.pokemon.ivs.def} Def / ${pokemon.pokemon.ivs.spa} SpA / ${pokemon.pokemon.ivs.spd} SpD / ${pokemon.pokemon.ivs.spe} Spe\n`;
    set += `EVs: ${pokemon.pokemon.evs.hp} HP / ${pokemon.pokemon.evs.atk} Atk / ${pokemon.pokemon.evs.def} Def / ${pokemon.pokemon.evs.spa} SpA / ${pokemon.pokemon.evs.spd} SpD / ${pokemon.pokemon.evs.spe} Spe\n`;
    if (pokemon.pokemon.ability) {
        set += `Ability: ${pokemon.pokemon.ability.name}\n`;
    }
    if (pokemon.pokemon.level) {
        set += `Level: ${pokemon.pokemon.level}\n`;
    }
    if (pokemon.pokemon.nature) {
        set += `${pokemon.pokemon.nature} Nature\n`;
    }
    for (const move of pokemon.pokemon.moves) {
        set += `- ${move.name}\n`;
    }
    return set;
};

export const exportPokemon = (pokemon: CaughtPokemon, name: string): void => {
    const set: string = generateSet(pokemon, name);
    navigator.clipboard.writeText(set);
};

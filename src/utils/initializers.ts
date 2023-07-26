import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import LocalName from "@/models/LocalName";
import LocalPokemon from "@/models/LocalPokemon";
import LocationData from "@/models/LocationData";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import games from "@/static/games";
import { getEnglishName } from "@/utils/utils";
import { Name } from "pokenode-ts";

export const initRun = (gameSlug: string): Run => {
    return {
        gameSlug: gameSlug,
        prevLocationSlug: games[gameSlug].startingTownSlug,
        starterSlug: "",
        encounterList: [],
        caughtPokemonSlugsList: [],
        numDead: 0,
        numCheckpoints: games[gameSlug].segments.length,
        numCheckpointsCleared: 0,
    };
};

export const initLocalName = (slug: string, name: string): LocalName => {
    return {
        slug: slug,
        name: name,
    };
};

export const initPokemonData = (pokemon: LocalName, types: string[], sprite: string): PokemonData => {
    return {
        pokemon: pokemon,
        types: types,
        sprite: sprite,
    };
};

export const initLocalPokemon = (pokemonSlug: string, locationSlug: string): LocalPokemon => {
    return {
        pokemonSlug: pokemonSlug,
        locationSlug: locationSlug,
    };
};

export const initEncounterData = (
    pokemonSlug: string,
    method: string,
    chance: number,
    minLevel: number,
    maxLevel: number
): EncounterData => {
    return {
        pokemonSlug: pokemonSlug,
        method: method,
        chance: chance,
        minLevel: minLevel,
        maxLevel: maxLevel,
    };
};

export const initLocationData = (names: Name[], areaSlugList: string[]): LocationData => {
    return {
        locationName: getEnglishName(names),
        areaSlugList: areaSlugList,
    };
};

export const initAreaData = (names: Name[], encounters: EncounterData[]): AreaData => {
    return {
        areaName: getEnglishName(names),
        encounters: encounters,
    };
};

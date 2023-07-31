import AreaData from "@/models/AreaData";
import CaughtPokemon from "@/models/CaughtPokemon";
import EncounterData from "@/models/EncounterData";
import LocalName from "@/models/LocalName";
import LocationData from "@/models/LocationData";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import games from "@/static/games";
import { getEnglishName } from "@/utils/utils";
import { Name } from "pokenode-ts";

export const initRun = (gameSlug: string): Run => {
    return {
        gameSlug: gameSlug,
        prevLocationSlug: games[gameSlug].gameGroup.startingTownSlug,
        starterSlug: "",
        encounterList: [],
        caughtPokemonSlugsList: [],
        numDead: 0,
        numCheckpoints: Object.keys(games[gameSlug].gameGroup.segments).length,
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

export const initPokemon = (slug: string, level: number | null = null): Pokemon => {
    let pokemon: Pokemon = {
        slug: slug,
    };
    if (level) {
        pokemon.level = level;
    }
    return pokemon;
};

export const initCaughtPokemon = (pokemon: Pokemon, locationSlug: string): CaughtPokemon => {
    return {
        pokemon: pokemon,
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
    // IDK why the English translation for route areas is "Road" => change it here
    let areaName = getEnglishName(names);
    if (areaName.startsWith("Road")) {
        areaName = "Route" + areaName.substring(4);
    }
    return {
        areaName: areaName,
        encounters: encounters,
    };
};

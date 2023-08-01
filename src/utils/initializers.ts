import AbilityData from "@/models/AbilityData";
import AreaData from "@/models/AreaData";
import CaughtPokemon from "@/models/CaughtPokemon";
import EncounterData from "@/models/EncounterData";
import LocalName from "@/models/LocalName";
import LocationData from "@/models/LocationData";
import MoveData from "@/models/MoveData";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import games from "@/static/games";
import { getEnglishName } from "@/utils/utils";
import { Name } from "pokenode-ts";

export const initRun = (gameSlug: string): Run => {
    let numBattles = 0;
    for (let key of Object.keys(games[gameSlug].gameGroup.segments)) {
        if (games[gameSlug].gameGroup.segments[key].type === "battle") {
            numBattles++;
        }
    }
    return {
        gameSlug: gameSlug,
        prevLocationSlug: games[gameSlug].gameGroup.startingTownSlug,
        starterSlug: "",
        encounterList: [],
        numDead: 0,
        numBattles: numBattles,
        battlesCleared: [],
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
        moveSlugs: [],
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

export const initAbilityData = (names: Name[]): AbilityData => {
    return {
        name: getEnglishName(names),
    };
};

export const initMoveData = (names: Name[]): MoveData => {
    return {
        name: getEnglishName(names),
    };
};

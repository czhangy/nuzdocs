import AbilityData from "@/models/AbilityData";
import AreaData from "@/models/AreaData";
import CaughtPokemon from "@/models/CaughtPokemon";
import EncounterData from "@/models/EncounterData";
import PokemonName from "@/models/PokemonName";
import LocationData from "@/models/LocationData";
import MoveData from "@/models/MoveData";
import MyPokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import { getEnglishName } from "@/utils/utils";
import { Name, NamedAPIResource, Pokemon, PokemonSpecies, PokemonSpeciesVariety } from "pokenode-ts";

export const initPokemonName = (slug: string, name: string, species: string): PokemonName => {
    return {
        slug: slug,
        name: name,
        species: species,
    };
};

export const initPokemonData = (pokemon: Pokemon, species: PokemonSpecies, evolutions: string[][]): PokemonData => {
    return {
        pokemon: initPokemonName(pokemon.name, getEnglishName(species.names), species.name),
        types: pokemon.types.map((type) => type.type.name),
        sprite: pokemon.sprites.front_default!,
        evolutions: evolutions,
        forms: species.varieties.map((form: PokemonSpeciesVariety) => form.pokemon.name),
    };
};

export const initPokemon = (slug: string, species: string, level: number | null = null): MyPokemon => {
    let pokemon: MyPokemon = {
        slug: slug,
        species: species,
        moveSlugs: [],
    };
    if (level) {
        pokemon.level = level;
    }
    return pokemon;
};

export const initCaughtPokemon = (pokemon: MyPokemon, locationSlug: string): CaughtPokemon => {
    return {
        pokemon: pokemon,
        locationSlug: locationSlug,
        pastSlugs: [pokemon.slug],
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

export const initAreaData = (
    names: Name[],
    encounters: { [conditionValue: string]: { [method: string]: EncounterData[] } },
    usesTime: boolean
): AreaData => {
    // IDK why the English translation for route areas is "Road" => change it here
    let areaName = getEnglishName(names);
    if (areaName.startsWith("Road")) {
        areaName = "Route" + areaName.substring(4);
    }
    return {
        areaName: areaName,
        encounters: encounters,
        usesTime: usesTime,
    };
};

export const initAbilityData = (names: Name[]): AbilityData => {
    return {
        name: getEnglishName(names),
    };
};

export const initMoveData = (
    names: Name[],
    type: NamedAPIResource,
    power: number | null,
    category: NamedAPIResource,
    pp: number
): MoveData => {
    return {
        name: getEnglishName(names),
        type: type.name,
        power: power ? power : 0,
        category: category.name === "status" ? "other" : category.name,
        pp: pp,
    };
};

import AbilityData from "@/models/AbilityData";
import AreaData from "@/models/AreaData";
import CaughtPokemon from "@/models/CaughtPokemon";
import EncounterData from "@/models/EncounterData";
import LocalName from "@/models/LocalName";
import LocationData from "@/models/LocationData";
import MoveData from "@/models/MoveData";
import MyPokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import { getEnglishName } from "@/utils/utils";
import { Name, NamedAPIResource, Pokemon, PokemonSpecies, PokemonSpeciesVariety } from "pokenode-ts";

export const initLocalName = (slug: string, name: string): LocalName => {
    return {
        slug: slug,
        name: name,
    };
};

export const initPokemonData = (pokemon: Pokemon, species: PokemonSpecies, evolutions: string[][]): PokemonData => {
    return {
        pokemon: initLocalName(species.name, getEnglishName(species.names)),
        form: pokemon.name,
        types: pokemon.types.map((type) => type.type.name),
        sprite: pokemon.sprites.front_default!,
        evolutions: evolutions,
        forms: species.varieties.map((form: PokemonSpeciesVariety) => form.pokemon.name),
    };
};

export const initPokemon = (slug: string, form: string, level: number | null = null): MyPokemon => {
    let pokemon: MyPokemon = {
        slug: slug,
        form: form,
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
        originalSlug: pokemon.slug,
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

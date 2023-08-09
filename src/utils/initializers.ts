import AbilityData from "@/models/AbilityData";
import AreaData from "@/models/AreaData";
import CaughtPokemon from "@/models/CaughtPokemon";
import EncounterData from "@/models/EncounterData";
import LocationData from "@/models/LocationData";
import MoveData from "@/models/MoveData";
import MyPokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import PokemonName from "@/models/PokemonName";
import Stat from "@/models/Stat";
import translations from "@/static/translations";
import { getBox, getRIPs } from "@/utils/run";
import { generateID, getEnglishName } from "@/utils/utils";
import { Name, NamedAPIResource, Pokemon, PokemonSpecies, PokemonSpeciesVariety, PokemonStat } from "pokenode-ts";

export const initPokemonName = (slug: string, name: string, species: string): PokemonName => {
    return {
        slug: slug,
        name: name,
        species: species,
    };
};

export const initPokemonData = (
    pokemon: Pokemon,
    species: PokemonSpecies,
    evolutions: string[][],
    abilities: string[],
    generation: string,
    versionGroup: string
): PokemonData => {
    // Discover most correct sprite for requested game
    let sprite: string = pokemon.sprites.front_default!;
    // @ts-expect-error
    if (generation in pokemon.sprites.versions && versionGroup in pokemon.sprites.versions[generation]) {
        // @ts-expect-error
        sprite = pokemon.sprites.versions[generation][versionGroup].front_default;
    }
    let stats: Stat[] = pokemon.stats.map((stat: PokemonStat) => {
        return { name: translations.stats[stat.stat.name], base: stat.base_stat };
    });
    stats = stats.splice(0, 3).concat(stats.reverse());
    return {
        pokemon: initPokemonName(pokemon.name, getEnglishName(species.names), species.name),
        types: pokemon.types.map((type) => type.type.name),
        sprite: sprite,
        stats: stats,
        evolutions: evolutions,
        forms: species.varieties.map((form: PokemonSpeciesVariety) => form.pokemon.name),
        abilities: abilities,
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

export const initCaughtPokemon = (pokemon: MyPokemon, locationSlug: string, runID: string): CaughtPokemon => {
    return {
        id: generateID(
            getBox(runID)
                .map((pokemon: CaughtPokemon) => pokemon.id)
                .concat(getRIPs(runID).map((pokemon: CaughtPokemon) => pokemon.id))
        ),
        pokemon: pokemon,
        nickname: pokemon.species,
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

export const initLocationData = (slug: string, names: Name[], areas: string[]): LocationData => {
    return {
        slug: slug,
        name: getEnglishName(names),
        areas: areas,
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

export const initAbilityData = (slug: string, names: Name[]): AbilityData => {
    return {
        slug: slug,
        name: getEnglishName(names),
    };
};

export const initMoveData = (
    slug: string,
    names: Name[],
    type: NamedAPIResource,
    power: number | null,
    category: NamedAPIResource,
    pp: number
): MoveData => {
    return {
        slug: slug,
        name: getEnglishName(names),
        type: type.name,
        power: power ? power : 0,
        category: category.name === "status" ? "other" : category.name,
        pp: pp,
    };
};

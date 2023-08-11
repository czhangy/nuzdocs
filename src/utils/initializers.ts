import AbilityData from "@/models/AbilityData";
import AreaData from "@/models/AreaData";
import CaughtPokemon from "@/models/CaughtPokemon";
import EncounterData from "@/models/EncounterData";
import ItemData from "@/models/ItemData";
import LocationData from "@/models/LocationData";
import MoveData from "@/models/MoveData";
import MyPokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import PokemonMove from "@/models/PokemonMove";
import PokemonName from "@/models/PokemonName";
import Stat from "@/models/Stat";
import translations from "@/static/translations";
import { getBox, getRIPs } from "@/utils/run";
import { generateID, getDescription, getEnglishName } from "@/utils/utils";
import {
    Ability,
    Item,
    Move,
    Name,
    NamedAPIResource,
    Pokemon,
    PokemonMoveVersion,
    PokemonSpecies,
    PokemonSpeciesVariety,
    PokemonStat,
} from "pokenode-ts";

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
    if (
        generation in pokemon.sprites.versions &&
        // @ts-expect-error
        versionGroup in pokemon.sprites.versions[generation] &&
        // @ts-expect-error
        pokemon.sprites.versions[generation][versionGroup].front_default
    ) {
        // @ts-expect-error
        sprite = pokemon.sprites.versions[generation][versionGroup].front_default;
    }
    let stats: Stat[] = pokemon.stats.map((stat: PokemonStat) => {
        return { name: translations.stats[stat.stat.name], base: stat.base_stat };
    });
    stats = stats.splice(0, 3).concat(stats.reverse());
    const movepool: PokemonMove[] = [];
    for (const move of pokemon.moves) {
        const vgd: PokemonMoveVersion | undefined = move.version_group_details.find(
            (pmv: PokemonMoveVersion) => pmv.version_group.name === versionGroup
        );
        if (vgd !== undefined) {
            movepool.push(initPokemonMove(move.move.name, vgd));
        }
    }
    return {
        pokemon: initPokemonName(pokemon.name, getEnglishName(species.names), species.name),
        types: pokemon.types.map((type) => type.type.name),
        sprite: sprite,
        stats: stats,
        evolutions: evolutions,
        forms: species.varieties.map((form: PokemonSpeciesVariety) => form.pokemon.name),
        abilities: abilities,
        movepool: movepool,
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

export const initAbilityData = (ability: Ability, versionGroup: string, desc: string): AbilityData => {
    return {
        slug: ability.name,
        name: getEnglishName(ability.names),
        desc: desc,
    };
};

export const initMoveData = (move: Move, desc: string): MoveData => {
    return {
        slug: move.name,
        name: getEnglishName(move.names),
        type: move.type.name,
        power: move.power ? move.power : 0,
        category: !move.damage_class || move.damage_class.name === "status" ? "other" : move.damage_class.name,
        pp: move.pp ? move.pp : 0,
        desc: desc,
    };
};

export const initPokemonMove = (slug: string, vgd: PokemonMoveVersion): PokemonMove => {
    return {
        slug: slug,
        level: vgd.level_learned_at,
        method: vgd.move_learn_method.name,
    };
};

export const initItemData = (item: Item, versionGroup: string): ItemData => {
    return {
        slug: item.name,
        name: getEnglishName(item.names),
        sprite: item.sprites.default,
        desc: getDescription(item.flavor_text_entries, versionGroup) as string,
    };
};

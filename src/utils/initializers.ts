import AbilityData from "@/models/AbilityData";
import AreaData from "@/models/AreaData";
import CaughtPokemon from "@/models/CaughtPokemon";
import EncounterData from "@/models/EncounterData";
import ItemData from "@/models/ItemData";
import LocationData from "@/models/LocationData";
import MoveData from "@/models/MoveData";
import NamedResource from "@/models/NamedResource";
import MyPokemon from "@/models/Pokemon";
import MyPokemonAbility from "@/models/PokemonAbility";
import PokemonData from "@/models/PokemonData";
import PokemonMove from "@/models/PokemonMove";
import PokemonName from "@/models/PokemonName";
import Stat from "@/models/Stat";
import Values from "@/models/Values";
import priorities from "@/static/priorities";
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
    PokemonAbility,
    PokemonMoveVersion,
    PokemonPastType,
    PokemonSpecies,
    PokemonStat,
    PokemonType,
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
    abilities: MyPokemonAbility[],
    generation: string,
    group: string
): PokemonData => {
    // Get correct type based on generation
    let types: PokemonType[] = pokemon.types;
    const pastTypes: PokemonPastType[] = pokemon.past_types.filter(
        (type: PokemonPastType) =>
            priorities.generations.indexOf(type.generation.name) > priorities.generations.indexOf(generation)
    );
    if (pastTypes.length > 0) {
        pastTypes.sort(
            (a: PokemonPastType, b: PokemonPastType) =>
                priorities.generations.indexOf(a.generation.name) - priorities.generations.indexOf(b.generation.name)
        );
        types = pastTypes[0].types;
    }
    // Discover most correct sprite for requested game
    let sprite: string = pokemon.sprites.front_default!;
    if (
        generation in pokemon.sprites.versions &&
        // @ts-expect-error
        group in pokemon.sprites.versions[generation] &&
        // @ts-expect-error
        pokemon.sprites.versions[generation][group].front_default
    ) {
        // @ts-expect-error
        sprite = pokemon.sprites.versions[generation][group].front_default;
    }
    // Map stat to StatData interface
    let stats: Stat[] = pokemon.stats.map((stat: PokemonStat) => {
        return { name: translations.stats[stat.stat.name], base: stat.base_stat };
    });
    // Get moves learned by Pokemon
    const movepool: PokemonMove[] = [];
    for (const move of pokemon.moves) {
        const vgd: PokemonMoveVersion | undefined = move.version_group_details.find(
            (pmv: PokemonMoveVersion) => pmv.version_group.name === group
        );
        if (vgd !== undefined) {
            movepool.push(initPokemonMove(move.move.name, vgd));
        }
    }
    return {
        pokemon: initPokemonName(pokemon.name, getEnglishName(species.names), species.name),
        types: types.map((type) => type.type.name),
        sprite: sprite,
        stats: stats,
        evolutions: evolutions,
        abilities: abilities,
        movepool: movepool,
    };
};

export const initPokemon = (slug: string, species: string, level: number | null = null): MyPokemon => {
    let pokemon: MyPokemon = {
        slug: slug,
        species: species,
        moves: [],
        ivs: initValues(),
        evs: initValues(),
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
        locationSlug: locationSlug,
        pastSlugs: [pokemon.slug],
        abilityNum: 1,
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

export const initAbilityData = (ability: Ability, desc: string): AbilityData => {
    return {
        slug: ability.name,
        name: getEnglishName(ability.names),
        desc: desc,
    };
};

export const initMoveData = (
    move: Move,
    type: NamedAPIResource,
    power: number | null,
    pp: number | null,
    desc: string
): MoveData => {
    return {
        slug: move.name,
        name: getEnglishName(move.names),
        type: type.name === "unknown" ? "ghost" : type.name,
        power: power ? power : 0,
        // @ts-expect-error
        category: !move.damage_class || move.damage_class.name === "status" ? "other" : move.damage_class.name,
        pp: pp ? pp : 0,
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

export const initItemData = (item: Item, group: string): ItemData => {
    return {
        slug: item.name,
        name: getEnglishName(item.names),
        sprite: item.sprites.default,
        desc: getDescription(item.flavor_text_entries, group) as string,
    };
};

export const initValues = (): Values => {
    return {
        hp: 0,
        atk: 0,
        spa: 0,
        def: 0,
        spd: 0,
        spe: 0,
    };
};

export const initNamedResource = (slug: string, name: string): NamedResource => {
    return {
        slug: slug,
        name: name,
    };
};

export const initPokemonAbility = (ability: PokemonAbility): MyPokemonAbility => {
    return {
        slug: ability.ability.name,
        hidden: ability.is_hidden,
        slot: ability.slot,
    };
};

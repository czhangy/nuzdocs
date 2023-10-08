import priorities from "@/static/priorities";
import { getEnglishName } from "@/utils/utils";
import { PrismaClient, Sprite, Stats, Types } from "@prisma/client";
import { changedStats } from "data/changed_stats";
import { NextApiRequest, NextApiResponse } from "next";
import { Pokemon, PokemonClient, PokemonForm, PokemonSpecies, PokemonStat, PokemonType } from "pokenode-ts";

// Get list of all types for a Pokemon (assumes Pokemon have only changed types 1 time maximum)
const getTypesList = (pokemon: Pokemon): Types[] => {
    const GEN_IDXS: { [generation: string]: number } = {
        "generation-iii": 3,
        "generation-iv": 6,
        "generation-v": 8,
        "generation-vi": 10,
        "generation-vii": 13,
        "generation-viii": 18,
    };

    const types: Types[] = [];
    let currentGroup: number = -1;

    // Insert any past typings
    if (pokemon.past_types.length > 0) {
        // Protect against missing generation names
        if (!(pokemon.past_types[0].generation.name in GEN_IDXS)) {
            console.log(`Error when finding past type for ${pokemon.name}`);
            return [];
        }

        types.push({
            types: pokemon.past_types[0].types.map((type: PokemonType) => type.type.name),
            group: -1,
        });

        // Update group for most recent typing
        currentGroup = GEN_IDXS[pokemon.past_types[0].generation.name];
    }

    // Insert most recent typing
    types.push({
        types: pokemon.types.map((type: PokemonType) => type.type.name),
        group: currentGroup,
    });

    return types;
};

// Get list of all sprites for a Pokemon
const getSpriteList = (pokemon: Pokemon): Sprite[] => {
    const GEN_III_IDX: number = 2;
    const GEN_VI_IDX: number = 5;
    const BW_IDX: number = 6;

    const sprites: Sprite[] = [];

    // Iterate generation-by-generation from Gen III until Gen VI
    const generations: any[] = Object.values(pokemon.sprites.versions).slice(GEN_III_IDX, GEN_VI_IDX);
    for (const groups of generations) {
        // Iterate group-by-group through current generation's groups
        for (const group of Object.keys(groups)) {
            // Skip nulls
            if (groups[group].front_default) {
                sprites.push({ url: groups[group].front_default, group: priorities.groups.indexOf(group) });
            }
        }
    }

    // Log any potential errors
    if (sprites.length === 0 || !sprites.find((sprite: Sprite) => sprite.group >= BW_IDX)) {
        console.log(`Error when finding sprites for ${pokemon.name}`);
    }

    // Sort sprites by group
    return sprites.sort((a: Sprite, b: Sprite) => a.group - b.group);
};

// Get stats for a Pokemon
const getStats = (pokemon: Pokemon): Stats[] => {
    const STAT_ORDER: string[] = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];

    const stats: Stats[] = [];
    let currentGroup: number = -1;

    // Get old stats for Pokemon whose BSTs have changed
    const old: string[] = Object.keys(changedStats).filter((key: string) => key.startsWith(pokemon.name));
    old.forEach((key: string) => {
        stats.push({ stats: changedStats[key], group: currentGroup });

        // Update current group using key
        currentGroup = parseInt(key.split("#")[1]);
    });

    // Get most recent stats from PokeAPI
    const recent: number[] = [];
    pokemon.stats.forEach((stat: PokemonStat) => (recent[STAT_ORDER.indexOf(stat.stat.name)] = stat.base_stat));
    stats.push({ stats: recent, group: currentGroup });

    return stats;
};

// Create a Pokemon and add it to the DB
const handleCreatePokemon = async (prisma: PrismaClient, species: PokemonSpecies, pokemon: Pokemon): Promise<void> => {
    await prisma.pokemon.create({
        data: {
            slug: pokemon.name,
            name: getEnglishName(species.names),
            types: getTypesList(pokemon),
            sprites: getSpriteList(pokemon),
            prevEvolutions: [],
            nextEvolutions: [],
            stats: getStats(pokemon),
            formChangeable: species.forms_switchable,
        },
    });
};

// Create a Pokemon form and add it to the DB
const handleCreateForm = async (prisma: PrismaClient, species: PokemonSpecies, form: PokemonForm): Promise<void> => {};

// Fetch Pokemon data from PokeAPI and format it into proper schema
const createPokemon = async (prisma: PrismaClient): Promise<void> => {
    // Clear table
    await prisma.pokemon.deleteMany({});

    // Init API wrapper
    const api: PokemonClient = new PokemonClient();

    // Fetch species
    const species: PokemonSpecies = await api.getPokemonSpeciesById(24);

    // Iterate through each variety of the Pokemon species
    for (const variety of species.varieties) {
        // Fetch Pokemon object
        const pokemon: Pokemon = await api.getPokemonByName(variety.pokemon.name);

        // Handle DB update based on # of forms
        if (pokemon.forms.length === 1) {
            handleCreatePokemon(prisma, species, pokemon);
        } else {
            for (const form of pokemon.forms) {
                handleCreateForm(prisma, species, await api.getPokemonFormByName(form.name));
            }
        }
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (process.env.NODE_ENV === "development") {
        const updated: string[] = [];
        const prisma = new PrismaClient();

        // Update Pokemon data if requested
        if ("pokemon" in req.query) {
            console.log("Creating Pokemon collection...");
            await createPokemon(prisma);
            updated.push("Pokemon");
            console.log("Pokemon collection completed...");
        }

        console.log("DB update complete!");
        return res.status(200).json({ updated: updated });
    } else {
        return res.status(403).json("Forbidden");
    }
}

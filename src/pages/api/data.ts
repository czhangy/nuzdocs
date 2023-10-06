import Sprite from "@/models/Sprite";
import priorities from "@/static/priorities";
import { getEnglishName } from "@/utils/utils";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Pokemon, PokemonClient, PokemonForm, PokemonSpecies, PokemonType } from "pokenode-ts";

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

// Create a Pokemon and add it to the DB
const handleCreatePokemon = async (prisma: PrismaClient, species: PokemonSpecies, pokemon: Pokemon): Promise<void> => {
    await prisma.pokemon.create({
        data: {
            slug: pokemon.name,
            name: getEnglishName(species.names),
            types: [],
            sprites: getSpriteList(pokemon),
            prevEvolutions: [],
            nextEvolutions: [],
            stats: [],
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
    const species: PokemonSpecies = await api.getPokemonSpeciesById(1);

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

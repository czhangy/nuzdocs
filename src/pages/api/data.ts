import Sprite from "@/models/Sprite";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Pokemon, PokemonClient, PokemonForm, PokemonSpecies } from "pokenode-ts";

// Create a Pokemon and add it to the DB
const handleCreatePokemon = (species: PokemonSpecies, pokemon: Pokemon) => {};

// Create a Pokemon form and add it to the DB
const handleCreateForm = (species: PokemonSpecies, form: PokemonForm) => {};

// Get list of all sprites for a Pokemon
const getSpriteList = (pokemon: Pokemon): Sprite[] => {
    const sprites: Sprite[] = [];

    // Iterate generation-by-generation until Gen VI
    for (const [generation, groups] of Object.entries(pokemon.sprites.versions)) {
        // Stop at Gen VI
        if (generation === "generation-vi") {
            break;
        }

        // Iterate group-by-group through current generation's groups
        for (const group of Object.keys(groups)) {
            // Skip nulls
            if (groups[group].front_default) {
                sprites.push({ url: groups[group].front_default, group: group });
            }
        }
    }

    // Log any potential errors
    if (sprites.length === 0 || !sprites.find((sprite: Sprite) => sprite.group === "black-white")) {
        console.log(`Error when finding sprites for ${pokemon.name}`);
    }

    return sprites;
};

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
            handleCreatePokemon(species, pokemon);
        } else {
            for (const form of pokemon.forms) {
                handleCreateForm(species, await api.getPokemonFormByName(form.name));
            }
        }
    }

    // await prisma.pokemon.create({
    //     data: {
    //         slug: pokemon.name,
    //         name: getEnglishName(species.names),
    //         types: pokemon.types.map((type: PokemonType) => type.type.name),
    //         sprites: getSpriteList(pokemon),
    //         prevEvolutions: [],
    //         nextEvolutions: [],
    //         stats: [],
    //         formChangeable: species.forms_switchable,
    //     },
    // });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (process.env.NODE_ENV === "development") {
        const updated: string[] = [];
        const prisma = new PrismaClient();

        // Update Pokemon data if requested
        if ("pokemon" in req.query) {
            console.log("Creating Pokemon...");
            await createPokemon(prisma);
            updated.push("Pokemon");
        }

        return res.status(200).json({ updated: updated });
    } else {
        return res.status(403).json("Forbidden");
    }
}

import LocalName from "@/models/LocalName";
import PokemonData from "@/models/PokemonData";
import { initLocalName, initPokemonData } from "@/utils/initializers";
import { getEnglishName } from "@/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";

type ResData = {
    pokemon?: string;
    error?: string;
};

const fetchPokemonName = async (pokemonSlug: string): Promise<string> => {
    const api: PokemonClient = new PokemonClient();
    try {
        const species: PokemonSpecies = await api.getPokemonSpeciesByName(pokemonSlug);
        return getEnglishName(species.names);
    } catch (error: any) {
        throw error;
    }
};

const fetchPokemon = async (pokemonSlug: string): Promise<PokemonData> => {
    const api: PokemonClient = new PokemonClient();
    try {
        const pokemon: Pokemon = await api.getPokemonByName(pokemonSlug);
        const localPokemonName: LocalName = initLocalName(pokemonSlug, await fetchPokemonName(pokemon.name));
        const types: string[] = pokemon.types.map((type) => type.type.name);
        const sprite: string = pokemon.sprites.front_default!;
        return initPokemonData(localPokemonName, types, sprite);
    } catch (error: any) {
        throw error;
    }
};

const fetchListOfPokemon = async (pokemonSlugList: string[]): Promise<PokemonData[]> => {
    let pokemonPromises: Promise<PokemonData>[] = [];
    pokemonSlugList.forEach((pokemonSlug: string) => {
        pokemonPromises.push(fetchPokemon(pokemonSlug));
    });
    try {
        return await Promise.all(pokemonPromises);
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    if (req.method === "GET" && "pokemonSlug" in req.query && typeof req.query.pokemonSlug === "string") {
        try {
            const pokemon: void | PokemonData = await fetchPokemon(req.query.pokemonSlug);
            return res.status(200).json({ pokemon: JSON.stringify(pokemon) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (
        req.method === "GET" &&
        "pokemonSlugList[]" in req.query &&
        Array.isArray(req.query["pokemonSlugList[]"])
    ) {
        try {
            const pokemonDataList: void | PokemonData[] = await fetchListOfPokemon(req.query["pokemonSlugList[]"]);
            return res.status(200).json({ pokemon: JSON.stringify(pokemonDataList) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (req.method === "GET") {
        return res.status(400).json({
            error: "A Pokemon name must be specified",
        });
    } else {
        return res.status(405).json({
            error: "Only GET requests are allowed at this route",
        });
    }
}

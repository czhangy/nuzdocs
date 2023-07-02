import PokemonData from "@/models/PokemonData";
import type { NextApiRequest, NextApiResponse } from "next";
import { Pokemon, PokemonClient } from "pokenode-ts";

type ResData = {
    pokemon?: string;
    error?: string;
};

const fetchPokemon = async (pokemonSlug: string) => {
    const api: PokemonClient = new PokemonClient();
    const pokemon: Pokemon = await api
        .getPokemonByName(pokemonSlug)
        .catch((error) => {
            throw error;
        });
    return {
        pokemonName: pokemon.name,
        types: pokemon.types.map((type) => type.type.name),
        sprite: pokemon.sprites.front_default!,
    };
};

const fetchListOfPokemon = async (pokemonSlugList: string[]) => {
    let pokemonPromises: Promise<PokemonData>[] = [];
    pokemonSlugList.forEach((pokemonSlug: string) => {
        pokemonPromises.push(
            fetchPokemon(pokemonSlug).catch((error) => {
                throw error;
            })
        );
    });
    return await Promise.all(pokemonPromises);
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    if (
        req.method === "GET" &&
        "pokemonSlug" in req.query &&
        typeof req.query.pokemonSlug === "string"
    ) {
        const pokemon: void | PokemonData = await fetchPokemon(
            req.query.pokemonSlug
        ).catch((error) => {
            return res.status(500).json({
                error: error,
            });
        });
        return res.status(200).json({ pokemon: JSON.stringify(pokemon) });
    } else if (
        req.method === "GET" &&
        "pokemonSlugList[]" in req.query &&
        Array.isArray(req.query["pokemonSlugList[]"])
    ) {
        const pokemonDataList: void | PokemonData[] = await fetchListOfPokemon(
            req.query["pokemonSlugList[]"]
        ).catch((error) => {
            return res.status(500).json({
                error: error,
            });
        });
        return res
            .status(200)
            .json({ pokemon: JSON.stringify(pokemonDataList) });
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

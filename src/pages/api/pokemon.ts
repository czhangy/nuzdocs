import type { NextApiRequest, NextApiResponse } from "next";

import { PokemonClient } from "pokenode-ts";

import PokemonData from "@/models/PokemonData";

type ResData = {
    pokemon?: string;
    error?: string;
};

const fetchPokemon = async (name: string) => {
    const api = new PokemonClient();
    const pokemon = await api.getPokemonByName(name).catch((error) => {
        throw error;
    });
    return {
        pokemonName: pokemon.name,
        types: pokemon.types.map((type) => type.type.name),
        sprite: pokemon.sprites.front_default!,
    };
};

const fetchPokemonGroup = async (pokemonNames: string[]) => {
    let promises: Promise<PokemonData>[] = [];

    pokemonNames.forEach((pokemonName: string) => {
        promises.push(
            fetchPokemon(pokemonName).catch((error) => {
                throw error;
            })
        );
    });

    return await Promise.all(promises).then((pokemonList) => pokemonList);
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResData>
) {
    if (
        req.method === "GET" &&
        "pokemonName" in req.query &&
        typeof req.query.pokemonName === "string"
    ) {
        const pokemon = await fetchPokemon(req.query.pokemonName).catch(
            (error) => {
                res.status(500).json({
                    error: error,
                });
            }
        );
        res.status(200).json({ pokemon: JSON.stringify(pokemon) });
    } else if (
        req.method === "GET" &&
        "pokemonName[]" in req.query &&
        Array.isArray(req.query["pokemonName[]"])
    ) {
        const pokemonDataList: void | PokemonData[] = await fetchPokemonGroup(
            req.query["pokemonName[]"]
        ).catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
        res.status(200).json({ pokemon: JSON.stringify(pokemonDataList) });
    } else if (req.method === "GET") {
        res.status(400).json({
            error: "A Pokemon name must be specified",
        });
    } else {
        res.status(405).json({
            error: "Only GET requests are allowed at this route",
        });
    }
}

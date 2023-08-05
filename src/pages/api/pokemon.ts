import PokemonData from "@/models/PokemonData";
import { initPokemonData } from "@/utils/initializers";
import type { NextApiRequest, NextApiResponse } from "next";
import {
    ChainLink,
    EvolutionChain,
    EvolutionClient,
    Pokemon,
    PokemonClient,
    PokemonSpecies,
    PokemonSpeciesVariety,
} from "pokenode-ts";

type ResData = {
    pokemon?: string;
    error?: string;
};

const isPokemonRequest = (req: NextApiRequest): boolean => {
    return req.method === "GET" && "pokemonSlug" in req.query && typeof req.query.pokemonSlug === "string";
};

const isPokemonListRequest = (req: NextApiRequest): boolean => {
    return req.method === "GET" && "pokemonSlugList[]" in req.query && Array.isArray(req.query["pokemonSlugList[]"]);
};

const createEvolutionChains = async (stage: ChainLink, chain: string[], chains: string[][]): Promise<void> => {
    const api: PokemonClient = new PokemonClient();
    const species: PokemonSpecies = await api.getPokemonSpeciesByName(stage.species.name);

    for (const form of species.varieties) {
        chain.push(form.pokemon.name);
        if (stage.evolves_to.length === 0) {
            chains.push([...chain]);
        } else {
            for (const link of stage.evolves_to) {
                await createEvolutionChains(link, chain, chains);
            }
        }
        chain.pop();
    }
};

const fetchPokemonEvolutionChains = async (species: PokemonSpecies): Promise<string[][]> => {
    const evolutionAPI: EvolutionClient = new EvolutionClient();
    try {
        const id: number = Number(
            (species.evolution_chain.url.match(/\/evolution-chain\/(\d+)\//) as RegExpMatchArray)[1]
        );
        const chain: EvolutionChain = await evolutionAPI.getEvolutionChainById(id);
        let chains: string[][] = [];
        await createEvolutionChains(chain.chain, [], chains);
        return chains;
    } catch (error: any) {
        throw error;
    }
};

const fetchPokemon = async (pokemonSlug: string): Promise<PokemonData> => {
    const api: PokemonClient = new PokemonClient();
    try {
        const pokemon: Pokemon = await api.getPokemonByName(pokemonSlug);
        const species: PokemonSpecies = await api.getPokemonSpeciesByName(pokemon.species.name);
        const evolutions: string[][] = await fetchPokemonEvolutionChains(species);
        return initPokemonData(pokemon, species, evolutions);
    } catch (error: any) {
        throw error;
    }
};

const fetchPokemonList = async (pokemonSlugList: string[]): Promise<PokemonData[]> => {
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
    if (isPokemonRequest(req)) {
        try {
            const pokemon: void | PokemonData = await fetchPokemon(req.query.pokemonSlug as string);
            return res.status(200).json({ pokemon: JSON.stringify(pokemon) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (isPokemonListRequest(req)) {
        try {
            const pokemonDataList: void | PokemonData[] = await fetchPokemonList(
                req.query["pokemonSlugList[]"] as string[]
            );
            return res.status(200).json({ pokemon: JSON.stringify(pokemonDataList) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (req.method === "GET") {
        return res.status(400).json({
            error: "The request is missing required params",
        });
    } else {
        return res.status(405).json({
            error: "Only GET requests are allowed at this route",
        });
    }
}

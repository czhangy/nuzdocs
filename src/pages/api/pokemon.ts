import MyPokemonAbility from "@/models/PokemonAbility";
import PokemonData from "@/models/PokemonData";
import priorities from "@/static/priorities";
import { initPokemonAbility, initPokemonData } from "@/utils/initializers";
import type { NextApiRequest, NextApiResponse } from "next";
import {
    ChainLink,
    EvolutionChain,
    EvolutionClient,
    Pokemon,
    PokemonAbility,
    PokemonClient,
    PokemonSpecies,
    PokemonSpeciesVariety,
} from "pokenode-ts";

type ResData = {
    pokemon?: string;
    error?: string;
};

const isPokemonRequest = (req: NextApiRequest): boolean => {
    return (
        req.method === "GET" &&
        "pokemonSlug" in req.query &&
        typeof req.query.pokemonSlug === "string" &&
        "generation" in req.query &&
        typeof req.query.generation === "string" &&
        "group" in req.query &&
        typeof req.query.group === "string"
    );
};

const isPokemonListRequest = (req: NextApiRequest): boolean => {
    return (
        req.method === "GET" &&
        "pokemonSlugList[]" in req.query &&
        Array.isArray(req.query["pokemonSlugList[]"]) &&
        "generation" in req.query &&
        typeof req.query.generation === "string" &&
        "group" in req.query &&
        typeof req.query.group === "string"
    );
};

const createEvolutionChains = async (
    stage: ChainLink,
    chain: string[],
    chains: string[][],
    generation: string
): Promise<boolean> => {
    const api: PokemonClient = new PokemonClient();
    const species: PokemonSpecies = await api.getPokemonSpeciesByName(stage.species.name);
    if (priorities.generations.indexOf(generation) >= priorities.generations.indexOf(species.generation.name)) {
        chain.push(species.varieties.find((psv: PokemonSpeciesVariety) => psv.is_default)!.pokemon.name);
        if (stage.evolves_to.length === 0) {
            chains.push([...chain]);
        } else {
            let pushed: boolean = false;
            for (const link of stage.evolves_to) {
                pushed = (await createEvolutionChains(link, chain, chains, generation)) || pushed;
            }
            if (!pushed) {
                chains.push([...chain]);
            }
        }
        chain.pop();
        return true;
    } else {
        return false;
    }
};

const fetchPokemonEvolutionChains = async (species: PokemonSpecies, generation: string): Promise<string[][]> => {
    const evolutionAPI: EvolutionClient = new EvolutionClient();
    try {
        const id: number = Number(
            (species.evolution_chain.url.match(/\/evolution-chain\/(\d+)\//) as RegExpMatchArray)[1]
        );
        const chain: EvolutionChain = await evolutionAPI.getEvolutionChainById(id);
        const chains: string[][] = [];
        await createEvolutionChains(chain.chain, [], chains, generation);
        return chains;
    } catch (error: any) {
        throw error;
    }
};

const fetchPokemon = async (slug: string, generation: string, group: string): Promise<PokemonData> => {
    const api: PokemonClient = new PokemonClient();
    try {
        const pokemon: Pokemon = await api.getPokemonByName(slug);
        const species: PokemonSpecies = await api.getPokemonSpeciesByName(pokemon.species.name);
        const evolutions: string[][] = await fetchPokemonEvolutionChains(species, generation);
        const abilities: MyPokemonAbility[] = pokemon.abilities
            .filter((ability: PokemonAbility) => !ability.is_hidden || priorities.generations.indexOf(generation) >= 4)
            .map((ability: PokemonAbility) => initPokemonAbility(ability));
        return initPokemonData(pokemon, species, evolutions, abilities, generation, group);
    } catch (error: any) {
        throw error;
    }
};

const fetchPokemonList = async (pokemon: string[], generation: string, group: string): Promise<PokemonData[]> => {
    let promises: Promise<PokemonData>[] = [];
    pokemon.forEach((slug: string) => {
        promises.push(fetchPokemon(slug, generation, group));
    });
    try {
        return await Promise.all(promises);
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResData>) {
    if (isPokemonRequest(req)) {
        try {
            const pokemon: void | PokemonData = await fetchPokemon(
                req.query.pokemonSlug as string,
                req.query.generation as string,
                req.query.group as string
            );
            return res.status(200).json({ pokemon: JSON.stringify(pokemon) });
        } catch (error: any) {
            return res.status(500).json({
                error: error,
            });
        }
    } else if (isPokemonListRequest(req)) {
        try {
            const pokemonDataList: void | PokemonData[] = await fetchPokemonList(
                req.query["pokemonSlugList[]"] as string[],
                req.query.generation as string,
                req.query.group as string
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

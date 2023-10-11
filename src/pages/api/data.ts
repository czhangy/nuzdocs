import changedAbilities from "@/data/changed_abilities";
import { changedEvos } from "@/data/changed_evos";
import { changedStats } from "@/data/changed_stats";
import missingAbilities from "@/data/missing_abilities";
import { unusedForms } from "@/data/unused_forms";
import prisma from "@/lib/prisma";
import priorities from "@/static/priorities";
import { getEnglishName } from "@/utils/utils";
import { Descriptions, Stats, Types } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
    Ability,
    AbilityFlavorText,
    ChainLink,
    EvolutionChain,
    EvolutionClient,
    NamedAPIResource,
    Pokemon,
    PokemonClient,
    PokemonForm,
    PokemonSpecies,
    PokemonStat,
    PokemonType,
} from "pokenode-ts";

// Console color constants
const RESET: string = "\x1b[0m";
const BEGIN: string = "\x1b[33m";
const SUCCESS: string = "\x1b[32m";
const ERROR: string = "\x1b[31m";

// Get list of ability descriptions for an ability object
const getAbilityDescriptions = (ability: Ability): Descriptions[] => {
    // Get English flavor texts
    const fte = ability.flavor_text_entries.filter((aft: AbilityFlavorText) => aft.language.name === "en");

    // Map FTE object to Descriptions object
    let descriptions: Descriptions[] = fte
        .map((aft: AbilityFlavorText) => {
            return {
                desc: aft.flavor_text.replace("\n", " "),
                group: priorities.groups.indexOf(aft.version_group.name),
            };
        })
        .sort((a: Descriptions, b: Descriptions) => a.group - b.group);

    // Add local descriptions
    if (ability.name in missingAbilities) {
        descriptions = missingAbilities[ability.name];
    }

    // Log missing description errors
    if (descriptions.length === 0) {
        console.log(`Error when finding descriptions for ${ability.name}`);
    }

    // Set first entry to default description
    descriptions[0].group = -1;

    // Filter out any duplicate descriptions, saving the first occurrence only
    return descriptions.filter(
        (desc: Descriptions, i: number, arr: Descriptions[]) =>
            arr.findIndex((desc2: Descriptions) => desc.desc === desc2.desc) === i
    );
};

// Get list of all types for a Pokemon (assumes Pokemon have only changed types 1 time maximum)
const getTypes = (pokemon: Pokemon | PokemonForm): Types[] => {
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
    if ("past_types" in pokemon && pokemon.past_types.length > 0) {
        // Protect against missing generation names
        if (!(pokemon.past_types[0].generation.name in GEN_IDXS)) {
            console.log(`Error when finding past type for ${pokemon.name}`);
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

// Get lists of all adjacent evolutions for a Pokemon (assumes chains take on a tree structure in PokeAPI)
const getEvos = async (
    species: PokemonSpecies,
    evolutionAPI: EvolutionClient
): Promise<[string[] | undefined, string[] | undefined]> => {
    const evos: [string[] | undefined, string[] | undefined] = [undefined, undefined];

    // Fetch evolution chain data from PokeAPI
    const id: number = Number((species.evolution_chain.url.match(/\/evolution-chain\/(\d+)\//) as RegExpMatchArray)[1]);
    const chain: EvolutionChain = await evolutionAPI.getEvolutionChainById(id);

    let cur: [ChainLink, string | undefined] | undefined = [chain.chain, undefined];

    // Find current Pokemon within chain with DFS
    const next: [ChainLink, string | undefined][] = [];
    while (cur && cur[0].species.name !== species.name) {
        // Add all next evolutions to stack
        cur[0].evolves_to.forEach((link: ChainLink) => next.push([link, cur![0].species.name]));

        // Pop off stack and go to next link
        cur = next.pop();
    }

    // Save previous evolution
    if (cur && cur[1]) {
        evos[0] = [cur[1]];
    }

    // Save next evolutions
    if (cur && cur[0].evolves_to.length > 0) {
        evos[1] = cur[0].evolves_to.map((link: ChainLink) => link.species.name);
    }

    return evos;
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

// Create an ability and add it to the DB
const handleCreateAbility = async (pokemonAPI: PokemonClient, name: string): Promise<boolean> => {
    const GEN_IDXS: { [generation: string]: number } = {
        "generation-iii": 0,
        "generation-iv": 3,
        "generation-v": 6,
        "generation-vi": 8,
        "generation-vii": 10,
        "generation-viii": 13,
        "generation-ix": 18,
    };

    // Fetch ability data
    const ability: Ability = await pokemonAPI.getAbilityByName(name);

    // If ability is not a main series ability, fetching is done
    if (!ability.is_main_series) {
        return false;
    }

    console.log(`${BEGIN}Creating ${name}${RESET}...`);
    await prisma.abilities.create({
        data: {
            name: name in changedAbilities ? changedAbilities[name] : getEnglishName(ability.names),
            desc: getAbilityDescriptions(ability),
            group: GEN_IDXS[ability.generation.name],
        },
    });

    return true;
};

// Create a Pokemon and add it to the DB (assumes any Pokemon with forms have slugs of the format [POKEMON]-[FORM_NAME])
const handleCreatePokemon = async (
    evolutionAPI: EvolutionClient,
    species: PokemonSpecies,
    pokemon: Pokemon
): Promise<void> => {
    if (!pokemon.sprites.front_default) {
        // Log sprite error
        console.log(`${ERROR}Error finding sprite for ${pokemon.name}${RESET}`);
    } else {
        // Get evolutions
        const evos: (string[] | undefined)[] =
            pokemon.name in changedEvos ? changedEvos[pokemon.name] : await getEvos(species, evolutionAPI);

        console.log(`${BEGIN}Creating ${pokemon.name}${RESET}...`);
        await prisma.pokemon.create({
            data: {
                slug: pokemon.name,
                name: getEnglishName(species.names),
                types: getTypes(pokemon),
                sprite: pokemon.sprites.front_default,
                prevEvolutions: evos[0],
                nextEvolutions: evos[1],
                stats: getStats(pokemon),
                formChangeable: species.forms_switchable,
            },
        });
    }
};

// Create a Pokemon form and add it to the DB
const handleCreateForm = async (
    evolutionAPI: EvolutionClient,
    species: PokemonSpecies,
    form: PokemonForm,
    pokemon: Pokemon
): Promise<void> => {
    if (!form.sprites.front_default) {
        // Log sprite error
        console.log(`${ERROR}Error finding sprite for ${form.name}${RESET}`);
    } else {
        // Get evolutions
        const evos: (string[] | undefined)[] =
            form.name in changedEvos ? changedEvos[form.name] : await getEvos(species, evolutionAPI);

        console.log(`${BEGIN}Creating ${form.name}${RESET}...`);
        await prisma.pokemon.create({
            data: {
                slug: form.name,
                name: getEnglishName(species.names),
                types: getTypes(form),
                sprite: form.sprites.front_default,
                prevEvolutions: evos[0],
                nextEvolutions: evos[1],
                stats: getStats(pokemon),
                formChangeable: species.forms_switchable,
            },
        });
    }
};

// Fetch ability data from PokeAPI and format it into proper schema
const createAbilities = async (clear: boolean): Promise<void> => {
    console.log(`${BEGIN}Updating abilities collection...${RESET}`);

    // Clear table
    if (clear) {
        await prisma.abilities.deleteMany({});
    }

    // Init API wrappers
    const pokemonAPI: PokemonClient = new PokemonClient();

    // Get number of abilities
    const count: number = (await pokemonAPI.listAbilities()).count;

    // Get list of ability names
    const abilities: string[] = (await pokemonAPI.listAbilities(0, count)).results.map(
        (ability: NamedAPIResource) => ability.name
    );

    // Fetch data for each ability
    for (const ability of abilities) {
        // Check if all main series abilities have been processed
        if (!(await handleCreateAbility(pokemonAPI, ability))) {
            break;
        }
    }

    console.log(`${SUCCESS}Abilities collection updated!${RESET}`);
};

// Fetch Pokemon data from PokeAPI and format it into proper schema
const createPokemon = async (clear: boolean, start: number, end: number): Promise<void> => {
    console.log(`${BEGIN}Updating Pokemon collection from #${start} to #${end}...${RESET}`);

    // Clear table
    if (clear) {
        await prisma.pokemon.deleteMany({});
    }

    // Init API wrappers
    const pokemonAPI: PokemonClient = new PokemonClient();
    const evolutionAPI: EvolutionClient = new EvolutionClient();

    for (let i = start; i <= end; i++) {
        // Fetch species
        const species: PokemonSpecies = await pokemonAPI.getPokemonSpeciesById(i);

        // Iterate through each variety of the Pokemon species
        for (const variety of species.varieties) {
            // Ignore unused forms
            if (unusedForms.some((affix: string) => variety.pokemon.name.includes(affix))) {
                continue;
            }

            // Fetch Pokemon object
            const pokemon: Pokemon = await pokemonAPI.getPokemonByName(variety.pokemon.name);

            // Handle DB update based on # of forms
            if (pokemon.forms.length === 1) {
                await handleCreatePokemon(evolutionAPI, species, pokemon);
            } else {
                for (const form of pokemon.forms) {
                    // Ignore unused forms
                    if (
                        unusedForms.some((affix: string) => form.name.includes(affix)) ||
                        (variety.pokemon.name === "unown" && form.name !== "unown-question")
                    ) {
                        continue;
                    }

                    await handleCreateForm(
                        evolutionAPI,
                        species,
                        await pokemonAPI.getPokemonFormByName(form.name),
                        pokemon
                    );
                }
            }
        }
    }

    console.log(`${SUCCESS}Pokemon collection updated!${RESET}`);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // Disable this handler in prod
    if (process.env.NODE_ENV === "development") {
        const modified: string[] = [];
        const clear: boolean = "clear" in req.query;

        // Update ability data if requested
        if ("abilities" in req.query) {
            await createAbilities(clear);
            modified.push("Abilities");
        }

        // Update Pokemon data if requested
        if ("pokemon" in req.query) {
            // Get options
            const start: number = parseInt(req.query.start as string);
            const end: number = parseInt(req.query.end as string);

            await createPokemon(clear, start, end);
            modified.push("Pokemon");
        }

        console.log(`${SUCCESS}DB update complete!${RESET}`);
        return res.status(200).json({ mode: clear ? "Clear" : "Update", modified: modified });
    } else {
        return res.status(403).json("Forbidden");
    }
}

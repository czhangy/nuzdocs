import changedAbilities from "@/data/changed_abilities";
import changedEvos from "@/data/changed_evos";
import changedPokemonAbilities from "@/data/changed_pokemon_abilities";
import changedStats from "@/data/changed_stats";
import unusedForms from "@/data/unused_forms";
import usedItems from "@/data/used_items";
import prisma from "@/lib/prisma";
import priorities from "@/static/priorities";
import { getEnglishName } from "@/utils/utils";
import { Description, MoveClass, MoveNum, MoveType, PokemonAbilities, PokemonType, Stats } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
    Ability,
    AbilityFlavorText,
    ChainLink,
    EvolutionChain,
    EvolutionClient,
    Item,
    ItemClient,
    Move,
    MoveClient,
    MoveFlavorText,
    NamedAPIResource,
    Pokemon,
    PokemonAbility,
    PokemonClient,
    PokemonForm,
    PokemonMove,
    PokemonSpecies,
    PokemonStat,
    PokemonType as Type,
    VersionGroupFlavorText,
} from "pokenode-ts";

// ---------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------------------------------------------------

const RESET: string = "\x1b[0m";
const BEGIN: string = "\x1b[33m";
const SUCCESS: string = "\x1b[32m";
const ERROR: string = "\x1b[31m";
const FETCH_LIMIT: number = 100;
const ID_IDX: number = -2;
const ID_BREAKPOINT: number = 10000;

// ---------------------------------------------------------------------------------------------------------------------
// PROPERTY GETTERS
// ---------------------------------------------------------------------------------------------------------------------

// Get list of descriptions for an ability/move
const getDescriptions = (
    fte: AbilityFlavorText[] | MoveFlavorText[] | VersionGroupFlavorText[],
    name: string
): Description[] => {
    // Map FTE object to Descriptions object
    let descriptions: Description[] = fte
        .map((ft: AbilityFlavorText | MoveFlavorText | VersionGroupFlavorText) => {
            const text: string = "flavor_text" in ft ? ft.flavor_text : ft.text;
            return {
                desc: text.replaceAll("\n", " "),
                group: priorities.groups.indexOf(ft.version_group.name),
            };
        })
        .sort((a: Description, b: Description) => a.group - b.group);

    // Log missing description errors
    if (descriptions.length === 0) {
        console.log(`${ERROR}Error when finding descriptions for ${name}${RESET}`);
        return [];
    }

    // Set first entry to default description
    descriptions[0].group = -1;

    // Filter out any duplicate descriptions, saving the first occurrence only
    return descriptions.filter(
        (desc: Description, i: number, arr: Description[]) =>
            arr.findIndex((desc2: Description) => desc.desc === desc2.desc) === i
    );
};

// Get list of all types for a move
const getMoveTypes = (move: Move): MoveType[] => {
    const types: MoveType[] = [];
    let currentGroup = -1;

    // Add past types
    for (const pastValue of move.past_values) {
        if (pastValue.type) {
            types.push({ type: pastValue.type.name, group: currentGroup });
            currentGroup = priorities.groups.indexOf(pastValue.version_group.name);
        }
    }

    // Add most recent type
    types.push({ type: move.type.name, group: currentGroup });

    return types;
};

// Get damage class of a move
const getMoveClass = (move: Move): MoveClass[] => {
    const PRE_SPLIT_GENS: string[] = ["generation-i", "generation-ii", "generation-iii"];
    const PHYSICAL_TYPES: string[] = [
        "normal",
        "fighting",
        "poison",
        "ground",
        "flying",
        "bug",
        "rock",
        "ghost",
        "steel",
    ];
    const GEN_4_IDX: number = 3;

    const classes: MoveClass[] = [];
    let currentGroup = -1;

    // Log any damage class errors
    if (!move.damage_class) {
        console.log(`${ERROR}Error when finding damage class for ${move.name}${RESET}`);
        return [];
    }

    // Add pre-split class if the move is Gen III or earlier
    if (PRE_SPLIT_GENS.includes(move.generation.name)) {
        if (move.damage_class.name === "physical" && !PHYSICAL_TYPES.includes(move.type.name)) {
            classes.push({ class: "special", group: -1 });
            currentGroup = GEN_4_IDX;
        } else if (move.damage_class.name === "special" && PHYSICAL_TYPES.includes(move.type.name)) {
            classes.push({ class: "physical", group: -1 });
            currentGroup = GEN_4_IDX;
        }
    }

    // Add most recent damage class
    classes.push({ class: move.damage_class!.name as "physical" | "special" | "status", group: currentGroup });

    return classes;
};

// Get base power of a move
const getMoveBP = (move: Move): MoveNum[] => {
    const bp: MoveNum[] = [];
    let currentGroup: number = -1;

    // Add any past BPs
    for (const pastValue of move.past_values) {
        if (pastValue.power) {
            bp.push({ num: pastValue.power, group: currentGroup });
            currentGroup = priorities.groups.indexOf(pastValue.version_group.name);
        }
    }

    // Add current BP
    bp.push({ num: move.power ? move.power : 0, group: currentGroup });

    return bp;
};

// Get PP of a move
const getMovePP = (move: Move): MoveNum[] => {
    const pp: MoveNum[] = [];
    let currentGroup: number = -1;

    // Add any past PPs
    for (const pastValue of move.past_values) {
        if (pastValue.pp) {
            pp.push({ num: pastValue.pp, group: currentGroup });
            currentGroup = priorities.groups.indexOf(pastValue.version_group.name);
        }
    }

    // Log any PP errors
    if (!move.pp) {
        console.log(`${ERROR}Error when finding PP for ${move.name}${RESET}`);
        return [];
    }

    // Add current PP
    pp.push({ num: move.pp!, group: currentGroup });

    return pp;
};

// Get list of all types for a Pokemon (assumes Pokemon have only changed types 1 time maximum)
const getPokemonTypes = (pokemon: Pokemon | PokemonForm): PokemonType[] => {
    const GEN_IDXS: { [generation: string]: number } = {
        "generation-iii": 3,
        "generation-iv": 6,
        "generation-v": 8,
        "generation-vi": 10,
        "generation-vii": 13,
        "generation-viii": 18,
    };

    const types: PokemonType[] = [];
    let currentGroup: number = -1;

    // Insert any past typings
    if ("past_types" in pokemon && pokemon.past_types.length > 0) {
        // Protect against missing generation names
        if (!(pokemon.past_types[0].generation.name in GEN_IDXS)) {
            console.log(`${ERROR}Error when finding past type for ${pokemon.name}${RESET}`);
        }

        types.push({
            types: pokemon.past_types[0].types.map((type: Type) => type.type.name),
            group: -1,
        });

        // Update group for most recent typing
        currentGroup = GEN_IDXS[pokemon.past_types[0].generation.name];
    }

    // Insert most recent typing
    types.push({
        types: pokemon.types.map((type: Type) => type.type.name),
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
    if (pokemon.name in changedStats) {
        stats.push({ stats: changedStats[pokemon.name][0], group: -1 });
        currentGroup = changedStats[pokemon.name][1];
    }

    // Get most recent stats from PokeAPI
    const recent: number[] = [];
    pokemon.stats.forEach((stat: PokemonStat) => (recent[STAT_ORDER.indexOf(stat.stat.name)] = stat.base_stat));
    stats.push({ stats: recent, group: currentGroup });

    return stats;
};

// Get abilities for a Pokemon
const getAbilities = (pokemon: Pokemon): PokemonAbilities[] => {
    const abilities: PokemonAbilities[] = [];
    let currentGroup: number = -1;

    // Get local abilities
    if (pokemon.name in changedPokemonAbilities) {
        abilities.push({ abilities: changedPokemonAbilities[pokemon.name][0], group: -1 });
        currentGroup = changedPokemonAbilities[pokemon.name][1];
    }

    // Get most recent abilities from PokeAPI
    let recent: [string, string, string] = ["", "", ""];
    pokemon.abilities.map((ability: PokemonAbility) => (recent[ability.slot - 1] = ability.ability.name));
    abilities.push({
        abilities: recent,
        group: currentGroup,
    });

    return abilities;
};

// ---------------------------------------------------------------------------------------------------------------------
// CREATE API
// ---------------------------------------------------------------------------------------------------------------------

// Create an ability and add it to the DB
const handleCreateAbility = async (pokemonAPI: PokemonClient, id: number): Promise<void> => {
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
    const ability: Ability = await pokemonAPI.getAbilityById(id);

    console.log(`${BEGIN}Creating [${id}] ${ability.name}${RESET}...`);
    await prisma.abilities.create({
        data: {
            slug: ability.name,
            name: ability.name in changedAbilities ? changedAbilities[ability.name] : getEnglishName(ability.names),
            desc: getDescriptions(
                ability.flavor_text_entries.filter((aft: AbilityFlavorText) => aft.language.name === "en"),
                ability.name
            ),
            group: GEN_IDXS[ability.generation.name],
        },
    });
};

// Create an item and add it to the DB
const handleCreateItem = async (itemAPI: ItemClient, name: string): Promise<void> => {
    // Fetch item data
    const item: Item = await itemAPI.getItemByName(name);

    console.log(`${BEGIN}Creating ${name}${RESET}...`);
    await prisma.items.create({
        data: {
            slug: name,
            name: getEnglishName(item.names),
            sprite: item.sprites.default,
            desc: getDescriptions(
                item.flavor_text_entries.filter((vgft: VersionGroupFlavorText) => vgft.language.name === "en"),
                item.name
            ),
        },
    });
};

// Create a move and add it to the DB
const handleCreateMove = async (moveAPI: MoveClient, id: number): Promise<void> => {
    // Fetch move data
    const move: Move = await moveAPI.getMoveById(id);

    console.log(`${BEGIN}Creating [${id}] ${move.name}${RESET}...`);
    await prisma.moves.create({
        data: {
            slug: move.name,
            name: getEnglishName(move.names),
            type: getMoveTypes(move),
            class: getMoveClass(move),
            bp: getMoveBP(move),
            pp: getMovePP(move),
            desc: getDescriptions(
                move.flavor_text_entries.filter((mft: MoveFlavorText) => mft.language.name === "en"),
                move.name
            ),
        },
    });
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

        console.log(`${BEGIN}Creating [${pokemon.id}] ${pokemon.name}${RESET}...`);
        await prisma.pokemon.create({
            data: {
                slug: pokemon.name,
                name: getEnglishName(species.names),
                types: getPokemonTypes(pokemon),
                sprite: pokemon.sprites.front_default,
                prevEvolutions: evos[0],
                nextEvolutions: evos[1],
                stats: getStats(pokemon),
                abilities: getAbilities(pokemon),
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
                types: getPokemonTypes(form),
                sprite: form.sprites.front_default,
                prevEvolutions: evos[0],
                nextEvolutions: evos[1],
                stats: getStats(pokemon),
                formChangeable: species.forms_switchable,
            },
        });
    }
};

// ---------------------------------------------------------------------------------------------------------------------
// CONTROLLERS
// ---------------------------------------------------------------------------------------------------------------------

// Fetch ability data from PokeAPI and format it into proper schema
const createAbilities = async (clear: boolean, start: number): Promise<void> => {
    console.log(`${BEGIN}Updating abilities collection from ability #${start}...${RESET}`);

    // Clear table
    if (clear) {
        await prisma.abilities.deleteMany({});
    }

    // Init API wrapper
    const pokemonAPI: PokemonClient = new PokemonClient();

    // Get number of abilities
    const count: number = (await pokemonAPI.listAbilities()).count;

    // Fetch abilities 100 at a time
    for (let i = start - 1; i < count; i += FETCH_LIMIT) {
        // Filter out abilities that aren't from a main series game
        const abilities: NamedAPIResource[] = (await pokemonAPI.listAbilities(i, FETCH_LIMIT)).results.filter(
            (result: NamedAPIResource) => parseInt(result.url.split("/").at(ID_IDX) as string) < ID_BREAKPOINT
        );

        // Fetch data for each ability
        for (let j = i; j < i + abilities.length; j++) {
            await handleCreateAbility(pokemonAPI, j + 1);
        }
    }

    console.log(`${SUCCESS}Abilities collection updated!${RESET}`);
};

// Fetch item data from PokeAPI and format it into proper schema
const createItems = async (clear: boolean): Promise<void> => {
    console.log(`${BEGIN}Updating items collection...${RESET}`);

    // Clear table
    if (clear) {
        await prisma.abilities.deleteMany({});
    }

    // Init API wrapper
    const itemAPI: ItemClient = new ItemClient();

    // Fetch all needed items
    for (const item of usedItems) {
        await handleCreateItem(itemAPI, item);
    }

    console.log(`${SUCCESS}Items collection updated!${RESET}`);
};

// Getch move data from PokeAPI and format it into proper schema
const createMoves = async (clear: boolean, start: number): Promise<void> => {
    console.log(`${BEGIN}Updating moves collection from move #${start}...${RESET}`);

    // Clear table
    if (clear) {
        await prisma.moves.deleteMany({});
    }

    // Init API wrapper
    const moveAPI: MoveClient = new MoveClient();

    // Get number of moves
    const count: number = (await moveAPI.listMoves()).count;

    // Fetch moves 100 at a time
    for (let i = start - 1; i < count; i += FETCH_LIMIT) {
        // Filter out moves that aren't from a main series game
        const moves: NamedAPIResource[] = (await moveAPI.listMoves(i, FETCH_LIMIT)).results.filter(
            (result: NamedAPIResource) => parseInt(result.url.split("/").at(ID_IDX) as string) < ID_BREAKPOINT
        );

        // Fetch data for each move
        for (let j = i; j < i + moves.length; j++) {
            await handleCreateMove(moveAPI, j + 1);
        }
    }

    console.log(`${SUCCESS}Moves collection updated!${RESET}`);
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

// ---------------------------------------------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // Disable this handler in prod
    if (process.env.NODE_ENV === "development") {
        const modified: string[] = [];
        const clear: boolean = "clear" in req.query;

        // Update ability data if requested
        if ("abilities" in req.query) {
            await createAbilities(clear, parseInt(req.query.abilities_start as string));
            modified.push("Abilities");
        }

        // Update item data if requested
        if ("items" in req.query) {
            await createItems(clear);
            modified.push("Items");
        }

        // Update move data if requested
        if ("moves" in req.query) {
            await createMoves(clear, parseInt(req.query.moves_start as string));
            modified.push("Moves");
        }

        // Update Pokemon data if requested
        if ("pokemon" in req.query) {
            await createPokemon(
                clear,
                parseInt(req.query.pokemon_start as string),
                parseInt(req.query.pokemon_end as string)
            );
            modified.push("Pokemon");
        }

        console.log(`${SUCCESS}DB update complete!${RESET}`);
        return res.status(200).json({ mode: clear ? "Clear" : "Update", modified: modified });
    } else {
        return res.status(403).json("Forbidden");
    }
}

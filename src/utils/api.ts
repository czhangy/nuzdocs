import AbilityData from "@/models/AbilityData";
import GameGroup from "@/models/GameGroup";
import { getGameGroup } from "./game";
import ItemData from "@/models/ItemData";

// IDK why but this errors when using import
const axios = require("axios");

// Fetch LocationData given a location slug
export const fetchLocation = async (slug: string) => {
    try {
        const res = await axios.get("/api/location", {
            params: {
                locationSlug: slug,
            },
        });
        return JSON.parse(res.data.location);
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Fetch a list of AreaData given area and game slugs
export const fetchAreas = async (areas: string[], gameSlug: string) => {
    try {
        const res = await axios.get("/api/location", {
            params: {
                areaSlugList: areas,
                gameSlug: gameSlug,
            },
        });
        return JSON.parse(res.data.areaList);
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Fetch AbilityData given slug
export const fetchAbility = async (ability: string, game: string): Promise<AbilityData | null> => {
    try {
        const group: string = getGameGroup(game).versionGroup;
        const res = await axios.get("/api/abilities", {
            params: {
                ability: ability,
                versionGroup: group,
            },
        });
        return JSON.parse(res.data.ability);
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchAbilities = async (abilities: string[], game: string): Promise<AbilityData[]> => {
    try {
        if (abilities.length === 0) {
            return [];
        } else if (abilities.length === 1) {
            const ability: AbilityData | null = await fetchAbility(abilities[0], game);
            return ability ? [ability] : [];
        } else {
            const group: string = getGameGroup(game).versionGroup;
            const res = await axios.get("/api/abilities", {
                params: {
                    ability: abilities,
                    versionGroup: group,
                },
            });
            return JSON.parse(res.data.ability);
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Fetch a list of MoveData given slugs
export const fetchMoves = async (moveSlugs: string[]) => {
    try {
        const res = await axios.get("/api/moves", {
            params: {
                moveSlugs: moveSlugs,
            },
        });
        return JSON.parse(res.data.moves);
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Fetch a Pokemon by their Pokemon slug
export const fetchPokemon = async (pokemonSlug: string, gameSlug: string) => {
    try {
        const group: GameGroup = getGameGroup(gameSlug);
        const res = await axios.get("/api/pokemon", {
            params: {
                pokemonSlug: pokemonSlug,
                generation: group.generation,
                versionGroup: group.versionGroup,
            },
        });
        return JSON.parse(res.data.pokemon);
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Fetch a list of PokemonData given Pokemon slugs
export const fetchPokemonGroup = async (pokemonSlugs: string[], gameSlug: string) => {
    try {
        if (pokemonSlugs.length === 1) {
            return [await fetchPokemon(pokemonSlugs[0], gameSlug)];
        } else {
            const group: GameGroup = getGameGroup(gameSlug);
            const res = await axios.get("/api/pokemon", {
                params: {
                    pokemonSlugList: pokemonSlugs,
                    generation: group.generation,
                    versionGroup: group.versionGroup,
                },
            });
            return JSON.parse(res.data.pokemon);
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const fetchItem = async (item: string, game: string): Promise<ItemData | null> => {
    try {
        const group: string = getGameGroup(game).versionGroup;
        const res = await axios.get("/api/items", {
            params: {
                item: item,
                versionGroup: group,
            },
        });
        return JSON.parse(res.data.item);
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchItems = async (items: string[], game: string): Promise<ItemData[]> => {
    try {
        if (items.length === 0) {
            return [];
        } else if (items.length === 1) {
            const item: ItemData | null = await fetchItem(items[0], game);
            return item ? [item] : [];
        } else {
            const group: string = getGameGroup(game).versionGroup;
            const res = await axios.get("/api/items", {
                params: {
                    item: items,
                    versionGroup: group,
                },
            });
            return JSON.parse(res.data.item);
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

import AbilityData from "@/models/AbilityData";
import GameData from "@/models/GameData";
import ItemData from "@/models/ItemData";
import MoveData from "@/models/MoveData";
import { getGameData } from "@/utils/game";

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
export const fetchAreas = async (areas: string[], game: string) => {
    try {
        if (areas.length === 0) {
            return [];
        } else {
            const res = await axios.get("/api/location", {
                params: {
                    areaSlugList: areas,
                    gameSlug: game,
                },
            });
            return JSON.parse(res.data.areaList);
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Fetch AbilityData given slug
export const fetchAbility = async (ability: string, game: string): Promise<AbilityData | null> => {
    try {
        const group: string = getGameData(game).versionGroup;
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
            const group: string = getGameData(game).versionGroup;
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

export const fetchMove = async (move: string, game: string): Promise<MoveData | null> => {
    try {
        const res = await axios.get("/api/moves", {
            params: {
                slugs: move,
                group: getGameData(game).versionGroup,
            },
        });
        return JSON.parse(res.data.moves);
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchMoves = async (moves: string[], game: string): Promise<MoveData[]> => {
    try {
        if (moves.length === 0) {
            return [];
        } else if (moves.length === 1) {
            const move: MoveData | null = await fetchMove(moves[0], game);
            return move ? [move] : [];
        } else {
            const res = await axios.get("/api/moves", {
                params: {
                    slugs: moves,
                    group: getGameData(game).versionGroup,
                },
            });
            return JSON.parse(res.data.moves);
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Fetch a Pokemon by their Pokemon slug, given the game
export const fetchPokemon = async (slug: string, game: string) => {
    try {
        const group: GameData = getGameData(game);
        const res = await axios.get("/api/pokemon", {
            params: {
                pokemonSlug: slug,
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

// Fetch a list of PokemonData given Pokemon slugs and game
export const fetchPokemonList = async (slugs: string[], game: string) => {
    try {
        if (slugs.length === 0) {
            return [];
        } else if (slugs.length === 1) {
            return [await fetchPokemon(slugs[0], game)];
        } else {
            const group: GameData = getGameData(game);
            const res = await axios.get("/api/pokemon", {
                params: {
                    pokemonSlugList: slugs,
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
        const group: string = getGameData(game).versionGroup;
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
            const group: string = getGameData(game).versionGroup;
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

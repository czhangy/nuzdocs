import GameGroup from "@/models/GameGroup";

// IDK why but this errors when using import
const axios = require("axios");

// Fetch LocationData given a location slug
export const fetchLocation = async (locationSlug: string) => {
    try {
        const res = await axios.get("/api/location", {
            params: {
                locationSlug: locationSlug,
            },
        });
        return JSON.parse(res.data.location);
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Fetch a list of AreaData given area and game slugs
export const fetchAreas = async (areaSlugs: string[], gameSlug: string) => {
    try {
        const res = await axios.get("/api/location", {
            params: {
                areaSlugList: areaSlugs,
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
export const fetchAbility = async (abilitySlug: string) => {
    try {
        const res = await axios.get("/api/abilities", {
            params: {
                abilitySlug: abilitySlug,
            },
        });
        return JSON.parse(res.data.ability);
    } catch (error) {
        console.log(error);
        return null;
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
export const fetchPokemon = async (pokemonSlug: string, gameGroup: GameGroup) => {
    try {
        const res = await axios.get("/api/pokemon", {
            params: {
                pokemonSlug: pokemonSlug,
                generation: gameGroup.generation,
                versionGroup: gameGroup.versionGroup,
            },
        });
        return JSON.parse(res.data.pokemon);
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Fetch a list of PokemonData given Pokemon slugs
export const fetchPokemonGroup = async (pokemonSlugList: string[], gameGroup: GameGroup) => {
    try {
        if (pokemonSlugList.length === 1) {
            return [await fetchPokemon(pokemonSlugList[0], gameGroup)];
        }
        const res = await axios.get("/api/pokemon", {
            params: {
                pokemonSlugList: pokemonSlugList,
                generation: gameGroup.generation,
                versionGroup: gameGroup.versionGroup,
            },
        });
        return JSON.parse(res.data.pokemon);
    } catch (error) {
        console.log(error);
        return [];
    }
};

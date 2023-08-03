// IDK why but this errors when using import
const axios = require("axios");

// Fetch PokemonData for a single Pokemon given a Pokemon slug
export const fetchPokemon = async (pokemonSlug: string) => {
    try {
        const res = await axios.get("/api/pokemon", {
            params: {
                pokemonSlug: pokemonSlug,
            },
        });
        return JSON.parse(res.data.pokemon);
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Fetch a list of PokemonData given Pokemon slugs
export const fetchPokemonGroup = async (pokemonSlugs: string[]) => {
    try {
        if (pokemonSlugs.length === 1) {
            return [await fetchPokemon(pokemonSlugs[0])];
        }
        const res = await axios.get("/api/pokemon", {
            params: {
                pokemonSlugList: pokemonSlugs,
            },
        });
        return JSON.parse(res.data.pokemon);
    } catch (error) {
        console.log(error);
        return [];
    }
};

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

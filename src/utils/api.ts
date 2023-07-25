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

// IDK why but this errors when using import
const axios = require("axios");

// Fetch PokemonData for a single Pokemon given a slug
export const fetchPokemon = async (slug: string) => {
    try {
        const res = await axios.get("/api/pokemon", {
            params: {
                pokemonSlug: slug,
            },
        });
        return JSON.parse(res.data.pokemon);
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Fetch LocationData given a slug
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

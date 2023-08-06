import Trainer from "@/models/Trainer";

const trainers: { [trainerSlug: string]: Trainer } = {
    silver: {
        name: "Silver",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/silver.png",
    },
    elder_li: {
        name: "Elder Li",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/li.png",
    },
    falkner: {
        name: "Falkner",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/falkner.png",
    },
};

export default trainers;

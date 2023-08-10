import Trainer from "@/models/Trainer";

const trainers: { [trainerSlug: string]: Trainer } = {
    emerald_may: {
        name: "May",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/may-gen3.png",
    },
    emerald_roxanne: {
        name: "Roxanne",
        sprite: "https://play.pokemonshowdown.com/sprites/trainers/roxanne-gen3.png",
    },
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

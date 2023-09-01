import Game from "@/models/Game";
import rs from "@/static/rs";

const games: { [game: string]: Game } = {
    ruby: {
        name: "Ruby",
        logo: "/assets/images/ruby.webp",
        data: rs,
    },
    sapphire: {
        name: "Sapphire",
        logo: "/assets/images/sapphire.webp",
        data: rs,
    },
};

export default games;

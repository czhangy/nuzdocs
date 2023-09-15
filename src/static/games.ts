import Game from "@/models/Game";
import emerald from "@/static/emerald";
import ruby_sapphire from "@/static/ruby_sapphire";

const games: { [game: string]: Game } = {
    ruby: {
        name: "Ruby",
        logo: "/assets/images/ruby.webp",
        data: ruby_sapphire,
    },
    sapphire: {
        name: "Sapphire",
        logo: "/assets/images/sapphire.webp",
        data: ruby_sapphire,
    },
    emerald: {
        name: "Emerald",
        logo: "/assets/images/emerald.webp",
        data: emerald,
    },
};

export default games;

import Game from "@/models/Game";
import emerald from "@/static/emerald";
import hgss from "@/static/hgss";
import rs from "@/static/ruby_sapphire";

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
    emerald: {
        name: "Emerald",
        logo: "/assets/images/emerald.webp",
        data: emerald,
    },
    soulsilver: {
        name: "SoulSilver",
        logo: "/assets/images/soulsilver.webp",
        data: hgss,
    },
};

export default games;

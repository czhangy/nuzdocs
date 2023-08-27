import Game from "@/models/Game";
import emerald from "@/static/emerald";
import hgss from "@/static/hgss";
import ruby from "@/static/ruby";
import sapphire from "@/static/sapphire";

const games: { [game: string]: Game } = {
    ruby: {
        name: "Ruby",
        logo: "/assets/images/ruby.webp",
        data: ruby,
    },
    sapphire: {
        name: "Sapphire",
        logo: "/assets/images/sapphire.webp",
        data: sapphire,
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

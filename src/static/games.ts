import Game from "@/models/Game";
import emerald from "@/static/emerald";
import hgss from "@/static/hgss";
import ruby from "@/static/ruby";
import sapphire from "@/static/sapphire";

const games: { [gameSlug: string]: Game } = {
    ruby: {
        name: "Ruby",
        logoURL: "/assets/images/ruby.webp",
        data: ruby,
    },
    sapphire: {
        name: "Sapphire",
        logoURL: "/assets/images/sapphire.webp",
        data: sapphire,
    },
    emerald: {
        name: "Emerald",
        logoURL: "/assets/images/emerald.webp",
        data: emerald,
    },
    soulsilver: {
        name: "SoulSilver",
        logoURL: "/assets/images/soulsilver.webp",
        data: hgss,
    },
};

export default games;

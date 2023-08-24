import Game from "@/models/Game";
import emerald from "@/static/emerald";
import hgss from "@/static/hgss";
import ruby from "@/static/ruby";
import sapphire from "@/static/sapphire";

const games: { [gameSlug: string]: Game } = {
    ruby: {
        name: "Ruby",
        logoURL: "/assets/images/ruby.webp",
        gameGroup: ruby,
    },
    sapphire: {
        name: "Sapphire",
        logoURL: "/assets/images/sapphire.webp",
        gameGroup: sapphire,
    },
    emerald: {
        name: "Emerald",
        logoURL: "/assets/images/emerald.webp",
        gameGroup: emerald,
    },
    soulsilver: {
        name: "SoulSilver",
        logoURL: "/assets/images/soulsilver.webp",
        gameGroup: hgss,
    },
};

export default games;

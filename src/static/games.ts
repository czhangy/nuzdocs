import Game from "@/models/Game";
import emerald from "@/static/emerald";
import hgss from "@/static/hgss";

const games: { [gameSlug: string]: Game } = {
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

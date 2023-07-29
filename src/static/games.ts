import Game from "@/models/Game";
import hgss from "@/static/hgss";

const games: { [gameSlug: string]: Game } = {
    soulsilver: {
        name: "SoulSilver",
        logoURL: "/assets/images/soulsilver.webp",
        gameGroup: hgss,
    },
};

export default games;

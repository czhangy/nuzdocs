import Game from "@/models/Game";
import emerald from "@/static/emerald";

const games: { [game: string]: Game } = {
    emerald: {
        name: "Emerald",
        logo: "/assets/images/emerald.webp",
        data: emerald,
    },
};

export default games;

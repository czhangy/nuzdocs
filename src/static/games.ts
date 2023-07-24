import Game from "@/models/Game";
import soulsilver from "@/static/soulsilver";

const games: { [gameSlug: string]: Game } = {
    soulsilver: soulsilver,
};

export default games;

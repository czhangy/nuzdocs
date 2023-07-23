import Game from "@/models/Game";
import SoulSilver from "@/static/soulsilver";

const Games: { [gameSlug: string]: Game } = {
    soulsilver: SoulSilver,
};

export default Games;

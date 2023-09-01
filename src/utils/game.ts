import Game from "@/models/Game";
import GameData from "@/models/GameData";
import Segment from "@/models/Segment";
import games from "@/static/games";

// Getters
export const getGameSlugs = (): string[] => {
    return Object.keys(games);
};

export const getGame = (gameSlug: string): Game => {
    return games[gameSlug];
};

export const getGameData = (gameSlug: string): GameData => {
    return getGame(gameSlug).data;
};

export const getSegments = (game: string): Segment[] => {
    const segments: Segment[] = [];
    for (const split of getGameData(game).splits) {
        segments.push(
            ...split.segments.filter((segment: Segment) => segment.version === undefined || segment.version === game)
        );
    }
    return segments;
};

import Game from "@/models/Game";
import GameGroup from "@/models/GameGroup";
import LocalName from "@/models/LocalName";
import Segment from "@/models/Segment";
import games from "@/static/games";

// Getters
export const getGame = (gameSlug: string): Game => {
    return games[gameSlug];
};

export const getGameGroup = (gameSlug: string): GameGroup => {
    return getGame(gameSlug).gameGroup;
};

export const getPokedex = (gameSlug: string): LocalName[] => {
    return getGameGroup(gameSlug).pokedex;
};

export const getSegments = (gameSlug: string): { [segmentSlug: string]: Segment } => {
    return getGameGroup(gameSlug).segments;
};

import Game from "@/models/Game";
import GameGroup from "@/models/GameGroup";
import PokemonName from "@/models/PokemonName";
import Segment from "@/models/Segment";
import games from "@/static/games";

// Getters
export const getGame = (gameSlug: string): Game => {
    return games[gameSlug];
};

export const getGameGroup = (gameSlug: string): GameGroup => {
    return getGame(gameSlug).gameGroup;
};

export const getPokedex = (gameSlug: string): PokemonName[] => {
    return getGameGroup(gameSlug).pokedex;
};

export const getSegments = (gameSlug: string): { [segmentSlug: string]: Segment } => {
    const segmentObjs: { [segmentSlug: string]: Segment }[] = Object.values(getGameGroup(gameSlug).segments);
    return Object.assign({}, ...segmentObjs);
};

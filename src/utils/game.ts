import BattleSegment from "@/models/BattleSegment";
import Game from "@/models/Game";
import GameGroup from "@/models/GameGroup";
import PokemonName from "@/models/PokemonName";
import Segment from "@/models/Segment";
import games from "@/static/games";

// Getters
export const getGameSlugs = (): string[] => {
    return Object.keys(games);
};

export const getGame = (gameSlug: string): Game => {
    return games[gameSlug];
};

export const getGameGroup = (gameSlug: string): GameGroup => {
    return getGame(gameSlug).gameGroup;
};

export const getPokedex = (gameSlug: string): PokemonName[] => {
    return getGameGroup(gameSlug).pokedex;
};

export const getSplitNames = (gameSlug: string) => {
    return Object.keys(getSplits(gameSlug));
};

export const getSplits = (gameSlug: string): { [split: string]: { [segmentSlug: string]: Segment } } => {
    return getGameGroup(gameSlug).splits;
};

export const getSegmentsInSplit = (split: string, gameSlug: string): { [segmentSlug: string]: Segment } => {
    return getGameGroup(gameSlug).splits[split];
};

export const getSegments = (gameSlug: string): { [segmentSlug: string]: Segment } => {
    const segmentObjs: { [segmentSlug: string]: Segment }[] = Object.values(getGameGroup(gameSlug).splits);
    return Object.assign({}, ...segmentObjs);
};

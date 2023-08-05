import Game from "@/models/Game";
import GameGroup from "@/models/GameGroup";
import LocalName from "@/models/LocalName";
import Segment from "@/models/Segment";
import games from "@/static/games";

// Getters
export const getGame = (gameSlug: string): Game => {
    return games[gameSlug];
};

export const getGameName = (gameSlug: string): string => {
    return getGame(gameSlug).name;
};

export const getLogoURL = (gameSlug: string): string => {
    return getGame(gameSlug).logoURL;
};

export const getGameGroup = (gameSlug: string): GameGroup => {
    return getGame(gameSlug).gameGroup;
};

export const getVersionGroup = (gameSlug: string): string => {
    return getGameGroup(gameSlug).versionGroup;
};

export const getPokedex = (gameSlug: string): LocalName[] => {
    return getGameGroup(gameSlug).pokedex;
};

export const getSegments = (gameSlug: string): { [segmentSlug: string]: Segment } => {
    return getGameGroup(gameSlug).segments;
};

export const getStarterSlugs = (gameSlug: string): string[] => {
    return getGameGroup(gameSlug).starterSlugs;
};

export const getStartingTownSlug = (gameSlug: string): string => {
    return getGameGroup(gameSlug).startingTownSlug;
};

export const getIgnoredConditions = (gameSlug: string): string[] => {
    return getGameGroup(gameSlug).ignoredConditions;
};

export const getInvalidConditions = (gameSlug: string): string[] => {
    return getGameGroup(gameSlug).invalidConditions;
};

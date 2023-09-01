import Game from "@/models/Game";
import GameData from "@/models/GameData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import games from "@/static/games";
import { satisifesConditions } from "./segment";

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

export const getSegments = (run: Run): Segment[] => {
    const segments: Segment[] = [];
    for (const split of getGameData(run.gameSlug).splits) {
        segments.push(...split.segments.filter((segment: Segment) => satisifesConditions(segment, run)));
    }
    return segments;
};

import Game from "@/models/Game";
import GameGroup from "@/models/GameGroup";
import PokemonName from "@/models/PokemonName";
import Segment from "@/models/Segment";
import Split from "@/models/Split";
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

export const getSegments = (gameSlug: string): Segment[] => {
    const segments: Segment[] = [];
    for (const split of getGameGroup(gameSlug).splits) {
        segments.push(...split.segments);
    }
    return segments;
};

export const getGroups = (): string[] => {
    return Object.values(games).map((game: Game) => game.gameGroup.versionGroup);
};

export const getPokedex = (group: string): PokemonName[] => {
    return Object.values(games)
        .map((game: Game) => game.gameGroup)
        .find((gg: GameGroup) => gg.versionGroup === group)!.pokedex;
};

import Battle from "@/models/Battle";
import LocationSegment from "@/models/LocationSegment";
import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";

// Getters
export const getSegment = (game: string, segmentSlug: string): Segment => {
    return getSegments(game).find((segment: Segment) => segment.slug === segmentSlug)!;
};

// Predicates
export const isSegment = (game: string, idx: string): boolean => {
    if (/^\d+$/.test(idx)) {
        const idxNum: number = parseInt(idx);
        return idxNum >= 0 && idxNum < getSegments(game).length;
    } else {
        return false;
    }
};

export const hasLevelCap = (segment: Segment): boolean => {
    return "levelCap" in segment.segment && segment.segment.levelCap === true;
};

// Queries
export const getNumBattles = (gameSlug: string): number => {
    return getSegments(gameSlug).filter((segment: Segment) => segment.type === "battle").length;
};

export const getBattles = (game: string, location: string): Battle[] => {
    return (getSegment(game, location).segment as LocationSegment).battles;
};

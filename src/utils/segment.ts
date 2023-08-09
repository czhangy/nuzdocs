import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";

// Getters
export const getSegment = (gameSlug: string, segmentSlug: string): Segment => {
    return getSegments(gameSlug).find((segment: Segment) => segment.slug === segmentSlug)!;
};

// Predicates
export const isSegment = (gameSlug: string, segmentSlug: string): boolean => {
    return getSegments(gameSlug)
        .map((segment: Segment) => segment.slug)
        .includes(segmentSlug);
};

export const hasLevelCap = (segment: Segment): boolean => {
    return "levelCap" in segment.segment && typeof segment.segment.levelCap === "number";
};

// Queries
export const getNumBattles = (gameSlug: string): number => {
    return getSegments(gameSlug).filter((segment: Segment) => segment.type === "battle").length;
};

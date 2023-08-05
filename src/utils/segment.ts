import BattleSegment from "@/models/BattleSegment";
import LocationSegment from "@/models/LocationSegment";
import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";

// Getters
export const getSegmentSlugs = (gameSlug: string): string[] => {
    return Object.keys(getSegments(gameSlug));
};

export const getSegmentObjects = (gameSlug: string): Segment[] => {
    return Object.values(getSegments(gameSlug));
};

export const getSegment = (gameSlug: string, segmentSlug: string): Segment => {
    return getSegments(gameSlug)[segmentSlug];
};

export const getSegmentData = (gameSlug: string, segmentSlug: string): LocationSegment | BattleSegment => {
    return getSegment(gameSlug, segmentSlug).segment;
};

// Predicates
export const isSegment = (gameSlug: string, segmentSlug: string): boolean => {
    return getSegmentSlugs(gameSlug).includes(segmentSlug);
};

export const isLocationSegment = (gameSlug: string, segmentSlug: string): boolean => {
    return getSegment(gameSlug, segmentSlug).type === "location";
};

export const isBattleSegment = (gameSlug: string, segmentSlug: string): boolean => {
    return getSegment(gameSlug, segmentSlug).type === "battle";
};

// Queries
export const getNumBattles = (gameSlug: string) => {
    return getSegmentObjects(gameSlug).filter((segment: Segment) => segment.type === "battle").length;
};

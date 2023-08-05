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

export const getSegmentName = (gameSlug: string, segmentSlug: string): string => {
    return getSegment(gameSlug, segmentSlug).name;
};

export const getSegmentType = (gameSlug: string, segmentSlug: string): string => {
    return getSegment(gameSlug, segmentSlug).type;
};

export const getSegmentData = (gameSlug: string, segmentSlug: string): LocationSegment | BattleSegment => {
    return getSegment(gameSlug, segmentSlug).segment;
};

// Predicates
export const isLocationSegment = (gameSlug: string, segmentSlug: string): boolean => {
    return getSegmentType(gameSlug, segmentSlug) === "location";
};

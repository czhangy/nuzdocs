import LocationSegment from "@/models/LocationSegment";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";
import { getStarterSlug } from "./run";

// Getters
export const getSegment = (run: Run, segmentSlug: string): Segment => {
    return getSegments(run).find((segment: Segment) => segment.slug === segmentSlug)!;
};

// Predicates
export const isSegment = (run: Run, idx: string): boolean => {
    if (/^\d+$/.test(idx)) {
        const idxNum: number = parseInt(idx);
        return idxNum >= 0 && idxNum < getSegments(run).length;
    } else {
        return false;
    }
};

export const hasLevelCap = (segment: Segment): boolean => {
    return "levelCap" in segment.segment && segment.segment.levelCap === true;
};

export const satisifesConditions = (segment: Segment, run: Run): boolean => {
    if (segment.conditions) {
        if (segment.conditions.game && segment.conditions.game !== run.gameSlug) {
            return false;
        } else if (segment.conditions.character && segment.conditions.character !== run.character) {
            return false;
        } else if (segment.conditions.starter && segment.conditions.starter !== getStarterSlug(run.id)) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
};

export const isCustom = (segment: Segment): boolean => {
    return (segment.segment as LocationSegment).custom === true;
};

// Queries
export const getNumBattles = (run: Run): number => {
    return getSegments(run).filter((segment: Segment) => segment.type === "battle").length;
};

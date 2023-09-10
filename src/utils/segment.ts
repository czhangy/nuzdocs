import LocationSegment from "@/models/LocationSegment";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getLevelCap } from "@/utils/battle";
import { getSegments } from "@/utils/game";
import { getStarterSlug, isCleared } from "@/utils/run";
import { isNumeric } from "@/utils/utils";

// Getters
export const getSegment = (run: Run, slug: string): Segment => {
    return getSegments(run).find((segment: Segment) => segment.slug === slug)!;
};

// Predicates
export const isSegment = (run: Run, idx: string): boolean => {
    if (isNumeric(idx)) {
        const idxNum: number = parseInt(idx);
        return idxNum >= 0 && idxNum < getSegments(run).length;
    }
    return false;
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
        }
    }
    return true;
};

export const isCustom = (segment: Segment): boolean => {
    return (segment.segment as LocationSegment).custom === true;
};

// Queries
export const getNumBattles = (run: Run): number => {
    return getSegments(run).filter((segment: Segment) => segment.type === "battle").length;
};

export const getNextLevelCap = (run: Run): number => {
    const segments: Segment[] = getSegments(run);
    for (const segment of segments) {
        if (!isCleared(run.id, segment.slug) && hasLevelCap(segment)) {
            return getLevelCap(run, segment.slug);
        }
    }
    return 0;
};

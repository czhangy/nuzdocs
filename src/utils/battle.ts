import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Trainer from "@/models/Trainer";
import { getSegment, getSegmentData } from "@/utils/segment";

// Getters
export const getBattle = (gameSlug: string, battleSlug: string, starterSlug: string): Battle => {
    if (hasVariants(gameSlug, battleSlug)) {
        return (
            (getSegmentData(gameSlug, battleSlug) as BattleSegment).battle as {
                [variant: string]: Battle;
            }
        )[starterSlug];
    } else {
        return (getSegmentData(gameSlug, battleSlug) as BattleSegment).battle as Battle;
    }
};

export const getTrainer = (gameSlug: string, battleSlug: string, starterSlug: string): Trainer => {
    return getBattle(gameSlug, battleSlug, starterSlug).trainer;
};

// Predicates
export const hasVariants = (gameSlug: string, battleSlug: string): boolean => {
    return !("trainer" in (getSegmentData(gameSlug, battleSlug) as BattleSegment).battle);
};

export const hasLevelCap = (gameSlug: string, battleSlug: string): boolean => {
    return (getSegment(gameSlug, battleSlug).segment as BattleSegment).levelCap !== undefined;
};

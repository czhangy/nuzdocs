import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Trainer from "@/models/Trainer";
import { getSegment } from "@/utils/segment";

// Getters
export const getBattle = (gameSlug: string, battleSlug: string, starterSlug: string): Battle => {
    if (hasVariants(gameSlug, battleSlug)) {
        return (
            (getSegment(gameSlug, battleSlug).segment as BattleSegment).battle as {
                [variant: string]: Battle;
            }
        )[starterSlug];
    } else {
        return (getSegment(gameSlug, battleSlug).segment as BattleSegment).battle as Battle;
    }
};

export const getTrainer = (gameSlug: string, battleSlug: string, starterSlug: string): Trainer => {
    return getBattle(gameSlug, battleSlug, starterSlug).trainer;
};

// Predicates
export const hasVariants = (gameSlug: string, battleSlug: string): boolean => {
    return !("trainer" in (getSegment(gameSlug, battleSlug).segment as BattleSegment).battle);
};

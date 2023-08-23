import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Trainer from "@/models/Trainer";
import { getSegment } from "@/utils/segment";

// Getters
export const getBattle = (game: string, battle: string, starter: string): Battle => {
    if (hasVariants(game, battle)) {
        return (
            (getSegment(game, battle).segment as BattleSegment).battle as {
                [variant: string]: Battle;
            }
        )[starter];
    } else {
        return (getSegment(game, battle).segment as BattleSegment).battle as Battle;
    }
};

export const getTrainer = (game: string, battle: string, starter: string): Trainer | Trainer[] => {
    return getBattle(game, battle, starter).trainer;
};

// Predicates
export const hasVariants = (game: string, battle: string): boolean => {
    return !("trainer" in (getSegment(game, battle).segment as BattleSegment).battle);
};

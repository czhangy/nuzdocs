import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Pokemon from "@/models/Pokemon";
import Trainer from "@/models/Trainer";
import { getSegmentData } from "./segment";

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

export const getTeam = (gameSlug: string, battleSlug: string, starterSlug: string): Pokemon[] => {
    return getBattle(gameSlug, battleSlug, starterSlug).team;
};

// Predicates
export const hasVariants = (gameSlug: string, battleSlug: string): boolean => {
    return !("trainer" in (getSegmentData(gameSlug, battleSlug) as BattleSegment));
};

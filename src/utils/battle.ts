import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Pokemon from "@/models/Pokemon";
import Run from "@/models/Run";
import Trainer from "@/models/Trainer";
import { getSegment } from "@/utils/segment";

// Getters
export const getBattle = (run: Run, battle: string, starter: string): Battle => {
    if (hasVariants(run, battle)) {
        return (
            (getSegment(run, battle).segment as BattleSegment).battle as {
                [variant: string]: Battle;
            }
        )[starter];
    } else {
        return (getSegment(run, battle).segment as BattleSegment).battle as Battle;
    }
};

export const getTrainer = (run: Run, battle: string, starter: string): Trainer => {
    return getBattle(run, battle, starter).trainer;
};

export const getLevelCap = (run: Run, battle: string, starter: string): number => {
    const levels: number[] = getBattle(run, battle, starter).team.map((pokemon: Pokemon) => pokemon.level!);
    return Math.max(...levels);
};

// Predicates
export const hasVariants = (run: Run, battle: string): boolean => {
    return !("trainer" in (getSegment(run, battle).segment as BattleSegment).battle);
};

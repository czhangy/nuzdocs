import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Pokemon from "@/models/Pokemon";
import Run from "@/models/Run";
import Trainer from "@/models/Trainer";
import { getSegment } from "@/utils/segment";

// Getters
export const getBattle = (run: Run, battle: string): Battle => {
    return (getSegment(run, battle).segment as BattleSegment).battle;
};

export const getTrainer = (run: Run, battle: string): Trainer => {
    return getBattle(run, battle).trainer;
};

export const getLevelCap = (run: Run, battle: string): number => {
    const levels: number[] = getBattle(run, battle).team.map((pokemon: Pokemon) => pokemon.level!);
    return Math.max(...levels);
};

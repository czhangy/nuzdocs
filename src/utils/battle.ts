import Battle from "@/models/Battle";
import BattleSegment from "@/models/BattleSegment";
import Pokemon from "@/models/Pokemon";
import Run from "@/models/Run";
import Trainer from "@/models/Trainer";
import { getSegment } from "@/utils/segment";

// Getters
export const getBattle = (run: Run, battle: string, starter: string): Battle => {
    return (getSegment(run, battle).segment as BattleSegment).battle;
};

export const getTrainer = (run: Run, battle: string, starter: string): Trainer => {
    return getBattle(run, battle, starter).trainer;
};

export const getLevelCap = (run: Run, battle: string, starter: string): number => {
    const levels: number[] = getBattle(run, battle, starter).team.map((pokemon: Pokemon) => pokemon.level!);
    return Math.max(...levels);
};

import Battle from "@/models/Battle";

export default interface BattleSegment {
    battle: Battle;
    levelCap?: boolean;
}

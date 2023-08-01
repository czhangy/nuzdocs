import Battle from "@/models/Battle";

export default interface BattleSegment {
    battle: Battle | { [variant: string]: Battle };
}

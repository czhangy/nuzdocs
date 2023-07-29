import GameGroup from "@/models/GameGroup";

export default interface Game {
    name: string;
    logoURL: string;
    gameGroup: GameGroup;
}

import GameData from "@/models/GameData";

export default interface Game {
    name: string;
    logoURL: string;
    data: GameData;
}

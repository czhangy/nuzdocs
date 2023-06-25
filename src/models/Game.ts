import LocalLocation from "@/models/LocalLocation";

export default interface Game {
    name: string;
    locations: LocalLocation[];
    starters: string[];
}

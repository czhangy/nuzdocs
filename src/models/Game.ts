import Location from "@/models/Location";

export default interface Game {
    name: string;
    locations: Location[];
    starters: string[];
}

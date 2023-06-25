import Encounter from "@/models/Encounter";

export default interface FetchedLocation {
    name: string;
    encounters: Encounter[];
}

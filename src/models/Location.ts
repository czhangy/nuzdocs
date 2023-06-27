import Encounter from "@/models/Encounter";

export default interface Location {
    slug: string;
    mapURLs?: string[];
    encounters: Encounter[];
}

import Encounter from "@/models/Encounter";

export default interface LocationData {
    name: string;
    encounters: Encounter[];
}

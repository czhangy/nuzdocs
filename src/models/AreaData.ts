import EncounterData from "@/models/EncounterData";

export default interface AreaData {
    areaSlug: string;
    areaName: string;
    encounters: EncounterData[];
}

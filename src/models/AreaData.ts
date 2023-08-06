import EncounterData from "@/models/EncounterData";

export default interface AreaData {
    areaName: string;
    encounters: { [conditionValue: string]: { [method: string]: EncounterData[] } };
}

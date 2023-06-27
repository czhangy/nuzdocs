import LocalEncounter from "@/models/LocalEncounter";

export default interface Run {
    gameName: string;
    prevLocationName: string;
    starterName: string;
    encounters: LocalEncounter[];
}

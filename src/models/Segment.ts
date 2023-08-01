import BattleSegment from "@/models/BattleSegment";
import LocationSegment from "@/models/LocationSegment";

export default interface Segment {
    name: string;
    type: "location" | "battle";
    segment: LocationSegment | BattleSegment;
}

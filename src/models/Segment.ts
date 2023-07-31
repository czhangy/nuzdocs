import BattleSegment from "@/models/BattleSegment";
import LocationSegment from "@/models/LocationSegment";

export default interface Segment {
    type: "location" | "battle";
    segment: LocationSegment | BattleSegment;
}

import BattleSegment from "@/models/BattleSegment";
import LocationSegment from "@/models/LocationSegment";

export default interface Segment {
    slug: string;
    name: string;
    type: "location" | "battle";
    segment: LocationSegment | BattleSegment;
}

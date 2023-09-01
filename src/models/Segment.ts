import BattleSegment from "@/models/BattleSegment";
import Conditions from "@/models/Conditions";
import LocationSegment from "@/models/LocationSegment";

export default interface Segment {
    slug: string;
    name: string;
    type: "location" | "battle";
    conditions?: Conditions;
    segment: LocationSegment | BattleSegment;
}

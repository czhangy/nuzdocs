import LocalName from "@/models/LocalName";
import Segment from "@/models/Segment";

export default interface GameGroup {
    versionGroup: string;
    pokedex: LocalName[];
    segments: Segment[];
    starterSlugs: string[];
    startingTownSlug: string;
    ignoredConditions: string[];
    invalidConditions: string[];
}

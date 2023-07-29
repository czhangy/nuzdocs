import LocalSegment from "@/models/LocalSegment";
import LocalName from "@/models/LocalName";

export default interface GameGroup {
    versionGroup: string;
    pokedex: LocalName[];
    segments: LocalSegment[];
    starterSlugs: string[];
    startingTownSlug: string;
    ignoredConditions: string[];
    invalidConditions: string[];
}

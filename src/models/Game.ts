import LocalSegment from "@/models/LocalSegment";
import LocalName from "@/models/LocalName";

export default interface Game {
    name: string;
    versionGroup: string;
    pokedex: LocalName[];
    segments: LocalSegment[];
    starterSlugs: string[];
    startingTownSlug: string;
    iconURL: string;
}

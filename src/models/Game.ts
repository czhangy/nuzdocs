import LocalSegment from "@/models/LocalSegment";
import LocalName from "@/models/LocalName";

export default interface Game {
    name: string;
    gameGroup: string;
    pokedex: LocalName[];
    segments: LocalSegment[];
    starterSlugs: string[];
    startingTownSlug: string;
    iconURL: string;
}

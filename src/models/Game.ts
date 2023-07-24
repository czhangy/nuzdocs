import LocalSegment from "@/models/LocalSegment";

export default interface Game {
    name: string;
    gameGroup: string;
    pokedex: string[];
    segments: LocalSegment[];
    starterSlugs: string[];
    startingTownSlug: string;
    iconURL: string;
}

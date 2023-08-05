import PokemonName from "@/models/PokemonName";
import Segment from "@/models/Segment";

export default interface GameGroup {
    versionGroup: string;
    pokedex: PokemonName[];
    segments: { [segmentSlug: string]: Segment };
    starterSlugs: string[];
    startingTownSlug: string;
    ignoredConditions: string[];
    invalidConditions: string[];
}

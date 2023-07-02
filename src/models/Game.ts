import LocalLocation from "@/models/LocalLocation";

export default interface Game {
    slug: string;
    gameGroup: string;
    locations: LocalLocation[];
    starterSlugs: string[];
    startingTown: string;
}

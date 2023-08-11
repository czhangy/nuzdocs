import Nature from "@/models/Nature";
import Values from "@/models/Values";

export default interface Pokemon {
    slug: string;
    species: string;
    level?: number;
    nature?: string;
    abilitySlug?: string;
    heldItemSlug?: string;
    moveSlugs: string[];
    ivs: Values;
    evs: Values;
}

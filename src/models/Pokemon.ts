import Nature from "@/models/Nature";

export default interface Pokemon {
    slug: string;
    species: string;
    level?: number;
    nature?: string;
    abilitySlug?: string;
    heldItemSlug?: string;
    moveSlugs: string[];
}

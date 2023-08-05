export default interface Pokemon {
    slug: string;
    species: string;
    level?: number;
    abilitySlug?: string;
    heldItemSlug?: string;
    moveSlugs: string[];
}

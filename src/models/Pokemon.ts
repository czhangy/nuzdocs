export default interface Pokemon {
    slug: string;
    form: string;
    level?: number;
    abilitySlug?: string;
    heldItemSlug?: string;
    moveSlugs: string[];
}

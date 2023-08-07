export default interface Pokemon {
    slug: string;
    species: string;
    nickname: string;
    level?: number;
    abilitySlug?: string;
    heldItemSlug?: string;
    moveSlugs: string[];
}

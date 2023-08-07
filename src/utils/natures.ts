import Nature from "@/models/Nature";
import { natures } from "@/static/natures";

// Getters
export const getListOfNatures = (): string[] => {
    return Object.keys(natures);
};

export const getNature = (nature: string): Nature => {
    return natures[nature];
};

// Predicate
export const isNeutralNature = (nature: string): boolean => {
    return Object.keys(natures[nature]).length === 0;
};

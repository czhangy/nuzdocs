import NamedResource from "@/models/NamedResource";
import Values from "@/models/Values";

export default interface Pokemon {
    slug: string;
    species: string;
    level?: number;
    nature?: string;
    ability?: NamedResource;
    item?: NamedResource;
    moves: NamedResource[];
    ivs: Values;
    evs: Values;
}

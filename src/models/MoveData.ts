export default interface MoveData {
    slug: string;
    name: string;
    type: string;
    power: number;
    category: "physical" | "special" | "other";
    pp: number;
    desc: string;
}

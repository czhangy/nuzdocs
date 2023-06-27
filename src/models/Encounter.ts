import Pokemon from "@/models/Pokemon";

export default interface Encounter {
    pokemon: Pokemon | null;
    status: "none" | "missed" | "caught";
}

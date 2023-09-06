import Pokemon from "@/models/Pokemon";
import Trainer from "@/models/Trainer";

export default interface Battle {
    trainer: Trainer;
    name: string;
    location: string;
    team: Pokemon[];
    items: string[];
    required?: boolean;
    double?: boolean;
}

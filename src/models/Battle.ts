import Trainer from "@/models/Trainer";
import Pokemon from "@/models/Pokemon";

export default interface Battle {
    trainer: Trainer | Trainer[];
    team: Pokemon[];
    items: string[];
}

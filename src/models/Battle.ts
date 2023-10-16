import Pokemon from "@/models/Pokemon";
import OutdatedTrainer from "@/models/OutdatedTrainer";

export default interface Battle {
    trainer: OutdatedTrainer;
    name: string;
    location: string;
    team: Pokemon[];
    items: { [item: string]: number };
    tags: string[];
}

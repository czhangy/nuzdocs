import Box from "@/components/Box/Box";
import CaughtPokemon from "@/models/CaughtPokemon";
import { getBox } from "@/utils/utils";
import { useEffect, useState } from "react";
import styles from "./BoxPage.module.scss";
import PokemonData from "@/models/PokemonData";

type Props = {
    runName: string;
};

const BoxPage: React.FC<Props> = (props: Props) => {
    // LocalStorage data state
    const [box, setBox] = useState<CaughtPokemon[]>([]);

    // Component state
    const [evolveModalOpen, setEvolveModalOpen] = useState<boolean>(false);

    // Internal data state
    const [evolvingPokemon, setEvolvingPokemon] = useState<PokemonData | null>(null);

    // Access local storage on component load
    useEffect(() => {
        if (props.runName) {
            setBox(getBox(props.runName));
        }
    }, [props.runName]);

    // Open modal when a Pokemon is trying to evolve
    useEffect(() => {
        if (evolvingPokemon) {
            console.log(evolvingPokemon);
        }
    });

    return (
        <div className={styles["box-page"]}>
            <h2 className={styles.header}>Your Box</h2>
            <Box box={box} onEvolve={(pokemon: PokemonData) => setEvolvingPokemon(pokemon)} />
        </div>
    );
};

export default BoxPage;

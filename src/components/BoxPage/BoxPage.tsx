import Box from "@/components/Box/Box";
import EvolveModal from "@/components/EvolveModal/EvolveModal";
import Modal from "@/components/Modal/Modal";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { getBox } from "@/utils/utils";
import { useEffect, useState } from "react";
import styles from "./BoxPage.module.scss";

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
    const [evolveIdx, setEvolveIdx] = useState<number | null>(null);

    // Set internal state on evolve
    const handleEvolve = (pokemon: PokemonData, idx: number) => {
        setEvolvingPokemon(pokemon);
        setEvolveIdx(idx);
    };

    // Reset internal state on close
    const handleClose = () => {
        setEvolvingPokemon(null);
        setEvolveIdx(null);
        setEvolveModalOpen(false);
    };

    // Access local storage on component load
    useEffect(() => {
        if (props.runName) {
            setBox(getBox(props.runName));
        }
    }, [props.runName]);

    // Open modal when a Pokemon is trying to evolve
    useEffect(() => {
        if (evolvingPokemon) {
            setEvolveModalOpen(true);
        }
    }, [evolvingPokemon]);

    return (
        <div className={styles["box-page"]}>
            <Modal modalID="evolve-modal" open={evolveModalOpen} onClose={handleClose}>
                {evolvingPokemon ? <EvolveModal pokemon={evolvingPokemon} chains={evolvingPokemon.evolutions} /> : ""}
            </Modal>
            <h2 className={styles.header}>Your Box</h2>
            <Box box={box} onEvolve={(pokemon: PokemonData, idx: number) => handleEvolve(pokemon, idx)} />
        </div>
    );
};

export default BoxPage;

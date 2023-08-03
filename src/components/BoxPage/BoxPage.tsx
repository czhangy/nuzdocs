import Box from "@/components/Box/Box";
import EvolveModal from "@/components/EvolveModal/EvolveModal";
import Modal from "@/components/Modal/Modal";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { getBox, setBox } from "@/utils/utils";
import { useEffect, useState } from "react";
import styles from "./BoxPage.module.scss";
import update from "immutability-helper";

type Props = {
    runName: string;
};

const BoxPage: React.FC<Props> = (props: Props) => {
    // LocalStorage data state
    const [boxPokemon, setBoxPokemon] = useState<CaughtPokemon[]>([]);

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

    // Reset internal state on close, delaying state change to allow modal to transition out smoothly
    const handleClose = () => {
        setEvolveModalOpen(false);
        setTimeout(() => {
            setEvolvingPokemon(null);
            setEvolveIdx(null);
        }, 200);
    };

    // Evolve the Pokemon, updating component + local storage and closing the modal
    const handleConfirm = (selection: PokemonData) => {
        let evolvedPokemon: CaughtPokemon = JSON.parse(JSON.stringify(boxPokemon[evolveIdx!]));
        evolvedPokemon.pokemon.slug = selection.pokemon.slug;
        const updatedBox: CaughtPokemon[] = update(boxPokemon, { $splice: [[evolveIdx!, 1, evolvedPokemon]] });
        setBoxPokemon(updatedBox);
        setBox(props.runName, updatedBox);
        handleClose();
    };

    // Access local storage on component load
    useEffect(() => {
        if (props.runName) {
            setBoxPokemon(getBox(props.runName));
        }
    }, [props.runName]);

    // Open modal when a Pokemon is trying to evolve
    useEffect(() => {
        if (evolvingPokemon) {
            console.log(evolvingPokemon);
            setEvolveModalOpen(true);
        }
    }, [evolvingPokemon]);

    return (
        <div className={styles["box-page"]}>
            <Modal modalID="evolve-modal" open={evolveModalOpen} onClose={handleClose}>
                {evolvingPokemon ? (
                    <EvolveModal
                        pokemon={evolvingPokemon}
                        chains={evolvingPokemon.evolutions}
                        onClose={handleClose}
                        onEvolve={(selection: PokemonData) => handleConfirm(selection)}
                    />
                ) : (
                    ""
                )}
            </Modal>
            <h2 className={styles.header}>Your Box</h2>
            <Box box={boxPokemon} onEvolve={(pokemon: PokemonData, idx: number) => handleEvolve(pokemon, idx)} />
        </div>
    );
};

export default BoxPage;

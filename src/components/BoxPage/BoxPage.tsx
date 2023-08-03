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
    const [RIPModalOpen, setRIPModalOpen] = useState<boolean>(false);

    // Internal data state
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const closeModals = () => {
        setEvolveModalOpen(false);
        setRIPModalOpen(false);
    };

    // Set internal state
    const handleSelect = (pokemon: PokemonData, idx: number) => {
        setSelectedPokemon(pokemon);
        setSelectedIdx(idx);
    };

    // Update state and open evolve modal
    const handleEvolveAttempt = (pokemon: PokemonData, idx: number) => {
        handleSelect(pokemon, idx);
        setEvolveModalOpen(true);
    };

    // Update state and open RIP modal
    const handleRIPAttempt = (pokemon: PokemonData, idx: number) => {
        handleSelect(pokemon, idx);
        setRIPModalOpen(true);
    };

    // Reset internal state on close, delaying state change to allow modal to transition out smoothly
    const handleClose = () => {
        closeModals();
        setTimeout(() => {
            setSelectedPokemon(null);
            setSelectedIdx(null);
        }, 200);
    };

    // Evolve the Pokemon, updating component + local storage and closing the modal
    const handleEvolve = (selection: PokemonData) => {
        let evolvedPokemon: CaughtPokemon = JSON.parse(JSON.stringify(boxPokemon[selectedIdx!]));
        evolvedPokemon.pokemon.slug = selection.pokemon.slug;
        const updatedBox: CaughtPokemon[] = update(boxPokemon, { $splice: [[selectedIdx!, 1, evolvedPokemon]] });
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

    return (
        <div className={styles["box-page"]}>
            <Modal modalID="evolve-modal" open={evolveModalOpen} onClose={handleClose}>
                {selectedPokemon && evolveModalOpen ? (
                    <EvolveModal
                        pokemon={selectedPokemon}
                        chains={selectedPokemon.evolutions}
                        onClose={handleClose}
                        onEvolve={(selection: PokemonData) => handleEvolve(selection)}
                    />
                ) : (
                    ""
                )}
            </Modal>
            <Modal modalID="rip-modal" open={RIPModalOpen} onClose={handleClose}>
                {selectedPokemon && RIPModalOpen ? "" : ""}
            </Modal>
            <h2 className={styles.header}>Your Box</h2>
            <Box
                box={boxPokemon}
                onEvolve={(pokemon: PokemonData, idx: number) => handleEvolveAttempt(pokemon, idx)}
                onRIP={(pokemon: PokemonData, idx: number) => handleRIPAttempt(pokemon, idx)}
            />
        </div>
    );
};

export default BoxPage;

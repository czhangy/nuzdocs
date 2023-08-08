import EvolveModal from "@/components/EvolveModal/EvolveModal";
import FormChangeModal from "@/components/FormChangeModal/FormChangeModal";
import Box from "@/components/Global/Box/Box";
import Modal from "@/components/Global/Modal/Modal";
import RIPModal from "@/components/RIPModal/RIPModal";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { addToCaughtPokemonSlugs, addToRIPs, getBox, removeFromBox, updateBox } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./BoxPage.module.scss";

type Props = {
    runName: string;
};

const BoxPage: React.FC<Props> = (props: Props) => {
    // LocalStorage data state
    const [boxPokemon, setBoxPokemon] = useState<CaughtPokemon[]>([]);

    // Component state
    const [evolveModalOpen, setEvolveModalOpen] = useState<boolean>(false);
    const [formChangeModalOpen, setFormChangeModalOpen] = useState<boolean>(false);
    const [ripModalOpen, setRIPModalOpen] = useState<boolean>(false);

    // Internal data state
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Close all modals
    const closeModals = () => {
        setEvolveModalOpen(false);
        setFormChangeModalOpen(false);
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

    // Update state and open evolve modal
    const handleFormChangeAttempt = (pokemon: PokemonData, idx: number) => {
        handleSelect(pokemon, idx);
        setFormChangeModalOpen(true);
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
        evolvedPokemon.pokemon.species = selection.pokemon.species;
        evolvedPokemon.pastSlugs.push(selection.pokemon.slug);
        updateBox(props.runName, evolvedPokemon, selectedIdx!);
        addToCaughtPokemonSlugs(props.runName, selection.pokemon.slug);
        setBoxPokemon(getBox(props.runName));
        handleClose();
    };

    // Change the form of the Pokemon, updating component + local storage and closing the modal
    const handleFormChange = (selection: PokemonData) => {
        let updatedPokemon: CaughtPokemon = JSON.parse(JSON.stringify(boxPokemon[selectedIdx!]));
        updatedPokemon.pokemon.slug = selection.pokemon.slug;
        updateBox(props.runName, updatedPokemon, selectedIdx!);
        setBoxPokemon(getBox(props.runName));
        handleClose();
    };

    // RIP the Pokemon, updating component + local storage and closing the modal
    const handleRIP = () => {
        addToRIPs(props.runName, boxPokemon[selectedIdx!]);
        removeFromBox(props.runName, boxPokemon[selectedIdx!].locationSlug);
        setBoxPokemon(getBox(props.runName));
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
                        runName={props.runName}
                    />
                ) : (
                    ""
                )}
            </Modal>
            <Modal modalID="form-change-modal" open={formChangeModalOpen} onClose={handleClose}>
                {selectedPokemon && formChangeModalOpen ? (
                    <FormChangeModal
                        forms={selectedPokemon.forms}
                        onClose={handleClose}
                        onFormChange={(selection: PokemonData) => handleFormChange(selection)}
                        runName={props.runName}
                    />
                ) : (
                    ""
                )}
            </Modal>
            <Modal modalID="rip-modal" open={ripModalOpen} onClose={handleClose}>
                {selectedPokemon && ripModalOpen ? (
                    <RIPModal pokemon={selectedPokemon} onClose={handleClose} onConfirm={handleRIP} isRevive={false} />
                ) : (
                    ""
                )}
            </Modal>
            <h2 className={styles.header}>Your Box</h2>
            <Box
                box={boxPokemon}
                runName={props.runName}
                onEvolve={(pokemon: PokemonData, idx: number) => handleEvolveAttempt(pokemon, idx)}
                onFormChange={(pokemon: PokemonData, idx: number) => handleFormChangeAttempt(pokemon, idx)}
                onRIP={(pokemon: PokemonData, idx: number) => handleRIPAttempt(pokemon, idx)}
            />
        </div>
    );
};

export default BoxPage;

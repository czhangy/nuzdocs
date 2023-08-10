import EvolveModal from "@/components/Box/EvolveModal/EvolveModal";
import FormChangeModal from "@/components/Box/FormChangeModal/FormChangeModal";
import Modal from "@/components/Global/Modal/Modal";
import Box from "@/components/Run/Box/Box";
import RIPModal from "@/components/Run/RIPModal/RIPModal";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { addToCaughtPokemonSlugs, addToRIPs, getBox, removeFromBox, updateBox } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./BoxPage.module.scss";

type Props = {
    run: Run;
};

const BoxPage: React.FC<Props> = (props: Props) => {
    // Internal data state
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
        let evolvedPokemon: CaughtPokemon = boxPokemon[selectedIdx!];
        evolvedPokemon.pokemon.slug = selection.pokemon.slug;
        evolvedPokemon.pokemon.species = selection.pokemon.species;
        evolvedPokemon.pastSlugs.push(selection.pokemon.slug);
        updateBox(props.run.id, evolvedPokemon, selectedIdx!);
        addToCaughtPokemonSlugs(props.run.id, selection.pokemon.slug);
        setBoxPokemon(getBox(props.run.id));
        handleClose();
    };

    // Change the form of the Pokemon, updating component + local storage and closing the modal
    const handleFormChange = (selection: PokemonData) => {
        let updatedPokemon: CaughtPokemon = boxPokemon[selectedIdx!];
        updatedPokemon.pokemon.slug = selection.pokemon.slug;
        updateBox(props.run.id, updatedPokemon, selectedIdx!);
        setBoxPokemon(getBox(props.run.id));
        handleClose();
    };

    // RIP the Pokemon, updating component + local storage and closing the modal
    const handleRIP = () => {
        addToRIPs(props.run.id, boxPokemon[selectedIdx!]);
        removeFromBox(props.run.id, boxPokemon[selectedIdx!].id);
        setBoxPokemon(getBox(props.run.id));
        handleClose();
    };

    // Access local storage on component load
    useEffect(() => {
        if (props.run) setBoxPokemon(getBox(props.run.id));
    }, [props.run]);

    return (
        <div className={styles["box-page"]}>
            <h2 className={styles.header}>Your Box</h2>
            <Box
                box={boxPokemon}
                run={props.run}
                onEvolve={(pokemon: PokemonData, idx: number) => handleEvolveAttempt(pokemon, idx)}
                onFormChange={(pokemon: PokemonData, idx: number) => handleFormChangeAttempt(pokemon, idx)}
                onRIP={(pokemon: PokemonData, idx: number) => handleRIPAttempt(pokemon, idx)}
            />
            <Modal modalID="evolve-modal" open={evolveModalOpen} onClose={handleClose}>
                {selectedPokemon && evolveModalOpen ? (
                    <EvolveModal
                        pokemon={selectedPokemon}
                        gameSlug={props.run.gameSlug}
                        onEvolve={(selection: PokemonData) => handleEvolve(selection)}
                        onClose={handleClose}
                    />
                ) : (
                    ""
                )}
            </Modal>
            <Modal modalID="form-change-modal" open={formChangeModalOpen} onClose={handleClose}>
                {selectedPokemon && formChangeModalOpen ? (
                    <FormChangeModal
                        pokemon={selectedPokemon}
                        gameSlug={props.run.gameSlug}
                        onFormChange={(selection: PokemonData) => handleFormChange(selection)}
                        onClose={handleClose}
                    />
                ) : (
                    ""
                )}
            </Modal>
            <Modal modalID="rip-modal" open={ripModalOpen} onClose={handleClose}>
                {selectedPokemon && ripModalOpen ? (
                    <RIPModal pokemon={selectedPokemon} isRevive={false} onConfirm={handleRIP} onClose={handleClose} />
                ) : (
                    ""
                )}
            </Modal>
        </div>
    );
};

export default BoxPage;

import Modal from "@/components/Global/Modal/Modal";
import RIPModal from "@/components/RIPModal/RIPModal";
import Box from "@/components/Run/Box/Box";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { addToBox, getRIPs, removeFromRIPs } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./RIPsPage.module.scss";

type Props = {
    runName: string;
};

const RIPsPage: React.FC<Props> = (props: Props) => {
    // LocalStorage data state
    const [ripsPokemon, setRIPsPokemon] = useState<CaughtPokemon[]>([]);

    // Component state
    const [reviveModalOpen, setReviveModalOpen] = useState<boolean>(false);

    // Internal data state
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Reset internal state on close, delaying state change to allow modal to transition out smoothly
    const handleClose = () => {
        setReviveModalOpen(false);
        setTimeout(() => {
            setSelectedPokemon(null);
            setSelectedIdx(null);
        }, 200);
    };

    // Update state and open revive modal
    const handleReviveAttempt = (pokemon: PokemonData, idx: number) => {
        setSelectedPokemon(pokemon);
        setSelectedIdx(idx);
        setReviveModalOpen(true);
    };

    // Revive the Pokemon, updating component + local storage and closing the modal
    const handleRevive = () => {
        addToBox(props.runName, ripsPokemon[selectedIdx!]);
        removeFromRIPs(props.runName, ripsPokemon[selectedIdx!].locationSlug);
        setRIPsPokemon(getRIPs(props.runName));
        handleClose();
    };

    // Access local storage on component load
    useEffect(() => {
        if (props.runName) {
            setRIPsPokemon(getRIPs(props.runName));
        }
    }, [props.runName]);

    return (
        <div className={styles["rips-page"]}>
            <Modal modalID="rip-modal" open={reviveModalOpen} onClose={handleClose}>
                {selectedPokemon ? (
                    <RIPModal
                        pokemon={selectedPokemon}
                        onClose={handleClose}
                        onConfirm={handleRevive}
                        isRevive={true}
                    />
                ) : (
                    ""
                )}
            </Modal>
            <h2 className={styles.header}>Your RIPs</h2>
            <Box
                box={ripsPokemon}
                runName={props.runName}
                onRevive={(pokemon: PokemonData, idx: number) => handleReviveAttempt(pokemon, idx)}
            />
        </div>
    );
};

export default RIPsPage;

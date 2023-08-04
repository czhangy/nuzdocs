import Box from "@/components/Box/Box";
import Modal from "@/components/Modal/Modal";
import RIPModal from "@/components/RIPModal/RIPModal";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { getBox, getRIPs, setBox, setRIPs } from "@/utils/utils";
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
        let updatedBox: CaughtPokemon[] = getBox(props.runName);
        updatedBox.push(ripsPokemon[selectedIdx!]);
        setBox(props.runName, updatedBox);
        const updatedRIPs: CaughtPokemon[] = ripsPokemon.filter((_, i: number) => i !== selectedIdx);
        setRIPsPokemon(updatedRIPs);
        setRIPs(props.runName, updatedRIPs);
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
                onRevive={(pokemon: PokemonData, idx: number) => handleReviveAttempt(pokemon, idx)}
            />
        </div>
    );
};

export default RIPsPage;

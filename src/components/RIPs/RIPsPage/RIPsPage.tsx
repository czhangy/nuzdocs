import Modal from "@/components/Global/Modal/Modal";
import Box from "@/components/Run/Box/Box";
import RIPModal from "@/components/Run/RIPModal/RIPModal";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { addToBox, getRIPs, removeFromRIPs } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./RIPsPage.module.scss";

type Props = {
    run: Run;
};

const RIPsPage: React.FC<Props> = (props: Props) => {
    // Internal data state
    const [ripsPokemon, setRIPsPokemon] = useState<CaughtPokemon[]>([]);

    // Component state
    const [reviveModalOpen, setReviveModalOpen] = useState<boolean>(false);

    // Internal data state
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
    const [selectedID, setSelectedID] = useState<string>("");

    // Reset internal state on close, delaying state change to allow modal to transition out smoothly
    const handleClose = () => {
        setReviveModalOpen(false);
        setTimeout(() => {
            setSelectedPokemon(null);
            setSelectedID("");
        }, 200);
    };

    // Update state and open revive modal
    const handleReviveAttempt = (pokemon: PokemonData, id: string) => {
        setSelectedPokemon(pokemon);
        setSelectedID(id);
        setReviveModalOpen(true);
    };

    // Revive the Pokemon, updating component + local storage and closing the modal
    const handleRevive = () => {
        addToBox(props.run.id, ripsPokemon.find((pokemon: CaughtPokemon) => pokemon.id === selectedID)!);
        removeFromRIPs(props.run.id, selectedID);
        setRIPsPokemon(getRIPs(props.run.id));
        handleClose();
    };

    // Access local storage on component load
    useEffect(() => {
        if (props.run.id) setRIPsPokemon(getRIPs(props.run.id));
    }, [props.run.id]);

    return (
        <div className={styles["rips-page"]}>
            <h2 className={styles.header}>Your RIPs</h2>
            <Box
                box={ripsPokemon}
                run={props.run}
                onRevive={(pokemon: PokemonData, id: string) => handleReviveAttempt(pokemon, id)}
            />
            <Modal open={reviveModalOpen} onClose={handleClose}>
                {selectedPokemon && reviveModalOpen ? (
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
        </div>
    );
};

export default RIPsPage;

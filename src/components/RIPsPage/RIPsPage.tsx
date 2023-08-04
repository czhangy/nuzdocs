import CaughtPokemon from "@/models/CaughtPokemon";
import { getRIPs } from "@/utils/utils";
import { useEffect, useState } from "react";
import styles from "./RIPsPage.module.scss";
import Box from "@/components/Box/Box";
import PokemonData from "@/models/PokemonData";

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

    // Update state and open revive modal
    const handleReviveAttempt = (pokemon: PokemonData, idx: number) => {
        setSelectedPokemon(pokemon);
        setSelectedIdx(idx);
        setReviveModalOpen(true);
    };

    // Access local storage on component load
    useEffect(() => {
        if (props.runName) {
            setRIPsPokemon(getRIPs(props.runName));
        }
    }, [props.runName]);

    return (
        <div className={styles["rips-page"]}>
            <h2 className={styles.header}>Your RIPs</h2>
            <Box
                box={ripsPokemon}
                onRevive={(pokemon: PokemonData, idx: number) => handleReviveAttempt(pokemon, idx)}
            />
        </div>
    );
};

export default RIPsPage;

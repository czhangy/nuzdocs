import PokemonData from "@/models/PokemonData";
import styles from "./EncounterDisplay.module.scss";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useEffect, useState } from "react";

type Props = {
    encounteredPokemon: PokemonData | null | "failed";
    uniquePokemonDataList: PokemonData[];
    onSelect: (pokemonName: string) => void;
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
    const [displayValue, setDisplayValue] = useState<string | null>(null);

    const getPokemonNames = () => {
        return ["Failed", ...props.uniquePokemonDataList.map((pokemonData: PokemonData) => pokemonData.pokemonName)];
    };

    const handlePokemonSelect = (pokemonName: string) => {
        const matches: PokemonData[] = props.uniquePokemonDataList.filter(
            (pokemonData: PokemonData) => pokemonData.pokemonName === pokemonName
        );
        const pokemonSlug: string = matches.length > 0 ? matches[0].pokemonSlug : "failed";
        props.onSelect(pokemonSlug);
    };

    // When props.encounteredPokemon changes, translate it into the correct display value
    useEffect(() => {
        if (props.encounteredPokemon) {
            const displayString: string =
                props.encounteredPokemon === "failed" ? "Failed" : props.encounteredPokemon.pokemonName;
            setDisplayValue(displayString);
        } else {
            setDisplayValue(null);
        }
    }, [props.encounteredPokemon]);

    return (
        <div className={styles["encounter-display"]}>
            <div className={styles.sprite}>
                <div className={styles["ball-bg"]} />
                <hr className={styles["ball-divider"]} />
                <div className={styles["ball-center"]} />
            </div>
            <div className={styles.text}>
                <h3 className={styles.header}>Encounter:</h3>
                <input className={styles.search} type="text" placeholder="Search..." />
            </div>
        </div>
    );
};

export default EncounterDisplay;

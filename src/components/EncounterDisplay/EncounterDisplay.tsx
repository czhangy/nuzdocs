import PokemonData from "@/models/PokemonData";
import styles from "./EncounterDisplay.module.scss";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useEffect, useState } from "react";

type Props = {
    encounteredPokemon: PokemonData | null | "failed";
    pokemonDataList: PokemonData[];
    onSelect: (pokemonName: string) => void;
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
    const [displayValue, setDisplayValue] = useState<string | null>(null);
    const [uniquePokemonDataList, setUniquePokemonDataList] = useState<PokemonData[]>([]);

    const getPokemonNames = () => {
        let names: string[] = [
            "Failed",
            ...uniquePokemonDataList.map((pokemonData: PokemonData) => pokemonData.pokemonName).sort(),
        ];
        return [...new Set(names)];
    };

    const handlePokemonSelect = (pokemonName: string) => {
        const matches: PokemonData[] = uniquePokemonDataList.filter(
            (pokemonData: PokemonData) => pokemonData.pokemonName === pokemonName
        );
        const pokemonSlug: string = matches.length > 0 ? matches[0].pokemonSlug : "failed";
        props.onSelect(pokemonSlug);
    };

    useEffect(() => {
        const uniqueList = [
            ...new Map(
                props.pokemonDataList.map((pokemonData: PokemonData) => [pokemonData.pokemonSlug, pokemonData])
            ).values(),
        ];
        setUniquePokemonDataList(uniqueList);
    }, [props.pokemonDataList]);

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
            <strong className={styles.header}>Encounter:</strong>
            <Dropdown
                placeholder="Select..."
                value={displayValue}
                options={getPokemonNames()}
                onSelect={(pokemonName: string) => handlePokemonSelect(pokemonName)}
                disabled={props.pokemonDataList.length === 0}
                reversed={true}
            />
        </div>
    );
};

export default EncounterDisplay;

import PokemonData from "@/models/PokemonData";
import styles from "./EncounterDisplay.module.scss";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useEffect, useState } from "react";

type Props = {
    encounteredPokemon: PokemonData | null;
    pokemonDataList: PokemonData[];
    onSelect: (pokemonName: string) => void;
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
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

    return (
        <div className={styles["encounter-display"]}>
            <strong className={styles.header}>Encounter:</strong>
            <Dropdown
                placeholder="Select..."
                options={getPokemonNames()}
                onSelect={(pokemonName: string) => handlePokemonSelect(pokemonName)}
                disabled={props.pokemonDataList.length === 0}
                reversed={true}
            />
        </div>
    );
};

export default EncounterDisplay;

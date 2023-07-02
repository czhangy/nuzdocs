import PokemonData from "@/models/PokemonData";
import styles from "./EncounterDisplay.module.scss";
import Dropdown from "@/components/Dropdown/Dropdown";

type Props = {
    encounteredPokemon: PokemonData | null;
    missedEncounter: boolean;
    pokemonDataList: PokemonData[];
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
    const getPokemonNames = () => {
        let names: string[] = [
            "Missed",
            ...props.pokemonDataList.map((pokemonData: PokemonData) => pokemonData.pokemonName),
        ];
        return [...new Set(names)];
    };
    return (
        <div className={styles["encounter-display"]}>
            <strong className={styles.header}>Encounter:</strong>
            <Dropdown
                placeholder="Select..."
                options={getPokemonNames()}
                onSelect={() => 4}
                disabled={props.pokemonDataList.length === 0}
                reversed={true}
            />
        </div>
    );
};

export default EncounterDisplay;

import EncounterData from "@/models/EncounterData";
import PokemonData from "@/models/PokemonData";
import styles from "./EncountersAccordion.module.scss";

type Props = {
    pokemonData: PokemonData;
    encounterData: EncounterData[];
};

const EncountersAccordion: React.FC<Props> = (props: Props) => {
    return <div className={styles["encounter-accordion"]}>{props.pokemonData.pokemon.name}</div>;
};

export default EncountersAccordion;

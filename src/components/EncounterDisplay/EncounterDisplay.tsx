import PokemonData from "@/models/PokemonData";
import Image from "next/image";
import { formatName } from "utils";
import styles from "./EncounterDisplay.module.scss";

type Props = {
    encounteredPokemon: PokemonData | null;
    missedEncounter: boolean;
};

const EncounterDisplay: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["encounter-display"]}>
            <div
                className={`${styles.info} ${
                    props.missedEncounter ? styles.missed : ""
                }`}
            >
                <strong className={`${styles.title}`}>Encounter:</strong>
                {props.encounteredPokemon ? (
                    <>
                        <p className={styles.name}>
                            {formatName(props.encounteredPokemon.name)}
                        </p>
                        <span className={styles.divider} />
                        <div className={styles["box-sprite"]}>
                            <Image
                                src={props.encounteredPokemon.sprite}
                                alt={props.encounteredPokemon.name}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </>
                ) : (
                    <p className={styles.placeholder}>???</p>
                )}
            </div>
        </div>
    );
};

export default EncounterDisplay;

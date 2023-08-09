import PokemonData from "@/models/PokemonData";
import { isFinalStage } from "@/utils/utils";
import Link from "next/link";
import styles from "./BoxMenu.module.scss";

type Props = {
    pokemon: PokemonData;
    pokemonID: string;
    runID: string;
    open: boolean;
    inverted: boolean;
    onClose: () => void;
    onEvolve?: () => void;
    onFormChange?: () => void;
    onRIP?: () => void;
    onRevive?: () => void;
};

const BoxMenu: React.FC<Props> = (props: Props) => {
    return (
        <div className={`${styles["box-menu"]} ${props.open ? "" : styles.hide}`}>
            <div className={styles.overlay} onClick={props.onClose} />
            <div className={`${styles.menu} ${props.inverted ? styles.inverted : ""}`}>
                <div className={styles.arrow} />
                <Link href={`/runs/${props.runID}/summary/${props.pokemonID}`}>
                    <a className={styles.option}>Summary</a>
                </Link>
                {props.onEvolve ? (
                    <button
                        className={`${styles.option} ${isFinalStage(props.pokemon) ? styles.disabled : ""}`}
                        onClick={props.onEvolve}
                    >
                        Evolve
                    </button>
                ) : (
                    ""
                )}
                {props.onFormChange ? (
                    <button
                        className={`${styles.option} ${props.pokemon.forms.length === 1 ? styles.disabled : ""}`}
                        onClick={props.onFormChange}
                    >
                        Forms
                    </button>
                ) : (
                    ""
                )}
                {props.onRIP ? (
                    <button className={styles.option} onClick={props.onRIP}>
                        RIP
                    </button>
                ) : (
                    ""
                )}
                {props.onRevive ? (
                    <button className={styles.option} onClick={props.onRevive}>
                        Revive
                    </button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default BoxMenu;

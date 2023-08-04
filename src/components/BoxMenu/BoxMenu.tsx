import PokemonData from "@/models/PokemonData";
import Link from "next/link";
import styles from "./BoxMenu.module.scss";

type Props = {
    open: boolean;
    pokemon: PokemonData;
    onClose: () => void;
    onEvolve?: () => void;
    onFormChange?: () => void;
    onRIP?: () => void;
    onRevive?: () => void;
    inverted: boolean;
};

const BoxMenu: React.FC<Props> = (props: Props) => {
    // Check if the Pokemon is in its final stage
    const isFinalStage = () => {
        if (props.pokemon) {
            for (let chain of props.pokemon.evolutions) {
                if (chain.indexOf(props.pokemon.pokemon.slug) === chain.length - 1) {
                    return true;
                }
            }
            return false;
        }
        return true;
    };

    return (
        <div className={`${styles["box-menu"]} ${props.open ? "" : styles.hide}`}>
            <div className={styles.overlay} onClick={props.onClose} />
            <div className={`${styles.menu} ${props.inverted ? styles.inverted : ""}`}>
                <Link href="/">
                    <a className={styles.option}>Summary</a>
                </Link>
                {props.onEvolve ? (
                    <button
                        className={`${styles.option} ${isFinalStage() ? styles.disabled : ""}`}
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
                <div className={styles.arrow} />
            </div>
        </div>
    );
};

export default BoxMenu;

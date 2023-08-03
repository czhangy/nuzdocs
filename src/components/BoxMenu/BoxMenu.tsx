import PokemonData from "@/models/PokemonData";
import Link from "next/link";
import styles from "./BoxMenu.module.scss";

type Props = {
    open: boolean;
    pokemon: PokemonData;
    onClose: () => void;
    onEvolve: () => void;
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
                <button
                    className={`${styles.option} ${isFinalStage() ? styles.disabled : ""}`}
                    onClick={props.onEvolve}
                >
                    Evolve
                </button>
                <button className={styles.option}>RIP</button>
                <div className={styles.arrow} />
            </div>
        </div>
    );
};

export default BoxMenu;

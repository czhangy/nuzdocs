import Link from "next/link";
import styles from "./BoxMenu.module.scss";

type Props = {
    open: boolean;
    onClose: () => void;
    onEvolve: () => void;
    inverted: boolean;
};

const BoxMenu: React.FC<Props> = (props: Props) => {
    return (
        <div className={`${styles["box-menu"]} ${props.open ? "" : styles.hide}`}>
            <div className={styles.overlay} onClick={props.onClose} />
            <div className={`${styles.menu} ${props.inverted ? styles.inverted : ""}`}>
                <Link href="/">
                    <a className={styles.option}>Summary</a>
                </Link>
                <button className={styles.option} onClick={props.onEvolve}>
                    Evolve
                </button>
                <button className={styles.option}>RIP</button>
                <div className={styles.arrow} />
            </div>
        </div>
    );
};

export default BoxMenu;

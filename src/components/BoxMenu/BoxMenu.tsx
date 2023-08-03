import Link from "next/link";
import styles from "./BoxMenu.module.scss";

type Props = {
    open: boolean;
    onClose: () => void;
    location: { x: number; y: number };
};

const BoxMenu: React.FC<Props> = (props: Props) => {
    return (
        <div className={`${styles["box-menu"]} ${props.open ? "" : styles.hide}`}>
            <div className={styles.overlay} onClick={props.onClose} />
            <div className={styles.menu} style={{ left: props.location.x, top: props.location.y }}>
                <Link href="/">
                    <a className={styles.option}>Summary</a>
                </Link>
                <button className={styles.option}>Evolve</button>
                <button className={styles.option}>RIP</button>
            </div>
        </div>
    );
};

export default BoxMenu;

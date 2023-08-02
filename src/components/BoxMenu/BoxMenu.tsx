import Link from "next/link";
import styles from "./BoxMenu.module.scss";

type Props = {
    open: boolean;
};

const BoxMenu: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["box-menu"]}>
            <Link href="/">
                <a className={styles.option}>Summary</a>
            </Link>
            <button className={styles.option}>Evolve</button>
            <button className={styles.option}>RIP</button>
        </div>
    );
};

export default BoxMenu;

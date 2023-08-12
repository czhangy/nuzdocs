import { useState } from "react";
import styles from "./NavMenu.module.scss";

const NavMenu: React.FC = () => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={`${styles["nav-menu"]} ${open ? styles.open : ""}`}>
            <button className={styles.button} onClick={() => setOpen(!open)}>
                <hr className={styles.icon} />
                <hr className={styles.icon} />
                <hr className={styles.icon} />
            </button>
        </div>
    );
};

export default NavMenu;

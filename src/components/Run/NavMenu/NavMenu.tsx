import { useEffect, useState } from "react";
import styles from "./NavMenu.module.scss";

const NavMenu: React.FC = () => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Named function for event listener callback
    const closeMenu = (): void => setOpen(false);

    // Close menu on scroll
    useEffect(() => {
        document.addEventListener("scroll", closeMenu);
        return () => {
            document.removeEventListener("scroll", closeMenu);
        };
    }, []);

    return (
        <div className={`${styles["nav-menu"]} ${open ? styles.open : ""}`}>
            <div className={styles.overlay} onClick={() => setOpen(false)} />
            <button className={styles.button} onClick={() => setOpen(!open)}>
                <hr className={styles.icon} />
                <hr className={styles.icon} />
                <hr className={styles.icon} />
            </button>
        </div>
    );
};

export default NavMenu;

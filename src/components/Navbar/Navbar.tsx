import { ReactNode } from "react";
import styles from "./Navbar.module.scss";

type Props = {
    children: ReactNode;
};

const Navbar: React.FC<Props> = ({ children }) => {
    return (
        <header className={styles["navbar-container"]}>
            <nav className={styles.navbar}>{children}</nav>
        </header>
    );
};

export default Navbar;

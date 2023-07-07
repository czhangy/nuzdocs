import Image from "next/image";
import Link from "next/link";
import styles from "./MainNavbar.module.scss";

const MainNavbar: React.FC = () => {
    return (
        <header className={styles["navbar-container"]}>
            <nav className={styles.navbar}>
                <div className={styles.branding}>
                    <div className={styles.logo}>
                        <Image src="/assets/images/nuzleaf.webp" alt="Logo" layout="fill" objectFit="contain" />
                    </div>
                    <h1 className={styles["site-name"]}>NuzlockeDB</h1>
                </div>
                <ul className={styles.links}>
                    <li>
                        <Link href="/">
                            <a className={styles.link}>RUNS</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a className={styles.link}>ABOUT</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavbar;

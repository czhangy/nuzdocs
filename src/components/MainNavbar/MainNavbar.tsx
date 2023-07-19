import Image from "next/image";
import Link from "next/link";
import styles from "./MainNavbar.module.scss";
import Navbar from "@/components/Navbar/Navbar";

const MainNavbar: React.FC = () => {
    return (
        <Navbar>
            <Link href="/">
                <a className={styles.branding}>
                    <div className={styles.logo}>
                        <Image src="/assets/images/nuzleaf.webp" alt="Logo" layout="fill" objectFit="contain" />
                    </div>
                    <h1 className={styles["site-name"]}>NuzlockeDB</h1>
                </a>
            </Link>
            <ul className={styles.links}>
                <li>
                    <Link href="/about">
                        <a className={styles.link}>ABOUT</a>
                    </Link>
                </li>
            </ul>
        </Navbar>
    );
};

export default MainNavbar;

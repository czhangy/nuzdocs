import styles from "./RunNavbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const RunNavbar: React.FC = () => {
    const router = useRouter();

    return (
        <header className={styles["navbar-container"]}>
            <nav className={styles.navbar}>
                <Link href="/">
                    <a className={styles.game}>
                        <p className={styles["back-arrow"]}>←</p>
                        <div className={styles.logo}>
                            <Image
                                src="/assets/images/soulsilver.webp"
                                alt="SoulSilver"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </a>
                </Link>
                <ul className={styles.links}>
                    <li>
                        <Link href={`/overview/${router.query.runName}`}>
                            <a className={styles.link}>
                                <div className={styles["link-icon"]}>
                                    <Image
                                        src="/assets/icons/pokeball.svg"
                                        alt="Overview"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                <p className={styles["link-text"]}>Overview</p>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/box/${router.query.runName}`}>
                            <a className={styles.link}>
                                <div className={styles["link-icon"]}>
                                    <Image src="/assets/icons/box.svg" alt="Box" layout="fill" objectFit="contain" />
                                </div>
                                <p className={styles["link-text"]}>Box</p>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/rips/${router.query.runName}`}>
                            <a className={styles.link}>
                                <div className={styles["link-icon"]}>
                                    <Image src="/assets/icons/dead.svg" alt="Dead" layout="fill" objectFit="contain" />
                                </div>
                                <p className={styles["link-text"]}>RIPs</p>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default RunNavbar;

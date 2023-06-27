import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
    return (
        <footer className={styles["footer-container"]}>
            <div className={styles.footer}>
                <div className={styles["text-content"]}>
                    <p className={styles.text}>
                        Developed by <strong>czhangy</strong>
                    </p>
                    <p className={styles.text}>
                        Inspired by{" "}
                        <Link href="https://nuzlocke.app/">
                            <a className={styles.link}>Nuzlocke Tracker</a>
                        </Link>
                    </p>
                </div>
                <ul className={styles.links}>
                    <li>
                        <Link href="https://github.com/czhangy">
                            <a className={styles.icon}>
                                <Image
                                    src="/assets/icons/github.svg"
                                    alt="GitHub"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.linkedin.com/in/czhangy/">
                            <a className={styles.icon}>
                                <Image
                                    src="/assets/icons/linkedin.svg"
                                    alt="LinkedIn"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://twitter.com/czhangy_">
                            <a className={styles.icon}>
                                <Image
                                    src="/assets/icons/twitter.svg"
                                    alt="Twitter"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

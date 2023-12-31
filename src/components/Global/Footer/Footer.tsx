import Image from "next/image";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
    return (
        <footer className={styles["footer-container"]}>
            <div className={styles.footer}>
                <div className={styles.info}>
                    <p className={styles.text}>
                        Developed by <strong>czhangy</strong>
                    </p>
                    <p className={styles.text}>
                        Inspired by{" "}
                        <a className={styles.link} href="https://nuzlocke.app/" target="_blank" rel="noreferrer">
                            Nuzlocke Tracker
                        </a>
                    </p>
                </div>
                <ul className={styles.links}>
                    <li>
                        <a
                            href="https://github.com/czhangy"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.icon} disable-select`}
                        >
                            <Image src="/assets/icons/github.svg" alt="GitHub" layout="fill" objectFit="contain" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/czhangy/"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.icon} disable-select`}
                        >
                            <Image src="/assets/icons/linkedin.svg" alt="LinkedIn" layout="fill" objectFit="contain" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://twitter.com/czhangy_"
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.icon} disable-select`}
                        >
                            <Image src="/assets/icons/twitter.svg" alt="Twitter" layout="fill" objectFit="contain" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

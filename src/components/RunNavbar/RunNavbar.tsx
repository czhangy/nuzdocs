import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./RunNavbar.module.scss";

const RunNavbar: React.FC = () => {
    const router = useRouter();

    return (
        <Navbar>
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
                    <Link href={`/runs/${router.query.runName}/overview`}>
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
                    <Link href={`/runs/${router.query.runName}/box`}>
                        <a className={styles.link}>
                            <div className={styles["link-icon"]}>
                                <Image src="/assets/icons/box.svg" alt="Box" layout="fill" objectFit="contain" />
                            </div>
                            <p className={styles["link-text"]}>Box</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/runs/${router.query.runName}/rips`}>
                        <a className={styles.link}>
                            <div className={styles["link-icon"]}>
                                <Image src="/assets/icons/dead.svg" alt="Dead" layout="fill" objectFit="contain" />
                            </div>
                            <p className={styles["link-text"]}>RIPs</p>
                        </a>
                    </Link>
                </li>
            </ul>
        </Navbar>
    );
};

export default RunNavbar;

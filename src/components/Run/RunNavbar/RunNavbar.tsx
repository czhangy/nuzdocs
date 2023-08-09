import Navbar from "@/components/Global/Navbar/Navbar";
import Run from "@/models/Run";
import { getGame } from "@/utils/game";
import { getRun } from "@/utils/run";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./RunNavbar.module.scss";

const RunNavbar: React.FC = () => {
    const router = useRouter();

    // Internal data state
    const [run, setRun] = useState<Run | null>(null);

    // Validate run and set game for valid runs
    useEffect(() => {
        if (router.isReady) {
            setRun(getRun(router.query.runID as string));
        }
    }, [router.isReady, router.query.runID]);

    return run ? (
        <Navbar>
            <Link href="/">
                <a className={styles.game}>
                    <p className={styles["back-arrow"]}>←</p>
                    <div className={styles.logo}>
                        <Image
                            src={getGame(run.gameSlug).logoURL}
                            alt={getGame(run.gameSlug).name}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </a>
            </Link>
            <ul className={styles.links}>
                <li>
                    <Link href={`/runs/${run.id}/overview`}>
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
                    <Link href={`/runs/${run.id}/box`}>
                        <a className={styles.link}>
                            <div className={styles["link-icon"]}>
                                <Image src="/assets/icons/box.svg" alt="Box" layout="fill" objectFit="contain" />
                            </div>
                            <p className={styles["link-text"]}>Box</p>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/runs/${run.id}/rips`}>
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
    ) : (
        <></>
    );
};

export default RunNavbar;

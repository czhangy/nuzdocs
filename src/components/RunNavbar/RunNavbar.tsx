import Navbar from "@/components/Global/Navbar/Navbar";
import Game from "@/models/Game";
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

    // Internal state
    const [game, setGame] = useState<Game | null>(null);

    // Validate run and set game for valid runs
    useEffect(() => {
        if (router.query.runName) {
            const runName: string = router.query.runName as string;
            const run: Run = getRun(runName);
            if (run) setGame(getGame(getRun(runName).gameSlug));
        }
    }, [router.query.runName]);

    return (
        <Navbar>
            <Link href="/">
                <a className={styles.game}>
                    <p className={styles["back-arrow"]}>←</p>
                    {game ? (
                        <div className={styles.logo}>
                            <Image src={game.logoURL} alt={game.name} layout="fill" objectFit="contain" />
                        </div>
                    ) : (
                        ""
                    )}
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

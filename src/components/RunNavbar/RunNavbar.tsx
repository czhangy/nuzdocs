import Navbar from "@/components/Navbar/Navbar";
import Game from "@/models/Game";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import games from "@/static/games";
import { getRun } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./RunNavbar.module.scss";

const RunNavbar: React.FC = () => {
    const [game, setGame] = useState<Game | null>(null);
    const router = useRouter();

    // Validate run and set game for valid runs
    useEffect(() => {
        if (router.query.runName && router.query.segmentSlug) {
            const run: Run = getRun(router.query.runName as string);
            if (
                run &&
                games[run.gameSlug].gameGroup.segments
                    .map((segment: Segment) => segment.segment.slug)
                    .includes(router.query.segmentSlug as string)
            ) {
                setGame(games[run.gameSlug]);
            }
        }
    }, [router.query.runName, router.query.segmentSlug]);

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

import Navbar from "@/components/Global/Navbar/Navbar";
import NavMenu from "@/components/Run/NavMenu/NavMenu";
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
    const [prev, setPrev] = useState<string>("");

    // Validate run and set game for valid runs
    useEffect(() => {
        if (router.isReady && router.query.segmentSlug) {
            setRun(getRun(router.query.runID as string));
            setPrev(router.query.segmentSlug as string);
        }
    }, [router.isReady, router.query.runID, router.query.segmentSlug]);

    return run ? (
        <Navbar>
            <div className={styles["run-navbar"]}>
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
                <NavMenu runID={run.id} prev={prev} />
            </div>
        </Navbar>
    ) : (
        <></>
    );
};

export default RunNavbar;

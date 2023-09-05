import Navbar from "@/components/Global/Navbar/Navbar";
import NavMenu from "@/components/Run/NavMenu/NavMenu";
import Run from "@/models/Run";
import { getGame } from "@/utils/game";
import { getRun, setPrevIdx } from "@/utils/run";
import { isNumeric } from "@/utils/utils";
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
            const runID: string = router.query.runID as string;
            const idx: string = router.query.idx as string;
            if (isNumeric(idx)) {
                setPrevIdx(runID, parseInt(idx));
            }
            setRun(getRun(runID));
        }
    }, [router.isReady, router.asPath, router.query.runID, router.query.idx]);

    return run ? (
        <Navbar>
            <div className={styles["run-navbar"]}>
                <Link href="/">
                    <a className={styles.game}>
                        <p className={styles["back-arrow"]}>←</p>
                        <div className={styles.logo}>
                            <Image
                                src={getGame(run.gameSlug).logo}
                                alt={getGame(run.gameSlug).name}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </a>
                </Link>
                <NavMenu run={run} />
            </div>
        </Navbar>
    ) : (
        <></>
    );
};

export default RunNavbar;

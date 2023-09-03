import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getGame, getSegments } from "@/utils/game";
import { getPB } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./SegmentNav.module.scss";

type Props = {
    idx: number;
    run: Run;
};

const SegmentNav: React.FC<Props> = (props: Props) => {
    // Internal data state
    const [segments, setSegments] = useState<Segment[]>([]);
    const [pb, setPB] = useState<string>("");

    // Get the segments of the current game from local storage on component load
    useEffect(() => {
        if (props.idx !== undefined && props.run !== undefined) {
            const segments: Segment[] = getSegments(props.run);
            setSegments(segments);
            setPB(getPB(props.run.gameSlug));
        }
    }, [props.idx, props.run]);

    return segments.length > 0 ? (
        <div className={styles["segment-nav"]}>
            <nav className={styles.nav}>
                {props.idx - 1 >= 0 ? (
                    <Link href={`/runs/${props.run.id}/${props.idx - 1}`}>
                        <a className={styles.arrow}>← {segments[props.idx - 1].name}</a>
                    </Link>
                ) : (
                    <div />
                )}
                {props.idx + 1 < segments.length ? (
                    <Link href={`/runs/${props.run.id}/${props.idx + 1}`}>
                        <a className={styles.arrow}>{segments[props.idx + 1].name} →</a>
                    </Link>
                ) : (
                    ""
                )}
            </nav>
            <h2 className={styles.header}>
                {segments[props.idx].name}{" "}
                <span
                    className={styles.pb}
                    title={`This is your personal best for a run of Pokémon ${getGame(props.run.gameSlug).name}!`}
                >
                    {pb === segments[props.idx].slug ? "🚩" : ""}
                </span>
            </h2>
        </div>
    ) : (
        <></>
    );
};

export default SegmentNav;

import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";
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

    // Get the segments of the current game from local storage on component load
    useEffect(() => {
        if (props.idx !== undefined && props.run !== undefined) {
            const segments: Segment[] = getSegments(props.run.gameSlug);
            setSegments(segments);
        }
    }, [props.idx, props.run]);

    return (
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
            {segments.length > 0 ? <h2 className={styles.header}>{segments[props.idx].name}</h2> : ""}
        </div>
    );
};

export default SegmentNav;

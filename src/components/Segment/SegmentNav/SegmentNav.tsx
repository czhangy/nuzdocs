import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./SegmentNav.module.scss";

type Props = {
    segmentSlug: string;
    run: Run;
};

const SegmentNav: React.FC<Props> = (props: Props) => {
    // Internal data state
    const [segments, setSegments] = useState<Segment[]>([]);
    const [segmentIdx, setSegmentIdx] = useState<number>(0);

    // Get the segments of the current game from local storage on component load
    useEffect(() => {
        if (props.segmentSlug && props.run) {
            const segments: Segment[] = getSegments(props.run.gameSlug);
            setSegments(segments);
            setSegmentIdx(segments.findIndex((segment: Segment) => segment.slug === props.segmentSlug));
        }
    }, [props.segmentSlug, props.run]);

    return (
        <div className={styles["segment-nav"]}>
            <nav className={styles.nav}>
                {segmentIdx - 1 >= 0 ? (
                    <Link href={`/runs/${props.run.id}/${segments[segmentIdx - 1].slug}`}>
                        <a className={styles.arrow}>← {segments[segmentIdx - 1].name}</a>
                    </Link>
                ) : (
                    <div />
                )}
                {segmentIdx + 1 < segments.length ? (
                    <Link href={`/runs/${props.run.id}/${segments[segmentIdx + 1].slug}`}>
                        <a className={styles.arrow}>{segments[segmentIdx + 1].name} →</a>
                    </Link>
                ) : (
                    ""
                )}
            </nav>
            <h2 className={styles.header}>{segments[segmentIdx].name}</h2>
        </div>
    );
};

export default SegmentNav;

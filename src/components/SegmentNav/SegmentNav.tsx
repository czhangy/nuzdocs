import Segment from "@/models/Segment";
import Link from "next/link";
import styles from "./SegmentNav.module.scss";

type Props = {
    segments: Segment[];
    segmentSlug: string;
    runName: string;
};

const SegmentNav: React.FC<Props> = (props: Props) => {
    // Finds the index of the current segment in the game's segments list
    const getSegmentIndex = (): number => {
        return props.segments.map((segment: Segment) => segment.segment.slug).indexOf(props.segmentSlug);
    };

    return (
        <div className={styles["segment-nav"]}>
            <nav className={styles.nav}>
                {getSegmentIndex() > 0 ? (
                    <Link href={`/runs/${props.runName}/${props.segments[getSegmentIndex() - 1].segment.slug}`}>
                        <a className={styles.arrow}>← {props.segments[getSegmentIndex() - 1].segment.name}</a>
                    </Link>
                ) : (
                    <div />
                )}
                {getSegmentIndex() + 1 < props.segments.length ? (
                    <Link href={`/runs/${props.runName}/${props.segments[getSegmentIndex() + 1].segment.slug}`}>
                        <a className={styles.arrow}>{props.segments[getSegmentIndex() + 1].segment.name} →</a>
                    </Link>
                ) : (
                    ""
                )}
            </nav>
            <h2 className={styles.header}>{props.segments[getSegmentIndex()].segment.name}</h2>
        </div>
    );
};

export default SegmentNav;

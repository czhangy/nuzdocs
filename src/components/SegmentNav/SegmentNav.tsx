import Segment from "@/models/Segment";
import Link from "next/link";
import styles from "./SegmentNav.module.scss";

type Props = {
    segments: { [segmentSlug: string]: Segment };
    segmentSlug: string;
    runName: string;
};

const SegmentNav: React.FC<Props> = (props: Props) => {
    // Finds the index of the current segment in the game's segments list
    const getSegmentIndex = (): number => {
        const slugs = Object.keys(props.segments);
        return slugs.indexOf(props.segmentSlug);
    };

    // Returns the slug at a given index of segments for nav routing
    const getSlugAtIndex = (idx: number): string => {
        return Object.keys(props.segments)[idx];
    };

    // Returns the name at a given index of segments for nav display
    const getNameAtIndex = (idx: number): string => {
        return props.segments[Object.keys(props.segments)[idx]].segment.name;
    };

    return (
        <div className={styles["segment-nav"]}>
            <nav className={styles.nav}>
                {getSegmentIndex() > 0 ? (
                    <Link href={`/runs/${props.runName}/${getSlugAtIndex(getSegmentIndex() - 1)}`}>
                        <a className={styles.arrow}>← {getNameAtIndex(getSegmentIndex() - 1)}</a>
                    </Link>
                ) : (
                    <div />
                )}
                {getSegmentIndex() + 1 < Object.keys(props.segments).length ? (
                    <Link href={`/runs/${props.runName}/${getSlugAtIndex(getSegmentIndex() + 1)}`}>
                        <a className={styles.arrow}>{getNameAtIndex(getSegmentIndex() + 1)} →</a>
                    </Link>
                ) : (
                    ""
                )}
            </nav>
            <h2 className={styles.header}>{props.segments[props.segmentSlug].segment.name}</h2>
        </div>
    );
};

export default SegmentNav;

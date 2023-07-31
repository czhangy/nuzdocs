import Segment from "@/models/Segment";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./SegmentNav.module.scss";

type Props = {
    segments: Segment[];
    segmentSlug: string;
};

const SegmentNav: React.FC<Props> = (props: Props) => {
    const router = useRouter();

    // Finds the index of the current segment in the game's segments list
    const getSegmentIndex = (): number => {
        return props.segments.map((segment: Segment) => segment.segment.slug).indexOf(props.segmentSlug);
    };

    return (
        <nav className={styles["segment-nav"]}>
            {getSegmentIndex() > 0 ? (
                <Link href={`/runs/${router.query.runName}/${props.segments[getSegmentIndex() - 1].segment.slug}`}>
                    <a className={`${styles.nav} ${styles.back}`}>
                        ← {props.segments[getSegmentIndex() - 1].segment.name}
                    </a>
                </Link>
            ) : (
                <div />
            )}
            {getSegmentIndex() + 1 < props.segments.length ? (
                <Link href={`/runs/${router.query.runName}/${props.segments[getSegmentIndex() + 1].segment.slug}`}>
                    <a className={`${styles.nav} ${styles.next}`}>
                        {props.segments[getSegmentIndex() + 1].segment.name} →
                    </a>
                </Link>
            ) : (
                ""
            )}
        </nav>
    );
};

export default SegmentNav;

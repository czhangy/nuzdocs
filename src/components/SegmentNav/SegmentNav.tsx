import styles from "./SegmentNav.module.scss";
import LocalLocation from "@/models/LocalLocation";
import Link from "next/link";

type Props = {
    segments: LocalLocation[];
    segmentSlug: string;
};

const SegmentNav: React.FC<Props> = (props: Props) => {
    const getSegmentIndex = () => {
        return props.segments.map((segment: LocalLocation) => segment.slug).indexOf(props.segmentSlug);
    };

    return (
        <div className={styles["segment-nav"]}>
            {getSegmentIndex() > 0 ? (
                <Link href="/">
                    <a className={`${styles["nav-button"]} ${styles["back-button"]}`}>
                        ← {props.segments[getSegmentIndex() - 1].name}
                    </a>
                </Link>
            ) : (
                <div />
            )}
            {getSegmentIndex() + 1 < props.segments.length ? (
                <Link href="/">
                    <a className={`${styles["nav-button"]} ${styles["next-button"]}`}>
                        {props.segments[getSegmentIndex() + 1].name} →
                    </a>
                </Link>
            ) : (
                ""
            )}
        </div>
    );
};

export default SegmentNav;

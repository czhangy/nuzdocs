import LocalLocation from "@/models/LocalLocation";
import Link from "next/link";
import styles from "./SegmentNav.module.scss";
import { useRouter } from "next/router";

type Props = {
    segments: LocalLocation[];
    segmentSlug: string;
};

const SegmentNav: React.FC<Props> = (props: Props) => {
    const router = useRouter();

    const getSegmentIndex = () => {
        return props.segments.map((segment: LocalLocation) => segment.slug).indexOf(props.segmentSlug);
    };

    return (
        <div className={styles["segment-nav"]}>
            {getSegmentIndex() > 0 ? (
                <Link href={`/runs/${router.query.runName}/${props.segments[getSegmentIndex() - 1].slug}`}>
                    <a className={`${styles["nav-button"]} ${styles["back-button"]}`}>
                        ← {props.segments[getSegmentIndex() - 1].name}
                    </a>
                </Link>
            ) : (
                <div />
            )}
            {getSegmentIndex() + 1 < props.segments.length ? (
                <Link href={`/runs/${router.query.runName}/${props.segments[getSegmentIndex() + 1].slug}`}>
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

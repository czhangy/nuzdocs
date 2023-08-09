import BattlePage from "@/components/Battle/BattlePage/BattlePage";
import LocationPage from "@/components/Location/LocationPage/LocationPage";
import SegmentNav from "@/components/Segment/SegmentNav/SegmentNav";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { setPrevSegmentSlug } from "@/utils/run";
import { useEffect } from "react";
import styles from "./SegmentPage.module.scss";

type Props = {
    segment: Segment;
    run: Run;
};

const SegmentPage: React.FC<Props> = (props) => {
    // Save segment as previous segment on nav
    useEffect(() => {
        if (props.segment) {
            setPrevSegmentSlug(props.run.id, props.segment.slug);
        }
    }, [props.segment]);

    return (
        <div className={styles["segment-page"]}>
            <SegmentNav segmentSlug={props.segment.slug} run={props.run} />
            {props.segment.type === "location" ? (
                <LocationPage segment={props.segment} run={props.run} />
            ) : (
                <BattlePage segment={props.segment} run={props.run} />
            )}
        </div>
    );
};

export default SegmentPage;

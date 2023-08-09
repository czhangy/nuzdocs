import BattlePage from "@/components/BattlePage/BattlePage";
import LocationPage from "@/components/Location/LocationPage/LocationPage";
import SegmentNav from "@/components/Segment/SegmentNav/SegmentNav";
import BattleSegment from "@/models/BattleSegment";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { setPrevSegmentSlug } from "@/utils/run";
import { getSegment } from "@/utils/segment";
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
                <BattlePage
                    battleSlug={props.segmentSlug}
                    segment={getSegment(props.gameSlug, props.segmentSlug).segment as BattleSegment}
                    runName={props.runName}
                />
            )}
        </div>
    );
};

export default SegmentPage;

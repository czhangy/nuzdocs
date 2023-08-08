import BattlePage from "@/components/BattlePage/BattlePage";
import LocationPage from "@/components/LocationPage/LocationPage";
import SegmentNav from "@/components/Segment/SegmentNav/SegmentNav";
import BattleSegment from "@/models/BattleSegment";
import Run from "@/models/Run";
import { setPrevSegmentSlug } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import { useEffect } from "react";
import styles from "./SegmentPage.module.scss";

type Props = {
    segmentSlug: string;
    run: Run;
};

const SegmentPage: React.FC<Props> = (props) => {
    // Save segment as previous segment on nav
    useEffect(() => {
        if (props.segmentSlug) setPrevSegmentSlug(props.run.id, props.segmentSlug);
    }, [props.segmentSlug]);

    return (
        <div className={styles["segment-page"]}>
            <SegmentNav segmentSlug={props.segmentSlug} run={props.run} />
            {isLocationSegment(props.gameSlug, props.segmentSlug) ? (
                <LocationPage gameSlug={props.gameSlug} runName={props.runName} segmentSlug={props.segmentSlug} />
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

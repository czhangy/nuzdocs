import BattlePage from "@/components/BattlePage/BattlePage";
import LocationPage from "@/components/LocationPage/LocationPage";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import BattleSegment from "@/models/BattleSegment";
import { getSegments } from "@/utils/game";
import { setPrevSegmentSlug } from "@/utils/run";
import { getSegment, isLocationSegment } from "@/utils/segment";
import { useEffect } from "react";
import styles from "./SegmentPage.module.scss";

type Props = {
    gameSlug: string;
    runName: string;
    segmentSlug: string;
};

const SegmentPage: React.FC<Props> = (props) => {
    // Save segment as previous segment on nav
    useEffect(() => {
        if (props.segmentSlug) setPrevSegmentSlug(props.runName, props.segmentSlug);
    }, [props.segmentSlug]);

    return (
        <div className={styles["segment-page"]}>
            <SegmentNav
                segments={getSegments(props.gameSlug)}
                segmentSlug={props.segmentSlug}
                runName={props.runName}
            />
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

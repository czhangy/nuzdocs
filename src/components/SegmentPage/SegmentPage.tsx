import BattlePage from "@/components/BattlePage/BattlePage";
import LocationPage from "@/components/LocationPage/LocationPage";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import games from "@/static/games";
import { getRun } from "@/utils/utils";
import { useEffect } from "react";
import styles from "./SegmentPage.module.scss";

type Props = {
    gameSlug: string;
    runName: string;
    segmentSlug: string;
};

const SegmentPage: React.FC<Props> = (props) => {
    // Get the segment type for conditional rendering
    const getSegmentType = (): string => {
        return games[props.gameSlug].gameGroup.segments.find(
            (segment: Segment) => segment.segment.slug === (props.segmentSlug as string)
        )!.type;
    };

    useEffect(() => {
        const run: Run = getRun(props.runName);
        run.prevLocationSlug = props.segmentSlug;
        localStorage.setItem(props.runName, JSON.stringify(run));
    }, [props.segmentSlug]);

    return (
        <div className={styles["segment-page"]}>
            <SegmentNav
                segments={games[props.gameSlug].gameGroup.segments}
                segmentSlug={props.segmentSlug}
                runName={props.runName}
            />
            {getSegmentType() === "location" ? (
                <LocationPage gameSlug={props.gameSlug} runName={props.runName} segmentSlug={props.segmentSlug} />
            ) : (
                <BattlePage gameSlug={props.gameSlug} segmentSlug={props.segmentSlug} />
            )}
        </div>
    );
};

export default SegmentPage;

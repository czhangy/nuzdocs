import BattlePage from "@/components/BattlePage/BattlePage";
import LocationPage from "@/components/LocationPage/LocationPage";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import BattleSegment from "@/models/BattleSegment";
import Run from "@/models/Run";
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
        return games[props.gameSlug].gameGroup.segments[props.segmentSlug].type;
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
                <BattlePage
                    battleSlug={props.segmentSlug}
                    segment={games[props.gameSlug].gameGroup.segments[props.segmentSlug].segment as BattleSegment}
                    runName={props.runName}
                />
            )}
        </div>
    );
};

export default SegmentPage;

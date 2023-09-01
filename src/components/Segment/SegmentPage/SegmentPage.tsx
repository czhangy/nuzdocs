import BattlePage from "@/components/Battle/BattlePage/BattlePage";
import LocationPage from "@/components/Location/LocationPage/LocationPage";
import SegmentNav from "@/components/Segment/SegmentNav/SegmentNav";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";
import { setPrevIdx } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./SegmentPage.module.scss";

type Props = {
    idx: number;
    run: Run;
};

const SegmentPage: React.FC<Props> = (props) => {
    // Internal state
    const [segment, setSegment] = useState<Segment | null>(null);

    // Save segment as previous segment on nav
    useEffect(() => {
        if (props.idx !== undefined && props.run !== undefined) {
            setPrevIdx(props.run.id, props.idx);
            setSegment(getSegments(props.run)[props.idx]);
        }
    }, [props.idx, props.run]);

    return segment ? (
        <div className={styles["segment-page"]}>
            <SegmentNav idx={props.idx} run={props.run} />
            {segment.type === "location" ? (
                <LocationPage idx={props.idx} run={props.run} />
            ) : (
                <BattlePage segment={segment} run={props.run} />
            )}
        </div>
    ) : (
        <></>
    );
};

export default SegmentPage;

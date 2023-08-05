import BattleOverview from "@/components/BattleOverview/BattleOverview";
import LocationOverview from "@/components/LocationOverview/LocationOverview";
import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";
import { getRun } from "@/utils/run";
import { isLocationSegment } from "@/utils/segment";
import { useEffect, useState } from "react";
import styles from "./OverviewPage.module.scss";

type Props = {
    runName: string;
};

const OverviewPage: React.FC<Props> = (props: Props) => {
    // Internal data state
    const [segments, setSegments] = useState<{ [segmentSlug: string]: Segment }>({});

    // Get segments of current run
    useEffect(() => {
        if (props.runName) setSegments(getSegments(getRun(props.runName).gameSlug));
    }, [props.runName]);

    return (
        <div className={styles["overview-page"]}>
            <h2 className={styles.header}>Overview</h2>
            <ul className={styles.segments}>
                {Object.keys(segments).map((segmentSlug: string, key: number) => {
                    return (
                        <li className={styles.segment} key={key}>
                            {isLocationSegment(getRun(props.runName).gameSlug, segmentSlug) ? (
                                <LocationOverview locationSlug={segmentSlug} runName={props.runName} key={key} />
                            ) : (
                                <BattleOverview battleSlug={segmentSlug} runName={props.runName} key={key} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default OverviewPage;

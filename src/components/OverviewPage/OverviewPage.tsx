import BattleOverview from "@/components/BattleOverview/BattleOverview";
import LocationOverview from "@/components/LocationOverview/LocationOverview";
import Segment from "@/models/Segment";
import { getGameSlug, getSegmentsObject } from "@/utils/utils";
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
        if (props.runName) setSegments(getSegmentsObject(getGameSlug(props.runName)));
    }, [props.runName]);

    return (
        <div className={styles["overview-page"]}>
            <h2 className={styles.header}>Overview</h2>
            <ul className={styles.segments}>
                {Object.keys(segments).map((segmentSlug: string, key: number) => {
                    return (
                        <li className={styles.segment} key={key}>
                            {segments[segmentSlug].type === "location" ? (
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

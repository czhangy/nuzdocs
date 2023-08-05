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
                {Object.keys(segments).map((locationSlug: string, key: number) => {
                    if (segments[locationSlug].type === "location") {
                        return (
                            <li className={styles.segment} key={key}>
                                <LocationOverview locationSlug={locationSlug} runName={props.runName} key={key} />
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default OverviewPage;

import Segment from "@/models/Segment";
import { getSegmentsInSplit, getSplits } from "@/utils/game";
import { getRun } from "@/utils/run";
import { useEffect, useState } from "react";
import SplitOverview from "../SplitOverview/SplitOverview";
import styles from "./OverviewPage.module.scss";

type Props = {
    runName: string;
};

const OverviewPage: React.FC<Props> = (props: Props) => {
    // Internal data state
    const [splits, setSplits] = useState<{ [split: string]: { [segmentSlug: string]: Segment } }>({});

    // Get segments of current run
    useEffect(() => {
        if (props.runName) setSplits(getSplits(getRun(props.runName).gameSlug));
    }, [props.runName]);

    return (
        <div className={styles["overview-page"]}>
            <h2 className={styles.header}>Overview</h2>
            <ul className={styles.splits}>
                {Object.keys(splits).map((split: string, key: number) => (
                    <li key={key}>
                        <SplitOverview
                            split={split}
                            segments={getSegmentsInSplit(getRun(props.runName).gameSlug, split)}
                            runName={props.runName}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OverviewPage;

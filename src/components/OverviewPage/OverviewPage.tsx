import Segment from "@/models/Segment";
import { getSegmentsInSplit, getSplits } from "@/utils/game";
import { getRun } from "@/utils/run";
import { useEffect, useState } from "react";
import SplitOverview from "@/components/SplitOverview/SplitOverview";
import styles from "./OverviewPage.module.scss";

type Props = {
    runName: string;
};

const OverviewPage: React.FC<Props> = (props: Props) => {
    // Internal data state
    const [splits, setSplits] = useState<{ [split: string]: { [segmentSlug: string]: Segment } }>({});
    const [currentSplit, setCurrentSplit] = useState<string>("");

    // Get segments of current run
    useEffect(() => {
        if (props.runName) setSplits(getSplits(getRun(props.runName).gameSlug));
    }, [props.runName]);

    // Find the user's current split
    useEffect(() => {
        for (const split of Object.keys(splits)) {
            for (const segmentSlug of Object.keys(splits[split])) {
                if (segmentSlug === getRun(props.runName).prevSegmentSlug) {
                    setCurrentSplit(split);
                    return;
                }
            }
        }
    }, [splits]);

    return (
        <div className={styles["overview-page"]}>
            <h2 className={styles.header}>Overview</h2>
            <p className={styles.notice}>*Level caps noted at the top of each split*</p>
            <ul className={styles.splits}>
                {Object.keys(splits).map((split: string, key: number) => (
                    <li key={key}>
                        <SplitOverview
                            split={split}
                            segments={getSegmentsInSplit(getRun(props.runName).gameSlug, split)}
                            runName={props.runName}
                            isOpen={split === currentSplit}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OverviewPage;

import SplitOverview from "@/components/Overview/SplitOverview/SplitOverview";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import Split from "@/models/Split";
import { getGameData } from "@/utils/game";
import { satisifesConditions } from "@/utils/segment";
import styles from "./OverviewPage.module.scss";

type Props = {
    run: Run;
};

const OverviewPage: React.FC<Props> = (props: Props) => {
    // Calculate the starting index of the split
    const getStartIdx = (idx: number) => {
        let start = 0;
        for (let i = idx - 1; i >= 0; i--) {
            start += getGameData(props.run.gameSlug).splits[i].segments.filter((segment: Segment) =>
                satisifesConditions(segment, props.run)
            ).length;
        }
        return start;
    };

    return (
        <div className={styles["overview-page"]}>
            <h2 className={styles.header}>Overview</h2>
            <p className={styles.notice}>*Level caps noted at the top of each split*</p>
            <ul className={styles.splits}>
                {getGameData(props.run.gameSlug).splits.map((split: Split, idx: number) => (
                    <li key={split.name}>
                        <SplitOverview split={split} run={props.run} start={getStartIdx(idx)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OverviewPage;

import SplitOverview from "@/components/Overview/SplitOverview/SplitOverview";
import Run from "@/models/Run";
import Split from "@/models/Split";
import { getGameData } from "@/utils/game";
import styles from "./OverviewPage.module.scss";

type Props = {
    run: Run;
};

const OverviewPage: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["overview-page"]}>
            <h2 className={styles.header}>Overview</h2>
            <p className={styles.notice}>*Level caps noted at the top of each split*</p>
            <ul className={styles.splits}>
                {getGameData(props.run.gameSlug).splits.map((split: Split) => (
                    <li key={split.name}>
                        <SplitOverview split={split} run={props.run} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OverviewPage;

import SplitOverview from "@/components/Overview/SplitOverview/SplitOverview";
import Run from "@/models/Run";
import { getSplitNames } from "@/utils/game";
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
                {getSplitNames(props.run.gameSlug).map((split: string, key: number) => (
                    <li key={key}>
                        <SplitOverview split={split} run={props.run} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OverviewPage;

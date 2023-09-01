import Run from "@/models/Run";
import Split from "@/models/Split";
import { getLevelCap } from "@/utils/battle";
import { getGameData } from "@/utils/game";
import { getStarterSlug, isCleared } from "@/utils/run";
import styles from "./NextLevelCap.module.scss";

type Props = {
    segment: string;
    run: Run;
};

const NextLevelCap: React.FC<Props> = (props: Props) => {
    // Scan segments for the next level cap
    const getNextLevelCap = (): number | string => {
        const splits: Split[] = getGameData(props.run.gameSlug).splits;
        for (const split of splits) {
            if (!isCleared(props.run.id, split.segments.at(-1)!.slug)) {
                return getLevelCap(props.run.gameSlug, split.segments.at(-1)!.slug, getStarterSlug(props.run.id));
            }
        }
        return "None";
    };

    return (
        <div className={styles["next-level-cap"]}>
            <p className={styles.text}>
                Next Level Cap: <strong>{getNextLevelCap()}</strong>
            </p>
        </div>
    );
};

export default NextLevelCap;

import { getCompletedBattles, getSegments } from "@/utils/utils";
import styles from "./NextLevelCap.module.scss";
import Segment from "@/models/Segment";
import BattleSegment from "@/models/BattleSegment";

type Props = {
    gameSlug: string;
    runName: string;
};

const NextLevelCap: React.FC<Props> = (props: Props) => {
    const getNextLevelCap = (): number | string => {
        const segments: Segment[] = getSegments(props.gameSlug);
        const completedBattles: string[] = getCompletedBattles(props.runName);
        for (let segment of segments) {
            if (
                segment.type === "battle" &&
                (segment.segment as BattleSegment).levelCap &&
                !completedBattles.includes(segment.name)
            ) {
                return (segment.segment as BattleSegment).levelCap as number;
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

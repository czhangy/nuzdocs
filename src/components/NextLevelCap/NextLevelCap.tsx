import BattleSegment from "@/models/BattleSegment";
import Segment from "@/models/Segment";
import { getSegments } from "@/utils/game";
import { isCleared } from "@/utils/run";
import { hasLevelCap } from "@/utils/segment";
import styles from "./NextLevelCap.module.scss";

type Props = {
    gameSlug: string;
    runName: string;
};

const NextLevelCap: React.FC<Props> = (props: Props) => {
    // Scan segments for the next
    const getNextLevelCap = (): number | string => {
        const segments: Segment[] = getSegments(props.gameSlug);
        for (const segment of segments) {
            if (hasLevelCap(segment) && !isCleared(props.runName, segment.slug)) {
                return (segment.segment as BattleSegment).levelCap!;
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

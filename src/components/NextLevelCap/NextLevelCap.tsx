import BattleSegment from "@/models/BattleSegment";
import Segment from "@/models/Segment";
import { hasLevelCap } from "@/utils/battle";
import { getSegments } from "@/utils/game";
import { isCleared } from "@/utils/run";
import { isBattleSegment } from "@/utils/segment";
import styles from "./NextLevelCap.module.scss";

type Props = {
    gameSlug: string;
    runName: string;
};

const NextLevelCap: React.FC<Props> = (props: Props) => {
    const getNextLevelCap = (): number | string => {
        const segments: { [segmentSlug: string]: Segment } = getSegments(props.gameSlug);
        for (const [slug, segment] of Object.entries(segments)) {
            if (
                isBattleSegment(props.gameSlug, slug) &&
                hasLevelCap(props.gameSlug, slug) &&
                !isCleared(props.runName, slug)
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

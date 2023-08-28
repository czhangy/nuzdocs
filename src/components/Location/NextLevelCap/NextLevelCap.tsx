import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getLevelCap } from "@/utils/battle";
import { getSegments } from "@/utils/game";
import { getStarterSlug, isCleared } from "@/utils/run";
import { hasLevelCap } from "@/utils/segment";
import styles from "./NextLevelCap.module.scss";

type Props = {
    locationSlug: string;
    run: Run;
};

const NextLevelCap: React.FC<Props> = (props: Props) => {
    // Scan segments for the next
    const getNextLevelCap = (): number | string => {
        const segments: Segment[] = getSegments(props.run.gameSlug);
        const idx: number = segments.map((segment: Segment) => segment.slug).indexOf(props.locationSlug);
        for (let i = idx + 1; i < segments.length; i++) {
            if (hasLevelCap(segments[i]) && !isCleared(props.run.id, segments[i].slug)) {
                return getLevelCap(props.run.gameSlug, segments[i].slug, getStarterSlug(props.run.id));
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

import BattleOverview from "@/components/BattleOverview/BattleOverview";
import LocationOverview from "@/components/LocationOverview/LocationOverview";
import Segment from "@/models/Segment";
import { getRun } from "@/utils/run";
import { isLocationSegment } from "@/utils/segment";
import styles from "./SplitOverview.module.scss";

type Props = {
    segments: { [segmentSlug: string]: Segment };
    runName: string;
};

const SplitOverview: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["split-overview"]}>
            {Object.keys(props.segments).map((segmentSlug: string, key: number) => {
                return (
                    <li className={styles.segment} key={key}>
                        {isLocationSegment(getRun(props.runName).gameSlug, segmentSlug) ? (
                            <LocationOverview locationSlug={segmentSlug} runName={props.runName} key={key} />
                        ) : (
                            <BattleOverview battleSlug={segmentSlug} runName={props.runName} key={key} />
                        )}
                    </li>
                );
            })}
        </div>
    );
};

export default SplitOverview;

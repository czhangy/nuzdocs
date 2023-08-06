import BattleOverview from "@/components/BattleOverview/BattleOverview";
import LocationOverview from "@/components/LocationOverview/LocationOverview";
import Segment from "@/models/Segment";
import { getRun } from "@/utils/run";
import { isLocationSegment } from "@/utils/segment";
import styles from "./SplitOverview.module.scss";
import Image from "next/image";

type Props = {
    split: string;
    segments: { [segmentSlug: string]: Segment };
    runName: string;
};

const SplitOverview: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["split-overview"]}>
            <button className={styles.header}>
                <p className={styles.split}>{props.split}</p>
                <hr className={styles.line} />
                <div className={styles.arrow}>
                    <Image src="/assets/icons/arrow.svg" alt="Open split" layout="fill" objectFit="contain" />
                </div>
            </button>
            <div className={styles.segments}>
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
        </div>
    );
};

export default SplitOverview;

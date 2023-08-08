import BattleOverview from "@/components/Overview/BattleOverview/BattleOverview";
import LocationOverview from "@/components/Overview/LocationOverview/LocationOverview";
import BattleSegment from "@/models/BattleSegment";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getSegmentsInSplit } from "@/utils/game";
import { isCleared } from "@/utils/run";
import { isLocationSegment } from "@/utils/segment";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SplitOverview.module.scss";

type Props = {
    split: string;
    run: Run;
};

const SplitOverview: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Internal data state
    const [segments, setSegments] = useState<{ [segmentSlug: string]: Segment }>({});

    // Calculate the height of the expanded container
    const getExpandedHeight = (): string => {
        const numSegments: number = Object.keys(segments).length;
        return `calc(var(--split-font-size) + var(--splits-inner-spacing) + ${numSegments} * (4rem + 81px) + ${
            numSegments - 1
        } * var(--segments-inner-spacing))`;
    };

    // Check if split has been completed
    const isComplete = (): boolean => {
        return isCleared(props.run.id, Object.keys(segments).at(-1)!);
    };

    // Get the level cap from the segment's final fight
    const getLevelCap = (): number => {
        return (Object.values(segments).at(-1)!.segment as BattleSegment).levelCap!;
    };

    // Open the split if it's the user's current active split
    useEffect(() => {
        if (props.split && props.run) {
            setSegments(getSegmentsInSplit(props.split, props.run.gameSlug));
        }
    }, [props.split, props.run]);

    return (
        <div className={styles["split-overview"]} style={open ? { maxHeight: getExpandedHeight() } : {}}>
            <button className={styles.header} onClick={() => setOpen(!open)}>
                <p className={styles.split}>
                    {isComplete() ? `👑 ${props.split}` : props.split} [{getLevelCap()}]
                </p>
                <hr className={styles.line} />
                <div className={`${styles.arrow} ${open ? styles.reversed : ""}`}>
                    <Image src="/assets/icons/arrow.svg" alt="Open split" layout="fill" objectFit="contain" />
                </div>
            </button>
            <ul className={styles.segments}>
                {Object.keys(segments).map((segmentSlug: string, key: number) => {
                    return (
                        <li className={styles.segment} key={key}>
                            {isLocationSegment(props.run.gameSlug, segmentSlug) ? (
                                <LocationOverview locationSlug={segmentSlug} run={props.run} key={key} />
                            ) : (
                                <BattleOverview battleSlug={segmentSlug} run={props.run} key={key} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SplitOverview;

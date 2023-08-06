import BattleOverview from "@/components/BattleOverview/BattleOverview";
import LocationOverview from "@/components/LocationOverview/LocationOverview";
import BattleSegment from "@/models/BattleSegment";
import Segment from "@/models/Segment";
import { getRun, isCleared } from "@/utils/run";
import { isLocationSegment } from "@/utils/segment";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SplitOverview.module.scss";

type Props = {
    split: string;
    segments: { [segmentSlug: string]: Segment };
    runName: string;
    isOpen: boolean;
};

const SplitOverview: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Calculate the height of the expanded container
    const getExpandedHeight = (): string => {
        const numSegments: number = Object.keys(props.segments).length;
        return `calc(var(--split-font-size) + var(--splits-inner-spacing) + ${numSegments} * (4rem + 81px) + ${
            numSegments - 1
        } * var(--segments-inner-spacing))`;
    };

    // Check if split has been completed
    const isComplete = (): boolean => {
        return isCleared(props.runName, Object.keys(props.segments).at(-1)!);
    };

    // Get the level cap from the segment's final fight
    const getLevelCap = (): number => {
        return (Object.values(props.segments).at(-1)!.segment as BattleSegment).levelCap!;
    };

    // Open the split if it's the user's current active split
    useEffect(() => setOpen(props.isOpen), [props.isOpen]);

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

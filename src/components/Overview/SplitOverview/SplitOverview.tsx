import BattleOverview from "@/components/Overview/BattleOverview/BattleOverview";
import LocationOverview from "@/components/Overview/LocationOverview/LocationOverview";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import Split from "@/models/Split";
import { getLevelCap } from "@/utils/battle";
import { getStarterSlug, isCleared } from "@/utils/run";
import { satisifesConditions } from "@/utils/segment";
import Image from "next/image";
import { useState } from "react";
import styles from "./SplitOverview.module.scss";

type Props = {
    split: Split;
    run: Run;
    start: number;
};

const SplitOverview: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Calculate the height of the expanded container
    const getExpandedHeight = (): string => {
        return `calc(var(--split-font-size) + var(--splits-inner-spacing) + ${
            props.split.segments.length
        } * (4rem + 81px) + ${props.split.segments.length - 1} * var(--segments-inner-spacing))`;
    };

    return (
        <div className={styles["split-overview"]} style={open ? { maxHeight: getExpandedHeight() } : {}}>
            <button className={styles.header} onClick={() => setOpen(!open)}>
                <p className={styles.split}>
                    {isCleared(props.run.id, props.split.segments.at(-1)!.slug)
                        ? `👑 ${props.split.name}`
                        : props.split.name}{" "}
                    [{getLevelCap(props.run, props.split.segments.at(-1)!.slug, getStarterSlug(props.run.id))}]
                </p>
                <hr className={styles.line} />
                <div className={`${styles.arrow} ${open ? styles.reversed : ""} disable-select`}>
                    <Image src="/assets/icons/arrow.svg" alt="Open split" layout="fill" objectFit="contain" />
                </div>
            </button>
            <ul className={styles.segments}>
                {props.split.segments
                    .filter((segment: Segment) => satisifesConditions(segment, props.run))
                    .map((segment: Segment, idx: number) => {
                        return (
                            <li className={styles.segment} key={idx}>
                                {segment.type === "location" ? (
                                    <LocationOverview location={segment} run={props.run} idx={props.start + idx} />
                                ) : (
                                    <BattleOverview battle={segment} run={props.run} idx={props.start + idx} />
                                )}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default SplitOverview;

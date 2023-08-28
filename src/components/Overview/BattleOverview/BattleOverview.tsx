import BattleSegment from "@/models/BattleSegment";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import Trainer from "@/models/Trainer";
import { getTrainer } from "@/utils/battle";
import { getStarterSlug, isCleared } from "@/utils/run";
import { hasLevelCap } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./BattleOverview.module.scss";

type Props = {
    battle: Segment;
    run: Run;
};

const BattleOverview: React.FC<Props> = (props: Props) => {
    // Internal state
    const [trainer, setTrainer] = useState<Trainer | null>();

    // Get trainer info on component load
    useEffect(() => {
        if (props.battle && props.run) {
            setTrainer(getTrainer(props.run.gameSlug, props.battle.slug, getStarterSlug(props.run.id)));
        }
    }, [props.battle, props.run]);

    return trainer ? (
        <Link href={`/runs/${props.run.id}/${props.battle.slug}`}>
            <a className={styles["battle-overview"]}>
                <div className={`${styles.battle} ${isCleared(props.run.id, props.battle.slug) ? styles.done : ""}`}>
                    <p className={styles.name}>{props.battle.name}</p>
                    <div className={styles.trainers}>
                        <div className={styles.trainer}>
                            <Image
                                src={trainer.sprite}
                                alt={`${trainer.class} ${props.battle.name}`}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </div>
                {hasLevelCap(props.battle) ? (
                    <div className={styles["level-cap"]}>
                        <p className={styles.title}>Level Cap</p>
                        <p className={styles.level}>{(props.battle.segment as BattleSegment).levelCap}</p>
                    </div>
                ) : (
                    ""
                )}
            </a>
        </Link>
    ) : (
        <></>
    );
};

export default BattleOverview;

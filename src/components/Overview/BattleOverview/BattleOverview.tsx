import Run from "@/models/Run";
import Segment from "@/models/Segment";
import Trainer from "@/models/Trainer";
import { getLevelCap, getTrainer } from "@/utils/battle";
import { getPB } from "@/utils/career";
import { getGame } from "@/utils/game";
import { getStarterSlug, isCleared } from "@/utils/run";
import { hasLevelCap } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./BattleOverview.module.scss";

type Props = {
    battle: Segment;
    run: Run;
    idx: number;
};

const BattleOverview: React.FC<Props> = (props: Props) => {
    // Internal state
    const [trainer, setTrainer] = useState<Trainer | null>();
    const [pb, setPB] = useState<string>("");

    // Get trainer info on component load
    useEffect(() => {
        if (props.battle && props.run) {
            setTrainer(getTrainer(props.run, props.battle.slug, getStarterSlug(props.run.id)));
            setPB(getPB(props.run.gameSlug));
        }
    }, [props.battle, props.run]);

    return trainer ? (
        <Link href={`/runs/${props.run.id}/${props.idx}`}>
            <a className={styles["battle-overview"]}>
                <div className={`${styles.battle} ${isCleared(props.run.id, props.battle.slug) ? styles.done : ""}`}>
                    <p className={styles.name}>
                        {props.battle.name}{" "}
                        <span
                            title={`This is your personal best for a run of Pokémon ${
                                getGame(props.run.gameSlug).name
                            }!`}
                        >
                            {pb === props.battle.slug ? "🚩" : ""}
                        </span>
                    </p>
                    <div className={styles.trainers}>
                        <div className={`${styles.trainer} disable-select`}>
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
                        <p className={styles.level}>
                            {getLevelCap(props.run, props.battle.slug, getStarterSlug(props.run.id))}
                        </p>
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

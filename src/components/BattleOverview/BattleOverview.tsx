import { getTrainer, hasLevelCap } from "@/utils/battle";
import { getRun, isCleared } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
import styles from "./BattleOverview.module.scss";
import BattleSegment from "@/models/BattleSegment";

type Props = {
    battleSlug: string;
    runName: string;
};

const BattleOverview: React.FC<Props> = (props: Props) => {
    return (
        <Link href={`/runs/${props.runName}/${props.battleSlug}`}>
            <a className={styles["battle-overview"]}>
                <div className={`${styles.battle} ${isCleared(props.runName, props.battleSlug) ? styles.done : ""}`}>
                    <p className={styles.name}>{getSegment(getRun(props.runName).gameSlug, props.battleSlug).name}</p>
                    <div className={styles.trainer}>
                        <Image
                            src={
                                getTrainer(
                                    getRun(props.runName).gameSlug,
                                    props.battleSlug,
                                    getRun(props.runName).starterSlug
                                ).sprite
                            }
                            alt={
                                getTrainer(
                                    getRun(props.runName).gameSlug,
                                    props.battleSlug,
                                    getRun(props.runName).starterSlug
                                ).name
                            }
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
                <div className={styles["level-cap"]}>
                    {hasLevelCap(getRun(props.runName).gameSlug, props.battleSlug) ? (
                        <>
                            <p className={styles.title}>Level Cap</p>
                            <p className={styles.level}>
                                {
                                    (
                                        getSegment(getRun(props.runName).gameSlug, props.battleSlug)
                                            .segment as BattleSegment
                                    ).levelCap
                                }
                            </p>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </a>
        </Link>
    );
};

export default BattleOverview;

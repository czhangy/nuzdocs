import BattleSegment from "@/models/BattleSegment";
import Run from "@/models/Run";
import { getTrainer, hasLevelCap } from "@/utils/battle";
import { isCleared } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
import styles from "./BattleOverview.module.scss";

type Props = {
    battleSlug: string;
    run: Run;
};

const BattleOverview: React.FC<Props> = (props: Props) => {
    return (
        <Link href={`/runs/${props.run.id}/${props.battleSlug}`}>
            <a className={styles["battle-overview"]}>
                <div className={`${styles.battle} ${isCleared(props.run.id, props.battleSlug) ? styles.done : ""}`}>
                    <p className={styles.name}>{getSegment(props.run.gameSlug, props.battleSlug).name}</p>
                    <div className={styles.trainer}>
                        <Image
                            src={getTrainer(props.run.gameSlug, props.battleSlug, props.run.starterSlug).sprite}
                            alt={getTrainer(props.run.gameSlug, props.battleSlug, props.run.starterSlug).name}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
                <div className={styles["level-cap"]}>
                    {hasLevelCap(props.run.gameSlug, props.battleSlug) ? (
                        <>
                            <p className={styles.title}>Level Cap</p>
                            <p className={styles.level}>
                                {(getSegment(props.run.gameSlug, props.battleSlug).segment as BattleSegment).levelCap}
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

import BattleSegment from "@/models/BattleSegment";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getTrainer } from "@/utils/battle";
import { isCleared } from "@/utils/run";
import { hasLevelCap } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
import styles from "./BattleOverview.module.scss";

type Props = {
    battle: Segment;
    run: Run;
};

const BattleOverview: React.FC<Props> = (props: Props) => {
    return (
        <Link href={`/runs/${props.run.id}/${props.battle.slug}`}>
            <a className={styles["battle-overview"]}>
                <div className={`${styles.battle} ${isCleared(props.run.id, props.battle.slug) ? styles.done : ""}`}>
                    <p className={styles.name}>{props.battle.name}</p>
                    <div className={styles.trainer}>
                        <Image
                            src={getTrainer(props.run.gameSlug, props.battle.slug, props.run.starterSlug).sprite}
                            alt={getTrainer(props.run.gameSlug, props.battle.slug, props.run.starterSlug).name}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
                <div className={styles["level-cap"]}>
                    {hasLevelCap(props.battle) ? (
                        <>
                            <p className={styles.title}>Level Cap</p>
                            <p className={styles.level}>{(props.battle.segment as BattleSegment).levelCap}</p>
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

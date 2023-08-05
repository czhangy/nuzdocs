import { getTrainer } from "@/utils/battle";
import { getRun } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
import styles from "./BattleOverview.module.scss";

type Props = {
    battleSlug: string;
    runName: string;
};

const BattleOverview: React.FC<Props> = (props: Props) => {
    return (
        <Link href={`/runs/${props.runName}/${props.battleSlug}`}>
            <a className={styles["battle-overview"]}>
                <div className={styles.battle}>
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
                    <p className={styles.name}>{getSegment(getRun(props.runName).gameSlug, props.battleSlug).name}</p>
                </div>
                <div className={styles["level-cap"]}>
                    <p className={styles.title}>Level Cap</p>
                    <p className={styles.level}>5</p>
                </div>
            </a>
        </Link>
    );
};

export default BattleOverview;

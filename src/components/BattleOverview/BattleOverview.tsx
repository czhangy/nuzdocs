import styles from "./BattleOverview.module.scss";
import Link from "next/link";
import { getSegmentName, getStarterSlug, getTrainerSprite } from "@/utils/utils";
import { getGameSlug } from "@/utils/utils";
import Image from "next/image";
import { getTrainerName } from "@/utils/utils";

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
                            src={getTrainerSprite(
                                getGameSlug(props.runName),
                                props.battleSlug,
                                getStarterSlug(props.runName)
                            )}
                            alt={getTrainerName(
                                getGameSlug(props.runName),
                                props.battleSlug,
                                getStarterSlug(props.runName)
                            )}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <p className={styles.name}>{getSegmentName(getGameSlug(props.runName), props.battleSlug)}</p>
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

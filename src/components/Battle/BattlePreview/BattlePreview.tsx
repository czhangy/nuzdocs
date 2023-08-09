import LevelCap from "@/components/LevelCap/LevelCap";
import BattleSegment from "@/models/BattleSegment";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getBattle } from "@/utils/battle";
import { addToClearedBattles, isCleared, removeFromClearedBattles } from "@/utils/run";
import { hasLevelCap } from "@/utils/segment";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BattlePreview.module.scss";

type Props = {
    segment: Segment;
    run: Run;
};

const BattlePreview: React.FC<Props> = (props: Props) => {
    // Component state
    const [defeated, setDefeated] = useState<boolean>(false);

    // Sets component state and updates local storage when defeat is clicked
    const handleDefeat = () => {
        setDefeated(true);
        addToClearedBattles(props.run.id, props.segment.slug);
    };

    // Sets component state and updates local storage when undo is clicked
    const handleUndo = () => {
        setDefeated(false);
        removeFromClearedBattles(props.run.id, props.segment.slug);
    };

    // Persist defeated state on component load
    useEffect(() => {
        if (props.segment && props.run) {
            setDefeated(isCleared(props.run.id, props.segment.slug));
        }
    }, [props.segment, props.run]);

    return (
        <div className={styles["battle-preview"]}>
            <div className={styles.trainer}>
                <div className={`${styles.sprite} ${defeated ? styles.defeated : ""}`}>
                    <Image
                        src={getBattle(props.run.gameSlug, props.segment.slug, props.run.starterSlug).trainer.sprite}
                        alt={getBattle(props.run.gameSlug, props.segment.slug, props.run.starterSlug).trainer.name}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className={styles.info}>
                    <p className={styles.name}>
                        {getBattle(props.run.gameSlug, props.segment.slug, props.run.starterSlug).trainer.name}
                    </p>
                    {defeated ? (
                        <div className={styles.buttons}>
                            <button className={styles.defeat} disabled={true}>
                                Defeated!
                            </button>
                            <button className={styles.undo} onClick={handleUndo}>
                                <Image
                                    src="/assets/icons/reset.svg"
                                    alt="Undo defeat"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        </div>
                    ) : (
                        <div className={styles.buttons}>
                            <button className={styles.defeat} onClick={handleDefeat}>
                                Defeat!
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {hasLevelCap(props.segment) ? <LevelCap level={(props.segment.segment as BattleSegment).levelCap!} /> : ""}
        </div>
    );
};

export default BattlePreview;

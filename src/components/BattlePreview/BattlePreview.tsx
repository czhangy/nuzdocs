import LevelCap from "@/components/LevelCap/LevelCap";
import Battle from "@/models/Battle";
import { addToClearedBattles, isCleared, removeFromClearedBattles } from "@/utils/run";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BattlePreview.module.scss";

type Props = {
    battle: Battle;
    levelCap: number | undefined;
    battleSlug: string;
    runName: string;
};

const BattlePreview: React.FC<Props> = (props: Props) => {
    // Component state
    const [defeated, setDefeated] = useState<boolean>(false);

    // Sets component state and updates local storage when defeat is clicked
    const handleDefeat = () => {
        setDefeated(true);
        addToClearedBattles(props.runName, props.battleSlug);
    };

    // Sets component state and updates local storage when undo is clicked
    const handleUndo = () => {
        setDefeated(false);
        removeFromClearedBattles(props.runName, props.battleSlug);
    };

    useEffect(() => {
        if (props.battleSlug && props.runName) {
            setDefeated(isCleared(props.runName, props.battleSlug));
        }
    }, [props.battleSlug, props.runName]);

    return (
        <div className={styles["battle-preview"]}>
            <div className={styles.trainer}>
                <div className={`${styles.sprite} ${defeated ? styles.defeated : ""}`}>
                    <Image
                        src={props.battle.trainer.sprite}
                        alt={props.battle.trainer.name}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className={styles.info}>
                    <p className={styles.name}>{props.battle.trainer.name}</p>
                    <div className={styles.buttons}>
                        <button className={styles.defeat} onClick={handleDefeat} disabled={defeated}>
                            {defeated ? "Defeated!" : "Defeat!"}
                        </button>
                        {defeated ? (
                            <button className={styles.undo} onClick={handleUndo}>
                                <Image
                                    src="/assets/icons/reset.svg"
                                    alt="Undo defeat"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            {props.levelCap ? <LevelCap level={props.levelCap} /> : ""}
        </div>
    );
};

export default BattlePreview;

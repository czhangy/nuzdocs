import Trainer from "@/models/Trainer";
import { completeBattle, getRun, resetBattle } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BattlePreview.module.scss";

type Props = {
    trainer: Trainer;
    battleSlug: string;
    runName: string;
};

const BattlePreview: React.FC<Props> = (props: Props) => {
    const [defeated, setDefeated] = useState<boolean>(false);

    // Checks local storage to see if the current battle has been cleared
    const isDefeated = () => {
        return getRun(props.runName).battlesCleared.includes(props.battleSlug);
    };

    // Sets component state and updates local storage when defeat is clicked
    const handleDefeat = () => {
        setDefeated(true);
        completeBattle(props.runName, props.battleSlug);
    };

    // Sets component state and updates local storage when undo is clicked
    const handleUndo = () => {
        setDefeated(false);
        resetBattle(props.runName, props.battleSlug);
    };

    useEffect(() => {
        if (props.battleSlug && props.runName) {
            setDefeated(isDefeated());
        }
    }, [props.battleSlug, props.runName]);

    return (
        <div className={styles["battle-preview"]}>
            <div className={`${styles.sprite} ${defeated ? styles.defeated : ""}`}>
                <Image src={props.trainer.sprite} alt={props.trainer.name} layout="fill" objectFit="contain" />
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{props.trainer.name}</p>
                <div className={styles.buttons}>
                    <button className={styles.defeat} onClick={handleDefeat} disabled={defeated}>
                        {defeated ? "Defeated!" : "Defeat!"}
                    </button>
                    {defeated ? (
                        <button className={styles.undo} onClick={handleUndo}>
                            <Image src="/assets/icons/reset.svg" alt="Undo defeat" layout="fill" objectFit="contain" />
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default BattlePreview;
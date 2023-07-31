import Battle from "@/models/Battle";
import { completeSegment, getRun } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BattlePreview.module.scss";

type Props = {
    battle: Battle;
    battleSlug: string;
    runName: string;
};

const BattlePreview: React.FC<Props> = (props: Props) => {
    const [defeated, setDefeated] = useState<boolean>(false);

    // Checks local storage to see if the current battle has been cleared
    const isDefeated = () => {
        return getRun(props.runName).battlesCleared.includes(props.battleSlug);
    };

    // Sets component state and updates local storage
    const handleDefeat = () => {
        setDefeated(true);
        completeSegment(props.runName, props.battleSlug);
    };

    useEffect(() => {
        if (props.battleSlug && props.runName) {
            setDefeated(isDefeated());
        }
    }, [props.battleSlug, props.runName]);

    return (
        <div className={styles["battle-preview"]}>
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
                <button className={styles.defeat} onClick={handleDefeat} disabled={defeated}>
                    {defeated ? "Defeated!" : "Defeat!"}
                </button>
            </div>
        </div>
    );
};

export default BattlePreview;

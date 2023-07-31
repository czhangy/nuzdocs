import Battle from "@/models/Battle";
import styles from "./BattlePreview.module.scss";
import Image from "next/image";

type Props = {
    battle: Battle;
};

const BattlePreview: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["battle-preview"]}>
            <div className={styles.sprite}>
                <Image
                    src={props.battle.trainer.sprite}
                    alt={props.battle.trainer.name}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{props.battle.trainer.name}</p>
                <button className={styles.defeat}>Defeat!</button>
            </div>
        </div>
    );
};

export default BattlePreview;

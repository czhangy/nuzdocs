import TypeIcon from "@/components/Run/TypeIcon/TypeIcon";
import MoveData from "@/models/MoveData";
import Image from "next/image";
import styles from "./MoveCard.module.scss";

type Props = {
    move: MoveData;
    isSTAB: boolean;
};

const MoveCard: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["move-card"]}>
            <div className={styles.row}>
                <TypeIcon type={props.move.type} size={16} />
                <p className={styles.name}>{props.move.name}</p>
            </div>
            <div className={styles.row}>
                <div className={styles.category}>
                    <p className={styles.text}>Class: </p>
                    <div className={styles.icon}>
                        <Image
                            src={`https://www.serebii.net/pokedex-bw/type/${props.move.category}.png`}
                            alt={styles.category}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
                {props.isSTAB && props.move.power > 0 ? (
                    <div className={styles.bp}>
                        <p className={styles.text}>
                            BP: <strong className={styles["stab-text"]}>{props.move.power * 1.5}</strong>
                        </p>
                        <div className={styles["stab-icon"]}>
                            <Image
                                src="/assets/icons/double-arrow.svg"
                                alt="STAB bonus"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                ) : (
                    <p className={styles.text}>
                        BP: <strong>{props.move.power === 0 ? "--" : props.move.power}</strong>
                    </p>
                )}
                <p className={styles.text}>
                    PP: <strong>{props.move.pp}</strong>
                </p>
            </div>
        </div>
    );
};

export default MoveCard;

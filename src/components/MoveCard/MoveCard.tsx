import TypeIcon from "@/components/TypeIcon/TypeIcon";
import MoveData from "@/models/MoveData";
import styles from "./MoveCard.module.scss";
import Image from "next/image";

type Props = {
    move: MoveData;
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
                    <Image
                        src={`https://www.serebii.net/pokedex-bw/type/${props.move.category}.png`}
                        alt={styles.category}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <p className={styles.text}>
                    Power: <strong>{props.move.power === 0 ? "--" : props.move.power}</strong>
                </p>
                <p className={styles.text}>
                    PP: <strong>{props.move.pp}</strong>
                </p>
            </div>
        </div>
    );
};

export default MoveCard;

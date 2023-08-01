import MoveData from "@/models/MoveData";
import styles from "./MoveCard.module.scss";

type Props = {
    move: MoveData;
};

const MoveCard: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["move-card"]}>
            <div className={styles.name}>{props.move.name}</div>
        </div>
    );
};

export default MoveCard;

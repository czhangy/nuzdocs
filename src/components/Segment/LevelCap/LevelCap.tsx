import Run from "@/models/Run";
import styles from "./LevelCap.module.scss";

type Props = {
    level: number;
    segment: string;
    run: Run;
};

const LevelCap: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["level-cap"]}>
            <p className={styles.text}>
                Level Cap: <strong>{props.level === 0 ? "None" : props.level}</strong>
            </p>
        </div>
    );
};

export default LevelCap;

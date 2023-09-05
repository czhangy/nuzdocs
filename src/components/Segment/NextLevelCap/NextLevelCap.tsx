import Run from "@/models/Run";
import styles from "./NextLevelCap.module.scss";

type Props = {
    level: number;
    segment: string;
    run: Run;
};

const NextLevelCap: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["next-level-cap"]}>
            <p className={styles.text}>
                Next Level Cap: <strong>{props.level === 0 ? "None" : props.level}</strong>
            </p>
        </div>
    );
};

export default NextLevelCap;

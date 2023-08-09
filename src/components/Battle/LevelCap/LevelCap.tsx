import styles from "./LevelCap.module.scss";

type Props = {
    level: number;
};

const LevelCap: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["level-cap"]}>
            <p className={styles.text}>Level Cap</p>
            <div className={styles.bg}>
                <p className={styles.level}>{props.level}</p>
            </div>
        </div>
    );
};

export default LevelCap;

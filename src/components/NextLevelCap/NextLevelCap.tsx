import styles from "./NextLevelCap.module.scss";

type Props = {
    segmentSlug: string;
};

const NextLevelCap: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["next-level-cap"]}>
            <p className={styles.text}>
                Next Level Cap: <strong>5</strong>
            </p>
        </div>
    );
};

export default NextLevelCap;

import styles from "./ProgressBar.module.scss";

type Props = {
    complete: number;
    total: number;
};

const ProgressBar: React.FC<Props> = (props) => {
    // Compute percent of total that is complete
    const calculatePercentage = () => {
        return Math.round((props.complete / props.total) * 100);
    };

    return (
        <div className={styles["progress-bar"]}>
            <p className={styles.percent}>{calculatePercentage()}%</p>
            <div className={styles.bg}>
                <div className={styles.bar} style={{ width: `${calculatePercentage()}%` }} />
            </div>
        </div>
    );
};

export default ProgressBar;

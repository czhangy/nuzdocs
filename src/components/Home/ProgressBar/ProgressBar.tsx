import { useEffect } from "react";
import styles from "./ProgressBar.module.scss";

type Props = {
    complete: number;
    total: number;
    barID: string;
};

const ProgressBar: React.FC<Props> = (props) => {
    // Compute percent of total that is complete
    const calculatePercentage = () => {
        return Math.round((props.complete / props.total) * 100);
    };

    // Delay bar draw on component load for animation
    useEffect(() => {
        if (props.complete && props.total) {
            setTimeout(() => {
                document.getElementById(`bar-${props.barID}`)!.style.width = `${calculatePercentage()}%`;
            }, 100);
        }
    }, [props.complete, props.total, props.barID]);

    return (
        <div className={styles["progress-bar"]}>
            <p className={styles.percent} title={`${props.complete}/${props.total} major battles completed`}>
                {calculatePercentage()}%
            </p>
            <div className={styles.bg}>
                <div id={`bar-${props.barID}`} className={styles.bar} />
            </div>
        </div>
    );
};

export default ProgressBar;

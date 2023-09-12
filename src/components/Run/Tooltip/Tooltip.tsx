import styles from "./Tooltip.module.scss";

type Props = {
    desc: string;
    show: boolean;
};

const Tooltip: React.FC<Props> = (props: Props) => {
    return (
        <div className={`${styles.tooltip} ${props.show ? styles.show : ""}`}>
            <p className={styles.desc}>{props.desc}</p>
            <div className={styles["arrow-border"]}>
                <div className={styles.arrow} />
            </div>
        </div>
    );
};

export default Tooltip;

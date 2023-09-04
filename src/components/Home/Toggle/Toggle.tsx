import styles from "./Toggle.module.scss";

type Props = {
    enabled: boolean;
    onToggle: () => void;
};

const Toggle: React.FC<Props> = (props: Props) => {
    return (
        <button
            className={`${styles.toggle} ${props.enabled ? styles.active : ""}`}
            type="button"
            onClick={props.onToggle}
        >
            <div className={styles.thumb} />
        </button>
    );
};

export default Toggle;

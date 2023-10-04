import styles from "./Toggle.module.scss";

type Props = {
    open: boolean;
    onClick: (open: boolean) => void;
};

const Toggle: React.FC<Props> = (props: Props) => {
    return props.open ? (
        <button className={styles.toggle} onClick={() => props.onClick(false)} title="Hide team">
            -
        </button>
    ) : (
        <button className={styles.toggle} onClick={() => props.onClick(true)} title="Show team">
            +
        </button>
    );
};

export default Toggle;

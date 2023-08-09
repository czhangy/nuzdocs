import styles from "./AddMove.module.scss";

type Props = {};

const AddMove: React.FC<Props> = (props: Props) => {
    return (
        <button className={styles["add-move"]}>
            <p className={styles.add}>+</p>
        </button>
    );
};

export default AddMove;

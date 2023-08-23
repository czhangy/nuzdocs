import Run from "@/models/Run";
import styles from "./DeleteModal.module.scss";

type Props = {
    run: Run | null;
    onClose: () => void;
    onConfirm: () => void;
};

const DeleteModal: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["delete-modal"]}>
            {props.run ? (
                <div className={styles.delete}>
                    <p className={styles.header}>
                        Delete <strong>{props.run.name}</strong>?
                    </p>
                    <div className={styles.buttons}>
                        <button className="secondary-button" onClick={props.onClose}>
                            Cancel
                        </button>
                        <button className="primary-button" onClick={props.onConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.delete}>
                    <strong className={styles.header}>Something went wrong</strong>
                    <p className={styles.subtitle}>Refresh the page and try again!</p>
                </div>
            )}
        </div>
    );
};

export default DeleteModal;

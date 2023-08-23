import { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
    children: ReactNode;
    onClose: () => void;
    open: boolean;
};

const Modal: React.FC<Props> = (props: Props) => {
    return (
        <div className={`${styles.modal} ${props.open ? styles.open : styles.closed} ${styles.preload}`}>
            <div className={styles["modal-overlay"]} onClick={props.onClose} />
            <div className={styles["modal-content"]}>{props.children}</div>
        </div>
    );
};

export default Modal;

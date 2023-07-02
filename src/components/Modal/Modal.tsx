import styles from "./Modal.module.scss";

import { ReactNode } from "react";

type Props = {
    modalID: string;
    children: ReactNode;
    onClose: () => void;
    open: boolean;
};

const Modal: React.FC<Props> = (props: Props) => {
    return (
        <div
            id={props.modalID}
            className={`${styles.modal} ${props.open ? styles.open : styles.closed} ${styles.preload}`}
        >
            <div className={styles["modal-overlay"]} onClick={props.onClose} />
            <div className={styles["modal-content"]}>{props.children}</div>
        </div>
    );
};

export default Modal;

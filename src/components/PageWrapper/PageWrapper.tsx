import styles from "./PageWrapper.module.scss";

import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const PageWrapper: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles["page-container"]}>
            <div className={styles["page-wrapper"]}>{children}</div>
        </div>
    );
};

export default PageWrapper;

import styles from "./RIPsPage.module.scss";

type Props = {
    runName: string;
};

const RIPsPage: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["rips-page"]}>
            <h2 className={styles.header}>Your RIPs</h2>
        </div>
    );
};

export default RIPsPage;

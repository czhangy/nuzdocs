import styles from "./OverviewPage.module.scss";

type Props = {
    runName: string;
};

const OverviewPage: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["overview-page"]}>
            <h2 className={styles.header}>Overview</h2>
        </div>
    );
};

export default OverviewPage;

import styles from "./SummaryPage.module.scss";

type Props = {
    runName: string;
    nickname: string;
};

const SummaryPage: React.FC<Props> = (props: Props) => {
    return <div className={styles["summary-page"]}></div>;
};

export default SummaryPage;

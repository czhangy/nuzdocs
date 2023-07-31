import styles from "./BattlePage.module.scss";

type Props = {
    gameSlug: string;
    segmentSlug: string;
};

const BattlePage: React.FC<Props> = (props: Props) => {
    return <div className={styles["battle-page"]}></div>;
};

export default BattlePage;

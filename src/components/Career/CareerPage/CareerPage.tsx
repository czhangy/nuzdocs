import GameHistory from "@/components/Career/GameHistory/GameHistory";
import { getPlayedGames } from "@/utils/career";
import styles from "./CareerPage.module.scss";

const CareerPage: React.FC = () => {
    return (
        <div className={styles["career-page"]}>
            <h2 className={styles.header}>Your Career</h2>
            <div className={styles.history}>
                {getPlayedGames().map((game: string) => {
                    return <GameHistory game={game} />;
                })}
            </div>
        </div>
    );
};

export default CareerPage;

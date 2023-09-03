import GameHistory from "@/components/Career/GameHistory/GameHistory";
import { getPlayedGames } from "@/utils/career";
import styles from "./CareerPage.module.scss";
import { useEffect, useState } from "react";

const CareerPage: React.FC = () => {
    // Internal state
    const [games, setGames] = useState<string[]>([]);

    // Get list of played games on component load
    useEffect(() => {
        setGames(getPlayedGames());
    }, []);

    return (
        <div className={styles["career-page"]}>
            <h2 className={styles.header}>Your Career</h2>
            <div className={styles.history}>
                {games.map((game: string) => {
                    return <GameHistory game={game} />;
                })}
            </div>
        </div>
    );
};

export default CareerPage;

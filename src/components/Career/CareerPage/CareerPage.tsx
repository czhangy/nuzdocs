import GameHistory from "@/components/Career/GameHistory/GameHistory";
import ResetModal from "@/components/Career/ResetModal/ResetModal";
import Modal from "@/components/Global/Modal/Modal";
import { getPlayedGames, resetGame } from "@/utils/career";
import { useEffect, useState } from "react";
import styles from "./CareerPage.module.scss";

const CareerPage: React.FC = () => {
    // Internal state
    const [games, setGames] = useState<string[]>([]);

    // Component state
    const [open, setOpen] = useState<boolean>(false);
    const [game, setGame] = useState<string>("");

    // Set component state and open the reset modal on button click
    const handleResetAttempt = (game: string): void => {
        setOpen(true);
        setGame(game);
    };

    // Update local storage and close modal when confirmed
    const handleReset = (): void => {
        setOpen(false);
        resetGame(game);
    };

    // Get list of played games on component load
    useEffect(() => {
        setGames(getPlayedGames());
    }, []);

    return (
        <div className={styles["career-page"]}>
            <h2 className={styles.header}>Your Career</h2>
            <div className={styles.history}>
                {games.map((game: string) => {
                    return <GameHistory game={game} onReset={() => handleResetAttempt(game)} key={game} />;
                })}
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ResetModal game={game} onClose={() => setOpen(false)} onConfirm={handleReset} />
            </Modal>
        </div>
    );
};

export default CareerPage;

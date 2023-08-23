import { getGame, getGameGroup, getGameSlugs } from "@/utils/game";
import { createRun } from "@/utils/run";
import Image from "next/image";
import Router from "next/router";
import { ChangeEvent, useState } from "react";
import styles from "./CreateModal.module.scss";

const CreateModal: React.FC = () => {
    // Form states
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedGame, setSelectedGame] = useState<string>("");

    // Creates a run in local storage and adds the run to the run list, then redirects
    const handleCreate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        Router.push(`/runs/${createRun(selectedName, selectedGame)}/${getGameGroup(selectedGame).startingTownSlug}`);
    };

    return (
        <div className={styles["create-modal"]}>
            <p className={styles.header}>New Run</p>
            <form className={styles.form} onSubmit={handleCreate}>
                <input
                    className={styles.input}
                    maxLength={30}
                    placeholder="Name your run..."
                    type="text"
                    value={selectedName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedName(e.target.value)}
                    spellCheck={false}
                />
                <div className={styles.games}>
                    {getGameSlugs().map((game: string) => {
                        return (
                            <button
                                className={`${styles.game} ${game === selectedGame ? styles.active : ""}`}
                                key={game}
                                type="button"
                                onClick={() => setSelectedGame(game)}
                            >
                                <Image
                                    src={getGame(game).logoURL}
                                    alt={getGame(game).name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        );
                    })}
                </div>
                <button className="primary-button" disabled={!selectedName || !selectedGame}>
                    Start!
                </button>
            </form>
        </div>
    );
};

export default CreateModal;

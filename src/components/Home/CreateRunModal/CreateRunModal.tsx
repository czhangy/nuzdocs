import { getGame, getGameGroup, getGameSlugs } from "@/utils/game";
import { createRun } from "@/utils/run";
import Image from "next/image";
import Router from "next/router";
import { ChangeEvent, useState } from "react";
import styles from "./CreateRunModal.module.scss";

const CreateRunModal: React.FC = () => {
    // Form states
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>("");

    // Creates a run in local storage and adds the run to the run list, then redirects
    const handleCreate = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        createRun(selectedName, selectedGameSlug);
        Router.push(`/runs/${selectedName}/${getGameGroup(selectedGameSlug).startingTownSlug}`);
    };

    return (
        <div className={styles["create-run-modal"]}>
            <h2 className={styles.header}>Start a New Run</h2>
            <form id="create-form" className={styles.form} onSubmit={handleCreate}>
                <input
                    className={styles.input}
                    maxLength={30}
                    placeholder="Name your run..."
                    type="text"
                    value={selectedName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedName(e.target.value)}
                />
                <div className={styles.games}>
                    {getGameSlugs().map((gameSlug: string, key: number) => {
                        return (
                            <button
                                className={`${styles.game} ${gameSlug === selectedGameSlug ? styles.active : ""}`}
                                key={key}
                                type="button"
                                onClick={() => setSelectedGameSlug(gameSlug)}
                            >
                                <Image
                                    src={getGame(gameSlug).logoURL}
                                    alt={getGame(gameSlug).name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        );
                    })}
                </div>
                <button className={styles.submit} disabled={selectedName.length === 0 || selectedGameSlug.length === 0}>
                    Start!
                </button>
            </form>
        </div>
    );
};

export default CreateRunModal;

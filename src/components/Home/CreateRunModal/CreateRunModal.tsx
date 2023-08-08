import games from "@/static/games";
import { createRun } from "@/utils/run";
import Image from "next/image";
import Router from "next/router";
import { ChangeEvent, useState } from "react";
import styles from "./CreateRunModal.module.scss";

const CreateRunModal: React.FC = () => {
    // Form states
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedGameSlug, setSelectedGameSlug] = useState<string>("");

    // Error states
    const [nameError, setNameError] = useState<boolean>(false);

    // Checks field inputs for validity
    const handleValidate = () => {
        return selectedName.length > 0 && selectedGameSlug.length > 0;
    };

    // Creates a run in local storage and adds the run to the run list, then redirects
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameError(false);
        if (!createRun(selectedName, selectedGameSlug)) {
            setNameError(true);
        } else {
            Router.push(`/runs/${selectedName}/${games[selectedGameSlug].gameGroup.startingTownSlug}`);
        }
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
                {nameError ? (
                    <p className={styles.error}>This name is already being used, please choose another one.</p>
                ) : (
                    ""
                )}
                <div className={styles.games}>
                    {Object.keys(games).map((gameSlug: string, key: number) => {
                        return (
                            <button
                                className={`${styles.game} ${gameSlug === selectedGameSlug ? styles.active : ""}`}
                                key={key}
                                type="button"
                                onClick={() => setSelectedGameSlug(gameSlug)}
                            >
                                <Image
                                    src={games[gameSlug].logoURL}
                                    alt={games[gameSlug].name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        );
                    })}
                </div>
                <button className={styles.submit} disabled={!handleValidate()}>
                    Start!
                </button>
            </form>
        </div>
    );
};

export default CreateRunModal;

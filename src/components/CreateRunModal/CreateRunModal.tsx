import Run from "@/models/Run";
import games from "@/static/games";
import { initRun } from "@/utils/initializers";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import styles from "./CreateRunModal.module.scss";

const CreateRunModal: React.FC = () => {
    // Form states
    const [name, setName] = useState<string>("");
    const [gameSlug, setGameSlug] = useState<string>("");

    // Error states
    const [nameError, setNameError] = useState<boolean>(false);
    const [formError, setFormError] = useState<boolean>(false);

    // Removes all error states
    const resetErrors = () => {
        setNameError(false);
        setFormError(false);
    };

    // Creates a run in local storage and adds the run to the run list, then redirects
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetErrors();

        let storedRuns: string | null = localStorage.getItem("runs");
        if (storedRuns) {
            let runs: string[] = JSON.parse(storedRuns);
            if (runs.includes(name)) {
                setNameError(true);
                return;
            } else {
                runs.push(name);
                localStorage.setItem("runs", JSON.stringify(runs));
            }
        } else {
            localStorage.setItem("runs", JSON.stringify([name]));
        }

        const newRun: Run = initRun(gameSlug);
        localStorage.setItem(name, JSON.stringify(newRun));
        Router.push(`/runs/${name}/${games[gameSlug].startingTownSlug}`);
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                                className={styles.game}
                                key={key}
                                type="button"
                                onClick={() => setGameSlug(gameSlug)}
                            >
                                <Image
                                    src={games[gameSlug].iconURL}
                                    alt={games[gameSlug].name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        );
                    })}
                </div>
                <button className={styles.submit} disabled={name.length === 0 || gameSlug.length === 0}>
                    Start!
                </button>
            </form>
        </div>
    );
};

export default CreateRunModal;

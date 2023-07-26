import Run from "@/models/Run";
import { initRun } from "@/utils/initializers";
import Router from "next/router";
import { useState } from "react";
import styles from "./CreateRunModal.module.scss";
import Dropdown from "@/components/Dropdown/Dropdown";
import games from "@/static/games";

const CreateRunModal: React.FC = () => {
    // Form states
    const [name, setName] = useState<string>("");
    const [gameName, setGameName] = useState<string>("");

    // Error states
    const [nameError, setNameError] = useState<boolean>(false);
    const [formError, setFormError] = useState<boolean>(false);

    // Static data
    const gameNames: string[] = Object.keys(games).map((gameSlug: string) => {
        return games[gameSlug].name;
    });

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

        const gameSlug: string = Object.keys(games).filter((gameSlug: string) => {
            return games[gameSlug].name === gameName;
        })[0];
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
                <Dropdown
                    placeholder="Select a game..."
                    value={gameName}
                    options={gameNames}
                    onSelect={(gameName: string) => setGameName(gameName)}
                />
                <button className={styles["submit-button"]} disabled={name.length === 0 || gameName.length === 0}>
                    Start!
                </button>
            </form>
        </div>
    );
};

export default CreateRunModal;

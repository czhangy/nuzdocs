import Run from "@/models/Run";
import Router from "next/router";
import { useState } from "react";
import styles from "./CreateRun.module.scss";

const CreateRun: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);

    const newRun: Run = {
        gameName: "soulsilver",
        prevLocationName: "new-bark-town",
        starterName: "",
        encounters: [],
    };

    const onCreateRun = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameError(false);

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

        localStorage.setItem(name, JSON.stringify(newRun));
        Router.push(`/runs/${name}/new-bark-town`);
    };

    return (
        <div className={styles["create-run"]}>
            <h2 className={styles["create-header"]}>Start a New Run</h2>
            <form
                id="create-form"
                className={styles["create-form"]}
                onSubmit={onCreateRun}
            >
                <input
                    className={styles["create-input"]}
                    maxLength={30}
                    placeholder="Name your run..."
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {nameError ? (
                    <p className={styles.error}>
                        This name is already being used, please choose another
                        one.
                    </p>
                ) : (
                    ""
                )}
                <button
                    className={styles["submit-button"]}
                    disabled={name.length === 0}
                >
                    Start!
                </button>
            </form>
        </div>
    );
};

export default CreateRun;

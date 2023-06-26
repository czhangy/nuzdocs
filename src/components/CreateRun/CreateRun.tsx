import styles from "./CreateRun.module.scss";

import Router from "next/router";
import { useState } from "react";

const CreateRun: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<boolean>(false);

    const onCreateRun = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameError(false);

        let storedRuns: string | null = localStorage.getItem("runs");
        if (storedRuns) {
            let runs: string[] = JSON.parse(storedRuns);
            if (runs.includes(name)) {
                setNameError(true);
            } else {
                runs.push(name);
                localStorage.setItem("runs", JSON.stringify(runs));
            }
        } else {
            localStorage.setItem("runs", JSON.stringify([name]));
        }

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

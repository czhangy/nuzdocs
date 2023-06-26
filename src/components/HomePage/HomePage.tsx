import CreateRun from "@/components/CreateRun/CreateRun";
import Modal from "@/components/Modal/Modal";
import RunEntry from "@/components/RunEntry/RunEntry";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
    const [createRunOpen, setCreateRunOpen] = useState<boolean>(false);
    const [resetFlag, setResetFlag] = useState<number>(0);
    const [runs, setRuns] = useState<string[]>([]);

    const closeCreateRunModal = () => {
        // Hacky way to reset the modal contents on close
        setTimeout(() => {
            setResetFlag((resetFlag + 1) % 2);
        }, 500);
        setCreateRunOpen(false);
    };

    // Fetch existing runs from local storage to display in list
    const fetchRuns = () => {
        const storedRuns = localStorage.getItem("runs");
        if (storedRuns) {
            let storedRunsList: string[] = JSON.parse(storedRuns);
            storedRunsList.reverse();
            setRuns(storedRunsList);
        }
    };

    useEffect(fetchRuns, []);

    return (
        <>
            <Modal
                modalID="create-run-modal"
                onClose={closeCreateRunModal}
                open={createRunOpen}
            >
                <CreateRun key={resetFlag} />
            </Modal>
            <div className={styles["home-page"]}>
                <div className={styles.runs}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Your Runs</h2>
                        <button
                            className={styles["new-button"]}
                            onClick={() => setCreateRunOpen(true)}
                        >
                            + New Run
                        </button>
                    </div>
                    <ul className={styles["run-list"]}>
                        {runs.length > 0 ? (
                            runs.map((run: string, key: number) => {
                                return (
                                    <RunEntry
                                        key={key}
                                        onDelete={fetchRuns}
                                        run={run}
                                    />
                                );
                            })
                        ) : (
                            <p className={styles["alt-text"]}>
                                You don't have any saved runs yet!
                            </p>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HomePage;

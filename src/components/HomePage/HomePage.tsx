import styles from "./HomePage.module.scss";

import { useEffect, useState } from "react";

import CreateRun from "@/components/CreateRun/CreateRun";
import Modal from "@/components/Modal/Modal";

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
    useEffect(() => {
        const storedRuns = localStorage.getItem("runs");
        if (storedRuns) {
            setRuns(JSON.parse(storedRuns));
        }
    }, []);

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
                    {runs.length > 0 ? "" : ""}
                </div>
            </div>
        </>
    );
};

export default HomePage;

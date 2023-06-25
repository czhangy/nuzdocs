import styles from "./HomePage.module.scss";

import { useState } from "react";

import CreateRun from "@/components/CreateRun/CreateRun";
import Modal from "@/components/Modal/Modal";

const HomePage: React.FC = () => {
    const [createRunOpen, setCreateRunOpen] = useState<boolean>(false);

    const closeCreateRunModal = () => {
        const form: HTMLFormElement | null =
            document.querySelector("#create-form");
        setTimeout(() => form?.reset(), 500);
        setCreateRunOpen(false);
    };

    return (
        <>
            <Modal onClose={closeCreateRunModal} open={createRunOpen}>
                <CreateRun />
            </Modal>
            <div className={styles["home-page"]}>
                <button
                    className={styles["new-button"]}
                    onClick={() => setCreateRunOpen(true)}
                >
                    + New Run
                </button>
            </div>
        </>
    );
};

export default HomePage;

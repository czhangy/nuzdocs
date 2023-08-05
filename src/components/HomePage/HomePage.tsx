import CreateRunModal from "@/components/CreateRunModal/CreateRunModal";
import Modal from "@/components/Modal/Modal";
import RunList from "@/components/RunList/RunList";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { getRunNamesList } from "@/utils/run";

const HomePage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [resetFlag, setResetFlag] = useState<number>(0);
    const [runNames, setRunNames] = useState<string[]>([]);

    // Hacky way to reset the modal contents on close
    const closeCreateRunModal = () => {
        setTimeout(() => {
            setResetFlag((resetFlag + 1) % 2);
        }, 500);
        setModalOpen(false);
    };

    // Fetch existing runs from local storage to display in list
    useEffect(() => setRunNames(getRunNamesList), []);

    return (
        <>
            <Modal modalID="create-run-modal" onClose={closeCreateRunModal} open={modalOpen}>
                <CreateRunModal key={resetFlag} />
            </Modal>
            <div className={styles["home-page"]}>
                <RunList
                    runNames={runNames}
                    onUpdate={() => setRunNames(getRunNamesList)}
                    onOpen={() => setModalOpen(true)}
                />
            </div>
        </>
    );
};

export default HomePage;

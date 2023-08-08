import CreateRunModal from "@/components/Home/CreateRunModal/CreateRunModal";
import RunList from "@/components/Home/RunList/RunList";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
    // Modal state
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [resetFlag, setResetFlag] = useState<number>(0);

    // Hacky way to reset the modal contents on close
    const closeCreateRunModal = () => {
        setTimeout(() => {
            setResetFlag((resetFlag + 1) % 2);
        }, 500);
        setModalOpen(false);
    };

    return (
        <>
            <Modal modalID="create-run-modal" onClose={closeCreateRunModal} open={modalOpen}>
                <CreateRunModal key={resetFlag} />
            </Modal>
            <div className={styles["home-page"]}>
                <RunList onOpen={() => setModalOpen(true)} />
            </div>
        </>
    );
};

export default HomePage;

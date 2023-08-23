import Modal from "@/components/Global/Modal/Modal";
import CreateModal from "@/components/Home/CreateModal/CreateModal";
import RunList from "@/components/Home/RunList/RunList";
import { useState } from "react";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
    // Modal state
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [resetFlag, setResetFlag] = useState<number>(0);

    // Hacky way to reset the modal contents on close
    const closeCreateModal = () => {
        setTimeout(() => {
            setResetFlag((resetFlag + 1) % 2);
        }, 500);
        setModalOpen(false);
    };

    return (
        <>
            <div className={styles["home-page"]}>
                <RunList onOpen={() => setModalOpen(true)} />
            </div>
            <Modal modalID="create-run-modal" onClose={closeCreateModal} open={modalOpen}>
                <CreateModal key={resetFlag} />
            </Modal>
        </>
    );
};

export default HomePage;

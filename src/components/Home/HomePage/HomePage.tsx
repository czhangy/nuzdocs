import Modal from "@/components/Global/Modal/Modal";
import CreateModal from "@/components/Home/CreateModal/CreateModal";
import RunList from "@/components/Home/RunList/RunList";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import DeleteModal from "@/components/Home/DeleteModal/DeleteModal";
import Run from "@/models/Run";
import { deleteRun, getRun, getRunIDs, loadRun } from "@/utils/run";

const HomePage: React.FC = () => {
    // Internal state
    const [runs, setRuns] = useState<Run[]>([]);

    // Component state
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [selectedRun, setSelectedRun] = useState<Run | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [resetFlag, setResetFlag] = useState<number>(0);

    // Hacky way to reset the modal contents on close
    const closeCreateModal = (): void => {
        setTimeout(() => {
            setResetFlag((resetFlag + 1) % 2);
        }, 500);
        setCreateModalOpen(false);
    };

    // Set selected run and open delete modal
    const openDeleteModal = (run: Run): void => {
        setSelectedRun(run);
        setDeleteModalOpen(true);
    };

    // Reset run selection and close delete modal
    const closeDeleteModal = (): void => {
        setTimeout(() => {
            setSelectedRun(null);
        }, 500);
        setDeleteModalOpen(false);
    };

    // Loads data from JSON files into local storage
    const handleLoad = (jsonStr: string): void => {
        if (loadRun(JSON.parse(jsonStr))) {
            setRuns(getRunIDs().map((runID: string) => getRun(runID)));
        } else {
            alert("That run has already been saved!");
        }
    };

    // Deletes a run from local storage and refreshes the list to update the view
    const handleDelete = (): void => {
        deleteRun(selectedRun!.id);
        setRuns(getRunIDs().map((runID: string) => getRun(runID)));
        closeDeleteModal();
    };

    // Get list of runs on page load
    useEffect(() => {
        setRuns(getRunIDs().map((runID: string) => getRun(runID)));
    }, []);

    return (
        <div className={styles["home-page"]}>
            <RunList
                runs={runs}
                onLoad={(jsonStr: string) => handleLoad(jsonStr)}
                onCreate={() => setCreateModalOpen(true)}
                onDelete={(run: Run) => openDeleteModal(run)}
            />
            <Modal onClose={closeCreateModal} open={createModalOpen}>
                <CreateModal key={resetFlag} />
            </Modal>
            <Modal onClose={closeDeleteModal} open={deleteModalOpen}>
                <DeleteModal run={selectedRun} onClose={closeDeleteModal} onConfirm={handleDelete} />
            </Modal>
        </div>
    );
};

export default HomePage;

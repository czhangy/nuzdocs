import RunEntry from "@/components/Home/RunEntry/RunEntry";
import Run from "@/models/Run";
import { deleteRun, getRun, getRunIDs, loadRun } from "@/utils/run";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./RunList.module.scss";

type Props = {
    onOpen: () => void;
};

const RunList: React.FC<Props> = (props) => {
    // Internal data state
    const [runs, setRuns] = useState<Run[]>([]);

    // Extracts JSON string from file input
    const handleFileRead = (inputEvt: React.ChangeEvent<HTMLInputElement>) => {
        if (inputEvt.target.files && inputEvt.target.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsText(inputEvt.target.files[0], "UTF-8");
            fileReader.onload = (loadEvt: ProgressEvent<FileReader>) => {
                handleLoad(loadEvt.target!.result as string);
            };
        }
    };

    // Loads data from JSON files into local storage
    const handleLoad = (jsonStr: string) => {
        if (loadRun(JSON.parse(jsonStr))) {
            setRuns(getRunIDs().map((runID: string) => getRun(runID)));
        } else {
            alert("That run has already been saved!");
        }
    };

    // Deletes a run from local storage and refreshes the list to update the view
    const handleDelete = (runID: string) => {
        deleteRun(runID);
        setRuns(getRunIDs().map((runID: string) => getRun(runID)));
    };

    useEffect(() => {
        setRuns(getRunIDs().map((runID: string) => getRun(runID)));
    }, []);

    return (
        <div className={styles["run-list"]}>
            <h2 className={styles.header}>Your Runs</h2>
            {runs.length > 0 ? (
                <ul className={styles.list}>
                    {runs.map((run: Run) => {
                        return <RunEntry run={run} onDelete={() => handleDelete(run.id)} key={run.id} />;
                    })}
                </ul>
            ) : (
                <p className={styles["alt-text"]}>You don&apos;t have any saved runs yet!</p>
            )}
            <div className={styles.buttons}>
                <label className={styles.button} htmlFor="file-upload">
                    <div className={styles.icon}>
                        <Image src="/assets/icons/upload.svg" alt="Upload" layout="fill" objectFit="contain" />
                    </div>
                    Load Run
                </label>
                <input
                    id="file-upload"
                    className={styles["file-upload"]}
                    type="file"
                    accept="application/JSON"
                    onInput={(inputEvt: React.ChangeEvent<HTMLInputElement>) => handleFileRead(inputEvt)}
                />
                <button className={styles.button} onClick={props.onOpen}>
                    + New Run
                </button>
            </div>
        </div>
    );
};

export default RunList;

import RunEntry from "@/components/RunEntry/RunEntry";
import Image from "next/image";
import styles from "./RunList.module.scss";
import { deleteRun, loadRun } from "@/utils/run";

type Props = {
    runNames: string[];
    onUpdate: () => void;
    onOpen: () => void;
};

const RunList: React.FC<Props> = (props) => {
    // Extracts JSON string from file input
    const handleFileRead = (inputEvt: React.ChangeEvent<HTMLInputElement>) => {
        if (inputEvt.target.files && inputEvt.target.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsText(inputEvt.target.files[0], "UTF-8");
            fileReader.onload = (loadEvt: ProgressEvent<FileReader>) => {
                handleLoad(inputEvt.target.files![0].name, loadEvt.target!.result as string);
            };
        }
    };

    // Loads data from JSON files into local storage
    const handleLoad = (filename: string, jsonStr: string) => {
        const runName = filename.substring(0, filename.length - 5);
        deleteRun(runName);
        loadRun(runName, JSON.parse(jsonStr));
        props.onUpdate();
    };

    return (
        <div className={styles["run-list"]}>
            <h2 className={styles.header}>Your Runs</h2>
            {props.runNames.length > 0 ? (
                <ul className={styles.list}>
                    {props.runNames.map((runName: string, key: number) => {
                        return <RunEntry onDelete={props.onUpdate} runName={runName} key={key} />;
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

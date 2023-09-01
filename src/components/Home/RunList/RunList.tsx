import RunEntry from "@/components/Home/RunEntry/RunEntry";
import Run from "@/models/Run";
import Image from "next/image";
import styles from "./RunList.module.scss";

type Props = {
    runs: Run[];
    onLoad: (jsonStr: string) => void;
    onCreate: () => void;
    onDelete: (run: Run) => void;
};

const RunList: React.FC<Props> = (props) => {
    // Extracts JSON string from file input
    const handleFileRead = (inputEvt: React.ChangeEvent<HTMLInputElement>) => {
        if (inputEvt.target.files && inputEvt.target.files.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsText(inputEvt.target.files[0], "UTF-8");
            fileReader.onload = (loadEvt: ProgressEvent<FileReader>) => {
                props.onLoad(loadEvt.target!.result as string);
            };
        }
    };

    return (
        <div className={styles["run-list"]}>
            <h2 className={styles.header}>Your Runs</h2>
            {props.runs.length > 0 ? (
                <ul className={styles.list}>
                    {props.runs.map((run: Run) => {
                        return <RunEntry run={run} onDelete={() => props.onDelete(run)} key={run.id} />;
                    })}
                </ul>
            ) : (
                <p className={styles["alt-text"]}>You don&apos;t have any saved runs yet!</p>
            )}
            <div className={styles.buttons}>
                <label className={`${styles.button} ${styles.load}`} htmlFor="file-upload">
                    <div className={`${styles.icon} disable-select`}>
                        <Image src="/assets/icons/upload.svg" alt="Upload" layout="fill" objectFit="contain" />
                    </div>
                    <strong>Load Run</strong>
                </label>
                <input
                    id="file-upload"
                    className={styles["file-upload"]}
                    type="file"
                    accept="application/JSON"
                    onInput={(inputEvt: React.ChangeEvent<HTMLInputElement>) => handleFileRead(inputEvt)}
                />
                <button className={`${styles.button} ${styles.new}`} onClick={props.onCreate}>
                    + <strong>New Run</strong>
                </button>
            </div>
        </div>
    );
};

export default RunList;

import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Run from "@/models/Run";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { getRun } from "utils";
import styles from "./RunEntry.module.scss";
import Game from "@/models/Game";
import Games from "@/static/games";

type Props = {
    onDelete: () => void;
    runName: string;
};

const RunEntry: React.FC<Props> = (props: Props) => {
    const [run, setRun] = useState<Run | null>(null);
    const [gameURL, setGameURL] = useState<string>("");

    // Remove run from run list and from local storage and refresh list
    const handleDelete = () => {
        let runNames: string[] = JSON.parse(localStorage.getItem("runs") as string);
        runNames.splice(runNames.indexOf(props.runName), 1);
        localStorage.setItem("runs", JSON.stringify(runNames));
        localStorage.removeItem(props.runName);
        props.onDelete();
    };

    // Saves run as a JSON file: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    const handleSave = (runName: string) => {
        const jsonData: string = localStorage.getItem(runName)!;
        const filename = runName + ".json";
        const blob = new Blob([JSON.stringify(jsonData)], { type: "text/json" });
        const link = document.createElement("a");
        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");
        const evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        link.dispatchEvent(evt);
        link.remove();
    };

    // Redirect to previous location of selected run
    const handleNav = () => {
        Router.push(`/runs/${props.runName}/${run!.prevLocationSlug}`);
    };

    // Fetch run object
    useEffect(() => {
        if (props.runName.length > 0) {
            setRun(getRun(props.runName));
        }
    }, [props.runName]);

    // Set game of the run to compute icon image src
    useEffect(() => {
        if (run) {
            setGameURL(Games[run!.gameSlug].iconURL);
        }
    }, [run]);

    return (
        <li className={styles["run-entry"]}>
            <button className={styles.nav} onClick={handleNav}>
                <div className={styles.logo}>
                    {gameURL.length > 0 ? (
                        <Image src={gameURL} alt="Game logo" layout="fill" objectFit="contain" />
                    ) : (
                        ""
                    )}
                </div>
                <div className={styles.info}>
                    <p className={styles.name}>
                        {run && run.numCheckpointsCleared === run.numCheckpoints
                            ? `👑 ${props.runName}`
                            : props.runName}
                    </p>
                    <ProgressBar complete={run ? run.numCheckpointsCleared : 0} total={run ? run.numCheckpoints : 1} />
                    <div className={styles.rips}>
                        <div className={styles.icon}>
                            <Image src="/assets/icons/dead.svg" alt="Deaths" layout="fill" objectFit="contain" />
                        </div>
                        {run ? <p className={styles.num}>{run.numDead}</p> : ""}
                    </div>
                </div>
            </button>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleDelete}>
                    <Image src="/assets/icons/delete.svg" alt="Delete" layout="fill" objectFit="contain" />
                </button>
                <button className={styles.button} onClick={() => handleSave(props.runName)}>
                    <Image src="/assets/icons/save.svg" alt="Save" layout="fill" objectFit="contain" />
                </button>
            </div>
        </li>
    );
};

export default RunEntry;

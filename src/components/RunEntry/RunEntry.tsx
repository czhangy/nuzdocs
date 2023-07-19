import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Run from "@/models/Run";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { getRun } from "utils";
import styles from "./RunEntry.module.scss";

type Props = {
    onDelete: () => void;
    runName: string;
};

const RunEntry: React.FC<Props> = (props: Props) => {
    const [run, setRun] = useState<Run | null>(null);

    // Remove run from run list and from local storage and refresh list
    const handleDelete = () => {
        let runs = JSON.parse(localStorage.getItem("runs") as string);
        runs.splice(runs.indexOf(props.runName), 1);
        localStorage.setItem("runs", JSON.stringify(runs));
        localStorage.removeItem(props.runName);
        props.onDelete();
    };

    // TODO
    const handleSave = () => {
        alert("WIP");
    };

    // Redirect to previous location of selected run
    const handleNav = () => {
        Router.push(`/runs/${props.runName}/${run!.prevLocationSlug}`);
    };

    useEffect(() => {
        if (props.runName.length > 0) {
            setRun(getRun(props.runName));
        }
    }, [props.runName]);

    return (
        <li className={styles["run-entry"]}>
            <button className={styles.nav} onClick={handleNav}>
                <p className={styles.name}>
                    {run && run.numCheckpointsCleared === run.numCheckpoints ? `👑 ${props.runName}` : props.runName}
                </p>
                <ProgressBar complete={run ? run.numCheckpointsCleared : 0} total={run ? run.numCheckpoints : 1} />
                <div className={styles.rips}>
                    <div className={styles.icon}>
                        <Image src="/assets/icons/dead.svg" alt="Deaths" layout="fill" objectFit="contain" />
                    </div>
                    {run ? <p className={styles.num}>{run.numDead}</p> : ""}
                </div>
            </button>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleDelete}>
                    <Image src="/assets/icons/delete.svg" alt="Delete" layout="fill" objectFit="contain" />
                </button>
                <button className={styles.button} onClick={handleSave}>
                    <Image src="/assets/icons/save.svg" alt="Save" layout="fill" objectFit="contain" />
                </button>
            </div>
        </li>
    );
};

export default RunEntry;

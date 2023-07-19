import Run from "@/models/Run";
import Image from "next/image";
import Router from "next/router";
import { getRun } from "utils";
import styles from "./RunEntry.module.scss";

type Props = {
    onDelete: () => void;
    runName: string;
};

const RunEntry: React.FC<Props> = (props: Props) => {
    // Remove run from run list and from local storage and refresh list
    const handleDeleteRun = () => {
        let runs = JSON.parse(localStorage.getItem("runs") as string);
        runs.splice(runs.indexOf(props.runName), 1);
        localStorage.setItem("runs", JSON.stringify(runs));
        localStorage.removeItem(props.runName);
        props.onDelete();
    };

    // Redirect to previous location of selected run
    const handleRunNav = () => {
        const run: Run = getRun(props.runName);
        Router.push(`/runs/${props.runName}/${run.prevLocationSlug}`);
    };

    return (
        <li className={styles["run-entry"]}>
            <button className={styles["run-button"]} onClick={handleRunNav}>
                <p className={styles.name}>{props.runName}</p>
            </button>
            <button className={styles["delete-button"]} onClick={handleDeleteRun}>
                <Image src="/assets/icons/delete.svg" alt="Delete" layout="fill" objectFit="contain" />
            </button>
        </li>
    );
};

export default RunEntry;

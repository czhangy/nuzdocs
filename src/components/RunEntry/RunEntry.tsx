import Image from "next/image";
import styles from "./RunEntry.module.scss";
import Run from "@/models/Run";
import Router from "next/router";

type Props = {
    onDelete: () => void;
    run: string;
};

const RunEntry: React.FC<Props> = (props: Props) => {
    // Remove run from run list and from local storage and refresh list
    const handleDeleteRun = () => {
        let runs = JSON.parse(localStorage.getItem("runs") as string);
        runs.splice(runs.indexOf(props.run), 1);
        localStorage.setItem("runs", JSON.stringify(runs));

        localStorage.removeItem(props.run);

        props.onDelete();
    };

    const handleRunNav = () => {
        const run: Run = JSON.parse(localStorage.getItem(props.run) as string);
        Router.push(`/runs/${props.run}/${run.prevLocationName}`);
    };

    return (
        <li className={styles["run-entry"]}>
            <button className={styles["run-button"]} onClick={handleRunNav}>
                <p className={styles.name}>{props.run}</p>
            </button>
            <button
                className={styles["delete-button"]}
                onClick={handleDeleteRun}
            >
                <Image
                    src="/assets/icons/delete.svg"
                    alt="Delete"
                    layout="fill"
                    objectFit="contain"
                />
            </button>
        </li>
    );
};

export default RunEntry;

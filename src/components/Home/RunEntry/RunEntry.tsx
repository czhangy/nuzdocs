import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Run from "@/models/Run";
import { getGame } from "@/utils/game";
import { getNumClearedBattles, getNumRIPs, getRun } from "@/utils/run";
import { getNumBattles } from "@/utils/segment";
import Image from "next/image";
import Router from "next/router";
import styles from "./RunEntry.module.scss";

type Props = {
    run: Run;
    onDelete: () => void;
};

const RunEntry: React.FC<Props> = (props: Props) => {
    // Saves run as a JSON file: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    const handleSave = () => {
        const jsonData: string = JSON.stringify(getRun(props.run.id));
        const filename = props.run.name + ".json";
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
        Router.push(`/runs/${props.run.name}/${props.run.prevSegmentSlug}`);
    };

    return (
        <li className={styles["run-entry"]}>
            <button className={styles.nav} onClick={handleNav}>
                <div className={styles.logo}>
                    <Image
                        src={getGame(props.run.gameSlug).logoURL}
                        alt="Game logo"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className={styles.info}>
                    <p className={styles.name}>
                        {getNumClearedBattles(props.run.name) === getNumBattles(getRun(props.run.id).gameSlug)
                            ? `👑 ${props.run.name}`
                            : props.run.name}
                    </p>
                    <ProgressBar
                        complete={getNumClearedBattles(props.run.name)}
                        total={getNumBattles(getRun(props.run.name).gameSlug)}
                    />
                    <div className={styles.rips}>
                        <div className={styles.icon}>
                            <Image src="/assets/icons/dead.svg" alt="Deaths" layout="fill" objectFit="contain" />
                        </div>
                        <p className={styles.num}>{getNumRIPs(props.run.name)}</p>
                    </div>
                </div>
            </button>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={props.onDelete}>
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

import ProgressBar from "@/components/Home/ProgressBar/ProgressBar";
import Run from "@/models/Run";
import { getGame } from "@/utils/game";
import { getNumClearedBattles, getNumRIPs, getRun } from "@/utils/run";
import { getNumBattles } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
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

    return (
        <li className={styles["run-entry"]}>
            <Link href={`/runs/${props.run.id}/${props.run.prevSegmentSlug}`}>
                <a className={styles.nav}>
                    <div className={styles.logo}>
                        <Image
                            src={getGame(props.run.gameSlug).logo}
                            alt="Game logo"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <div className={styles.info}>
                        <p className={styles.name}>
                            {getNumClearedBattles(props.run.id) === getNumBattles(getRun(props.run.id).gameSlug)
                                ? `👑 ${props.run.name} `
                                : props.run.name + " "}
                            <strong className={styles.game}>[{getGame(props.run.gameSlug).name}]</strong>
                        </p>
                        <ProgressBar
                            complete={getNumClearedBattles(props.run.id)}
                            total={getNumBattles(getRun(props.run.id).gameSlug)}
                            barID={props.run.id}
                        />
                        <div className={styles.rips}>
                            <div className={styles.icon}>
                                <Image src="/assets/icons/dead.svg" alt="Deaths" layout="fill" objectFit="contain" />
                            </div>
                            <p className={styles.num}>{getNumRIPs(props.run.id)}</p>
                        </div>
                    </div>
                </a>
            </Link>
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

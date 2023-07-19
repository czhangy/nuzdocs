import styles from "./RunList.module.scss";
import RunEntry from "@/components/RunEntry/RunEntry";

type Props = {
    runNames: string[];
    onDelete: () => void;
    onOpen: () => void;
};

const RunList: React.FC<Props> = (props) => {
    return (
        <div className={styles["run-list"]}>
            <h2 className={styles.header}>Your Runs</h2>
            {props.runNames.length > 0 ? (
                <ul className={styles.list}>
                    {props.runNames.map((runName: string, key: number) => {
                        return <RunEntry onDelete={props.onDelete} runName={runName} key={key} />;
                    })}
                </ul>
            ) : (
                <p className={styles["alt-text"]}>You don&apos;t have any saved runs yet!</p>
            )}
            <button className={styles["new-button"]} onClick={props.onOpen}>
                + New Run
            </button>
        </div>
    );
};

export default RunList;

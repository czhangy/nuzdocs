import styles from "./EncounterTable.module.scss";

type Props = {
    runName: string;
    areaNames: string[];
};

const EncounterTable: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["encounter-table"]}>
            <h3 className={styles.header}>Encounters:</h3>
            <table></table>
        </div>
    );
};

export default EncounterTable;

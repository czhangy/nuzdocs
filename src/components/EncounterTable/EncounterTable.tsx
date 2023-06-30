import styles from "./EncounterTable.module.scss";

const EncounterTable: React.FC = () => {
    return (
        <div className={styles["encounter-table"]}>
            <h3 className={styles.header}>Encounters:</h3>
            <table></table>
        </div>
    );
};

export default EncounterTable;

import axios from "axios";
import { useEffect, useState } from "react";
import { getRun } from "utils";
import styles from "./EncounterTable.module.scss";

type Props = {
    runName: string;
    areaNames: string[];
};

const EncounterTable: React.FC<Props> = (props: Props) => {
    const [currentAreaName, setCurrentAreaName] = useState<string>("");

    useEffect(() => {
        setCurrentAreaName(props.areaNames[0]);
    }, [props.areaNames]);

    useEffect(() => {
        if (currentAreaName.length > 0) {
            axios
                .get("/api/location", {
                    params: {
                        areaName: currentAreaName,
                        gameName: getRun(props.runName).gameName,
                    },
                })
                .then((res) => {
                    const areaData = res.data;
                    console.log(JSON.parse(areaData.area));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [currentAreaName]);

    return (
        <div className={styles["encounter-table"]}>
            <h3 className={styles.header}>Encounters:</h3>
            <table></table>
        </div>
    );
};

export default EncounterTable;

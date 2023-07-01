import AreaData from "@/models/AreaData";
import axios from "axios";
import { useEffect, useState } from "react";
import { getRun } from "utils";
import styles from "./EncounterTable.module.scss";

type Props = {
    runName: string;
    areaSlugList: string[];
};

const EncounterTable: React.FC<Props> = (props: Props) => {
    const [areaList, setAreaList] = useState<AreaData[]>([]);
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);

    useEffect(() => {
        if (props.areaSlugList) {
            axios
                .get("/api/location", {
                    params: {
                        areaSlugList: props.areaSlugList,
                        gameSlug: getRun(props.runName).gameSlug,
                    },
                })
                .then((res) => {
                    const areaList = res.data;
                    console.log(JSON.parse(areaList.areaList));
                    setAreaList(JSON.parse(areaList.areaList));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.areaSlugList]);

    return (
        <div className={styles["encounter-table"]}>
            <h3 className={styles.header}>Encounters:</h3>
        </div>
    );
};

export default EncounterTable;

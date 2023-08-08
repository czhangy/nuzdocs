import Dropdown from "@/components/Dropdown/Dropdown";
import EncounterAccordion from "@/components/EncounterAccordion/EncounterAccordion";
import AreaData from "@/models/AreaData";
import LocationData from "@/models/LocationData";
import { fetchAreas } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EncounterList.module.scss";
import { getRun } from "@/utils/run";

type Props = {
    currentLocation: LocationData;
    runName: string;
    segmentSlug: string;
};

const EncounterList: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [areaList, setAreaList] = useState<AreaData[]>([]);

    // User data state
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);

    // Component state
    const [time, setTime] = useState<"time-morning" | "time-day" | "time-night">("time-morning");

    // Translates areas into area names for the dropdown
    const getAreaNames = (): string[] => {
        return areaList.map((area: AreaData) => area.areaName).sort();
    };

    // Sets the current area on dropdown select
    const handleAreaSelect = (areaName: string): void => {
        let area: AreaData = areaList.find((area: AreaData) => area.areaName === areaName)!;
        // Strip starters out of encounters in starting town
        if (props.segmentSlug === getGameGroup(getRun(props.runName).gameSlug).startingTownSlug) {
            delete area.encounters["time-morning"].gift;
            delete area.encounters["time-day"].gift;
            delete area.encounters["time-night"].gift;
        }
        setCurrentArea(area);
    };

    // Fetch areas + encounters in location on component load
    useEffect(() => {
        if (props.currentLocation) {
            setAreaList([]);
            fetchAreas(props.currentLocation.areaSlugList, getRun(props.runName).gameSlug).then((areaList) =>
                setAreaList(areaList)
            );
        }
    }, [props.currentLocation]);

    // When area list is changed, reset area info and fetch all encounters' PokemonData in area
    useEffect(() => {
        if (areaList.length > 0) {
            setCurrentArea(null);
        }
    }, [areaList]);

    return (
        <div className={styles["encounter-list"]}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <h3 className={styles.title}>Encounters:</h3>
                    {currentArea && currentArea.usesTime ? (
                        <div className={styles.times}>
                            <button
                                className={`${styles.time} ${time === "time-morning" ? styles.active : ""}`}
                                onClick={() => setTime("time-morning")}
                            >
                                <Image
                                    src="/assets/icons/morning.svg"
                                    alt="Morning"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                            <button
                                className={`${styles.time} ${time === "time-day" ? styles.active : ""}`}
                                onClick={() => setTime("time-day")}
                            >
                                <Image src="/assets/icons/day.svg" alt="Day" layout="fill" objectFit="contain" />
                            </button>
                            <button
                                className={`${styles.time} ${time === "time-night" ? styles.active : ""}`}
                                onClick={() => setTime("time-night")}
                            >
                                <Image src="/assets/icons/night.svg" alt="Night" layout="fill" objectFit="contain" />
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <Dropdown
                    placeholder="Select a zone..."
                    value={currentArea ? currentArea.areaName : null}
                    options={getAreaNames()}
                    onSelect={(areaName: string) => handleAreaSelect(areaName)}
                />
            </div>
            {currentArea && currentArea.usesTime ? (
                <div className={styles.times}>
                    <button
                        className={`${styles.time} ${time === "time-morning" ? styles.active : ""}`}
                        onClick={() => setTime("time-morning")}
                    >
                        <Image src="/assets/icons/morning.svg" alt="Morning" layout="fill" objectFit="contain" />
                    </button>
                    <button
                        className={`${styles.time} ${time === "time-day" ? styles.active : ""}`}
                        onClick={() => setTime("time-day")}
                    >
                        <Image src="/assets/icons/day.svg" alt="Day" layout="fill" objectFit="contain" />
                    </button>
                    <button
                        className={`${styles.time} ${time === "time-night" ? styles.active : ""}`}
                        onClick={() => setTime("time-night")}
                    >
                        <Image src="/assets/icons/night.svg" alt="Night" layout="fill" objectFit="contain" />
                    </button>
                </div>
            ) : (
                ""
            )}
            {currentArea ? (
                <div className={styles.encounters}>
                    {Object.keys(currentArea.encounters[time]).map((method: string, key: number) => {
                        return (
                            <EncounterAccordion
                                key={key}
                                method={method}
                                encounters={currentArea.encounters[time][method]}
                                runName={props.runName}
                            />
                        );
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default EncounterList;

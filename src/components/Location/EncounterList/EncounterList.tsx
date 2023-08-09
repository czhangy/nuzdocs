import Dropdown from "@/components/Global/Dropdown/Dropdown";
import EncounterAccordion from "@/components/Location/EncounterAccordion/EncounterAccordion";
import TimeControls from "@/components/Location/TimeControls/TimeControls";
import AreaData from "@/models/AreaData";
import LocationData from "@/models/LocationData";
import Run from "@/models/Run";
import { fetchAreas } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { useEffect, useState } from "react";
import styles from "./EncounterList.module.scss";

type Props = {
    location: LocationData;
    run: Run;
};

const EncounterList: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [areaList, setAreaList] = useState<AreaData[]>([]);

    // Component state
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);
    const [time, setTime] = useState<"time-morning" | "time-day" | "time-night">("time-morning");

    // Translates areas into area names for the dropdown
    const getAreaNames = (): string[] => {
        return areaList.map((area: AreaData) => area.areaName).sort();
    };

    // Sets the current area on dropdown select
    const handleAreaSelect = (areaName: string): void => {
        let area: AreaData = areaList.find((area: AreaData) => area.areaName === areaName)!;
        // Strip starters out of encounters in starting town
        if (props.location.slug === getGameGroup(props.run.gameSlug).startingTownSlug) {
            delete area.encounters["time-morning"].gift;
            delete area.encounters["time-day"].gift;
            delete area.encounters["time-night"].gift;
        }
        setCurrentArea(area);
    };

    // Fetch areas + encounters in location on location change
    useEffect(() => {
        if (props.location) {
            setCurrentArea(null);
            setAreaList([]);
            fetchAreas(props.location.areas, props.run.gameSlug).then((areaList) => setAreaList(areaList));
        }
    }, [props.location]);

    return (
        <div className={styles["encounter-list"]}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <h3 className={styles.title}>Encounters:</h3>
                    {currentArea && currentArea.usesTime ? (
                        <TimeControls
                            time={time}
                            onClick={(time: "time-morning" | "time-day" | "time-night") => setTime(time)}
                            inline={true}
                        />
                    ) : (
                        ""
                    )}
                </div>
                <Dropdown
                    placeholder="Select a zone..."
                    value={currentArea ? currentArea.areaName : null}
                    options={getAreaNames()}
                    onSelect={(areaName: string) => handleAreaSelect(areaName)}
                    border={true}
                />
            </div>
            {currentArea && currentArea.usesTime ? (
                <TimeControls
                    time={time}
                    onClick={(time: "time-morning" | "time-day" | "time-night") => setTime(time)}
                    inline={false}
                />
            ) : (
                ""
            )}
            {currentArea ? (
                <div className={styles.encounters}>
                    {Object.keys(currentArea.encounters[time]).map((method: string) => {
                        return (
                            <EncounterAccordion
                                key={method}
                                method={method}
                                encounters={currentArea.encounters[time][method]}
                                gameSlug={props.run.gameSlug}
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

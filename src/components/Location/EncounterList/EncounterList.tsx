import Dropdown from "@/components/Global/Dropdown/Dropdown";
import EncounterAccordion from "@/components/Location/EncounterAccordion/EncounterAccordion";
import TimeControls from "@/components/Location/TimeControls/TimeControls";
import AreaData from "@/models/AreaData";
import LocationData from "@/models/LocationData";
import Run from "@/models/Run";
import translations from "@/static/translations";
import { fetchAreas } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./EncounterList.module.scss";

type Props = {
    location: LocationData;
    run: Run;
};

const EncounterList: React.FC<Props> = (props: Props) => {
    // Fetched state
    const [areaList, setAreaList] = useState<AreaData[]>([]);

    // Component state
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);
    const [time, setTime] = useState<"time-morning" | "time-day" | "time-night">("time-morning");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Translates areas into area names for the dropdown
    const getAreaNames = (): string[] => {
        return areaList.map((area: AreaData) => area.areaName).sort();
    };

    // Sets the current area on dropdown select
    const handleAreaSelect = (areaName: string): void => {
        let area: AreaData = areaList.find((area: AreaData) => area.areaName === areaName)!;
        setCurrentArea(area);
    };

    // Gets the list of encounter methods, sorted by priority (as defined in translations)
    const getSortedMethods = (): string[] => {
        return Object.keys(currentArea!.encounters[time]).sort((a: string, b: string) => {
            const priorities: string[] = Object.values(translations.encounter_methods);
            return priorities.indexOf(a) - priorities.indexOf(b);
        });
    };

    // Fetch areas + encounters in location on location change
    useEffect(() => {
        if (props.location && props.run.gameSlug) {
            setCurrentArea(null);
            setAreaList([]);
            setIsLoading(true);
            fetchAreas(props.location.areas, props.run.gameSlug).then((areaList: AreaData[]) => {
                const validAreas: AreaData[] = [];
                for (const area of areaList) {
                    if (Object.keys(area.encounters["time-day"]).length > 0) {
                        validAreas.push(area);
                    }
                }
                setAreaList(validAreas);
                setIsLoading(false);
            });
        }
    }, [props.location, props.run.gameSlug]);

    return areaList.length > 0 ? (
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
                    {getSortedMethods().map((method: string) => {
                        return (
                            <EncounterAccordion
                                key={method}
                                method={method}
                                encounters={currentArea.encounters[time][method]}
                                gameSlug={props.run.gameSlug}
                                runID={props.run.id}
                            />
                        );
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    ) : isLoading ? (
        <div className="accent-spinner" />
    ) : (
        <></>
    );
};

export default EncounterList;

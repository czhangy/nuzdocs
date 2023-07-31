import Dropdown from "@/components/Dropdown/Dropdown";
import EncounterAccordion from "@/components/EncounterAccordion/EncounterAccordion";
import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import LocationData from "@/models/LocationData";
import games from "@/static/games";
import translations from "@/static/translations";
import { fetchAreas } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./EncounterList.module.scss";

type Props = {
    currentLocation: LocationData;
    gameSlug: string;
    segmentSlug: string;
};

const EncounterList: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [areaList, setAreaList] = useState<AreaData[]>([]);

    // User data state
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);

    // Translates areas into area names for the dropdown
    const getAreaNames = (): string[] => {
        return areaList.map((area: AreaData) => area.areaName).sort();
    };

    // Sets the current area on dropdown select
    const handleAreaSelect = (areaName: string): void => {
        let area: AreaData = areaList.filter((area: AreaData) => area.areaName === areaName)[0];
        // Strip starters out of encounters in starting town
        if (props.segmentSlug === games[props.gameSlug].gameGroup.startingTownSlug) {
            area.encounters = area.encounters.filter((encounter: EncounterData) => {
                return !games[props.gameSlug].gameGroup.starterSlugs.includes(encounter.pokemonSlug);
            });
        }
        setCurrentArea(area);
    };

    // Get a list of the encounter methods available in the current area, sorted by availability
    const getEncounterMethods = (): string[] => {
        if (currentArea) {
            let methods: string[] = currentArea.encounters.map((encounter: EncounterData) => encounter.method);
            methods = [...new Set(methods)];
            return methods.sort((a: string, b: string) => {
                const priority: string[] = Object.values(translations.encounter_methods);
                return priority.indexOf(a) - priority.indexOf(b);
            });
        } else {
            return [];
        }
    };

    // Get a list of Pokemon slugs for encounters in the current area, sorted by chance
    const getEncounters = (method: string): EncounterData[] => {
        if (currentArea) {
            let encounters: EncounterData[] = currentArea.encounters.filter(
                (encounter: EncounterData) => encounter.method === method
            );
            return encounters.sort((a: EncounterData, b: EncounterData) => b.chance - a.chance);
        } else {
            return [];
        }
    };

    // Fetch areas + encounters in location on component load
    useEffect(() => {
        if (props.currentLocation) {
            setAreaList([]);
            fetchAreas(props.currentLocation.areaSlugList, props.gameSlug).then((areaList) => setAreaList(areaList));
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
                <h3 className={styles.title}>Encounters:</h3>
                <Dropdown
                    placeholder="Select a zone..."
                    value={currentArea ? currentArea.areaName : null}
                    options={getAreaNames()}
                    onSelect={(areaName: string) => handleAreaSelect(areaName)}
                />
            </div>
            <div className={styles.encounters}>
                {getEncounterMethods().map((method: string, key: number) => {
                    return (
                        <EncounterAccordion
                            key={key}
                            method={method}
                            encounters={getEncounters(method)}
                            versionGroup={games[props.gameSlug].gameGroup.versionGroup}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default EncounterList;

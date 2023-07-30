import Dropdown from "@/components/Dropdown/Dropdown";
import EncounterAccordion from "@/components/EncounterAccordion/EncounterAccordion";
import EncounterDisplay from "@/components/EncounterDisplay/EncounterDisplay";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import StarterSelect from "@/components/StarterSelect/StarterSelect";
import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import Game from "@/models/Game";
import LocationData from "@/models/LocationData";
import games from "@/static/games";
import translations from "@/static/translations";
import { fetchAreas, fetchLocation } from "@/utils/api";
import { getRun } from "@/utils/utils";
import { useEffect, useState } from "react";
import styles from "./SegmentPage.module.scss";

type Props = {
    gameSlug: string;
    runName: string;
    segmentSlug: string;
};

const SegmentPage: React.FC<Props> = (props) => {
    const [game, setGame] = useState<Game | null>(null);

    // States to track location areas
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
    const [areaList, setAreaList] = useState<AreaData[]>([]);
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);

    // Translates areas into area names for the dropdown
    const getAreaNames = (): string[] => {
        return areaList.map((area: AreaData) => area.areaName).sort();
    };

    // Sets the current area on dropdown select
    const handleAreaSelect = (areaName: string): void => {
        let area: AreaData = areaList.filter((area: AreaData) => area.areaName === areaName)[0];
        if (props.segmentSlug === game!.gameGroup.startingTownSlug) {
            area.encounters = area.encounters.filter((encounter: EncounterData) => {
                return !game!.gameGroup.starterSlugs.includes(encounter.pokemonSlug);
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

    // Set game info on page load
    useEffect(() => {
        if (props.gameSlug.length > 0) {
            setGame(games[props.gameSlug]);
        }
    }, [props.gameSlug]);

    // Get data associated with current location on page load
    useEffect(() => {
        if (props.segmentSlug) {
            fetchLocation(props.segmentSlug).then((location) => setCurrentLocation(location));
        }
    }, [props.segmentSlug]);

    // Fetch areas + encounters in location on page load
    useEffect(() => {
        if (currentLocation) {
            setAreaList([]);
            fetchAreas(currentLocation.areaSlugList, getRun(props.runName)!.gameSlug).then((areaList) =>
                setAreaList(areaList)
            );
        }
    }, [currentLocation]);

    // When area list is changed, reset area info and fetch all encounters' PokemonData in area
    useEffect(() => {
        if (areaList.length > 0 && game) {
            setCurrentArea(null);
        }
    }, [areaList, game]);

    useEffect(() => {}, [currentArea]);

    return game ? (
        <div className={styles["segment-page"]}>
            <SegmentNav segments={game.gameGroup.segments} segmentSlug={props.segmentSlug} />
            <div className={styles.info}>
                {currentLocation ? (
                    <>
                        <h2 className={styles["location-name"]}>{currentLocation.locationName}</h2>
                        {props.segmentSlug === game.gameGroup.startingTownSlug ? (
                            <section className={styles.section}>
                                <StarterSelect
                                    runName={props.runName}
                                    starterSlugsList={game.gameGroup.starterSlugs}
                                    gameGroup={game.gameGroup}
                                />
                            </section>
                        ) : (
                            ""
                        )}
                        <section className={styles.section}>
                            <h3 className={styles.header}>Encounters:</h3>
                            <Dropdown
                                placeholder="Select a zone..."
                                value={currentArea ? currentArea.areaName : null}
                                options={getAreaNames()}
                                onSelect={(areaName: string) => handleAreaSelect(areaName)}
                            />
                            {getEncounterMethods().map((method: string, key: number) => {
                                return (
                                    <EncounterAccordion
                                        key={key}
                                        method={method}
                                        encounters={getEncounters(method)}
                                        versionGroup={game.gameGroup.versionGroup}
                                    />
                                );
                            })}
                        </section>
                    </>
                ) : (
                    ""
                )}
            </div>
            <EncounterDisplay
                pokedex={games[props.gameSlug].gameGroup.pokedex}
                runName={props.runName}
                locationSlug={props.segmentSlug}
            />
        </div>
    ) : (
        <></>
    );
};

export default SegmentPage;

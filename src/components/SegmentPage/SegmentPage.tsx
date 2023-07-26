import Dropdown from "@/components/Dropdown/Dropdown";
import EncounterDisplay from "@/components/EncounterDisplay/EncounterDisplay";
import EncounterTable from "@/components/EncounterTable/EncounterTable";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import StarterSelect from "@/components/StarterSelect/StarterSelect";
import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import Game from "@/models/Game";
import LocationData from "@/models/LocationData";
import PokemonData from "@/models/PokemonData";
import games from "@/static/games";
import { fetchAreas, fetchLocation, fetchPokemonGroup } from "@/utils/api";
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
    const [areaNameList, setAreaNameList] = useState<string[]>([]);
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);

    // States to track encounter info in the current location
    const [uniquePokemonDataList, setUniquePokemonDataList] = useState<PokemonData[]>([]);

    // Sets the current area on dropdown select
    const handleAreaSelect = (areaName: string) => {
        let area: AreaData = areaList.filter((area: AreaData) => area.areaName === areaName)[0];
        if (props.segmentSlug === game!.startingTownSlug) {
            area.encounters = area.encounters.filter((encounter: EncounterData) => {
                return !game!.starterSlugs.includes(encounter.pokemonSlug);
            });
        }
        setCurrentArea(area);
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
            fetchAreas(currentLocation.areaSlugList, getRun(props.runName)!.gameSlug).then((areaList) =>
                setAreaList(areaList)
            );
        }
    }, [currentLocation]);

    // When area list is changed, reset area info and fetch all encounters' PokemonData in area
    useEffect(() => {
        if (areaList.length > 0 && game) {
            setCurrentArea(null);
            setAreaNameList(areaList.map((area: AreaData) => area.areaName).sort());
            let pokemonSlugList: string[] = areaList
                .map((area: AreaData) => area.encounters.map((encounter: EncounterData) => encounter.pokemonSlug))
                .flat();
            pokemonSlugList = pokemonSlugList.filter((pokemonSlug: string) => !game.starterSlugs.includes(pokemonSlug));
            pokemonSlugList = [...new Set(pokemonSlugList)].sort();
            fetchPokemonGroup(pokemonSlugList).then((pokemon) => setUniquePokemonDataList(pokemon));
        }
    }, [areaList, game]);

    return game ? (
        <div className={styles["segment-page"]}>
            <SegmentNav segments={game.segments} segmentSlug={props.segmentSlug} />
            <div className={styles["run-info"]}>
                {currentLocation ? (
                    <>
                        <h2 className={styles["location-name"]}>{currentLocation.locationName}</h2>
                        {props.segmentSlug === game.startingTownSlug ? (
                            <section className={styles.section}>
                                <StarterSelect
                                    runName={props.runName}
                                    starterSlugsList={game.starterSlugs}
                                    locationName={game.startingTownSlug}
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
                                options={areaNameList}
                                onSelect={(areaName: string) => handleAreaSelect(areaName)}
                            />
                            <EncounterTable
                                uniquePokemonDataList={uniquePokemonDataList}
                                currentArea={currentArea}
                                gameGroup={game.gameGroup}
                            />
                        </section>
                    </>
                ) : (
                    ""
                )}
            </div>
            <EncounterDisplay
                pokedex={games[props.gameSlug].pokedex}
                runName={props.runName}
                locationSlug={props.segmentSlug}
            />
        </div>
    ) : (
        <></>
    );
};

export default SegmentPage;

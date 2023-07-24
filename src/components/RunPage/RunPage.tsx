import Dropdown from "@/components/Dropdown/Dropdown";
import EncounterDisplay from "@/components/EncounterDisplay/EncounterDisplay";
import EncounterTable from "@/components/EncounterTable/EncounterTable";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import StarterSelect from "@/components/StarterSelect/StarterSelect";
import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import Game from "@/models/Game";
import LocalPokemon from "@/models/LocalPokemon";
import LocationData from "@/models/LocationData";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import Games from "@/static/games";
import axios from "axios";
import { useEffect, useState } from "react";
import { getRun } from "utils";
import styles from "./RunPage.module.scss";

type Props = {
    gameSlug: string;
    runName: string;
    segmentSlug: string;
};

const RunPage: React.FC<Props> = (props) => {
    const [game, setGame] = useState<Game | null>(null);

    // States to track location areas
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
    const [areaList, setAreaList] = useState<AreaData[]>([]);
    const [areaNameList, setAreaNameList] = useState<string[]>([]);
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);

    // States to track encounter info in the current location
    const [encounteredPokemon, setEncounteredPokemon] = useState<PokemonData | "failed" | null>(null);
    const [uniquePokemonDataList, setUniquePokemonDataList] = useState<PokemonData[]>([]);

    // Gets the PokemonData for the current location's encounter if it exists
    const fetchCurrentLocationEncounter = () => {
        const run: Run = getRun(props.runName);
        run.encounterList.forEach((encounter: LocalPokemon) => {
            if (encounter.locationSlug === props.segmentSlug) {
                if (encounter.pokemonSlug === "failed") {
                    setEncounteredPokemon("failed");
                } else {
                    axios
                        .get("/api/pokemon", {
                            params: {
                                pokemonSlug: encounter.pokemonSlug,
                            },
                        })
                        .then((res) => setEncounteredPokemon(JSON.parse(res.data.pokemon)))
                        .catch((error) => {
                            console.log(error);
                        });
                }
                return;
            }
        });
    };

    // Save an encounter into local storage and then fetch its data to pass to EncounterDisplay
    const saveEncounter = (pokemonSlug: string) => {
        const run: Run = getRun(props.runName);
        const newEncounter: LocalPokemon = {
            pokemonSlug: pokemonSlug,
            locationSlug: props.segmentSlug,
        };
        run.encounterList = run.encounterList.filter(
            (encounter: LocalPokemon) => encounter.locationSlug !== props.segmentSlug
        );
        run.encounterList.push(newEncounter);
        localStorage.setItem(props.runName, JSON.stringify(run));
        fetchCurrentLocationEncounter();
    };

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
            setGame(Games[props.gameSlug]);
        }
    }, [props.gameSlug]);

    // Fetch location's encounter data for encounter display
    useEffect(() => {
        if (props.runName && props.segmentSlug) {
            fetchCurrentLocationEncounter();
        }
    }, [props.runName, props.segmentSlug]);

    // Get data associated with current location on page load
    useEffect(() => {
        if (props.segmentSlug && props.segmentSlug.length > 0) {
            axios
                .get("/api/location", {
                    params: {
                        locationSlug: props.segmentSlug,
                    },
                })
                .then((res) => {
                    const locationData = res.data;
                    setCurrentLocation(JSON.parse(locationData.location));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.segmentSlug]);

    // Fetch areas + encounters in location on page load
    useEffect(() => {
        if (currentLocation) {
            axios
                .get("/api/location", {
                    params: {
                        areaSlugList: currentLocation.areaSlugList,
                        gameSlug: getRun(props.runName).gameSlug,
                    },
                })
                .then((res) => {
                    const areaList = res.data;
                    setAreaList(JSON.parse(areaList.areaList));
                })
                .catch((error) => {
                    console.log(error);
                });
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
            axios
                .get("/api/pokemon", {
                    params: {
                        pokemonSlugList: pokemonSlugList,
                    },
                })
                .then((res) => setUniquePokemonDataList(JSON.parse(res.data.pokemon)))
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [areaList, game]);

    return game ? (
        <div className={styles["run-page"]}>
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
                encounteredPokemon={encounteredPokemon}
                uniquePokemonDataList={uniquePokemonDataList}
                onSelect={(pokemonSlug: string) => saveEncounter(pokemonSlug)}
            />
        </div>
    ) : (
        <></>
    );
};

export default RunPage;

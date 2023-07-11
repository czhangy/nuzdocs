import Dropdown from "@/components/Dropdown/Dropdown";
import EncounterDisplay from "@/components/EncounterDisplay/EncounterDisplay";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import StarterSelect from "@/components/StarterSelect/StarterSelect";
import AreaData from "@/models/AreaData";
import Game from "@/models/Game";
import LocalPokemon from "@/models/LocalPokemon";
import LocationData from "@/models/LocationData";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import SoulSilver from "@/static/soulsilver";
import axios from "axios";
import { useEffect, useState } from "react";
import { getRun } from "utils";
import EncounterTable from "../EncounterTable/EncounterTable";
import styles from "./RunPage.module.scss";

type Props = {
    gameSlug: string;
    runName: string;
    locationSlug: string;
};

const RunPage: React.FC<Props> = (props) => {
    // States to track location areas
    const [areaList, setAreaList] = useState<AreaData[]>([]);
    const [areaNameList, setAreaNameList] = useState<string[]>([]);
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);

    const [encounteredPokemon, setEncounteredPokemon] = useState<PokemonData | null>(null);
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
    const [pokemonDataList, setPokemonDataList] = useState<PokemonData[]>([]);
    const game: Game = SoulSilver;

    // Save an encounter into local storage
    const saveEncounter = (pokemonSlug: string) => {
        const run: Run = getRun(props.runName);
        const newEncounter: LocalPokemon = {
            pokemonSlug: pokemonSlug,
            locationSlug: props.locationSlug,
        };
        run.encounterList = run.encounterList.filter(
            (encounter: LocalPokemon) => encounter.locationSlug !== props.locationSlug
        );
        run.encounterList.push(newEncounter);
        localStorage.setItem(props.runName, JSON.stringify(run));
    };

    // Sets the current area on dropdown select
    const handleAreaSelect = (areaName: string) => {
        const area: AreaData = areaList.filter((area: AreaData) => area.areaName === areaName)[0];
        setCurrentArea(area);
    };

    // Get data associated with current location on page load
    useEffect(() => {
        if (props.locationSlug && props.locationSlug.length > 0) {
            setPokemonDataList([]);
            axios
                .get("/api/location", {
                    params: {
                        locationSlug: props.locationSlug,
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
    }, [props.locationSlug]);

    // Fetch location's encounter data for encounter display
    useEffect(() => {
        if (props.runName && props.locationSlug) {
            const run: Run = getRun(props.runName);
            run.encounterList.forEach((encounter: LocalPokemon) => {
                if (encounter.locationSlug === props.locationSlug) {
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
                    return;
                }
            });
        }
    }, [props.runName, props.locationSlug]);

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

    // When area list is changed (meaning location was changed), reset current area and get new list of names
    useEffect(() => {
        if (areaList.length > 0) {
            setCurrentArea(null);
            setAreaNameList(areaList.map((area: AreaData) => area.areaName).sort());
        }
    }, [areaList]);

    return (
        <div className={styles["run-page"]}>
            <SegmentNav segments={game.segments} segmentSlug={props.locationSlug} />
            <div className={styles["run-info"]}>
                {currentLocation ? (
                    <>
                        <h2 className={styles["location-name"]}>{currentLocation.locationName}</h2>
                        {props.locationSlug === game.startingTown ? (
                            <section className={styles.section}>
                                <StarterSelect
                                    runName={props.runName}
                                    starterSlugsList={game.starterSlugs}
                                    locationName={game.startingTown}
                                />
                            </section>
                        ) : (
                            ""
                        )}
                        <section className={styles.section}>
                            <h3 className={styles.header}>Encounters:</h3>
                            <Dropdown
                                placeholder="Select a zone..."
                                options={areaNameList}
                                onSelect={(areaName: string) => handleAreaSelect(areaName)}
                            />
                            <EncounterTable
                                runName={props.runName}
                                currentArea={currentArea}
                                starterSlugsList={game.starterSlugs}
                                gameGroup={game.gameGroup}
                                onFetch={(pokemonDataList: PokemonData[]) => setPokemonDataList(pokemonDataList)}
                            />
                        </section>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className={styles["sticky-info"]}>
                <EncounterDisplay
                    encounteredPokemon={encounteredPokemon}
                    pokemonDataList={pokemonDataList}
                    onSelect={(pokemonSlug: string) => saveEncounter(pokemonSlug)}
                />
            </div>
        </div>
    );
};

export default RunPage;

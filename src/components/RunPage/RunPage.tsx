import EncounterDisplay from "@/components/EncounterDisplay/EncounterDisplay";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import StarterSelect from "@/components/StarterSelect/StarterSelect";
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
    const [encounteredPokemon, setEncounteredPokemon] = useState<PokemonData | null>(null);
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
    const [pokemonDataList, setPokemonDataList] = useState<PokemonData[]>([]);
    const game: Game = SoulSilver;

    const fetchLocationData = () => {
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
    };

    const fetchEncounteredPokemonData = () => {
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
    };

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

    // Get data associated with current location on page load
    useEffect(() => {
        if (props.locationSlug && props.locationSlug.length > 0) {
            fetchLocationData();
        }
    }, [props.locationSlug]);

    // Fetch location's encounter data for encounter display
    useEffect(() => {
        if (props.runName && props.locationSlug) {
            fetchEncounteredPokemonData();
        }
    }, [props.runName, props.locationSlug]);

    return (
        <div className={styles["run-page"]}>
            <SegmentNav segments={game.segments} segmentSlug={props.locationSlug} />
            <div className={styles["run-info"]}>
                {currentLocation ? (
                    <>
                        <h2 className={styles["location-name"]}>{currentLocation.locationName}</h2>
                        {props.locationSlug === game.startingTown ? (
                            <StarterSelect
                                runName={props.runName}
                                starterSlugsList={game.starterSlugs}
                                locationName={game.startingTown}
                            />
                        ) : (
                            ""
                        )}
                        <EncounterTable
                            runName={props.runName}
                            areaSlugList={currentLocation.areaSlugList}
                            starterSlugsList={game.starterSlugs}
                            gameGroup={game.gameGroup}
                            onFetch={(pokemonDataList: PokemonData[]) => setPokemonDataList(pokemonDataList)}
                        />
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

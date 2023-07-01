import EncounterDisplay from "@/components/EncounterDisplay/EncounterDisplay";
import StarterSelect from "@/components/StarterSelect/StarterSelect";
import Game from "@/models/Game";
import LocalPokemon from "@/models/LocalPokemon";
import LocationData from "@/models/LocationData";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import SoulSilver from "@/static/soulsilver";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./RunPage.module.scss";
import EncounterTable from "../EncounterTable/EncounterTable";
import { getRun } from "utils";

type Props = {
    gameName: string;
    runName: string;
    locationName: string;
};

const RunPage: React.FC<Props> = (props) => {
    const [missedEncounter, setMissedEncounter] = useState<boolean>(false);
    const [encounteredPokemon, setEncounteredPokemon] =
        useState<PokemonData | null>(null);
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(
        null
    );
    const game: Game = SoulSilver;

    const fetchLocationData = () => {
        axios
            .get("/api/location", {
                params: {
                    locationName: props.locationName,
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
        run.encounters.forEach((encounter: LocalPokemon) => {
            if (encounter.locationName === props.locationName) {
                setMissedEncounter(encounter.status === "missed");
                axios
                    .get("/api/pokemon", {
                        params: {
                            name: encounter.pokemonName,
                        },
                    })
                    .then((res) =>
                        setEncounteredPokemon(JSON.parse(res.data.pokemon))
                    )
                    .catch((error) => {
                        console.log(error);
                    });
                return;
            }
        });
    };

    // Get data associated with current location on page load
    useEffect(() => {
        if (props.locationName && props.locationName.length > 0) {
            fetchLocationData();
        }
    }, [props.locationName]);

    // Fetch location's encounter data for encounter display
    useEffect(() => {
        if (props.runName && props.locationName) {
            fetchEncounteredPokemonData();
        }
    }, [props.runName, props.locationName]);

    return (
        <div className={styles["run-page"]}>
            <div className={styles["run-info"]}>
                {currentLocation ? (
                    <>
                        <h2 className={styles["location-name"]}>
                            {currentLocation.locationName}
                        </h2>
                        {props.locationName === game.startingTown ? (
                            <StarterSelect
                                runName={props.runName}
                                startersList={game.starters}
                                locationName={game.startingTown}
                            />
                        ) : (
                            ""
                        )}
                        <EncounterTable
                            runName={props.runName}
                            areaNames={currentLocation.areaNames}
                        />
                    </>
                ) : (
                    ""
                )}
            </div>
            <div className={styles["sticky-info"]}>
                <EncounterDisplay
                    encounteredPokemon={encounteredPokemon}
                    missedEncounter={missedEncounter}
                />
            </div>
        </div>
    );
};

export default RunPage;

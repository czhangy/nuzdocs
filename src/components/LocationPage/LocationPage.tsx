import styles from "./LocationPage.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import LocationData from "@/models/LocationData";
import { fetchLocation } from "@/utils/api";
import games from "@/static/games";
import StarterSelect from "@/components/StarterSelect/StarterSelect";
import EncounterList from "@/components/EncounterList/EncounterList";
import EncounterDisplay from "@/components/EncounterDisplay/EncounterDisplay";

type Props = {
    gameSlug: string;
    runName: string;
    segmentSlug: string;
};

const LocationPage: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

    // Get data associated with current location on page load
    useEffect(() => {
        if (props.segmentSlug) {
            fetchLocation(props.segmentSlug).then((location) => setCurrentLocation(location));
        }
    }, [props.segmentSlug]);

    return (
        <div className={styles["location-page"]}>
            {currentLocation ? (
                <div className={styles.info}>
                    {props.segmentSlug === games[props.gameSlug].gameGroup.startingTownSlug ? (
                        <section className={styles.section}>
                            <StarterSelect
                                runName={props.runName}
                                starterSlugsList={games[props.gameSlug].gameGroup.starterSlugs}
                                gameGroup={games[props.gameSlug].gameGroup}
                            />
                        </section>
                    ) : (
                        ""
                    )}
                    <section className={styles.section}>
                        {currentLocation ? (
                            <EncounterList
                                currentLocation={currentLocation}
                                gameSlug={props.gameSlug}
                                segmentSlug={props.segmentSlug}
                            />
                        ) : (
                            ""
                        )}
                    </section>
                </div>
            ) : (
                ""
            )}
            <EncounterDisplay
                pokedex={games[props.gameSlug].gameGroup.pokedex}
                runName={props.runName}
                locationSlug={props.segmentSlug}
            />
        </div>
    );
};

export default LocationPage;

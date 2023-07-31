import EncounterDisplay from "@/components/EncounterDisplay/EncounterDisplay";
import EncounterList from "@/components/EncounterList/EncounterList";
import SegmentNav from "@/components/SegmentNav/SegmentNav";
import StarterSelect from "@/components/StarterSelect/StarterSelect";
import LocationData from "@/models/LocationData";
import games from "@/static/games";
import { fetchLocation } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./SegmentPage.module.scss";
import { getRun } from "@/utils/utils";
import Run from "@/models/Run";

type Props = {
    gameSlug: string;
    runName: string;
    segmentSlug: string;
};

const SegmentPage: React.FC<Props> = (props) => {
    // States to track location areas
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

    // Get data associated with current location on page load
    useEffect(() => {
        if (props.segmentSlug) {
            fetchLocation(props.segmentSlug).then((location) => setCurrentLocation(location));
        }
    }, [props.segmentSlug]);

    useEffect(() => {
        const run: Run = getRun(props.runName);
        run.prevLocationSlug = props.segmentSlug;
        localStorage.setItem(props.runName, JSON.stringify(run));
    }, [props.segmentSlug]);

    return (
        <div className={styles["segment-page"]}>
            <SegmentNav segments={games[props.gameSlug].gameGroup.segments} segmentSlug={props.segmentSlug} />
            {currentLocation ? (
                <div className={styles.info}>
                    <h2 className={styles["location-name"]}>{currentLocation.locationName}</h2>
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

export default SegmentPage;

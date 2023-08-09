import EncounterDisplay from "@/components/Location/EncounterDisplay/EncounterDisplay";
import EncounterList from "@/components/Location/EncounterList/EncounterList";
import NextLevelCap from "@/components/Location/NextLevelCap/NextLevelCap";
import StarterSelect from "@/components/Location/StarterSelect/StarterSelect";
import LocationData from "@/models/LocationData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { fetchLocation } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { useEffect, useState } from "react";
import styles from "./LocationPage.module.scss";

type Props = {
    segment: Segment;
    run: Run;
};

const LocationPage: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

    // Get data associated with current location on page load
    useEffect(() => {
        if (props.segment) {
            fetchLocation(props.segment.slug).then((location) => setCurrentLocation(location));
        }
    }, [props.segment]);

    return currentLocation ? (
        <div className={styles["location-page"]}>
            <div className={styles.info}>
                <NextLevelCap run={props.run} />
                {props.segment.slug === getGameGroup(props.run.gameSlug).startingTownSlug ? (
                    <section className={styles.section}>
                        <StarterSelect run={props.run} />
                    </section>
                ) : (
                    ""
                )}
                <section className={styles.section}>
                    <EncounterList location={currentLocation} run={props.run} />
                </section>
            </div>
            <EncounterDisplay locationSlug={props.segment.slug} run={props.run} />
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default LocationPage;

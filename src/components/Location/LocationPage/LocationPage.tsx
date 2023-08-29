import EncounterDisplay from "@/components/Location/EncounterDisplay/EncounterDisplay";
import EncounterList from "@/components/Location/EncounterList/EncounterList";
import StarterSelect from "@/components/Location/StarterSelect/StarterSelect";
import Trainers from "@/components/Location/Trainers/Trainers";
import NextLevelCap from "@/components/Segment/NextLevelCap/NextLevelCap";
import LocationData from "@/models/LocationData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { fetchLocation } from "@/utils/api";
import { getGameData } from "@/utils/game";
import { getBattles } from "@/utils/segment";
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
            setCurrentLocation(null);
            fetchLocation(props.segment.slug).then((location) => setCurrentLocation(location));
        }
    }, [props.segment]);

    return currentLocation ? (
        <div className={styles["location-page"]}>
            <div className={styles.info}>
                <NextLevelCap segment={props.segment.slug} run={props.run} />
                {props.segment.slug === getGameData(props.run.gameSlug).startingTownSlug ? (
                    <StarterSelect run={props.run} />
                ) : (
                    ""
                )}
                <EncounterList location={currentLocation} run={props.run} />
                <Trainers battles={getBattles(props.run.gameSlug, props.segment.slug)} run={props.run} />
            </div>
            <EncounterDisplay locationSlug={props.segment.slug} run={props.run} />
        </div>
    ) : (
        <div className={styles.loading}>
            <div className="accent-spinner" />
        </div>
    );
};

export default LocationPage;

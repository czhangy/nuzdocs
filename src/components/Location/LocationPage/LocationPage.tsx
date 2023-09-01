import EncounterDisplay from "@/components/Location/EncounterDisplay/EncounterDisplay";
import EncounterList from "@/components/Location/EncounterList/EncounterList";
import StarterSelect from "@/components/Location/StarterSelect/StarterSelect";
import Trainers from "@/components/Location/Trainers/Trainers";
import NextLevelCap from "@/components/Segment/NextLevelCap/NextLevelCap";
import LocationData from "@/models/LocationData";
import LocationSegment from "@/models/LocationSegment";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { fetchLocation } from "@/utils/api";
import { getGameData, getSegments } from "@/utils/game";
import { useEffect, useState } from "react";
import styles from "./LocationPage.module.scss";

type Props = {
    idx: number;
    run: Run;
};

const LocationPage: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

    // Internal state
    const [segment, setSegment] = useState<Segment | null>(null);

    // Get segment on page load
    useEffect(() => {
        if (props.idx !== undefined && props.run !== undefined) {
            setSegment(getSegments(props.run.gameSlug)[props.idx]);
        }
    }, [props.idx, props.run]);

    // Get data associated with current location on page load
    useEffect(() => {
        if (segment !== null) {
            setCurrentLocation(null);
            if ((segment.segment as LocationSegment).custom !== true) {
                fetchLocation(segment.slug).then((location) => setCurrentLocation(location));
            }
        }
    }, [segment]);

    return segment && (currentLocation || (segment.segment as LocationSegment).custom) ? (
        <div className={styles["location-page"]}>
            <div className={styles.info}>
                <NextLevelCap segment={segment.slug} run={props.run} />
                {segment.slug === getGameData(props.run.gameSlug).startingTownSlug ? (
                    <StarterSelect run={props.run} />
                ) : (
                    ""
                )}
                {currentLocation ? <EncounterList location={currentLocation} run={props.run} /> : ""}
                <Trainers battles={(segment.segment as LocationSegment).battles} run={props.run} />
            </div>
            {currentLocation ? <EncounterDisplay locationSlug={segment.slug} run={props.run} /> : ""}
        </div>
    ) : (
        <div className={styles.loading}>
            <div className="accent-spinner" />
        </div>
    );
};

export default LocationPage;

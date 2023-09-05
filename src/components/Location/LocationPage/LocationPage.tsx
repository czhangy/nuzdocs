import CharacterSelect from "@/components/Location/CharacterSelect/CharacterSelect";
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
import { getNextLevelCap, isCustom } from "@/utils/segment";
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
            setSegment(getSegments(props.run)[props.idx]);
        }
    }, [props.idx, props.run]);

    // Get data associated with current location on page load
    useEffect(() => {
        if (segment !== null) {
            setCurrentLocation(null);
            if (!isCustom(segment)) {
                fetchLocation(segment.slug).then((location) => setCurrentLocation(location));
            }
        }
    }, [segment]);

    return segment !== null && (currentLocation !== null || isCustom(segment)) ? (
        <div className={styles["location-page"]}>
            <div className={styles.info}>
                {props.run.options.caps ? (
                    <NextLevelCap segment={segment.slug} run={props.run} level={getNextLevelCap(props.run)} />
                ) : (
                    ""
                )}
                {segment.slug === getGameData(props.run.gameSlug).startingTown &&
                getGameData(props.run.gameSlug).characters.length > 1 ? (
                    <CharacterSelect run={props.run} />
                ) : (
                    ""
                )}
                {segment.slug === getGameData(props.run.gameSlug).startingTown ? <StarterSelect run={props.run} /> : ""}
                {currentLocation !== null ? <EncounterList location={currentLocation} run={props.run} /> : ""}
                <Trainers battles={(segment.segment as LocationSegment).battles} run={props.run} />
            </div>
            {currentLocation !== null ? <EncounterDisplay location={segment} run={props.run} /> : ""}
        </div>
    ) : (
        <div className={styles.loading}>
            <div className="accent-spinner" />
        </div>
    );
};

export default LocationPage;

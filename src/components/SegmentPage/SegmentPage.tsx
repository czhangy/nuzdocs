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
import Segment from "@/models/Segment";
import LocationPage from "@/components/LocationPage/LocationPage";

type Props = {
    gameSlug: string;
    runName: string;
    segmentSlug: string;
};

const SegmentPage: React.FC<Props> = (props) => {
    // Get the name of the current segment
    const getSegmentName = (): string => {
        return games[props.gameSlug].gameGroup.segments.find(
            (segment: Segment) => segment.segment.slug === (props.segmentSlug as string)
        )!.segment.name;
    };
    // Get the segment type for conditional rendering
    const getSegmentType = (): string => {
        return games[props.gameSlug].gameGroup.segments.find(
            (segment: Segment) => segment.segment.slug === (props.segmentSlug as string)
        )!.type;
    };

    useEffect(() => {
        const run: Run = getRun(props.runName);
        run.prevLocationSlug = props.segmentSlug;
        localStorage.setItem(props.runName, JSON.stringify(run));
    }, [props.segmentSlug]);

    return (
        <div className={styles["segment-page"]}>
            <SegmentNav
                segments={games[props.gameSlug].gameGroup.segments}
                segmentSlug={props.segmentSlug}
                runName={props.runName}
            />
            <LocationPage gameSlug={props.gameSlug} runName={props.runName} segmentSlug={props.segmentSlug} />
        </div>
    );
};

export default SegmentPage;

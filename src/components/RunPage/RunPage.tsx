import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./RunPage.module.scss";

import LocationData from "@/models/LocationData";
import Game from "@/models/Game";

import SoulSilver from "@/static/soulsilver";

import StarterSelect from "@/components/StarterSelect/StarterSelect";

type Props = {
    gameName: string;
    runName: string;
    locationName: string;
};

const RunPage: React.FC<Props> = (props) => {
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const game: Game = SoulSilver;

    const fetchLocationData = () => {
        axios
            .get("/api/location", {
                params: {
                    location: props.locationName,
                },
            })
            .then((res) => {
                const locationData = res.data;
                setLocationData(JSON.parse(locationData.location));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (props.locationName && props.locationName.length > 0) {
            fetchLocationData();
        }
    }, [props.locationName]);

    return (
        <div className={styles["run-page"]}>
            {locationData ? (
                <>
                    <h2 className={styles["location-name"]}>
                        {locationData.name}
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
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default RunPage;

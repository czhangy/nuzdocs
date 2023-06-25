import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./RunPage.module.scss";

import FetchedLocation from "@/models/FetchedLocation";
import Game from "@/models/Game";

import SoulSilver from "@/static/soulsilver";

import StarterSelect from "@/components/StarterSelect/StarterSelect";

type Props = {
    game: string;
    run: string;
    location: string;
};

const RunPage: React.FC<Props> = (props) => {
    const [locationData, setLocationData] = useState<FetchedLocation | null>(
        null
    );
    const game: Game = SoulSilver;

    const fetchLocationData = () => {
        axios
            .get("/api/location", {
                params: {
                    location: props.location,
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
        if (props.location && props.location.length > 0) {
            fetchLocationData();
        }
    }, [props.location]);

    return (
        <div className={styles["run-page"]}>
            {locationData ? (
                <>
                    <h2 className={styles["location-name"]}>
                        {locationData.name}
                    </h2>
                    <StarterSelect starters={game.starters} />
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default RunPage;

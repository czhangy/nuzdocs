import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./RunPage.module.scss";

import Encounter from "@/models/Encounter";
import Game from "@/models/Game";

import SoulSilver from "@/static/soulsilver";

type LocationData = {
    name: string;
    encounter: Encounter;
};

type LocationName = {
    language: {
        name: string;
        url: string;
    };
    name: string;
};

type Props = {
    game: string;
    locationIdx: number;
    onNav: (idx: number) => void;
};

const RunPage: React.FC<Props> = (props) => {
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const game: Game = SoulSilver;

    const getEnglishLocationName: (names: LocationName[]) => string = (
        names: LocationName[]
    ) => {
        const nameObj: LocationName = names.find(
            (name) => name.language.name === "en"
        )!;
        return nameObj.name;
    };

    const fetchLocationData = () => {
        axios
            .get("/api/location", {
                params: {
                    location: game.locations[props.locationIdx].slug,
                },
            })
            .then((res) => {
                const fetchedLocationObj = JSON.parse(res.data.location);
                let locationData: LocationData = {
                    name: getEnglishLocationName(fetchedLocationObj.names),
                    encounter: {
                        pokemon: null,
                        status: "none",
                    },
                };
                console.log(locationData);
                setLocationData(locationData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(fetchLocationData, []);

    return (
        <div className={styles["run-page"]}>
            {locationData ? (
                <>
                    <h2 className={styles["location-name"]}>
                        {locationData.name}
                    </h2>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default RunPage;

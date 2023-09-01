import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { fetchPokemon } from "@/utils/api";
import { getLocationEncounter, getStatus } from "@/utils/run";
import { isCustom } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./LocationOverview.module.scss";

type Props = {
    location: Segment;
    run: Run;
    idx: number;
};

const LocationOverview: React.FC<Props> = (props: Props) => {
    // Fetched state
    const [encounter, setEncounter] = useState<PokemonData | null>(null);

    // Internal state
    const [status, setStatus] = useState<string>("None");

    // Get encounter for location on component load
    useEffect(() => {
        if (props.location && props.run) {
            if (!isCustom(props.location)) {
                const status: string = getStatus(props.run.id, props.location.slug);
                if (status === "Caught") {
                    fetchPokemon(
                        getLocationEncounter(props.run.id, props.location.slug).pastSlugs[0],
                        props.run.gameSlug
                    ).then((pokemonData: PokemonData) => setEncounter(pokemonData));
                } else {
                    setStatus(status);
                }
            }
        }
    }, [props.location, props.run]);

    return (
        <Link href={`/runs/${props.run.id}/${props.idx}`}>
            <a className={styles["location-overview"]}>
                <p className={styles.location}>{props.location.name}</p>
                {!isCustom(props.location) ? (
                    <div className={styles.encounter}>
                        <p className={styles.title}>Encounter</p>
                        {encounter ? (
                            <div className={styles.sprite}>
                                <Image
                                    src={encounter.sprite}
                                    alt={encounter.pokemon.name}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        ) : (
                            <p className={styles.status}>{status}</p>
                        )}
                    </div>
                ) : (
                    ""
                )}
            </a>
        </Link>
    );
};

export default LocationOverview;

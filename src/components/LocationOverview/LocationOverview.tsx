import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { fetchPokemon } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { getLocationEncounter, getRun } from "@/utils/run";
import { getSegment } from "@/utils/segment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./LocationOverview.module.scss";

type Props = {
    locationSlug: string;
    runName: string;
};

const LocationOverview: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [encounter, setEncounter] = useState<PokemonData | null>(null);
    const [encounterText, setEncounterText] = useState<string>("None");

    // Get encounter for location on component load
    useEffect(() => {
        const pokemon: CaughtPokemon | null = getLocationEncounter(props.runName, props.locationSlug);
        if (pokemon) {
            if (pokemon.pastSlugs[0] === "failed") {
                setEncounterText("Failed");
            } else {
                fetchPokemon(pokemon.pastSlugs[0], getGameGroup(getRun(props.runName).gameSlug)).then(
                    (pokemonData: PokemonData) => setEncounter(pokemonData)
                );
            }
        }
    }, []);

    return (
        <Link href={`/runs/${props.runName}/${props.locationSlug}`}>
            <a className={styles["location-overview"]}>
                <p className={`${styles.location} ${encounter || encounterText !== "None" ? styles.done : ""}`}>
                    {getSegment(getRun(props.runName).gameSlug, props.locationSlug).name}
                </p>
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
                        <p className={`${styles.text} ${encounterText === "Failed" ? styles.failed : ""}`}>
                            {encounterText}
                        </p>
                    )}
                </div>
            </a>
        </Link>
    );
};

export default LocationOverview;

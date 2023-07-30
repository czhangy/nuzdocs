import LocalPokemon from "@/models/LocalPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { fetchPokemonGroup } from "@/utils/api";
import { getRun } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./StarterSelect.module.scss";

type Props = {
    runName: string;
    starterSlugsList: string[];
    locationName: string;
};

const StarterSelect: React.FC<Props> = (props: Props) => {
    const [starters, setStarters] = useState<PokemonData[]>([]);
    const [selectedStarterSlug, setSelectedStarterSlug] = useState<string>("");

    // Persist selected starter on page load or initialize starter for fresh runs
    useEffect(() => {
        const run: Run = getRun(props.runName);
        if (run.starterSlug === "") {
            setSelectedStarterSlug(props.starterSlugsList[0]);
        } else {
            setSelectedStarterSlug(run.starterSlug);
        }
    }, []);

    // Fetch starter data
    useEffect(() => {
        fetchPokemonGroup(props.starterSlugsList).then((pokemon) => setStarters(pokemon));
    }, [props.starterSlugsList]);

    // Place starter in box and remove existing starter on starter change + set run's starter
    useEffect(() => {
        if (selectedStarterSlug.length > 0) {
            const run: Run = getRun(props.runName);
            run.starterSlug = selectedStarterSlug;
            for (let i = 0; i < run.encounterList.length; i++) {
                if (run.encounterList[i].locationSlug === "starter") {
                    run.encounterList.splice(i, 1);
                    break;
                }
            }
            const starter: LocalPokemon = {
                pokemonSlug: selectedStarterSlug,
                locationSlug: "starter",
            };
            run.encounterList.push(starter);
            run.caughtPokemonSlugsList.push(selectedStarterSlug);

            localStorage.setItem(props.runName, JSON.stringify(run));
        }
    }, [selectedStarterSlug]);

    return (
        <div className={styles["starter-select"]}>
            <h3 className={styles.header}>Starter:</h3>
            <ul className={styles.starters}>
                {starters.map((starter: PokemonData, key: number) => {
                    return (
                        <li
                            className={`${styles.starter} ${
                                selectedStarterSlug === props.starterSlugsList[key] ? styles.selected : ""
                            }`}
                            key={key}
                        >
                            <button
                                className={styles.button}
                                onClick={() => setSelectedStarterSlug(props.starterSlugsList[key])}
                            >
                                <div className={styles.sprite}>
                                    <Image
                                        src={starter.sprite}
                                        alt={starter.pokemon.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default StarterSelect;

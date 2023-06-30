import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./StarterSelect.module.scss";
import LocalPokemon from "@/models/LocalPokemon";

type Props = {
    runName: string;
    startersList: string[];
    locationName: string;
};

const StarterSelect: React.FC<Props> = (props: Props) => {
    const [starters, setStarters] = useState<PokemonData[]>([]);
    const [selectedStarter, setSelectedStarter] = useState<string>("");

    // Persist selected starter on page load or initialize starter for fresh runs
    useEffect(() => {
        const run: Run = JSON.parse(
            localStorage.getItem(props.runName) as string
        );
        if (run.starterName === "") {
            setSelectedStarter(props.startersList[0]);
        } else {
            setSelectedStarter(run.starterName);
        }
    }, []);

    // Fetch starter data
    useEffect(() => {
        axios
            .get("/api/pokemon", {
                params: {
                    name: props.startersList,
                },
            })
            .then((res) => setStarters(JSON.parse(res.data.pokemon)))
            .catch((error) => {
                console.log(error);
            });
    }, [props.startersList]);

    // Place starter in box and remove existing starter on starter change + set run's starter
    useEffect(() => {
        if (selectedStarter.length > 0) {
            const run: Run = JSON.parse(
                localStorage.getItem(props.runName) as string
            );
            run.starterName = selectedStarter;

            for (let i = 0; i < run.encounters.length; i++) {
                if (run.encounters[i].locationName === "starter") {
                    run.encounters.splice(i, 1);
                    break;
                }
            }
            const starter: LocalPokemon = {
                pokemonName: selectedStarter,
                status: "caught",
                locationName: "starter",
            };
            run.encounters.push(starter);

            localStorage.setItem(props.runName, JSON.stringify(run));
        }
    }, [selectedStarter]);

    return (
        <div className={styles["starter-select"]}>
            <h3 className={styles.header}>Starter:</h3>
            <ul className={styles["starter-list"]}>
                {starters.map((starter: PokemonData, key: number) => {
                    return (
                        <li
                            className={`${styles.starter} ${
                                selectedStarter === starter.name
                                    ? styles.selected
                                    : ""
                            }`}
                            key={key}
                        >
                            <button
                                className={styles["select-button"]}
                                onClick={() => setSelectedStarter(starter.name)}
                            >
                                <div className={styles.sprite}>
                                    <Image
                                        src={starter.sprite}
                                        alt={starter.name}
                                        layout="fill"
                                        objectFit="contain"
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

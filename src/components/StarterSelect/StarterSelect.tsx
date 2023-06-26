import LocalEncounter from "@/models/LocalEncounter";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import typeColors from "@/static/type-colors";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatName } from "utils";
import styles from "./StarterSelect.module.scss";

type Props = {
    runName: string;
    startersList: string[];
    locationName: string;
};

const StarterSelect: React.FC<Props> = (props: Props) => {
    const [starters, setStarters] = useState<PokemonData[]>([]);
    const [selectedStarter, setSelectedStarter] = useState<string>("");

    const disableButtons = () => {
        (
            document.querySelector("#confirm-button") as HTMLButtonElement
        ).disabled = true;
        Array.from(
            document.getElementsByClassName(
                styles.starter
            ) as HTMLCollectionOf<HTMLLIElement>
        ).forEach((el: HTMLLIElement) => {
            el.style.pointerEvents = "none";
        });
    };

    const handleStarterSelect = (pokemonName: string) => {
        setSelectedStarter(pokemonName);
    };

    const handleStarterConfirm = () => {
        disableButtons();

        let run: Run = JSON.parse(
            localStorage.getItem(props.runName) as string
        );
        run.starterName = selectedStarter;

        const encounter: LocalEncounter = {
            pokemonName: selectedStarter,
            status: "caught",
            locationName: props.locationName,
        };
        run.box.push(encounter);

        localStorage.setItem(props.runName, JSON.stringify(run));
    };

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

    // Disable starters => must wait for starter lis to render
    useEffect(() => {
        const run: Run = JSON.parse(
            localStorage.getItem(props.runName) as string
        );
        if (run.starterName !== "") {
            disableButtons();
        }
    }, [starters]);

    return (
        <div className={styles["starter-select"]}>
            <div className={styles.header}>
                <h3 className={styles["header-text"]}>Select your starter:</h3>
                <button
                    id="confirm-button"
                    className={styles["confirm-button"]}
                    onClick={handleStarterConfirm}
                >
                    <div className={styles["confirm-icon"]}>
                        <Image
                            src="/assets/icons/check.svg"
                            alt="Confirm"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </button>
            </div>
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
                            style={{
                                background:
                                    typeColors[
                                        starter
                                            .types[0] as keyof typeof typeColors
                                    ],
                            }}
                        >
                            <button
                                className={styles["select-button"]}
                                onClick={() =>
                                    handleStarterSelect(starter.name)
                                }
                            >
                                <div className={styles.sprite}>
                                    <Image
                                        src={starter.sprite}
                                        alt={starter.name}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                <p className={styles.name}>
                                    {formatName(starter.name)}
                                </p>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default StarterSelect;

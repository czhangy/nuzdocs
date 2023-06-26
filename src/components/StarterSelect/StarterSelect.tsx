import PokemonData from "@/models/PokemonData";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatName } from "utils";
import styles from "./StarterSelect.module.scss";
import typeColors from "@/static/type-colors";

type Props = {
    startersList: string[];
};

const StarterSelect: React.FC<Props> = (props: Props) => {
    const [starters, setStarters] = useState<PokemonData[]>([]);

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

    return (
        <div className={styles["starter-select"]}>
            <h3 className={styles.header}>Select your starter:</h3>
            <ul className={styles["starter-list"]}>
                {starters.map((starter: PokemonData, key: number) => {
                    return (
                        <li
                            className={styles.starter}
                            key={key}
                            style={{
                                background:
                                    typeColors[
                                        starter
                                            .types[0] as keyof typeof typeColors
                                    ],
                            }}
                        >
                            <button className={styles["select-button"]}>
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

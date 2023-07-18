import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import PokemonData from "@/models/PokemonData";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPokemonTier } from "utils";
import styles from "./EncounterTable.module.scss";

type Props = {
    runName: string;
    currentArea: AreaData | null;
    starterSlugsList: string[];
    gameGroup: string;
    onFetch: (pokemonDataList: PokemonData[]) => void;
};

const EncounterTable: React.FC<Props> = (props: Props) => {
    const [pokemonDataList, setPokemonDataList] = useState<PokemonData[]>([]);

    // Formats the level range of an encounter
    const generateLevelRange = (encounter: EncounterData) => {
        if (encounter.minLevel === encounter.maxLevel) {
            return encounter.minLevel;
        } else {
            return `${encounter.minLevel} - ${encounter.maxLevel}`;
        }
    };

    // API call to fetch Pokemon names and sprites
    const fetchPokemonData = async () => {
        props.currentArea!.encounters = props.currentArea!.encounters.filter(
            (encounter: EncounterData) => !props.starterSlugsList.includes(encounter.pokemonSlug)
        );
        const pokemonSlugList: string[] = props.currentArea!.encounters.map(
            (encounter: EncounterData) => encounter.pokemonSlug
        );
        axios
            .get("/api/pokemon", {
                params: {
                    pokemonSlugList: pokemonSlugList,
                },
            })
            .then((res) => {
                const pokemonDataList: PokemonData[] = JSON.parse(res.data.pokemon);
                setPokemonDataList(pokemonDataList);
                props.onFetch(pokemonDataList);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    // Fetch Pokemon names/sprites when area is changed
    useEffect(() => {
        if (props.currentArea) {
            fetchPokemonData();
        }
    }, [props.currentArea]);

    return (
        <div className={styles["encounter-table"]}>
            {props.currentArea && pokemonDataList.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles["table-header"]}>Pokémon</th>
                            <th className={styles["table-header"]}>Method</th>
                            <th className={styles["table-header"]}>Chance</th>
                            <th className={styles["table-header"]}>Level</th>
                            <th className={styles["table-header"]}>Tier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.currentArea.encounters.map((encounter: EncounterData, key: number) => {
                            {
                                return pokemonDataList[key] ? (
                                    <tr className={styles.row} key={key}>
                                        <td className={styles["table-element"]}>
                                            <div className={styles.pokemon}>
                                                <div className={styles.sprite}>
                                                    <Image
                                                        src={pokemonDataList[key].sprite}
                                                        alt={pokemonDataList[key].pokemonName}
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>
                                                {pokemonDataList[key].pokemonName}
                                            </div>
                                        </td>
                                        <td className={styles["table-element"]}>{encounter.method}</td>
                                        <td className={styles["table-element"]}>{encounter.chance}%</td>
                                        <td className={styles["table-element"]}>{generateLevelRange(encounter)}</td>
                                        <td className={styles["table-element"]}>
                                            {getPokemonTier(encounter.pokemonSlug, props.gameGroup)}
                                        </td>
                                    </tr>
                                ) : (
                                    ""
                                );
                            }
                        })}
                    </tbody>
                </table>
            ) : (
                ""
            )}
        </div>
    );
};

export default EncounterTable;

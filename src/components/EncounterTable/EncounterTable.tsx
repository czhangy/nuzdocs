import Dropdown from "@/components/Dropdown/Dropdown";
import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import PokemonData from "@/models/PokemonData";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPokemonTier, getRun } from "utils";
import styles from "./EncounterTable.module.scss";

type Props = {
    runName: string;
    areaSlugList: string[];
    starterSlugsList: string[];
    gameGroup: string;
};

const EncounterTable: React.FC<Props> = (props: Props) => {
    const [areaList, setAreaList] = useState<AreaData[]>([]);
    const [currentArea, setCurrentArea] = useState<AreaData | null>(null);
    const [pokemonDataList, setPokemonDataList] = useState<PokemonData[]>([]);

    const generateLevelRange = (encounter: EncounterData) => {
        if (encounter.minLevel === encounter.maxLevel) {
            return encounter.minLevel;
        } else {
            return `${encounter.minLevel} - ${encounter.maxLevel}`;
        }
    };

    const handleAreaSelect = (areaName: string) => {
        const area: AreaData = areaList.filter((area: AreaData) => area.areaName === areaName)[0];
        setCurrentArea(area);
    };

    const fetchPokemonData = async () => {
        currentArea!.encounters = currentArea!.encounters.filter(
            (encounter: EncounterData) => !props.starterSlugsList.includes(encounter.pokemonSlug)
        );
        const pokemonSlugList: string[] = currentArea!.encounters.map(
            (encounter: EncounterData) => encounter.pokemonSlug
        );
        axios
            .get("/api/pokemon", {
                params: {
                    pokemonSlugList: pokemonSlugList,
                },
            })
            .then((res) => {
                const pokemonData = res.data.pokemon;
                setPokemonDataList(JSON.parse(pokemonData));
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    // Fetch areas in location
    useEffect(() => {
        if (props.areaSlugList) {
            axios
                .get("/api/location", {
                    params: {
                        areaSlugList: props.areaSlugList,
                        gameSlug: getRun(props.runName).gameSlug,
                    },
                })
                .then((res) => {
                    const areaList = res.data;
                    setAreaList(JSON.parse(areaList.areaList));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.areaSlugList]);

    // Fetch Pokemon info when area is selected
    useEffect(() => {
        if (currentArea) {
            fetchPokemonData();
        }
    }, [currentArea]);

    return (
        <div className={styles["encounter-table"]}>
            <h3 className={styles.header}>Encounters:</h3>
            <Dropdown
                placeholder="Select a zone..."
                options={areaList.map((area: AreaData) => area.areaName).sort()}
                onSelect={(areaName: string) => handleAreaSelect(areaName)}
            />
            {pokemonDataList.length > 0 ? (
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
                        {currentArea!.encounters.map((encounter: EncounterData, key: number) => {
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

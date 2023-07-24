import AreaData from "@/models/AreaData";
import EncounterData from "@/models/EncounterData";
import PokemonData from "@/models/PokemonData";
import Image from "next/image";
import { getPokemonTier } from "utils";
import styles from "./EncounterTable.module.scss";

type Props = {
    uniquePokemonDataList: PokemonData[];
    currentArea: AreaData | null;
    gameGroup: string;
};

const EncounterTable: React.FC<Props> = (props: Props) => {
    // Formats the level range of an encounter
    const generateLevelRange = (encounter: EncounterData) => {
        if (encounter.minLevel === encounter.maxLevel) {
            return encounter.minLevel;
        } else {
            return `${encounter.minLevel} - ${encounter.maxLevel}`;
        }
    };

    return (
        <div className={styles["encounter-table"]}>
            {props.uniquePokemonDataList && props.currentArea && props.currentArea!.encounters.length > 0 ? (
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
                                const pokemonData: PokemonData | undefined = props.uniquePokemonDataList.find(
                                    (pokemon: PokemonData) => {
                                        return pokemon.pokemon.slug === encounter.pokemonSlug;
                                    }
                                );
                                return pokemonData ? (
                                    <tr className={styles.row} key={key}>
                                        <td className={styles["table-element"]}>
                                            <div className={styles.pokemon}>
                                                <div className={styles.sprite}>
                                                    <Image
                                                        src={pokemonData.sprite}
                                                        alt={pokemonData.pokemon.name}
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>
                                                {pokemonData.pokemon.name}
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

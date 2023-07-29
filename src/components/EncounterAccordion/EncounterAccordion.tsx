import EncounterData from "@/models/EncounterData";
import PokemonData from "@/models/PokemonData";
import colors from "@/static/colors";
import { getPokemonTier } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EncounterAccordion.module.scss";
import { fetchPokemonGroup } from "@/utils/api";

type Props = {
    method: string;
    encounters: EncounterData[];
    versionGroup: string;
};

const EncounterAccordion: React.FC<Props> = (props: Props) => {
    // Display state
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Data state
    const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

    // Formats the level range of an encounter
    const getLevelRange = (encounter: EncounterData) => {
        if (encounter.minLevel === encounter.maxLevel) {
            return encounter.minLevel;
        } else {
            return `${encounter.minLevel} - ${encounter.maxLevel}`;
        }
    };

    // Gets the tier of the Pokemon when new Pokemon data is given
    useEffect(() => {
        if (props.encounters) {
            fetchPokemonGroup(props.encounters.map((encounter: EncounterData) => encounter.pokemonSlug)).then(
                (pokemon) => setPokemonData(pokemon)
            );
        }
    }, [props.encounters]);

    return (
        <div className={styles["encounter-accordion"]}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <h3 className={styles.method}>{props.method}</h3>
                {/* <div className={styles.sprite}>
                    <Image
                        src={props.pokemonData.sprite}
                        alt={props.pokemonData.pokemon.name}
                        layout="fill"
                        objectFit="contain"
                    />
                </div> */}
                {/* <div className={styles.info}>
                    <div className={`${styles.row} ${styles["top-row"]}`}>
                        <p className={styles.name}>{props.pokemonData.pokemon.name}</p>
                        <div className={styles.tier} style={{ backgroundColor: colors.tiers[tier] }}>
                            {tier}
                        </div>
                    </div>
                    <div className={styles.row}>
                        {props.pokemonData.types.map((type: string, key: number) => {
                            return (
                                <div className={styles.type} key={key}>
                                    <Image
                                        src={`https://www.serebii.net/pokedex-bw/type/${type}.gif`}
                                        alt={type}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div> */}
                <div className={`${styles.arrow} ${isOpen ? styles.reversed : ""}`}>
                    <Image
                        src="/assets/icons/arrow.svg"
                        alt={isOpen ? "Close accordion" : "Open accordion"}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </button>
            <table className={`${styles.body} ${isOpen ? "" : styles.hidden}`} cellSpacing="0">
                <thead>
                    <tr className={styles.row}>
                        <th className={styles["column-name"]}>Pokémon</th>
                        <th className={styles["column-name"]}>Chance</th>
                        <th className={styles["column-name"]}>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemonData.map((pokemon: PokemonData, key: number) => {
                        {
                            return (
                                <tr className={styles.row} key={key}>
                                    <td className={styles["table-element"]}>{pokemon.pokemon.name}</td>
                                    <td className={styles["table-element"]}>{props.encounters[key].chance}%</td>
                                    <td className={styles["table-element"]}>{getLevelRange(props.encounters[key])}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EncounterAccordion;

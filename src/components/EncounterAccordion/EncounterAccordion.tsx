import TierCard from "@/components/Global/TierCard/TierCard";
import EncounterData from "@/models/EncounterData";
import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { getRun } from "@/utils/run";
import { getPokemonTier } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EncounterAccordion.module.scss";

type Props = {
    method: string;
    encounters: EncounterData[];
    runName: string;
};

const EncounterAccordion: React.FC<Props> = (props: Props) => {
    // Display state
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Data state
    const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

    // Calculates the expanded height of the accordion
    const getExpandedHeight = (): string => {
        return `calc(var(--method-font-size) + 2 * var(--accordion-y-padding) + var(--body-border-size) + var(--category-font-size) + 2 * var(--category-y-padding) + ${props.encounters.length} * (2 * var(--cell-y-padding) + 2 * var(--pokemon-inner-spacing) + var(--sprite-size) + var(--name-font-size) + var(--type-height)) + var(--body-extra-padding))`;
    };

    // Formats the level range of an encounter
    const getLevelRange = (encounter: EncounterData): number | string => {
        if (encounter.minLevel === encounter.maxLevel) {
            return encounter.minLevel;
        } else {
            return `${encounter.minLevel} - ${encounter.maxLevel}`;
        }
    };

    // Gets the tier of the Pokemon when new Pokemon data is given
    useEffect(() => {
        if (props.encounters) {
            setPokemonData([]);
            fetchPokemonGroup(
                props.encounters.map((encounter: EncounterData) => encounter.pokemonSlug),
                getGameGroup(getRun(props.runName).gameSlug)
            ).then((pokemon) => setPokemonData(pokemon));
        }
    }, [props.encounters]);

    return (
        <div className={styles["encounter-accordion"]} style={isOpen ? { maxHeight: getExpandedHeight() } : {}}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <h3 className={styles.method}>{props.method}</h3>
                <div className={`${styles.arrow} ${isOpen ? styles.reversed : ""}`}>
                    <Image
                        src="/assets/icons/arrow.svg"
                        alt={isOpen ? "Close accordion" : "Open accordion"}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </button>
            {props.encounters.length === pokemonData.length ? (
                <table className={styles.body} cellSpacing="0">
                    <thead>
                        <tr className={styles.row}>
                            <th className={`${styles.category} ${styles.left}`}>Pokémon</th>
                            <th className={styles.category}>%</th>
                            <th className={styles.category}>Level</th>
                            <th className={styles.category}>Tier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonData.map((pokemon: PokemonData, key: number) => {
                            {
                                const tier: string = getPokemonTier(
                                    pokemon.pokemon.slug,
                                    getGameGroup(getRun(props.runName).gameSlug).versionGroup
                                );
                                return (
                                    <tr className={styles.row} key={key}>
                                        <td className={styles.cell}>
                                            <div className={styles.pokemon}>
                                                <div className={styles.sprite}>
                                                    <Image
                                                        src={pokemon.sprite}
                                                        alt={pokemon.pokemon.name}
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>
                                                <p className={styles.name}>{pokemon.pokemon.name}</p>

                                                <div className={styles.types}>
                                                    {pokemon.types.map((type: string, key: number) => {
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
                                            </div>
                                        </td>
                                        <td className={styles.cell}>{props.encounters[key].chance}%</td>
                                        <td className={styles.cell}>{getLevelRange(props.encounters[key])}</td>
                                        <td className={styles.cell}>
                                            <TierCard tier={tier} />
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            ) : (
                <p className={styles.loading}>Loading...</p>
            )}
        </div>
    );
};

export default EncounterAccordion;

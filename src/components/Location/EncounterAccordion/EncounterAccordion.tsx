import TierCard from "@/components/Run/TierCard/TierCard";
import EncounterData from "@/models/EncounterData";
import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import { getPokemonTier, getTypeCardSrc } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EncounterAccordion.module.scss";

type Props = {
    method: string;
    encounters: EncounterData[];
    gameSlug: string;
};

const EncounterAccordion: React.FC<Props> = (props: Props) => {
    // Component state
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Fetched data state
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

    // Fetches data of encounters on component load
    useEffect(() => {
        if (props.encounters && props.gameSlug) {
            setPokemonData([]);
            fetchPokemonGroup(
                props.encounters.map((encounter: EncounterData) => encounter.pokemonSlug),
                props.gameSlug
            ).then((pokemon) => setPokemonData(pokemon));
        }
    }, [props.encounters, props.gameSlug]);

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
                        {pokemonData.map((pokemon: PokemonData, idx: number) => {
                            {
                                const tier: string = getPokemonTier(pokemon.pokemon.slug, props.gameSlug);
                                return (
                                    <tr className={styles.row} key={pokemon.pokemon.slug}>
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
                                                    {pokemon.types.map((type: string) => {
                                                        return (
                                                            <div className={styles.type} key={type}>
                                                                <Image
                                                                    src={getTypeCardSrc(type)}
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
                                        <td className={styles.cell}>{props.encounters[idx].chance}%</td>
                                        <td className={styles.cell}>{getLevelRange(props.encounters[idx])}</td>
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
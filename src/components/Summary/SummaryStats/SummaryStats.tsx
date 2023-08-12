import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import styles from "./SummaryStats.module.scss";
import Stat from "@/models/Stat";
import { ChangeEvent, useEffect, useState } from "react";
import Values from "@/models/Values";
import { getNature } from "@/utils/natures";

type Props = {
    pokemon: PokemonData;
    set: CaughtPokemon;
    onIVUpdate: (ivs: Values) => void;
    onEVUpdate: (evs: Values) => void;
};

const SummaryStats: React.FC<Props> = (props: Props) => {
    // Component state
    const [ivs, setIVs] = useState<number[]>([0, 0, 0, 0, 0, 0]);
    const [evs, setEVs] = useState<number[]>([0, 0, 0, 0, 0, 0]);

    // Parse IV inputs
    const handleIVChange = (iv: number, idx: number): void => {
        iv = Math.max(iv, 0);
        iv = Math.min(iv, 31);
        const newIVs: number[] = [...ivs];
        newIVs[idx] = iv;
        setIVs(newIVs);
    };

    // Save IV inputs
    const handleIVSave = (): void => {
        props.onIVUpdate({
            hp: ivs[0],
            atk: ivs[1],
            def: ivs[2],
            spa: ivs[3],
            spd: ivs[4],
            spe: ivs[5],
        });
    };

    // Parse EV inputs
    const handleEVChange = (ev: number, idx: number): void => {
        ev = Math.max(ev, 0);
        ev = Math.min(ev, 252);
        const newEVs: number[] = [...evs];
        newEVs[idx] = ev;
        setEVs(newEVs);
    };

    // Save IV inputs
    const handleEVSave = (): void => {
        props.onEVUpdate({
            hp: evs[0],
            atk: evs[1],
            def: evs[2],
            spa: evs[3],
            spd: evs[4],
            spe: evs[5],
        });
    };

    // Check if beneficial nature
    const isPositiveNature = (idx: number): boolean => {
        return (
            props.set.pokemon.nature !== undefined &&
            props.pokemon.stats[idx].name === getNature(props.set.pokemon.nature).increase
        );
    };

    // Check if harmful nature
    const isNegativeNature = (idx: number): boolean => {
        return (
            props.set.pokemon.nature !== undefined &&
            props.pokemon.stats[idx].name === getNature(props.set.pokemon.nature).decrease
        );
    };

    // Calculate Pokemon's HP
    const getTotalHP = (): number | string => {
        if (props.set.pokemon.level === undefined) {
            return "?";
        } else if (props.set.pokemon.species === "shedinja") {
            return 1;
        } else {
            return (
                Math.floor(
                    0.01 *
                        (2 * props.pokemon.stats[0].base + ivs[0] + Math.floor(0.25 * evs[0])) *
                        props.set.pokemon.level
                ) +
                props.set.pokemon.level +
                10
            );
        }
    };

    // Calculate other stats
    const getTotalStat = (idx: number): number | string => {
        if (props.set.pokemon.level === undefined) {
            return "?";
        } else {
            let stat: number =
                Math.floor(
                    0.01 *
                        (2 * props.pokemon.stats[idx].base + ivs[idx] + Math.floor(0.25 * evs[idx])) *
                        props.set.pokemon.level
                ) + 5;
            if (isPositiveNature(idx)) {
                stat *= 1.1;
            } else if (isNegativeNature(idx)) {
                stat *= 0.9;
            }
            return Math.floor(stat);
        }
    };

    // Compute any class styling for the total stat
    const getTotalClass = (idx: number): string => {
        if (isPositiveNature(idx)) {
            return styles.positive;
        } else if (isNegativeNature(idx)) {
            return styles.negative;
        } else {
            return "";
        }
    };

    // Set IVs and EVs if saved on component load
    useEffect(() => {
        if (props.set) {
            setIVs(Object.values(props.set.pokemon.ivs));
            setEVs(Object.values(props.set.pokemon.evs));
        }
    }, [props.set]);

    return (
        <div className={styles["summary-stats"]}>
            <p className={styles.header}>Stats</p>
            <div className={styles.stats}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.row}>
                            <th />
                            <th className={styles.cell}>Base</th>
                            <th className={styles.cell}>IV</th>
                            <th className={styles.cell}>EV</th>
                            <th className={styles.cell}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.pokemon.stats.map((stat: Stat, idx: number) => {
                            return (
                                <tr className={styles.row} key={stat.name}>
                                    <td className={styles.cell}>
                                        <strong>{stat.name}</strong>
                                    </td>
                                    <td className={styles.cell}>{stat.base}</td>
                                    <td className={styles.cell}>
                                        <input
                                            className={styles.input}
                                            type="number"
                                            value={ivs[idx].toString()}
                                            min={0}
                                            max={31}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleIVChange(parseInt(e.target.value), idx)
                                            }
                                            onBlur={handleIVSave}
                                        />
                                    </td>
                                    <td className={styles.cell}>
                                        <input
                                            className={styles.input}
                                            type="number"
                                            value={evs[idx].toString()}
                                            min={0}
                                            max={252}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleEVChange(parseInt(e.target.value), idx)
                                            }
                                            onBlur={handleEVSave}
                                        />
                                    </td>
                                    <td className={styles.cell}>
                                        <strong className={getTotalClass(idx)}>
                                            {idx === 0 ? getTotalHP() : getTotalStat(idx)}
                                        </strong>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SummaryStats;

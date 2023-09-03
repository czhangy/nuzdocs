import MoveData from "@/models/MoveData";
import PokemonMove from "@/models/PokemonMove";
import { fetchMoves } from "@/utils/api";
import { capitalizeWord, getPreSplitCategories, getTypeCardSrc } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Learnset.module.scss";

type Props = {
    moves: PokemonMove[];
    game: string;
};

const Learnset: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [moves, setMoves] = useState<MoveData[]>([]);

    // Fetch move data on component load
    useEffect(() => {
        if (props.moves) {
            fetchMoves(
                props.moves.map((move: PokemonMove) => move.slug),
                props.game
            ).then((moves: MoveData[]) => setMoves(moves));
        }
    }, [props.moves, props.game]);

    return (
        <div className={styles.learnset}>
            <h2 className={styles.header}>Learnset</h2>
            <div className={styles.moves}>
                {props.moves.length === moves.length ? (
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.row}>
                                <th className={styles.cell}>Level</th>
                                <th className={styles.cell}>Move</th>
                                <th className={styles.cell}>BP</th>
                                <th className={styles.cell}>Class</th>
                                <th className={styles.cell}>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moves.map((move: MoveData, idx: number) => {
                                return (
                                    <tr className={styles.row} key={move.slug}>
                                        <td className={`${styles.cell} ${styles.level}`}>
                                            {props.moves[idx].level > 0 ? props.moves[idx].level : "--"}
                                        </td>
                                        <td className={styles.cell}>{move.name}</td>
                                        <td className={styles.cell}>{move.power > 0 ? move.power : "--"}</td>
                                        <td className={styles.cell}>
                                            <div className={styles.class}>
                                                <Image
                                                    src={`https://www.serebii.net/pokedex-bw/type/${getPreSplitCategories(
                                                        move,
                                                        props.game
                                                    )}.png`}
                                                    alt={capitalizeWord(getPreSplitCategories(move, props.game))}
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </td>
                                        <td className={styles.cell}>
                                            <div className={styles.type}>
                                                <Image
                                                    src={getTypeCardSrc(move.type)}
                                                    alt={capitalizeWord(move.type)}
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className={styles.loading}>
                        <div className="bg-spinner" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Learnset;

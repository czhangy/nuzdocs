import MoveCard from "@/components/Run/MoveCard/MoveCard";
import CaughtPokemon from "@/models/CaughtPokemon";
import MoveData from "@/models/MoveData";
import NamedResource from "@/models/NamedResource";
import { fetchMoves } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./Moveset.module.scss";

type Props = {
    caughtPokemon: CaughtPokemon;
    types: string[];
    game: string;
    onClick: (idx: number) => void;
};

const Moveset: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [moves, setMoves] = useState<MoveData[]>([]);

    // Fetch move data on component load
    useEffect(() => {
        if (props.caughtPokemon) {
            fetchMoves(props.caughtPokemon.pokemon.moves.map((move: NamedResource) => move.slug)).then(
                (moves: MoveData[]) => setMoves(moves)
            );
        }
    }, [props.caughtPokemon]);

    return (
        <div className={styles.moveset}>
            <p className={styles.header}>Moveset</p>
            <div className={styles.moves}>
                {[...Array(4)].map((_, key: number) => {
                    return (
                        <button className={styles.button} onClick={() => props.onClick(key)} key={key}>
                            {key < moves.length ? (
                                <MoveCard
                                    move={moves[key]}
                                    isSTAB={props.types.includes(moves[key].type)}
                                    game={props.game}
                                />
                            ) : (
                                <div className={styles.add}>
                                    <p className={styles.icon}>+</p>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Moveset;

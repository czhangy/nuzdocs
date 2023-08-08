import AddMove from "@/components/AddMove/AddMove";
import MoveCard from "@/components/MoveCard/MoveCard";
import MoveData from "@/models/MoveData";
import { fetchMoves } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./SummaryMoves.module.scss";

type Props = {
    moves: string[];
    types: string[];
    runName: string;
    nickname: string;
};

const SummaryMoves: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [moveData, setMoveData] = useState<MoveData[]>([]);

    // Fetch move data on component load
    useEffect(() => {
        if (props.moves && props.moves.length > 0) {
            fetchMoves(props.moves).then((moves: MoveData[]) => setMoveData(moves));
        }
    }, [props.moves]);

    return (
        <div className={styles["summary-moves"]}>
            <p className={styles.header}>Moveset</p>
            <div className={styles.moves}>
                {[...Array(4)].map((_, key: number) => {
                    if (key < moveData.length) {
                        return (
                            <MoveCard
                                move={moveData[key]}
                                isSTAB={props.types.includes(moveData[key].type)}
                                key={key}
                            />
                        );
                    } else {
                        return <AddMove runName={props.runName} nickname={props.nickname} key={key} />;
                    }
                })}
            </div>
        </div>
    );
};

export default SummaryMoves;

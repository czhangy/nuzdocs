import GameData from "@/models/GameData";
import { getNumAttempts, getNumHOFs, getPB } from "@/utils/career";
import { getGame, getGameData } from "@/utils/game";
import Image from "next/image";
import styles from "./GameHistory.module.scss";

type Props = {
    game: string;
    onReset: () => void;
};

const GameHistory: React.FC<Props> = (props: Props) => {
    // Find the name of the game's PB segment
    const getPBName = (): string => {
        const pb: string = getPB(props.game);
        const data: GameData = getGameData(props.game);
        if (pb === data.splits.at(-1)!.segments.at(-1)!.slug) {
            return "👑";
        }
        for (const split of data.splits) {
            for (const segment of split.segments) {
                if (segment.slug === pb) {
                    return segment.name;
                }
            }
        }
        return "--";
    };

    return (
        <div className={styles["game-history"]}>
            <div className={styles.game}>
                <Image
                    src={getGame(props.game).logo}
                    alt={getGame(props.game).name}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    <p className={styles.label}># HOFs</p>
                    <strong className={styles.count}>{getNumHOFs(props.game)}</strong>
                </div>
                <div className={styles.stat}>
                    <p className={styles.label}># Attempts</p>
                    <strong className={styles.count}>{getNumAttempts(props.game)}</strong>
                </div>
            </div>
            <p className={styles.pb}>
                PB: <strong>{getPBName()}</strong>
            </p>
            <button className="primary-button" onClick={props.onReset}>
                Reset
            </button>
        </div>
    );
};

export default GameHistory;

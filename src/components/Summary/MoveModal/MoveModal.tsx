import MoveData from "@/models/MoveData";
import NamedResource from "@/models/NamedResource";
import PokemonMove from "@/models/PokemonMove";
import { fetchMove } from "@/utils/api";
import { initNamedResource } from "@/utils/initializers";
import { translateSlug } from "@/utils/utils";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./MoveModal.module.scss";

type Props = {
    movepool: PokemonMove[];
    moves: string[];
    move: string | null;
    game: string;
    onConfirm: (move: NamedResource) => void;
    onDelete: () => void;
    onClose: () => void;
};

const MoveModal: React.FC<Props> = (props: Props) => {
    // Component state
    const [searchValue, setSearchValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // Internal state
    const [moveList, setMoveList] = useState<string[]>([]);
    const [matches, setMatches] = useState<string[]>([]);
    const [move, setMove] = useState<string>("");

    // Delay close on blur to allow clicks to register
    const handleBlur = (): void => {
        setTimeout(() => setIsFocused(false), 100);
    };

    // Propagate selection to SummaryPage and close the modal
    const handleConfirm = async (): Promise<void> => {
        props.onClose();
        fetchMove(move, props.game).then((move: MoveData | null) => {
            if (move) {
                props.onConfirm(initNamedResource(move.slug, move.name));
            } else {
                alert("Something went wrong!");
            }
        });
    };

    // Highlight matching substring
    const renderMatch = (name: string) => {
        const idx: number = name.toLowerCase().indexOf(searchValue.toLowerCase());
        return (
            <p>
                {name.substring(0, idx)}
                <span className={styles.highlight}>{name.substring(idx, idx + searchValue.length)}</span>
                {name.substring(idx + searchValue.length, name.length)}
            </p>
        );
    };

    // Get move slugs in sorted order on component load
    useEffect(() => {
        if (props.movepool && props.moves) {
            const moves: string[] = props.movepool
                .map((move: PokemonMove) => move.slug)
                .filter((move: string) => !props.moves.includes(move));
            moves.sort();
            setMoveList(moves);
        }
    }, [props.movepool, props.moves]);

    // Update matches while user is inputting move name
    useEffect(() => {
        setMove("");
        if (searchValue.length > 1 && moveList.length > 0) {
            const newMatches: string[] = [];
            moveList.forEach((move: string) => {
                const moveName: string = translateSlug(move);
                if (moveName.toLowerCase().includes(searchValue.toLowerCase())) {
                    newMatches.push(move);
                }
                if (searchValue === moveName) {
                    setMove(move);
                }
            });
            setMatches(newMatches);
        } else {
            setMatches([]);
        }
    }, [searchValue, moveList]);

    return (
        <div className={styles["move-modal"]}>
            {props.move ? (
                <h2 className={styles.header}>
                    Edit <strong>{props.move}</strong>?
                </h2>
            ) : (
                <h2 className={styles.header}>
                    <strong>Select a move to learn!</strong>
                </h2>
            )}
            <div className={styles.search}>
                <input
                    className={styles.input}
                    value={searchValue}
                    type="text"
                    placeholder="Search for a move..."
                    spellCheck={false}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                />
                <ul className={`${styles.matches} ${!isFocused || matches.length === 0 ? styles.hide : ""}`}>
                    {matches.map((match: string) => {
                        return (
                            <li key={match}>
                                <button className={styles.match} onClick={() => setSearchValue(translateSlug(match))}>
                                    {renderMatch(translateSlug(match))}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={styles.buttons}>
                {props.move ? (
                    <button className="secondary-button" onClick={props.onDelete}>
                        Remove
                    </button>
                ) : (
                    ""
                )}
                <button className="primary-button" disabled={!move} onClick={handleConfirm}>
                    {props.move ? "Replace" : "Learn"}
                </button>
            </div>
        </div>
    );
};

export default MoveModal;

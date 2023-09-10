import Tooltip from "@/components/Run/Tooltip/Tooltip";
import TypeIcon from "@/components/Run/TypeIcon/TypeIcon";
import MoveData from "@/models/MoveData";
import { capitalizeWord, getPreSplitCategories } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";
import styles from "./MoveCard.module.scss";

type Props = {
    move: MoveData;
    isSTAB: boolean;
    game: string;
};

const MoveCard: React.FC<Props> = (props: Props) => {
    // Component state
    const [show, setShow] = useState<boolean>(false);

    // Determines if move should display STAB
    const hasSTABDisplay = (): boolean => {
        if (props.move && props.isSTAB) {
            const invalidSTAB: string[] = [
                "sonic-boom",
                "dragon-rage",
                "night-shade",
                "seismic-toss",
                "counter",
                "mirror-coat",
                "future-sight",
                "doom-desire",
                "bide",
                "beat-up",
            ];
            return props.isSTAB && props.move.category !== "other" && !invalidSTAB.includes(props.move.slug);
        } else {
            return false;
        }
    };

    return (
        <div className={styles["move-card"]} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <div className={styles.row}>
                <TypeIcon type={props.move.type} size={16} />
                <p className={styles.name}>{props.move.name}</p>
            </div>
            <div className={styles.row}>
                <div className={styles.category}>
                    <p className={styles.text}>Class: </p>
                    <div className={styles.icon}>
                        <Image
                            src={`https://www.serebii.net/pokedex-bw/type/${getPreSplitCategories(
                                props.move,
                                props.game
                            )}.png`}
                            alt={capitalizeWord(getPreSplitCategories(props.move, props.game))}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
                {hasSTABDisplay() ? (
                    <div className={styles.bp}>
                        <p className={styles.text}>
                            BP:{" "}
                            <strong className={styles["stab-text"]}>
                                {props.move.power === 0 ? "--" : props.move.power * 1.5}
                            </strong>
                        </p>
                        <div className={`${styles["stab-icon"]} disable-select`}>
                            <Image
                                src="/assets/icons/double-arrow.svg"
                                alt="STAB bonus"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                ) : (
                    <p className={styles.text}>
                        BP: <strong>{props.move.power === 0 ? "--" : props.move.power}</strong>
                    </p>
                )}
                <p className={styles.text}>
                    PP: <strong>{props.move.pp}</strong>
                </p>
            </div>
            <Tooltip desc={props.move.desc} show={show} />
        </div>
    );
};

export default MoveCard;

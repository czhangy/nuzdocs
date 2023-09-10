import LevelCap from "@/components/Battle/LevelCap/LevelCap";
import BattleSegment from "@/models/BattleSegment";
import ItemData from "@/models/ItemData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import Trainer from "@/models/Trainer";
import { fetchItem } from "@/utils/api";
import { getBattle, getLevelCap, getTrainer } from "@/utils/battle";
import { updateNumHOFs } from "@/utils/career";
import { getSegments } from "@/utils/game";
import { addToClearedBattles, isCleared, removeFromClearedBattles } from "@/utils/run";
import { hasLevelCap } from "@/utils/segment";
import { exportPokemonList } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BattlePreview.module.scss";

type Props = {
    segment: Segment;
    names: string[];
    run: Run;
    onUpdate: () => void;
    onFinish: () => void;
};

const BattlePreview: React.FC<Props> = (props: Props) => {
    // Component state
    const [defeated, setDefeated] = useState<boolean>(false);

    // Internal state
    const [trainer, setTrainer] = useState<Trainer | null>();

    // Fetched state
    const [item, setItem] = useState<ItemData | null>(null);

    // Sets component state and updates local storage when defeat is clicked
    const handleDefeat = (): void => {
        setDefeated(true);
        addToClearedBattles(props.run.id, props.segment.slug);
        if (props.segment.slug === getSegments(props.run).at(-1)!.slug) {
            updateNumHOFs(props.run.gameSlug, 1);
            props.onFinish();
        }
        props.onUpdate();
    };

    // Sets component state and updates local storage when undo is clicked
    const handleUndo = (): void => {
        setDefeated(false);
        removeFromClearedBattles(props.run.id, props.segment.slug);
        if (props.segment.slug === getSegments(props.run).at(-1)!.slug) {
            updateNumHOFs(props.run.gameSlug, -1);
        }
        props.onUpdate();
    };

    // Save battle team to clipboard
    const handleExport = (): void => {
        exportPokemonList(
            getBattle(props.run, props.segment.slug).team,
            props.names,
            `${props.run.gameSlug}-${props.segment.slug}`
        );
    };

    // Persist defeated state on component load
    useEffect(() => {
        if (props.segment && props.run) {
            setTrainer(getTrainer(props.run, props.segment.slug));
            setDefeated(isCleared(props.run.id, props.segment.slug));
            if (Object.keys(getBattle(props.run, props.segment.slug).items).length > 0) {
                fetchItem(Object.keys(getBattle(props.run, props.segment.slug).items)[0], props.run.gameSlug).then(
                    (item: ItemData | null) => {
                        setItem(item);
                    }
                );
            }
        }
    }, [props.segment, props.run]);

    return trainer ? (
        <div className={styles["battle-preview"]}>
            <div className={styles.trainer}>
                <div className={`${styles.sprite} ${defeated ? styles.defeated : ""} disable-select`}>
                    <Image src={trainer.sprite} alt={trainer.class} layout="fill" objectFit="contain" />
                </div>
                <div className={styles.preview}>
                    <div className={styles.info}>
                        <p className={styles.name}>{`${trainer.class} ${
                            getBattle(props.run, props.segment.slug).name
                        }`}</p>
                        {getBattle(props.run, props.segment.slug).required ? (
                            <div className={styles.icon} title="This battle is required">
                                <Image src="/assets/icons/star.svg" alt="Required" layout="fill" objectFit="contain" />
                            </div>
                        ) : (
                            ""
                        )}
                        {getBattle(props.run, props.segment.slug).double ? (
                            <div className={styles.icon} title="This is a double battle">
                                <Image
                                    src="/assets/icons/double.svg"
                                    alt="Double battle"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {item ? (
                            <div className={styles.items}>
                                <div className={styles.item}>
                                    <Image src={item.sprite} alt={item.name} layout="fill" objectFit="contain" />
                                </div>
                                <p className={styles.count}>
                                    ×{(props.segment.segment as BattleSegment).battle.items[item.slug]}
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <p className={styles.location}>{getBattle(props.run, props.segment.slug).location}</p>
                    {defeated ? (
                        <div className={styles.buttons}>
                            <button className="primary-button" disabled={true}>
                                Defeated!
                            </button>
                            <button className={`${styles.undo} disable-select`} onClick={handleUndo}>
                                <Image
                                    src="/assets/icons/reset.svg"
                                    alt="Undo defeat"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        </div>
                    ) : (
                        <div className={styles.buttons}>
                            <button
                                className="secondary-button"
                                disabled={props.names.length === 0}
                                onClick={handleExport}
                            >
                                Export
                            </button>
                            <button className="primary-button" onClick={handleDefeat}>
                                Defeat!
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {props.run.options.caps && hasLevelCap(props.segment) ? (
                <LevelCap level={getLevelCap(props.run, props.segment.slug)} />
            ) : (
                ""
            )}
        </div>
    ) : (
        <></>
    );
};

export default BattlePreview;

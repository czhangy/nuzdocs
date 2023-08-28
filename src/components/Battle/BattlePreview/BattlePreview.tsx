import ItemDisplay from "@/components/Battle/ItemDisplay/ItemDisplay";
import LevelCap from "@/components/Battle/LevelCap/LevelCap";
import BattleSegment from "@/models/BattleSegment";
import ItemData from "@/models/ItemData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import Trainer from "@/models/Trainer";
import { fetchItems } from "@/utils/api";
import { getBattle, getLevelCap, getTrainer } from "@/utils/battle";
import { getSegments } from "@/utils/game";
import { addToClearedBattles, getStarterSlug, isCleared, removeFromClearedBattles } from "@/utils/run";
import { hasLevelCap } from "@/utils/segment";
import { exportPokemonList } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BattlePreview.module.scss";

type Props = {
    segment: Segment;
    names: string[];
    run: Run;
    onFinish: () => void;
};

const BattlePreview: React.FC<Props> = (props: Props) => {
    // Component state
    const [defeated, setDefeated] = useState<boolean>(false);

    // Internal state
    const [trainer, setTrainer] = useState<Trainer | null>();

    // Fetched state
    const [items, setItems] = useState<ItemData[]>([]);

    // Sets component state and updates local storage when defeat is clicked
    const handleDefeat = (): void => {
        setDefeated(true);
        addToClearedBattles(props.run.id, props.segment.slug);
        if (props.segment.slug === getSegments(props.run.gameSlug).at(-1)!.slug) {
            props.onFinish();
        }
    };

    // Sets component state and updates local storage when undo is clicked
    const handleUndo = (): void => {
        setDefeated(false);
        removeFromClearedBattles(props.run.id, props.segment.slug);
    };

    // Save battle team to clipboard
    const handleExport = (): void => {
        exportPokemonList(
            getBattle(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id)).team,
            props.names,
            `${props.run.gameSlug}-${props.segment.slug}`
        );
    };

    // Persist defeated state on component load
    useEffect(() => {
        if (props.segment && props.run) {
            setTrainer(getTrainer(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id)));
            setDefeated(isCleared(props.run.id, props.segment.slug));
            fetchItems(
                getBattle(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id)).items,
                props.run.gameSlug
            ).then((items: ItemData[]) => {
                setItems(items);
            });
        }
    }, [props.segment, props.run]);

    return trainer ? (
        <div className={styles["battle-preview"]}>
            <div className={styles.trainer}>
                <div className={`${styles.sprite} ${defeated ? styles.defeated : ""}`}>
                    <Image src={trainer.sprite} alt={trainer.class} layout="fill" objectFit="contain" />
                </div>
                <div className={styles.preview}>
                    <div className={styles.info}>
                        <p className={styles.name}>{`${trainer.class} ${
                            getBattle(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id)).name
                        }`}</p>
                        <div className={styles.items}>
                            {items.map((item: ItemData, key: number) => {
                                return <ItemDisplay item={item} showName={false} key={key} />;
                            })}
                        </div>
                    </div>
                    {defeated ? (
                        <div className={styles.buttons}>
                            <button className="primary-button" disabled={true}>
                                Defeated!
                            </button>
                            <button className={styles.undo} onClick={handleUndo}>
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
            {hasLevelCap(props.segment) ? (
                <LevelCap level={getLevelCap(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id))} />
            ) : (
                ""
            )}
        </div>
    ) : (
        <></>
    );
};

export default BattlePreview;

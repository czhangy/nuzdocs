import ItemDisplay from "@/components/Battle/ItemDisplay/ItemDisplay";
import LevelCap from "@/components/Battle/LevelCap/LevelCap";
import BattleSegment from "@/models/BattleSegment";
import ItemData from "@/models/ItemData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import Trainer from "@/models/Trainer";
import { fetchItems } from "@/utils/api";
import { getBattle } from "@/utils/battle";
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
};

const BattlePreview: React.FC<Props> = (props: Props) => {
    // Component state
    const [defeated, setDefeated] = useState<boolean>(false);

    // Internal state
    const [trainers, setTrainers] = useState<Trainer[]>([]);

    // Fetched state
    const [items, setItems] = useState<ItemData[]>([]);

    // Sets component state and updates local storage when defeat is clicked
    const handleDefeat = (): void => {
        setDefeated(true);
        addToClearedBattles(props.run.id, props.segment.slug);
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

    // Translates array of trainer names to single string
    const getTrainerName = (): string => {
        let name: string = "";
        for (const trainer of trainers) {
            name += name ? ` & ${trainer.name}` : trainer.name;
        }
        return name;
    };

    // Persist defeated state on component load
    useEffect(() => {
        if (props.segment && props.run) {
            const trainer: Trainer | Trainer[] = getBattle(
                props.run.gameSlug,
                props.segment.slug,
                getStarterSlug(props.run.id)
            ).trainer;
            if (Array.isArray(trainer)) {
                setTrainers(trainer);
            } else {
                setTrainers([trainer]);
            }
            setDefeated(isCleared(props.run.id, props.segment.slug));
            fetchItems(
                getBattle(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id)).items,
                props.run.gameSlug
            ).then((items: ItemData[]) => {
                setItems(items);
            });
        }
    }, [props.segment, props.run]);

    return (
        <div className={styles["battle-preview"]}>
            <div className={styles.trainer}>
                {trainers.map((trainer: Trainer) => {
                    return (
                        <div className={`${styles.sprite} ${defeated ? styles.defeated : ""}`} key={trainer.name}>
                            <Image src={trainer.sprite} alt={trainer.name} layout="fill" objectFit="contain" />
                        </div>
                    );
                })}
                <div className={styles.preview}>
                    <div className={styles.info}>
                        <p className={styles.name}>{getTrainerName()}</p>
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
            {hasLevelCap(props.segment) ? <LevelCap level={(props.segment.segment as BattleSegment).levelCap!} /> : ""}
        </div>
    );
};

export default BattlePreview;

import ItemDisplay from "@/components/Battle/ItemDisplay/ItemDisplay";
import Battle from "@/models/Battle";
import ItemData from "@/models/ItemData";
import { fetchItems } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./TrainerCard.module.scss";

type Props = {
    battle: Battle;
    game: string;
};

const TrainerCard: React.FC<Props> = (props: Props) => {
    // Fetched data
    const [items, setItems] = useState<{ [item: string]: ItemData }>({});

    // Fetch items on component load
    useEffect(() => {
        if (props.battle) {
            const uniqueItems = [...new Set(props.battle.items)];
            fetchItems(uniqueItems, props.game).then((items: ItemData[]) => {
                const itemData: { [item: string]: ItemData } = {};
                items.forEach((item: ItemData) => (itemData[item.slug] = item));
                setItems(itemData);
            });
        }
    }, [props.battle]);

    return (
        <div className={styles["trainer-card"]}>
            <div className={styles.header}>
                <div className={styles.trainer}>
                    <div className={styles.sprite}>
                        <Image
                            src={props.battle.trainer.sprite}
                            alt={props.battle.trainer.class}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <div className={styles.info}>
                        <p className={styles.name}>
                            {props.battle.trainer.class} {props.battle.name}
                        </p>
                        <p className={styles.location}>{props.battle.location}</p>
                        {Object.keys(items).length > 0 ? (
                            <div className={styles.items}>
                                {props.battle.items.map((item: string, key: number) => (
                                    <ItemDisplay item={items[item]} showName={false} key={key} />
                                ))}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <button className={styles.export}>
                    <Image src="/assets/icons/copy.svg" alt="Copy sets" layout="fill" objectFit="contain" />
                </button>
            </div>
        </div>
    );
};

export default TrainerCard;

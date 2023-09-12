import ItemData from "@/models/ItemData";
import Image from "next/image";
import styles from "./ItemCount.module.scss";

type Props = {
    item: ItemData | null;
    count: number;
};

const ItemCount: React.FC<Props> = (props: Props) => {
    return props.item ? (
        <div className={styles["item-count"]}>
            <div className={styles.item}>
                <Image src={props.item.sprite} alt={props.item.name} layout="fill" objectFit="contain" />
            </div>
            <p className={styles.count}>×{props.count}</p>
        </div>
    ) : (
        <></>
    );
};

export default ItemCount;

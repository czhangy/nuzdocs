import ItemData from "@/models/ItemData";
import styles from "./ItemDisplay.module.scss";
import Image from "next/image";

type Props = {
    item: ItemData;
};

const ItemDisplay: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["item-display"]}>
            <div className={styles.sprite}>
                <Image src={props.item.sprite} alt={props.item.name} layout="fill" objectFit="contain" />
            </div>
        </div>
    );
};

export default ItemDisplay;

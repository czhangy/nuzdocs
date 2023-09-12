import Tooltip from "@/components/Run/Tooltip/Tooltip";
import ItemData from "@/models/ItemData";
import Image from "next/image";
import { useState } from "react";
import styles from "./ItemDisplay.module.scss";

type Props = {
    item: ItemData;
    showName: boolean;
};

const ItemDisplay: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={styles["item-display"]} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className={styles.sprite}>
                <Image src={props.item.sprite} alt={props.item.name} layout="fill" objectFit="contain" />
            </div>
            {props.showName ? <p className={styles.name}>{props.item.name}</p> : ""}
            <Tooltip desc={props.item.desc} show={open} />
        </div>
    );
};

export default ItemDisplay;

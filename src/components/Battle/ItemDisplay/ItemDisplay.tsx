import Tooltip from "@/components/Global/Tooltip/Tooltip";
import ItemData from "@/models/ItemData";
import Image from "next/image";
import styles from "./ItemDisplay.module.scss";
import { useState } from "react";

type Props = {
    item: ItemData;
    showName: boolean;
};

const ItemDisplay: React.FC<Props> = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={styles["item-display"]} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className={styles.sprite}>
                <Image src={props.item.sprite} alt={props.item.name} layout="fill" objectFit="contain" />
            </div>
            <Tooltip desc={props.item.desc} show={open} />
        </div>
    );
};

export default ItemDisplay;

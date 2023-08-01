import styles from "./TypeIcon.module.scss";
import Image from "next/image";
import colors from "@/static/colors";

type Props = {
    type: string;
    size: number;
};

const TypeIcon: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["type-icon"]} style={{ backgroundColor: colors.types[props.type] }}>
            <div className={styles.icon} style={{ height: `${props.size}px`, width: `${props.size}px` }}>
                <Image src={`/assets/types/${props.type}.svg`} alt={props.type} layout="fill" objectFit="contain" />
            </div>
        </div>
    );
};

export default TypeIcon;

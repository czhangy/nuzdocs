import { getGame } from "@/utils/game";
import Image from "next/image";
import styles from "./FinishModal.module.scss";

type Props = {
    game: string;
};

const FinishModal: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["finish-modal"]}>
            <p className={styles.header}>🎉 Congrats! 🎉</p>
            <p className={styles.text}>You&apos;ve completed a Nuzlocke of</p>
            <div className={styles.game}>
                <Image
                    src={getGame(props.game).logoURL}
                    alt={getGame(props.game).name}
                    layout="fill"
                    objectFit="contain"
                />
            </div>
        </div>
    );
};

export default FinishModal;

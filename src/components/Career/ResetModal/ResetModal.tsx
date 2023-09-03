import { getGame } from "@/utils/game";
import styles from "./ResetModal.module.scss";

type Props = {
    game: string;
    onClose: () => void;
    onConfirm: () => void;
};

const ResetModal: React.FC<Props> = (props: Props) => {
    return props.game !== "" ? (
        <div className={styles["reset-modal"]}>
            <p className={styles.header}>
                Reset your <strong>Pokémon {getGame(props.game).name}</strong> history?
            </p>
            <p className={styles.subtitle}>
                <strong>Warning:</strong> you probably shouldn't do this if you
                <br />
                have an active run of Pokémon {getGame(props.game).name}
            </p>
            <div className={styles.buttons}>
                <button className="secondary-button" onClick={props.onClose}>
                    Cancel
                </button>
                <button className="primary-button" onClick={props.onConfirm}>
                    Confirm
                </button>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default ResetModal;

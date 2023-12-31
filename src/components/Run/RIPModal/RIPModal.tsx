import PokemonData from "@/models/PokemonData";
import Image from "next/image";
import styles from "./RIPModal.module.scss";

type Props = {
    pokemon: PokemonData;
    isRevive: boolean;
    onConfirm: () => void;
    onClose: () => void;
};

const RIPModal: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["rip-modal"]}>
            {props.isRevive ? (
                <p className={styles.header}>
                    Revive <strong>{props.pokemon.pokemon.name}</strong>?
                </p>
            ) : (
                <p className={styles.header}>
                    Did <strong>{props.pokemon.pokemon.name}</strong> RIP?
                </p>
            )}
            <div className={styles.sprite}>
                <Image src={props.pokemon.sprite} alt={props.pokemon.pokemon.name} layout="fill" objectFit="contain" />
            </div>
            <div className={styles.buttons}>
                <button className="secondary-button" onClick={props.onClose}>
                    No
                </button>
                <button className="primary-button" onClick={props.onConfirm}>
                    Yes
                </button>
            </div>
        </div>
    );
};

export default RIPModal;

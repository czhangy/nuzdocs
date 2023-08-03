import PokemonData from "@/models/PokemonData";
import styles from "./RIPModal.module.scss";
import Image from "next/image";

type Props = {
    pokemon: PokemonData;
    onClose: () => void;
    onRIP: () => void;
};

const RIPModal: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["rip-modal"]}>
            <p className={styles.header}>
                Did <strong>{props.pokemon.pokemon.name}</strong> RIP?
            </p>
            <div className={styles.sprite}>
                <Image src={props.pokemon.sprite} alt={props.pokemon.pokemon.name} layout="fill" objectFit="contain" />
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.cancel}`} onClick={props.onClose}>
                    No
                </button>
                <button className={`${styles.button} ${styles.rip}`} onClick={() => props.onRIP()}>
                    Yes
                </button>
            </div>
        </div>
    );
};

export default RIPModal;

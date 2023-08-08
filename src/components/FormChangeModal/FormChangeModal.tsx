import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { getRun } from "@/utils/run";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./FormChangeModal.module.scss";

type Props = {
    forms: string[];
    onClose: () => void;
    onFormChange: (selection: PokemonData) => void;
    runName: string;
};

const FormChangeModal: React.FC<Props> = (props: Props) => {
    // User state
    const [selection, setSelection] = useState<PokemonData | null>(null);

    // Fetched data state
    const [formData, setFormData] = useState<PokemonData[]>([]);

    // Fetch data for all forms on modal open
    useEffect(() => {
        if (props.forms) {
            fetchPokemonGroup(props.forms, getGameGroup(getRun(props.runName).gameSlug)).then(
                (formData: PokemonData[]) => setFormData(formData)
            );
        }
    }, [props.forms]);

    // When the form data has been fetched, initialize the user state to the default option
    useEffect(() => {
        if (formData.length > 0) {
            setSelection(formData[0]);
        }
    }, [formData]);

    return selection ? (
        <div className={styles["form-change-modal"]}>
            <p className={styles.header}>Choose a form</p>
            <div className={styles.forms}>
                {formData.map((form: PokemonData, key: number) => (
                    <button
                        className={`${styles.form} ${form === selection ? styles.active : ""}`}
                        onClick={() => setSelection(form)}
                        key={key}
                    >
                        <Image src={form.sprite} alt={form.pokemon.name} layout="fill" objectFit="contain" />
                    </button>
                ))}
            </div>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.cancel}`} onClick={props.onClose}>
                    Cancel
                </button>
                <button className={`${styles.button} ${styles.confirm}`} onClick={() => props.onFormChange(selection)}>
                    Confirm
                </button>
            </div>
        </div>
    ) : (
        <div className={styles["form-change-modal"]}>
            <p className={styles.header}>Loading...</p>
        </div>
    );
};

export default FormChangeModal;

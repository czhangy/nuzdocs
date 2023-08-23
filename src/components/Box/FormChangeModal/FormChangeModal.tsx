import PokemonData from "@/models/PokemonData";
import { fetchPokemonList } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./FormChangeModal.module.scss";

type Props = {
    pokemon: PokemonData;
    gameSlug: string;
    onFormChange: (selection: PokemonData) => void;
    onClose: () => void;
};

const FormChangeModal: React.FC<Props> = (props: Props) => {
    // Component state
    const [selection, setSelection] = useState<PokemonData | null>(null);

    // Fetched data state
    const [formData, setFormData] = useState<PokemonData[]>([]);

    // Fetch data for all forms on modal open
    useEffect(() => {
        if (props.pokemon && props.gameSlug) {
            const forms: string[] = props.pokemon.forms.filter((form: string) => form !== props.pokemon.pokemon.slug);
            fetchPokemonList(forms, props.gameSlug).then((formData: PokemonData[]) => {
                formData.unshift(props.pokemon);
                setFormData(formData);
            });
        }
    }, [props.pokemon, props.gameSlug]);

    // When the form data has been fetched, initialize the user state to the default option
    useEffect(() => {
        if (formData.length > 0) setSelection(formData[0]);
    }, [formData]);

    return formData.length > 0 && selection ? (
        <div className={styles["form-change-modal"]}>
            <p className={styles.header}>Choose a form</p>
            <div className={styles.forms}>
                {formData.map((form: PokemonData) => (
                    <button
                        className={`${styles.form} ${form === selection ? styles.active : ""}`}
                        onClick={() => setSelection(form)}
                        key={form.pokemon.slug}
                    >
                        <Image src={form.sprite} alt={form.pokemon.name} layout="fill" objectFit="contain" />
                    </button>
                ))}
            </div>
            <div className={styles.buttons}>
                <button className="secondary-button" onClick={props.onClose}>
                    Cancel
                </button>
                <button className="primary-button" onClick={() => props.onFormChange(selection)}>
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

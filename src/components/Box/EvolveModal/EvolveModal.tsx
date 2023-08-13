import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { fetchPokemonList } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EvolveModal.module.scss";

type Props = {
    pokemon: PokemonData;
    gameSlug: string;
    onEvolve: (selection: PokemonData) => void;
    onClose: () => void;
};

const EvolveModal: React.FC<Props> = (props: Props) => {
    // Component state
    const [selection, setSelection] = useState<PokemonData | null>(null);

    // Fetched data state
    const [evolutions, setEvolutions] = useState<PokemonData[]>([]);

    // Fetch data for all next evolutions on modal open
    useEffect(() => {
        if (props.pokemon) {
            const evolutionSlugs: string[] = [];
            for (const chain of props.pokemon.evolutions) {
                const idx: number = chain.indexOf(props.pokemon.pokemon.slug);
                if (idx + 1 < chain.length) {
                    evolutionSlugs.push(chain[idx + 1]);
                }
            }
            fetchPokemonList([...new Set(evolutionSlugs)], props.gameSlug).then((pokemonData: PokemonData[]) =>
                setEvolutions(pokemonData)
            );
        }
    }, [props.pokemon]);

    // When the evolution data has been fetched, initialize the user state to the first option
    useEffect(() => {
        if (evolutions.length > 0) {
            setSelection(evolutions[0]);
        }
    }, [evolutions]);

    return evolutions.length > 0 && selection ? (
        <div className={styles["evolve-modal"]}>
            <p className={styles.header}>
                Evolve <strong>{props.pokemon.pokemon.name}</strong> into <strong>{selection.pokemon.name}</strong>?
            </p>
            <ul className={styles.chains}>
                {evolutions.map((evolution: PokemonData) => (
                    <li className={styles.chain} key={evolution.pokemon.slug}>
                        <div className={styles.sprite}>
                            <Image
                                src={props.pokemon.sprite}
                                alt={props.pokemon.pokemon.name}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <p className={styles.arrow}>→</p>
                        <button
                            className={`${styles.sprite} ${evolution === selection ? styles.active : ""}`}
                            onClick={() => setSelection(evolution)}
                        >
                            <Image
                                src={evolution.sprite}
                                alt={evolution.pokemon.name}
                                layout="fill"
                                objectFit="contain"
                            />
                        </button>
                    </li>
                ))}
            </ul>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.cancel}`} onClick={props.onClose}>
                    Cancel
                </button>
                <button className={`${styles.button} ${styles.evolve}`} onClick={() => props.onEvolve(selection)}>
                    Evolve
                </button>
            </div>
        </div>
    ) : (
        <div className={styles["evolve-modal"]}>
            <p className={styles.header}>Loading...</p>
        </div>
    );
};

export default EvolveModal;

import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./EvolveModal.module.scss";

type Props = {
    pokemon: PokemonData;
    chains: string[][];
    onClose: () => void;
    onEvolve: (selection: PokemonData) => void;
};

const EvolveModal: React.FC<Props> = (props: Props) => {
    // User state
    const [selection, setSelection] = useState<PokemonData | null>(null);

    // Fetched data state
    const [evolutions, setEvolutions] = useState<PokemonData[]>([]);

    // Fetch data for all next evolutions on modal open
    useEffect(() => {
        if (props.pokemon && props.chains) {
            let evolutionSlugs: string[] = [];
            for (let chain of props.chains) {
                const curIdx: number = chain.indexOf(props.pokemon.pokemon.slug);
                if (curIdx + 1 < chain.length) {
                    evolutionSlugs.push(chain[curIdx + 1]);
                }
            }
            fetchPokemonGroup([...new Set(evolutionSlugs)]).then((pokemonData: PokemonData[]) =>
                setEvolutions(pokemonData)
            );
        }
    }, [props.pokemon, props.chains]);

    // When the evolution data has been fetched, initialize the user state to the first option
    useEffect(() => {
        if (evolutions.length > 0) {
            setSelection(evolutions[0]);
        }
    }, [evolutions]);

    return selection ? (
        <div className={styles["evolve-modal"]}>
            <p className={styles.header}>
                Evolve <strong>{props.pokemon.pokemon.name}</strong> into <strong>{selection.pokemon.name}</strong>?
            </p>
            <div className={styles.chains}>
                {evolutions.map((evolution: PokemonData, key: number) => (
                    <div className={styles.chain} key={key}>
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
                    </div>
                ))}
            </div>
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

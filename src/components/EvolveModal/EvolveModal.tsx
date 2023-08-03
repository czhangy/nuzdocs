import PokemonData from "@/models/PokemonData";
import styles from "./EvolveModal.module.scss";
import { useEffect, useState } from "react";
import { fetchPokemonGroup } from "@/utils/api";

type Props = {
    pokemon: PokemonData;
    chains: string[][];
};

const EvolveModal: React.FC<Props> = (props: Props) => {
    // User state
    const [selection, setSelection] = useState<string>("");

    // Fetched data state
    const [evolutions, setEvolutions] = useState<PokemonData[]>([]);

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

    return (
        <div className={styles["evolve-modal"]}>
            <p className={styles.header}></p>
            <div>
                {evolutions.map((pokemon: PokemonData) => (
                    <p>{pokemon.pokemon.name}</p>
                ))}
            </div>
        </div>
    );
};

export default EvolveModal;

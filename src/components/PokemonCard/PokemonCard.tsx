import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import { fetchPokemon } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.scss";

type Props = {
    pokemon: Pokemon;
};

const PokemonCard: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

    useEffect(() => {
        if (props.pokemon) {
            fetchPokemon(props.pokemon.slug).then((pokemonData: PokemonData) => setPokemonData(pokemonData));
        }
    }, [props.pokemon]);

    return pokemonData ? (
        <div className={styles["pokemon-card"]}>
            <div className={styles.header}>
                <div className={styles.sprite}></div>
                <p className={styles.name}>{pokemonData.pokemon.name}</p>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default PokemonCard;

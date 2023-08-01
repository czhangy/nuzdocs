import PokemonDisplay from "@/components/PokemonDisplay/PokemonDisplay";
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
                <PokemonDisplay pokemonSlug={props.pokemon.slug} />
                <div className={styles.info}>
                    <p className={styles.level}>Lv. {props.pokemon.level ? props.pokemon.level : "?"}</p>
                    <p className={styles["info-text"]}>Torrent</p>
                    <p className={styles["info-text"]}>Oran Berry</p>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default PokemonCard;

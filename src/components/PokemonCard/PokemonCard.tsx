import PokemonDisplay from "@/components/PokemonDisplay/PokemonDisplay";
import AbilityData from "@/models/AbilityData";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import { fetchPokemon } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.scss";
import { fetchAbility } from "@/utils/api";

type Props = {
    pokemon: Pokemon;
};

const PokemonCard: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
    const [pokemonAbility, setPokemonAbility] = useState<AbilityData | null>(null);

    useEffect(() => {
        if (props.pokemon) {
            fetchPokemon(props.pokemon.slug).then((pokemonData: PokemonData) => setPokemonData(pokemonData));
            fetchAbility(props.pokemon.abilitySlug as string).then((abilityData: AbilityData) =>
                setPokemonAbility(abilityData)
            );
        }
    }, [props.pokemon]);

    return pokemonData ? (
        <div className={styles["pokemon-card"]}>
            <div className={styles.header}>
                <PokemonDisplay pokemonSlug={props.pokemon.slug} />
                {pokemonAbility ? (
                    <div className={styles.info}>
                        <p className={styles.level}>Lv. {props.pokemon.level ? props.pokemon.level : "?"}</p>
                        <p className={styles["info-text"]}>{pokemonAbility.name}</p>
                        <p className={styles["info-text"]}>No held item</p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    ) : (
        <></>
    );
};

export default PokemonCard;

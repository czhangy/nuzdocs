import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import PokemonData from "@/models/PokemonData";
import { fetchPokemonFromGroup } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./PokedexPage.module.scss";
import EvolutionsDisplay from "@/components/Run/EvolutionsDisplay/EvolutionsDisplay";

type Props = {
    group: string;
    pokemon: string;
};

const PokedexPage: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);

    // Fetch Pokemon on page load
    useEffect(() => {
        if (props.pokemon) {
            fetchPokemonFromGroup(props.pokemon, props.group).then((pokemon: PokemonData) => setPokemon(pokemon));
        }
    }, [props.pokemon]);

    return pokemon ? (
        <div className={styles["pokedex-page"]}>
            <PokemonDisplay pokemon={pokemon} group={props.group} />
            <EvolutionsDisplay pokemon={pokemon} group={props.group} />
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default PokedexPage;

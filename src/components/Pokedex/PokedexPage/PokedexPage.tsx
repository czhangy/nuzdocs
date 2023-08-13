import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import PokemonData from "@/models/PokemonData";
import { useEffect, useState } from "react";
import styles from "./PokedexPage.module.scss";
import EvolutionsDisplay from "@/components/Run/EvolutionsDisplay/EvolutionsDisplay";
import BaseStats from "@/components/Pokedex/BaseStats/BaseStats";
import { fetchPokemon } from "@/utils/api";
import Run from "@/models/Run";

type Props = {
    pokemon: string;
    run: Run;
};

const PokedexPage: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);

    // Fetch Pokemon on page load
    useEffect(() => {
        if (props.pokemon) {
            fetchPokemon(props.pokemon, props.run.gameSlug).then((pokemon: PokemonData) => setPokemon(pokemon));
        }
    }, [props.pokemon]);

    return pokemon ? (
        <div className={styles["pokedex-page"]}>
            <PokemonDisplay pokemon={pokemon} runID={props.run.id} />
            <BaseStats stats={pokemon.stats} />
            {pokemon.evolutions.some((chain: string[]) => chain.length > 1) ? (
                <EvolutionsDisplay pokemon={pokemon} run={props.run} />
            ) : (
                ""
            )}
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default PokedexPage;

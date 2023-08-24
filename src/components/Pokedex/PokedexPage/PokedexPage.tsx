import Abilities from "@/components/Pokedex/Abilities/Abilities";
import BaseStats from "@/components/Pokedex/BaseStats/BaseStats";
import Evolutions from "@/components/Pokedex/Evolutions/Evolutions";
import Learnset from "@/components/Pokedex/Learnset/Learnset";
import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import TierCard from "@/components/Run/TierCard/TierCard";
import PokemonData from "@/models/PokemonData";
import PokemonMove from "@/models/PokemonMove";
import Run from "@/models/Run";
import { fetchPokemon } from "@/utils/api";
import { getPokemonTier } from "@/utils/utils";
import { useEffect, useState } from "react";
import styles from "./PokedexPage.module.scss";

type Props = {
    pokemon: string;
    run: Run;
};

const PokedexPage: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);

    // Internal data state
    const [learnset, setLearnset] = useState<PokemonMove[]>([]);

    // Fetch Pokemon on page load
    useEffect(() => {
        if (props.pokemon && props.run) {
            fetchPokemon(props.pokemon, props.run.gameSlug).then((pokemon: PokemonData) => setPokemon(pokemon));
        }
    }, [props.pokemon, props.run]);

    // Get learnset on fetch
    useEffect(() => {
        if (pokemon) {
            setLearnset(
                pokemon.movepool
                    .filter((move: PokemonMove) => move.method === "level-up")
                    .sort((a: PokemonMove, b: PokemonMove) => a.level - b.level)
            );
        }
    }, [pokemon]);

    return pokemon ? (
        <div className={styles["pokedex-page"]}>
            <div className={styles.header}>
                <PokemonDisplay pokemon={pokemon} runID={props.run.id} />
                <TierCard tier={getPokemonTier(props.pokemon, props.run.gameSlug)} />
            </div>
            <Abilities abilities={pokemon.abilities} game={props.run.gameSlug} />
            <BaseStats stats={pokemon.stats} />
            <Learnset moves={learnset} game={props.run.gameSlug} />
            {pokemon.evolutions.some((chain: string[]) => chain.length > 1) ? (
                <Evolutions pokemon={pokemon} run={props.run} />
            ) : (
                ""
            )}
        </div>
    ) : (
        <div className="accent-spinner" />
    );
};

export default PokedexPage;

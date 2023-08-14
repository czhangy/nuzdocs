import BattlePreview from "@/components/Battle/BattlePreview/BattlePreview";
import PokemonCard from "@/components/Battle/PokemonCard/PokemonCard";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { fetchPokemonList } from "@/utils/api";
import { getBattle } from "@/utils/battle";
import { getStarterSlug } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./BattlePage.module.scss";

type Props = {
    segment: Segment;
    run: Run;
};

const BattlePage: React.FC<Props> = (props: Props) => {
    // Internal data state
    const [sets, setSets] = useState<Pokemon[]>([]);

    // Fetched data state
    const [pokemon, setPokemon] = useState<PokemonData[]>([]);

    // Save sets array on page load
    useEffect(() => {
        if (props.segment && props.run) {
            setSets(getBattle(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id)).team);
        }
    }, [props.segment, props.run]);

    // Fetch Pokemon data on page load
    useEffect(() => {
        if (props.run && sets.length > 0) {
            fetchPokemonList(
                sets.map((set: Pokemon) => set.slug),
                props.run.gameSlug
            ).then((pokemon: PokemonData[]) => setPokemon(pokemon));
        }
    }, [props.run, sets]);

    return (
        <div className={styles["battle-page"]}>
            <BattlePreview
                segment={props.segment}
                names={pokemon.map((pokemon: PokemonData) => pokemon.pokemon.name)}
                run={props.run}
            />
            {pokemon.length === sets.length ? (
                <ul className={styles.team}>
                    {getBattle(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id)).team.map(
                        (set: Pokemon, key: number) => (
                            <PokemonCard set={set} pokemon={pokemon[key]} run={props.run} key={key} />
                        )
                    )}
                </ul>
            ) : (
                ""
            )}
        </div>
    );
};

export default BattlePage;

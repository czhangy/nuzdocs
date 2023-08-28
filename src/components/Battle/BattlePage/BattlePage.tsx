import BattlePreview from "@/components/Battle/BattlePreview/BattlePreview";
import FinishModal from "@/components/Battle/FinishModal/FinishModal";
import PokemonCard from "@/components/Battle/PokemonCard/PokemonCard";
import Modal from "@/components/Global/Modal/Modal";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { fetchPokemonList } from "@/utils/api";
import { getBattle } from "@/utils/battle";
import { getStarterSlug } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./BattlePage.module.scss";
import NextLevelCap from "@/components/Segment/NextLevelCap/NextLevelCap";

type Props = {
    segment: Segment;
    run: Run;
};

const BattlePage: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Internal state
    const [sets, setSets] = useState<Pokemon[]>([]);

    // Fetched state
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
            setPokemon([]);
            fetchPokemonList(
                sets.map((set: Pokemon) => set.slug),
                props.run.gameSlug
            ).then((pokemon: PokemonData[]) => setPokemon(pokemon));
        }
    }, [props.run.gameSlug, sets]);

    return (
        <div className={styles["battle-page"]}>
            <NextLevelCap segment={props.segment.slug} run={props.run} />
            <BattlePreview
                segment={props.segment}
                names={pokemon.map((pokemon: PokemonData) => pokemon.pokemon.name)}
                run={props.run}
                onFinish={() => setOpen(true)}
            />
            {pokemon.length === sets.length ? (
                <ul className={styles.team}>
                    {getBattle(props.run.gameSlug, props.segment.slug, getStarterSlug(props.run.id)).team.map(
                        (set: Pokemon, idx: number) => (
                            <PokemonCard
                                set={set}
                                pokemon={pokemon[idx]}
                                run={props.run}
                                key={`${props.run.gameSlug} + ${set.slug} + ${idx}`}
                            />
                        )
                    )}
                </ul>
            ) : (
                <div className={styles.loading}>
                    <div className="accent-spinner" />
                </div>
            )}
            <Modal open={open} onClose={() => setOpen(false)}>
                <FinishModal game={props.run.gameSlug} />
            </Modal>
        </div>
    );
};

export default BattlePage;

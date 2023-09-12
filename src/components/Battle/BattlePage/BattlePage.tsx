import BattlePreview from "@/components/Battle/BattlePreview/BattlePreview";
import FinishModal from "@/components/Battle/FinishModal/FinishModal";
import PokemonCard from "@/components/Battle/PokemonCard/PokemonCard";
import Modal from "@/components/Global/Modal/Modal";
import LevelCap from "@/components/Segment/LevelCap/LevelCap";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { fetchPokemonList } from "@/utils/api";
import { getBattle } from "@/utils/battle";
import { getNextLevelCap } from "@/utils/segment";
import { useEffect, useState } from "react";
import styles from "./BattlePage.module.scss";

type Props = {
    segment: Segment;
    run: Run;
};

const BattlePage: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);

    // Internal state
    const [sets, setSets] = useState<Pokemon[]>([]);
    const [levelCap, setLevelCap] = useState<number>(0);

    // Fetched state
    const [pokemon, setPokemon] = useState<PokemonData[]>([]);

    // Save sets array on page load
    useEffect(() => {
        if (props.segment && props.run) {
            setSets(getBattle(props.run, props.segment.slug).team);
            setLevelCap(getNextLevelCap(props.run));
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
            {props.run.options.caps ? <LevelCap segment={props.segment.slug} run={props.run} level={levelCap} /> : ""}
            <BattlePreview
                segment={props.segment}
                names={pokemon.map((pokemon: PokemonData) => pokemon.pokemon.name)}
                run={props.run}
                onUpdate={() => setLevelCap(getNextLevelCap(props.run))}
                onFinish={() => setOpen(true)}
                key={props.segment.slug}
            />
            {pokemon.length === sets.length ? (
                <ul className={styles.team}>
                    {getBattle(props.run, props.segment.slug).team.map((set: Pokemon, idx: number) => (
                        <PokemonCard
                            set={set}
                            pokemon={pokemon[idx]}
                            run={props.run}
                            key={`${props.run.gameSlug} + ${set.slug} + ${idx}`}
                        />
                    ))}
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

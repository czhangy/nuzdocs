import AbilityDisplay from "@/components/Battle/AbilityDisplay/AbilityDisplay";
import ItemDisplay from "@/components/Battle/ItemDisplay/ItemDisplay";
import MoveCard from "@/components/Run/MoveCard/MoveCard";
import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import AbilityData from "@/models/AbilityData";
import ItemData from "@/models/ItemData";
import MoveData from "@/models/MoveData";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import { fetchAbility, fetchItem, fetchMoves, fetchPokemon } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.scss";

type Props = {
    pokemon: Pokemon;
    gameSlug: string;
};

const PokemonCard: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [ability, setAbility] = useState<AbilityData | null>(null);
    const [moves, setMoves] = useState<MoveData[]>([]);
    const [heldItem, setHeldItem] = useState<ItemData | null>(null);

    // Component state
    const [isMinimized, setIsMinimized] = useState<boolean>(true);

    // Fetch all related data on component load
    useEffect(() => {
        if (props.pokemon) {
            fetchPokemon(props.pokemon.slug, props.gameSlug).then((pokemonData: PokemonData) =>
                setPokemon(pokemonData)
            );
            fetchAbility(props.pokemon.abilitySlug as string, props.gameSlug).then((abilityData: AbilityData | null) =>
                setAbility(abilityData)
            );
            fetchMoves(props.pokemon.moveSlugs, props.gameSlug).then((moveData: MoveData[]) => setMoves(moveData));
            if (props.pokemon.heldItemSlug) {
                fetchItem(props.pokemon.heldItemSlug, props.gameSlug).then((item: ItemData | null) =>
                    setHeldItem(item)
                );
            }
        }
    }, [props.pokemon]);

    return pokemon && ability && moves.length > 0 ? (
        <li className={styles["pokemon-card"]}>
            <div className={`${styles.card} ${isMinimized ? styles.minimized : ""}`}>
                <button className={styles.toggle} onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? "+" : "-"}
                </button>
                <div className={styles.header}>
                    <PokemonDisplay pokemon={pokemon} />
                </div>
                <div className={styles.moves}>
                    {moves.map((move: MoveData) => {
                        return <MoveCard move={move} isSTAB={pokemon.types.includes(move.type)} key={move.slug} />;
                    })}
                </div>
            </div>
            <div className={styles.info}>
                <p className={styles.level}>Lv. {props.pokemon.level ? props.pokemon.level : "?"}</p>
                <AbilityDisplay ability={ability} />
                {heldItem ? (
                    <div className={styles.item}>
                        <ItemDisplay item={heldItem} showName={true} />
                    </div>
                ) : (
                    <p className={styles.missing}>No held item</p>
                )}
            </div>
        </li>
    ) : (
        <p>Loading...</p>
    );
};

export default PokemonCard;

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
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
    const [pokemonAbility, setPokemonAbility] = useState<AbilityData | null>(null);
    const [pokemonMoves, setPokemonMoves] = useState<MoveData[]>([]);
    const [heldItem, setHeldItem] = useState<ItemData | null>(null);

    // Component state
    const [isMinimized, setIsMinimized] = useState<boolean>(true);

    // Fetch all related data on component load
    useEffect(() => {
        if (props.pokemon) {
            fetchPokemon(props.pokemon.slug, props.gameSlug).then((pokemonData: PokemonData) =>
                setPokemonData(pokemonData)
            );
            fetchAbility(props.pokemon.abilitySlug as string).then((abilityData: AbilityData) =>
                setPokemonAbility(abilityData)
            );
            fetchMoves(props.pokemon.moveSlugs).then((moveData: MoveData[]) => setPokemonMoves(moveData));
            if (props.pokemon.heldItemSlug) {
                fetchItem(props.pokemon.heldItemSlug, props.gameSlug).then((item: ItemData | null) =>
                    setHeldItem(item)
                );
            }
        }
    }, [props.pokemon]);

    return pokemonData && pokemonAbility && pokemonMoves.length > 0 ? (
        <li className={styles["pokemon-card"]}>
            <div className={`${styles.card} ${isMinimized ? styles.minimized : ""}`}>
                <button className={styles.toggle} onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? "+" : "-"}
                </button>
                <div className={styles.header}>
                    <PokemonDisplay pokemon={pokemonData} />
                    <div className={styles.info}>
                        <p className={styles.level}>Lv. {props.pokemon.level ? props.pokemon.level : "?"}</p>
                        <p className={styles["info-text"]}>{pokemonAbility.name}</p>
                        {!heldItem ? <p className={styles["info-text"]}>No held item</p> : ""}
                    </div>
                </div>
                <div className={styles.moves}>
                    {pokemonMoves.map((move: MoveData) => {
                        return <MoveCard move={move} isSTAB={pokemonData.types.includes(move.type)} key={move.slug} />;
                    })}
                </div>
            </div>
            {heldItem ? (
                <div className={styles.item}>
                    <ItemDisplay item={heldItem} showName={true} />
                </div>
            ) : (
                ""
            )}
        </li>
    ) : (
        <p>Loading...</p>
    );
};

export default PokemonCard;

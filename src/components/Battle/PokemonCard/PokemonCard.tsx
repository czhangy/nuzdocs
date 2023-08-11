import AbilityDisplay from "@/components/Battle/AbilityDisplay/AbilityDisplay";
import ItemDisplay from "@/components/Battle/ItemDisplay/ItemDisplay";
import MoveCard from "@/components/Run/MoveCard/MoveCard";
import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import AbilityData from "@/models/AbilityData";
import ItemData from "@/models/ItemData";
import MoveData from "@/models/MoveData";
import NamedResource from "@/models/NamedResource";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import { fetchAbility, fetchItem, fetchMoves } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.scss";

type Props = {
    set: Pokemon;
    pokemon: PokemonData;
    gameSlug: string;
};

const PokemonCard: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [ability, setAbility] = useState<AbilityData | null>(null);
    const [moves, setMoves] = useState<MoveData[]>([]);
    const [heldItem, setHeldItem] = useState<ItemData | null>(null);

    // Component state
    const [isMinimized, setIsMinimized] = useState<boolean>(true);

    // Fetch all related data on component load
    useEffect(() => {
        if (props.set) {
            fetchAbility(props.set.ability!.slug, props.gameSlug).then((abilityData: AbilityData | null) =>
                setAbility(abilityData)
            );
            fetchMoves(props.set.moves.map((move: NamedResource) => move.slug)).then((moveData: MoveData[]) =>
                setMoves(moveData)
            );
            if (props.set.heldItemSlug) {
                fetchItem(props.set.heldItemSlug, props.gameSlug).then((item: ItemData | null) => setHeldItem(item));
            }
        }
    }, [props.set]);

    return props.pokemon && ability && moves.length > 0 ? (
        <li className={styles["pokemon-card"]}>
            <div className={`${styles.card} ${isMinimized ? styles.minimized : ""}`}>
                <button className={styles.toggle} onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? "+" : "-"}
                </button>
                <div className={styles.header}>
                    <PokemonDisplay pokemon={props.pokemon} />
                </div>
                <div className={styles.moves}>
                    {moves.map((move: MoveData) => {
                        return (
                            <MoveCard
                                move={move}
                                isSTAB={props.pokemon.types.includes(move.type)}
                                game={props.gameSlug}
                                key={move.slug}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.info}>
                <p className={styles.level}>Lv. {props.set.level ? props.set.level : "?"}</p>
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

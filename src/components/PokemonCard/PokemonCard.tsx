import MoveCard from "@/components/MoveCard/MoveCard";
import PokemonDisplay from "@/components/Run/PokemonDisplay/PokemonDisplay";
import AbilityData from "@/models/AbilityData";
import MoveData from "@/models/MoveData";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import { fetchAbility, fetchMoves, fetchPokemon } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { getRun } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./PokemonCard.module.scss";

type Props = {
    pokemon: Pokemon;
    runName: string;
};

const PokemonCard: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
    const [pokemonAbility, setPokemonAbility] = useState<AbilityData | null>(null);
    const [pokemonMoves, setPokemonMoves] = useState<MoveData[]>([]);

    // Component state
    const [isMinimized, setIsMinimized] = useState<boolean>(true);

    useEffect(() => {
        if (props.pokemon) {
            fetchPokemon(props.pokemon.slug, getGameGroup(getRun(props.runName).gameSlug)).then(
                (pokemonData: PokemonData) => setPokemonData(pokemonData)
            );
            fetchAbility(props.pokemon.abilitySlug as string).then((abilityData: AbilityData) =>
                setPokemonAbility(abilityData)
            );
            fetchMoves(props.pokemon.moveSlugs).then((moveDataList: MoveData[]) => setPokemonMoves(moveDataList));
        }
    }, [props.pokemon]);

    return pokemonData ? (
        <div className={`${styles["pokemon-card"]} ${isMinimized ? styles.minimized : ""}`}>
            <button className={styles.toggle} onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? "+" : "-"}
            </button>
            <div className={styles.header}>
                <PokemonDisplay pokemonSlug={props.pokemon.slug} runName={props.runName} />
                {pokemonAbility ? (
                    <div className={styles.info}>
                        <p className={styles.level}>Lv. {props.pokemon.level ? props.pokemon.level : "?"}</p>
                        <p className={styles["info-text"]}>{pokemonAbility.name}</p>
                        <p className={styles["info-text"]}>
                            {props.pokemon.heldItemSlug ? props.pokemon.heldItemSlug : "No held item"}
                        </p>
                    </div>
                ) : (
                    ""
                )}
            </div>
            {pokemonMoves.length > 0 ? (
                <div className={styles.moves}>
                    {pokemonMoves.map((move: MoveData, key: number) => {
                        return <MoveCard move={move} isSTAB={pokemonData.types.includes(move.type)} key={key} />;
                    })}
                </div>
            ) : (
                ""
            )}
        </div>
    ) : (
        <></>
    );
};

export default PokemonCard;

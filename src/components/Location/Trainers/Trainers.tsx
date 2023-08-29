import TrainerCard from "@/components/Location/TrainerCard/TrainerCard";
import Battle from "@/models/Battle";
import ItemData from "@/models/ItemData";
import Pokemon from "@/models/Pokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { fetchItems, fetchPokemonList } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./Trainers.module.scss";

type Props = {
    battles: Battle[];
    run: Run;
};

const Trainers: React.FC<Props> = (props: Props) => {
    // Fetched data
    const [pokemon, setPokemon] = useState<{ [pokemon: string]: PokemonData }>({});
    const [items, setItems] = useState<{ [item: string]: ItemData }>({});

    // Fetch Pokemon and items on component load
    useEffect(() => {
        if (props.battles) {
            const uniquePokemon: string[] = [
                ...new Set(
                    props.battles.map((battle: Battle) => battle.team.map((pokemon: Pokemon) => pokemon.slug)).flat()
                ),
            ];
            const uniqueItems = [...new Set(props.battles.map((battle: Battle) => battle.items).flat())];
            fetchPokemonList(uniquePokemon, props.run.gameSlug).then((pokemon: PokemonData[]) => {
                const pokemonData: { [pokemon: string]: PokemonData } = {};
                pokemon.forEach((pokemon: PokemonData) => (pokemonData[pokemon.pokemon.slug] = pokemon));
                setPokemon(pokemonData);
            });
            fetchItems(uniqueItems, props.run.gameSlug).then((items: ItemData[]) => {
                const itemData: { [item: string]: ItemData } = {};
                items.forEach((item: ItemData) => (itemData[item.slug] = item));
                setItems(itemData);
            });
        }
    }, [props.battles]);

    return props.battles.length > 0 ? (
        <div className={styles.trainers}>
            <h3 className={styles.header}>Trainers:</h3>
            <ul className={styles.list}>
                {props.battles.map((battle: Battle, key: number) => {
                    return (
                        <li key={key}>
                            <TrainerCard battle={battle} run={props.run} pokemon={pokemon} items={items} />
                        </li>
                    );
                })}
            </ul>
        </div>
    ) : (
        <div className={styles.placeholder} />
    );
};

export default Trainers;

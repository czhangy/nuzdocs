import TrainerCard from "@/components/Location/TrainerCard/TrainerCard";
import Battle from "@/models/Battle";
import styles from "./Trainers.module.scss";
import { useEffect, useState } from "react";
import ItemData from "@/models/ItemData";
import { fetchItems, fetchPokemonList } from "@/utils/api";
import PokemonData from "@/models/PokemonData";
import Pokemon from "@/models/Pokemon";

type Props = {
    battles: Battle[];
    game: string;
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
            fetchPokemonList(uniquePokemon, props.game).then((pokemon: PokemonData[]) => {
                const pokemonData: { [pokemon: string]: PokemonData } = {};
                pokemon.forEach((pokemon: PokemonData) => (pokemonData[pokemon.pokemon.slug] = pokemon));
                setPokemon(pokemonData);
            });
            fetchItems(uniqueItems, props.game).then((items: ItemData[]) => {
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
                            <TrainerCard battle={battle} game={props.game} pokemon={pokemon} items={items} />
                        </li>
                    );
                })}
            </ul>
        </div>
    ) : (
        <></>
    );
};

export default Trainers;

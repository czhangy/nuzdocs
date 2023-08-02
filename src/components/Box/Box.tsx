import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import { useEffect, useState } from "react";
import styles from "./Box.module.scss";
import Image from "next/image";

type Props = {
    box: CaughtPokemon[];
};

const Box: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [boxData, setBoxData] = useState<PokemonData[]>([]);

    // Use box to fetch data for all Pokemon in box, ignoring failed encounters
    useEffect(() => {
        if (props.box.length > 0) {
            fetchPokemonGroup(
                props.box
                    .map((pokemon: CaughtPokemon) => pokemon.pokemon.slug)
                    .filter((slug: string) => slug !== "failed")
            ).then((pokemonData: PokemonData[]) => setBoxData(pokemonData));
        }
    }, [props.box]);

    return (
        <div className={styles.box}>
            {boxData.map((pokemon: PokemonData) => (
                <button className={styles.pokemon}>
                    <Image src={pokemon.sprite} alt={pokemon.pokemon.name} layout="fill" objectFit="contain" />
                </button>
            ))}
        </div>
    );
};

export default Box;

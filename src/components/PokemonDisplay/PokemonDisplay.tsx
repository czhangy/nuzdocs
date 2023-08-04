import PokemonData from "@/models/PokemonData";
import { fetchSpecies } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./PokemonDisplay.module.scss";

type Props = {
    pokemonSlug: string;
};

const PokemonDisplay: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

    // Fetch Pokemon data from PokeAPI on component load
    useEffect(() => {
        if (props.pokemonSlug) {
            fetchSpecies(props.pokemonSlug).then((pokemonData: PokemonData) => setPokemonData(pokemonData));
        }
    }, [props.pokemonSlug]);

    return pokemonData ? (
        <div className={styles["pokemon-display"]}>
            <div className={styles.sprite}>
                <Image src={pokemonData.sprite} alt={pokemonData.pokemon.name} layout="fill" objectFit="contain" />
            </div>
            <div className={styles.info}>
                <div className={styles.top}>
                    <p className={styles.name}>{pokemonData.pokemon.name}</p>
                </div>
                <ul className={styles.types}>
                    {pokemonData.types.map((type: string, key: number) => {
                        return (
                            <div className={styles.type} key={key}>
                                <Image
                                    src={`https://www.serebii.net/pokedex-bw/type/${type}.gif`}
                                    alt={type}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default PokemonDisplay;

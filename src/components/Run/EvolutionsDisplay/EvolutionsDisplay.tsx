import PokemonData from "@/models/PokemonData";
import { fetchPokemonListFromGroup } from "@/utils/api";
import { isFinalStage } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./EvolutionsDisplay.module.scss";

type Props = {
    pokemon: PokemonData;
    group: string;
};

const EvolutionsDisplay: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemonMap, setPokemonMap] = useState<{ [slug: string]: PokemonData }>({});

    // Filter out evolution chains if the Pokemon is fully evolved
    const getEvolutionChains = (): string[][] => {
        if (isFinalStage(props.pokemon)) {
            return [props.pokemon.evolutions.find((chain: string[]) => chain.at(-1) === props.pokemon.pokemon.slug)!];
        } else {
            return props.pokemon.evolutions;
        }
    };

    // Fetch data for all Pokemon in evolution line on component load
    useEffect(() => {
        const newPokemonMap: { [slug: string]: PokemonData } = {};
        newPokemonMap[props.pokemon.pokemon.slug] = props.pokemon;
        fetchPokemonListFromGroup(
            [...new Set(getEvolutionChains().flat())].filter((slug: string) => slug !== props.pokemon.pokemon.slug),
            props.group
        ).then((pokemonData: PokemonData[]) => {
            for (const pokemon of pokemonData) newPokemonMap[pokemon.pokemon.slug] = pokemon;
            setPokemonMap(newPokemonMap);
        });
    }, [props.pokemon]);

    return Object.keys(pokemonMap).length > 1 ? (
        <div className={styles["evolutions-display"]}>
            <p className={styles.header}>Evolutions</p>
            <div className={styles.evolutions}>
                {getEvolutionChains().map((chain: string[], key: number) => {
                    return (
                        <div className={styles.chain} key={key}>
                            {chain.map((slug: string, idx: number) => {
                                return (
                                    <div className={styles.link} key={slug}>
                                        {idx > 0 ? <p className={styles.arrow}>→</p> : ""}
                                        {slug in pokemonMap ? (
                                            <Link href={`/pokedex/${props.group}/${pokemonMap[slug].pokemon.slug}`}>
                                                <a className={styles.sprite}>
                                                    <Image
                                                        src={pokemonMap[slug].sprite}
                                                        alt={pokemonMap[slug].pokemon.name}
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </a>
                                            </Link>
                                        ) : (
                                            "Loading..."
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default EvolutionsDisplay;

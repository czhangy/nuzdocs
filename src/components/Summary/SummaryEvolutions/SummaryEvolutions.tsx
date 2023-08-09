import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SummaryEvolutions.module.scss";
import { isFinalStage } from "@/utils/utils";

type Props = {
    pokemon: PokemonData;
    gameSlug: string;
};

const SummaryEvolutions: React.FC<Props> = (props: Props) => {
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
        fetchPokemonGroup(
            [...new Set(getEvolutionChains().flat())].filter((slug: string) => slug !== props.pokemon.pokemon.slug),
            props.gameSlug
        ).then((pokemonData: PokemonData[]) => {
            for (const pokemon of pokemonData) newPokemonMap[pokemon.pokemon.slug] = pokemon;
            setPokemonMap(newPokemonMap);
        });
    }, [props.pokemon]);

    return Object.keys(pokemonMap).length > 1 ? (
        <div className={styles["summary-evolutions"]}>
            <p className={styles.header}>Evolutions</p>
            <div className={styles.evolutions}>
                {getEvolutionChains().map((chain: string[], key: number) => {
                    return (
                        <div className={styles.chain} key={key}>
                            {chain.map((slug: string, idx: number) => {
                                return (
                                    <div className={styles.link} key={slug}>
                                        {idx > 0 ? <p className={styles.arrow}>→</p> : ""}
                                        <div className={styles.sprite}>
                                            <Image
                                                src={pokemonMap[slug].sprite}
                                                alt={pokemonMap[slug].pokemon.name}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
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

export default SummaryEvolutions;

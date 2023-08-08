import PokemonData from "@/models/PokemonData";
import { fetchPokemonGroup } from "@/utils/api";
import { getGameGroup } from "@/utils/game";
import { getRun } from "@/utils/run";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SummaryEvolutions.module.scss";

type Props = {
    pokemon: PokemonData;
    runName: string;
};

const SummaryEvolutions: React.FC<Props> = (props: Props) => {
    // Fetched data state
    const [pokemonMap, setPokemonMap] = useState<{ [slug: string]: PokemonData }>({});

    // Fetch data for all Pokemon in evolution line on component load
    useEffect(() => {
        const newPokemonMap: { [slug: string]: PokemonData } = {};
        newPokemonMap[props.pokemon.pokemon.slug] = props.pokemon;
        fetchPokemonGroup(
            [...new Set(props.pokemon.evolutions.flat())].filter((slug: string) => slug !== props.pokemon.pokemon.slug),
            getGameGroup(getRun(props.runName).gameSlug)
        ).then((pokemonData: PokemonData[]) => {
            for (const pokemon of pokemonData) newPokemonMap[pokemon.pokemon.slug] = pokemon;
            setPokemonMap(newPokemonMap);
        });
    }, [props.pokemon]);

    return Object.keys(pokemonMap).length > 1 ? (
        <div className={styles["summary-evolutions"]}>
            <p className={styles.header}>Evolutions</p>
            <div className={styles.evolutions}>
                {props.pokemon.evolutions.map((chain: string[], chainKey: number) => {
                    return (
                        <div className={styles.chain} key={chainKey}>
                            {chain.map((slug: string, slugKey: number) => {
                                return (
                                    <div className={styles.link} key={slugKey}>
                                        {slugKey > 0 ? <p className={styles.arrow}>→</p> : ""}
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
        <></>
    );
};

export default SummaryEvolutions;

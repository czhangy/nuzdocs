import PokemonData from "@/models/PokemonData";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SummaryPage.module.scss";
import { fetchPokemon } from "@/utils/api";
import { getRun, isAlive } from "@/utils/run";
import CaughtPokemon from "@/models/CaughtPokemon";
import { getSegment } from "@/utils/segment";

type Props = {
    runName: string;
    nickname: string;
};

const SummaryPage: React.FC<Props> = (props: Props) => {
    // Internal state
    const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon | null>(null);

    // Fetched data state
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

    // Find Pokemon on page load
    useEffect(() => {
        if (props.runName && props.nickname) {
            const pokemonList: CaughtPokemon[] = isAlive(props.runName, props.nickname)
                ? getRun(props.runName).box
                : getRun(props.runName).rips;
            setCaughtPokemon(
                pokemonList.find((pokemon: CaughtPokemon) => pokemon.pokemon.nickname === props.nickname)!
            );
        }
    }, [props.runName, props.nickname]);

    // Fetch Pokemon's data on page load
    useEffect(() => {
        if (caughtPokemon) {
            fetchPokemon(caughtPokemon.pokemon.slug).then((pokemon: PokemonData) => setPokemonData(pokemon));
        }
    }, [caughtPokemon]);

    return (
        <div className={styles["summary-page"]}>
            {caughtPokemon && pokemonData ? (
                <div className={styles.main}>
                    <div className={styles.sprite}>
                        <Image
                            src={pokemonData.sprite}
                            alt={pokemonData.pokemon.name}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <div className={styles["main-info"]}>
                        <p className={styles["main-text"]}>
                            <strong>{props.nickname}</strong> the {pokemonData.pokemon.name}
                        </p>
                        <p className={styles["main-text"]}>
                            Met at:{" "}
                            <strong>
                                {getSegment(getRun(props.runName).gameSlug, caughtPokemon.locationSlug).name}
                            </strong>
                        </p>
                        <p className={styles["main-text"]}>
                            Status: <strong>{isAlive(props.runName, props.nickname) ? "Alive" : "RIP'd"}</strong>
                        </p>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default SummaryPage;

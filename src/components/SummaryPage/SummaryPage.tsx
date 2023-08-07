import PokemonData from "@/models/PokemonData";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SummaryPage.module.scss";
import { fetchPokemon } from "@/utils/api";
import { getRun, isAlive } from "@/utils/run";
import CaughtPokemon from "@/models/CaughtPokemon";
import { getSegment } from "@/utils/segment";
import SummaryHeader from "@/components/SummaryHeader/SummaryHeader";

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
                    <SummaryHeader
                        pokemonData={pokemonData}
                        nickname={props.nickname}
                        metLocation={caughtPokemon.locationSlug}
                        runName={props.runName}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default SummaryPage;

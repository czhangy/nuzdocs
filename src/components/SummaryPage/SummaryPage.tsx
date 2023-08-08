import SummaryEvolutions from "@/components/SummaryEvolutions/SummaryEvolutions";
import SummaryHeader from "@/components/SummaryHeader/SummaryHeader";
import SummaryInfo from "@/components/SummaryInfo/SummaryInfo";
import SummaryMoves from "@/components/SummaryMoves/SummaryMoves";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import { fetchPokemon } from "@/utils/api";
import { getRun, isAlive } from "@/utils/run";
import { useEffect, useState } from "react";
import styles from "./SummaryPage.module.scss";
import { isFinalStage } from "@/utils/utils";
import SummaryStats from "../SummaryStats/SummaryStats";

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

    return caughtPokemon && pokemonData ? (
        <div className={styles["summary-page"]}>
            <SummaryHeader
                pokemonData={pokemonData}
                nickname={props.nickname}
                metLocation={caughtPokemon.locationSlug}
                runName={props.runName}
            />
            <SummaryInfo pokemon={caughtPokemon} types={pokemonData.types} runName={props.runName} />
            <SummaryMoves
                moves={caughtPokemon.pokemon.moveSlugs}
                types={pokemonData.types}
                runName={props.runName}
                nickname={props.nickname}
            />
            <SummaryStats pokemonData={pokemonData} caughtPokemon={caughtPokemon} />
            {!isFinalStage(pokemonData) ? <SummaryEvolutions pokemon={pokemonData} /> : ""}
        </div>
    ) : (
        <div className={styles["summary-page"]}>
            <p>Loading...</p>
        </div>
    );
};

export default SummaryPage;

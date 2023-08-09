import SummaryHeader from "@/components/Summary/SummaryHeader/SummaryHeader";
import SummaryEvolutions from "@/components/Summary/SummaryEvolutions/SummaryEvolutions";
import SummaryInfo from "@/components/Summary/SummaryInfo/SummaryInfo";
import SummaryMoves from "@/components/Summary/SummaryMoves/SummaryMoves";
import SummaryStats from "@/components/Summary/SummaryStats/SummaryStats";
import CaughtPokemon from "@/models/CaughtPokemon";
import PokemonData from "@/models/PokemonData";
import Run from "@/models/Run";
import { fetchPokemon } from "@/utils/api";
import { getRun, isAlive } from "@/utils/run";
import { isFinalStage } from "@/utils/utils";
import { useEffect, useState } from "react";
import styles from "./SummaryPage.module.scss";

type Props = {
    run: Run;
    id: string;
};

const SummaryPage: React.FC<Props> = (props: Props) => {
    // Internal state
    const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon | null>(null);

    // Fetched data state
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

    // Get Pokemon from local storage
    const handleUpdate = () => {
        const pokemonList: CaughtPokemon[] = isAlive(props.run.id, props.id)
            ? getRun(props.run.id).box
            : getRun(props.run.id).rips;
        setCaughtPokemon(pokemonList.find((pokemon: CaughtPokemon) => pokemon.id === props.id)!);
    };

    // Find Pokemon on page load
    useEffect(() => {
        if (props.run && props.id) handleUpdate();
    }, [props.run, props.id]);

    // Fetch Pokemon's data on page load
    useEffect(() => {
        if (caughtPokemon) {
            fetchPokemon(caughtPokemon.pokemon.slug, props.run.gameSlug).then((pokemon: PokemonData) =>
                setPokemonData(pokemon)
            );
        }
    }, [caughtPokemon]);

    return caughtPokemon && pokemonData ? (
        <div className={styles["summary-page"]}>
            <SummaryHeader caughtPokemon={caughtPokemon} pokemonData={pokemonData} run={props.run} />
            <SummaryInfo
                caughtPokemon={caughtPokemon}
                pokemonData={pokemonData}
                runID={props.run.id}
                onUpdate={handleUpdate}
            />
            <SummaryMoves caughtPokemon={caughtPokemon} pokemonData={pokemonData} />
            <SummaryStats stats={pokemonData.stats} nature={caughtPokemon.pokemon.nature} />
            {!isFinalStage(pokemonData) ? (
                <SummaryEvolutions pokemon={pokemonData} gameSlug={props.run.gameSlug} />
            ) : (
                ""
            )}
        </div>
    ) : (
        <div className={styles["summary-page"]}>
            <p>Loading...</p>
        </div>
    );
};

export default SummaryPage;

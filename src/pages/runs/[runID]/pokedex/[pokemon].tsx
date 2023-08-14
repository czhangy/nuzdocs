import PokedexPage from "@/components/Pokedex/PokedexPage/PokedexPage";
import PokemonName from "@/models/PokemonName";
import Run from "@/models/Run";
import { getGameGroup } from "@/utils/game";
import { getRun, isRun } from "@/utils/run";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Pokedex: NextPage = () => {
    const router = useRouter();

    // Internal data state
    const [pokemon, setPokemon] = useState<string>("");
    const [run, setRun] = useState<Run | null>(null);

    // Get router params on page load
    useEffect(() => {
        if (router.isReady) {
            const runID: string = router.query.runID as string;
            const pokemon: string = router.query.pokemon as string;
            if (
                isRun(runID) &&
                getGameGroup(getRun(runID).gameSlug)
                    .pokedex.map((p: PokemonName) => p.slug)
                    .includes(pokemon)
            ) {
                setRun(getRun(runID));
                setPokemon(pokemon);
            } else {
                router.push("/");
            }
        }
    }, [router.isReady, router.query.runID, router.query.pokemon]);

    return (
        <>
            <Head>
                <title>{run ? `${run.name} // Pokédex` : "NuzlockeDB"}</title>
            </Head>
            {pokemon && run ? <PokedexPage pokemon={pokemon} run={run} /> : ""}
        </>
    );
};

export default Pokedex;

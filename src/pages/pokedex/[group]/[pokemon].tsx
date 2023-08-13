import PokedexPage from "@/components/Pokedex/PokedexPage/PokedexPage";
import PokemonName from "@/models/PokemonName";
import { getGroups, getPokedex } from "@/utils/game";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Pokedex: NextPage = () => {
    const router = useRouter();

    // Internal data state
    const [group, setGroup] = useState<string>("");
    const [pokemon, setPokemon] = useState<string>("");

    // Get router params on page load
    useEffect(() => {
        if (router.isReady) {
            const group: string = router.query.group as string;
            const pokemon: string = router.query.pokemon as string;
            if (
                getGroups().includes(group) &&
                getPokedex(group)
                    .map((p: PokemonName) => p.slug)
                    .includes(pokemon)
            ) {
                setGroup(group);
                setPokemon(pokemon);
            }
        }
    }, [router.isReady, router.query.group, router.query.pokemon]);

    return (
        <>
            <Head>
                <title>Pokédex</title>
            </Head>
            {group && pokemon ? <PokedexPage group={group} pokemon={pokemon} /> : ""}
        </>
    );
};

export default Pokedex;

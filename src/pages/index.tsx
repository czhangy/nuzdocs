import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { PokemonClient } from "pokenode-ts";

import type { NextPage } from "next";

const Home: NextPage = () => {
    (async () => {
        const api = new PokemonClient();

        await api
            .getPokemonByName("luxray")
            .then((data) => console.log(data)) // will output "Luxray"
            .catch((error) => console.error(error));
    })();

    return (
        <div id={styles.home}>
            <Head>
                <title>NuzlockeDB</title>
            </Head>
        </div>
    );
};

export default Home;

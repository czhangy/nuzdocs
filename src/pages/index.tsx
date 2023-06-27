import Head from "next/head";
import HomePage from "@/components/HomePage/HomePage";

import type { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>NuzlockeDB</title>
            </Head>
            <HomePage />
        </div>
    );
};

export default Home;

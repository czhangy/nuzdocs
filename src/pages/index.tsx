import HomePage from "@/components/Home/HomePage/HomePage";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>NuzDocs</title>
            </Head>
            <HomePage />
        </>
    );
};

export default Home;

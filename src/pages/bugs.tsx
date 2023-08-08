import BugsPage from "@/components/Bugs/BugsPage/BugsPage";
import type { NextPage } from "next";
import Head from "next/head";

const Bugs: NextPage = () => {
    return (
        <>
            <Head>
                <title>NuzlockeDB // Bugs</title>
            </Head>
            <BugsPage />
        </>
    );
};

export default Bugs;

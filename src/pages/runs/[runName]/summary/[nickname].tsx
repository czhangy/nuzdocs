import SummaryPage from "@/components/SummaryPage/SummaryPage";
import { isPokemon, isRun } from "@/utils/run";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Summary: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (
            !isRun(router.query.runName as string) ||
            !isPokemon(router.query.runName as string, router.query.nickname as string)
        ) {
            router.push("/");
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>
                    {router.query.runName && router.query.nickname
                        ? `${router.query.runName} // ${router.query.nickname}`
                        : "NuzlockeDB"}
                </title>
            </Head>
            <SummaryPage runName={router.query.runName as string} nickname={router.query.nickname as string} />
        </>
    );
};

export default Summary;

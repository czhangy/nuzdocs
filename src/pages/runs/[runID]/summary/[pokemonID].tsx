import SummaryPage from "@/components/Summary/SummaryPage/SummaryPage";
import Run from "@/models/Run";
import { getRun, isPokemon, isRun } from "@/utils/run";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Summary: NextPage = () => {
    const router = useRouter();

    // Internal data state
    const [run, setRun] = useState<Run | null>(null);
    const [id, setID] = useState<string>("");

    useEffect(() => {
        if (router.isReady) {
            const runID: string = router.query.runID as string;
            const pokemonID: string = router.query.pokemonID as string;
            if (isRun(runID) && isPokemon(runID, pokemonID)) {
                setRun(getRun(runID));
                setID(pokemonID);
            } else {
                router.push("/");
            }
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>{run ? `${run.name} // Summary` : "NuzlockeDB"}</title>
            </Head>
            {run && id.length > 0 ? <SummaryPage run={run} id={id} /> : ""}
        </>
    );
};

export default Summary;

import BoxPage from "@/components/Box/BoxPage/BoxPage";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isRun } from "@/utils/run";
import { getRun } from "@/utils/run";
import Run from "@/models/Run";

const Box: NextPage = () => {
    const router = useRouter();

    // Internal data state
    const [run, setRun] = useState<Run | null>(null);

    // Get run object on page load from URL param
    useEffect(() => {
        if (router.isReady) {
            const runID: string = router.query.runID as string;
            if (isRun(runID)) {
                setRun(getRun(runID));
            } else {
                router.push("/");
            }
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>{run ? `${run.name} // Box` : "NuzDocs"}</title>
            </Head>
            {run ? <BoxPage run={run} /> : ""}
        </>
    );
};

export default Box;

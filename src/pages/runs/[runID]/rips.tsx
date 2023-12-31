import RIPsPage from "@/components/RIPs/RIPsPage/RIPsPage";
import Run from "@/models/Run";
import { getRun, isRun } from "@/utils/run";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RIPs: NextPage = () => {
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
                <title>{run ? `${run.name} // RIPs` : "NuzDocs"}</title>
            </Head>
            {run ? <RIPsPage run={run} /> : ""}
        </>
    );
};

export default RIPs;

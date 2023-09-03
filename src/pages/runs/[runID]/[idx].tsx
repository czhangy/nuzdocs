import SegmentPage from "@/components/Segment/SegmentPage/SegmentPage";
import Run from "@/models/Run";
import { getRun, isRun } from "@/utils/run";
import { isSegment } from "@/utils/segment";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Segment: NextPage = () => {
    const router = useRouter();

    // Internal data state
    const [run, setRun] = useState<Run | null>(null);
    const [idx, setIdx] = useState<number | null>(null);

    // Validate route and set run for valid routes, redirect to home for invalid addresses
    useEffect(() => {
        if (router.isReady && router.query.runID && router.query.idx) {
            const runID: string = router.query.runID as string;
            const idx: string = router.query.idx as string;
            if (isRun(runID)) {
                const run: Run = getRun(runID);
                if (isSegment(run, idx)) {
                    setRun(run);
                    setIdx(parseInt(idx));
                    return;
                }
            }
            router.push("/");
        }
    }, [router.isReady, router.query.runID, router.query.idx]);

    return (
        <>
            <Head>
                <title>{run ? run.name : "NuzDocs"}</title>
            </Head>
            {run !== null && idx !== null ? <SegmentPage idx={idx} run={run} /> : ""}
        </>
    );
};

export default Segment;

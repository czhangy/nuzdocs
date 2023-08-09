import SegmentPage from "@/components/Segment/SegmentPage/SegmentPage";
import Run from "@/models/Run";
import Segment from "@/models/Segment";
import { getRun, isRun } from "@/utils/run";
import { getSegment, isSegment } from "@/utils/segment";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Segment: NextPage = () => {
    const router = useRouter();

    // Internal data state
    const [run, setRun] = useState<Run | null>(null);
    const [segment, setSegment] = useState<Segment | null>(null);

    // Validate route and set run for valid routes, redirect to home for invalid addresses
    useEffect(() => {
        if (router.isReady) {
            const runID: string = router.query.runID as string;
            const segmentSlug: string = router.query.segmentSlug as string;
            if (isRun(runID) && isSegment(getRun(runID).gameSlug, segmentSlug)) {
                const run: Run = getRun(runID);
                setRun(run);
                setSegment(getSegment(run.gameSlug, segmentSlug));
            } else {
                router.push("/");
            }
        }
    }, [router.isReady]);

    return (
        <>
            <Head>
                <title>{run ? run.name : "NuzlockeDB"}</title>
            </Head>
            {run && segment ? <SegmentPage segment={segment} run={run} /> : ""}
        </>
    );
};

export default Segment;

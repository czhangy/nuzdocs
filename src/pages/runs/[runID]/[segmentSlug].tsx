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
    const [segmentSlug, setSegmentSlug] = useState<string>("");

    // Validate route and set run for valid routes, redirect to home for invalid addresses
    useEffect(() => {
        if (router.isReady) {
            const runID: string = router.query.runID as string;
            const segmentSlug: string = router.query.segmentSlug as string;
            if (isRun(runID) && isSegment(getRun(runID).gameSlug, segmentSlug)) {
                setRun(getRun(runID));
                setSegmentSlug(segmentSlug);
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
            {run && segmentSlug.length > 0 ? <SegmentPage segmentSlug={segmentSlug} run={run} /> : ""}
        </>
    );
};

export default Segment;

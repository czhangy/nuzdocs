import SegmentPage from "@/components/SegmentPage/SegmentPage";
import Run from "@/models/Run";
import { getRun, isRun } from "@/utils/run";
import { isSegment } from "@/utils/segment";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Segment: NextPage = () => {
    const router = useRouter();

    // Data state
    const [run, setRun] = useState<Run | null>(null);

    // Validate route and set run for valid routes, redirect to home for invalid addresses
    useEffect(() => {
        if (router.query.runName && router.query.segmentSlug) {
            const runName: string = router.query.runName as string;
            if (isRun(runName) && isSegment(getRun(runName).gameSlug, router.query.segmentSlug as string)) {
                setRun(getRun(runName));
            } else {
                router.push("/");
            }
        }
    }, [router.query.runName, router.query.segmentSlug]);

    return (
        <>
            <Head>
                <title>{router.query.runName ? router.query.runName : "NuzlockeDB"}</title>
            </Head>
            {run ? (
                <SegmentPage
                    gameSlug={run.gameSlug}
                    runName={router.query.runName as string}
                    segmentSlug={router.query.segmentSlug as string}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default Segment;

import SegmentPage from "@/components/SegmentPage/SegmentPage";
import Run from "@/models/Run";
import games from "@/static/games";
import { getRun } from "@/utils/utils";
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
            const storedRuns = localStorage.getItem("runs");
            if (storedRuns) {
                const runList: string[] = JSON.parse(storedRuns);
                const runName: string = router.query.runName as string;
                if (runList.includes(runName)) {
                    const run: Run = getRun(runName);
                    if (
                        Object.keys(games[run.gameSlug].gameGroup.segments).includes(router.query.segmentSlug as string)
                    ) {
                        setRun(run);
                        return;
                    }
                }
            }
            router.push("/");
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

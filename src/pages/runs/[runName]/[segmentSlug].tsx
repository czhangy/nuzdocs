import SegmentPage from "@/components/SegmentPage/SegmentPage";
import Segment from "@/models/Segment";
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

    // Get the segment type for conditional rendering
    const getSegmentType = (): string => {
        return games[getRun(router.query.runName as string).gameSlug].gameGroup.segments.find(
            (segment: Segment) => segment.segment.slug === (router.query.segmentSlug as string)
        )!.type;
    };

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
                        games[run.gameSlug].gameGroup.segments
                            .map((segment: Segment) => segment.segment.slug)
                            .includes(router.query.segmentSlug as string)
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
                getSegmentType() === "location" ? (
                    <SegmentPage
                        gameSlug={run.gameSlug}
                        runName={router.query.runName as string}
                        segmentSlug={router.query.segmentSlug as string}
                    />
                ) : (
                    ""
                )
            ) : (
                ""
            )}
        </>
    );
};

export default Segment;

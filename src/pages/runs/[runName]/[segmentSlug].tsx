import SegmentPage from "@/components/SegmentPage/SegmentPage";
import LocalSegment from "@/models/LocalSegment";
import Run from "@/models/Run";
import games from "@/static/games";
import { getRun } from "@/utils/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Segment: NextPage = () => {
    const [run, setRun] = useState<Run | null>(null);
    const router = useRouter();

    // Validate route and set run for valid routes
    useEffect(() => {
        if (router.query.runName && router.query.segmentSlug) {
            const run: Run = getRun(router.query.runName as string);
            if (
                run &&
                games[run.gameSlug].segments
                    .map((segment: LocalSegment) => segment.slug)
                    .includes(router.query.segmentSlug as string)
            ) {
                setRun(run);
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

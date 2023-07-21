import RunPage from "@/components/RunPage/RunPage";
import Run from "@/models/Run";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRun } from "utils";
import Games from "@/static/games";
import LocalSegment from "@/models/LocalSegment";

const Run: NextPage = () => {
    const [run, setRun] = useState<Run | null>(null);
    const router = useRouter();

    useEffect(() => {
        const run: Run = getRun(router.query.runName as string);
        if (
            run &&
            Games[run.gameSlug].segments
                .map((segment: LocalSegment) => segment.slug)
                .includes(router.query.segmentSlug as string)
        ) {
            setRun(run);
        } else {
            router.push("/");
        }
    }, []);

    return (
        <>
            <Head>
                <title>{`NuzlockeDB | ${router.query.runName}`}</title>
            </Head>
            {run ? (
                <RunPage
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

export default Run;

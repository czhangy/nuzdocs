import Head from "next/head";
import { useRouter } from "next/router";

import RunPage from "@/components/RunPage/RunPage";

import type { NextPage } from "next";

const Run: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{`NuzlockeDB ${router.query.runName ? "| " + router.query.runName : ""}`}</title>
            </Head>
            <RunPage
                gameSlug="soulsilver"
                runName={router.query.runName as string}
                locationSlug={router.query.locationSlug as string}
            />
        </>
    );
};

export default Run;

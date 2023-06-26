import Head from "next/head";
import { useRouter } from "next/router";

import RunPage from "@/components/RunPage/RunPage";

import type { NextPage } from "next";

const Run: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{`NuzlockeDB | ${router.query.run}`}</title>
            </Head>
            <RunPage
                gameName="soulsilver"
                runName={router.query.run as string}
                locationName={router.query.location as string}
            />
        </>
    );
};

export default Run;

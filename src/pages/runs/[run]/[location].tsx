import Head from "next/head";
import { useRouter } from "next/router";

import RunPage from "@/components/RunPage/RunPage";

import type { NextPage } from "next";

const Run: NextPage = () => {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>NuzlockeDB</title>
            </Head>
            <RunPage
                game="soulsilver"
                run={router.query.run as string}
                location={router.query.location as string}
            />
        </div>
    );
};

export default Run;

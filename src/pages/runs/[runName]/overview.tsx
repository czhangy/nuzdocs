import OverviewPage from "@/components/OverviewPage/OverviewPage";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Overview: NextPage = () => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{router.query.runName ? `${router.query.runName} // Overview` : "NuzlockeDB"}</title>
            </Head>
            <OverviewPage runName={router.query.runName as string} />
        </>
    );
};

export default Overview;

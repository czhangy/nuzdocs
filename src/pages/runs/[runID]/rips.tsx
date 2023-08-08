import RIPsPage from "@/components/RIPsPage/RIPsPage";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const RIPs: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{router.query.runName ? `${router.query.runName} // RIPs` : "NuzlockeDB"}</title>
            </Head>
            <RIPsPage runName={router.query.runName as string} />
        </>
    );
};

export default RIPs;

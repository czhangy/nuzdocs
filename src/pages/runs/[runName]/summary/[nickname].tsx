import SummaryPage from "@/components/SummaryPage/SummaryPage";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Summary: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>
                    {router.query.runName && router.query.nickname
                        ? `${router.query.runName} // ${router.query.nickname}`
                        : "NuzlockeDB"}
                </title>
            </Head>
            <SummaryPage runName={router.query.runName as string} nickname={router.query.nickname as string} />
        </>
    );
};

export default Summary;

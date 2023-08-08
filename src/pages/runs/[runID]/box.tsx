import BoxPage from "@/components/BoxPage/BoxPage";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Box: NextPage = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{router.query.runName ? `${router.query.runName} // Box` : "NuzlockeDB"}</title>
            </Head>
            <BoxPage runName={router.query.runName as string} />
        </>
    );
};

export default Box;

import { useState } from "react";

import Head from "next/head";
import RunPage from "@/components/RunPage/RunPage";

import type { NextPage } from "next";

const Run: NextPage = () => {
    const [locationIdx, setLocationIdx] = useState<number>(0);

    return (
        <div>
            <Head>
                <title>NuzlockeDB | My Run</title>
            </Head>
            <RunPage
                game="soulsilver"
                locationIdx={locationIdx}
                onNav={(idx) => setLocationIdx(idx)}
            />
        </div>
    );
};

export default Run;

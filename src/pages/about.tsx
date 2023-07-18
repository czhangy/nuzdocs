import AboutPage from "@/components/AboutPage/AboutPage";
import type { NextPage } from "next";
import Head from "next/head";

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>NuzlockeDB | About</title>
            </Head>
            <AboutPage />
        </>
    );
};

export default About;

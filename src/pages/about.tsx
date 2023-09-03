import AboutPage from "@/components/About/AboutPage/AboutPage";
import type { NextPage } from "next";
import Head from "next/head";

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>NuzDocs // About</title>
            </Head>
            <AboutPage />
        </>
    );
};

export default About;

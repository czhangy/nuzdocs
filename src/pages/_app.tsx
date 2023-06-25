import Footer from "@/components/Footer/Footer";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Navbar from "@/components/Navbar/Navbar";

import "@/styles/globals.scss";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <PageWrapper>
                <Component {...pageProps} />
            </PageWrapper>
            <Footer />
        </>
    );
}

export default App;

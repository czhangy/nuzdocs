import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <PageWrapper>
                <Component {...pageProps} />
            </PageWrapper>
            <Footer />
            <Analytics />
        </>
    );
}

export default App;

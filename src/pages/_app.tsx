import Footer from "@/components/Footer/Footer";
import MainNavbar from "@/components/MainNavbar/MainNavbar";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import "@/styles/globals.scss";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <>
            {router.pathname === "/" ? <MainNavbar /> : ""}
            <PageWrapper>
                <Component {...pageProps} />
            </PageWrapper>
            <Footer />
            <Analytics />
        </>
    );
}

export default App;

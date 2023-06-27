import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

import "@/styles/globals.scss";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}

export default App;

// Stylesheet
import "@/styles/globals.scss";
// TS
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default App;

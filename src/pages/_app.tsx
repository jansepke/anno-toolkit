import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import { AppProps } from "next/app";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import Script from "next/script";
import NProgress from "nprogress";
import { useEffect } from "react";
import createEmotionCache from "../createEmotionCache";
import "../nprogress.css";
import theme from "../theme";

// loading indicator
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
});
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// TODO: use env var
// TODO: use custom hooks
export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // @ts-ignore
      if (!window.goatcounter) return;
      // @ts-ignore
      window.goatcounter.count({ path: router.asPath });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>

      <Analytics />
      <Script
        data-goatcounter="https://anno-toolkit.goatcounter.com/count"
        src="/scripts/goatcounter.js"
        strategy="afterInteractive"
      />
    </CacheProvider>
  );
}

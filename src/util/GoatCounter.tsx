import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

// TODO: use env var
export const GoatCounter: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!window.goatcounter) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.goatcounter.count({ path: router.asPath });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    <Script
      data-goatcounter="https://anno-toolkit.goatcounter.com/count"
      src="/scripts/goatcounter.js"
      strategy="afterInteractive"
    />
  );
};

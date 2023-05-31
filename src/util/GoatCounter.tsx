import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    goatcounter: { count: ({ path }: { path: string }) => void };
  }
}

// TODO: use env var
export const GoatCounter: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (!window.goatcounter) return;
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

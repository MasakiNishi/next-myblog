"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

  const existsGaId = GA_MEASUREMENT_ID !== "";

  const pageView = (path: string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: path,
    });
  };

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const url = pathname + searchParams.toString();
    pageView(url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;

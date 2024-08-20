"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void;
      };
    };
  }
}

const TwitterWidgets = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.twttr === "object") {
      window.twttr.widgets.load();
    }
  }, [pathname]);

  return (
    <Script
      src="https://platform.twitter.com/widgets.js"
      strategy="lazyOnload"
    />
  );
};

export default TwitterWidgets;

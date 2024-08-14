"use client";

import { useEffect } from "react";
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

const Content = ({ content }: { content: string }) => {
  useEffect(() => {
    if (typeof window.twttr === "object") {
      window.twttr.widgets.load();
    }
  }, [content]);

  return (
    <>
      <Script src="https://platform.twitter.com/widgets.js" />
      <div
        id="content"
        dangerouslySetInnerHTML={{ __html: content }}
        suppressHydrationWarning={true}
      ></div>
    </>
  );
};

export default Content;

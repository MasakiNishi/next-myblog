// const
import SeoConst from "../constants/SeoConst";
// type
import type { Metadata } from "next";
// style
import "./globals.css";
// component
import Layout from "../components/templates/Layout";
import { Inter } from "next/font/google";
import GoogleAnalytics from "../components/atoms/common/js/GoogleAnalytics";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(SeoConst.domain),
  title: {
    template: `%s | ${SeoConst.myName}`,
    default: SeoConst.defaultTitle,
  },
  description: SeoConst.defaultDescription,
  keywords: SeoConst.defaultKeywords,
  authors: [{ name: SeoConst.myName, url: SeoConst.domain }],
  creator: SeoConst.myName,
  publisher: SeoConst.myName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: SeoConst.icon,
    shortcut: SeoConst.icon,
    apple: SeoConst.appleIcon,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    title: SeoConst.defaultTitle,
    description: SeoConst.defaultDescription,
    siteName: SeoConst.defaultTitle,
    url: SeoConst.domain,
    images: [
      {
        url: SeoConst.defaultOgp.url,
        width: SeoConst.defaultOgp.width,
        height: SeoConst.defaultOgp.height,
        alt: "Ogp Image",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SeoConst.defaultTitle,
    description: SeoConst.defaultDescription,
    creator: SeoConst.twitterId,
    site: SeoConst.twitterId,
    images: [SeoConst.defaultOgp],
  },
  //   alternates: {
  //     types: {
  //       "application/rss+xml": "https://nextjs.org/rss",
  //     },
  //   },
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head prefix="og: https://ogp.me/ns#">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body
        className={`my-[60px] lg:my-[0px] lg:mr-[60px] ${inter.className}`}
        suppressHydrationWarning={true}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

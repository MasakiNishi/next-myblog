// type
import type { Metadata } from "next";
// component
import Link from "next/link";
import Title from "../components/atoms/common/text/Title";

const title = "404 - Not Found";
const description =
  "ページが見つかりませんでした。申し訳ありませんが、お探しのページは存在しません。";

// metadata is currently not supported in not-found pages
// issue: https://github.com/vercel/next.js/issues/45620
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title,
    description: description,
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
}

export default function NotFound() {
  return (
    <article className="w-main mx-auto max-w-[50em] p-4 sm:p-14">
      <div className="mt-4 sm:mt-0 mb-7">
        <Title>{title}</Title>
      </div>
      <div id="content">
        <p>{description}</p>
        <Link href="/">ホームに戻る</Link>
      </div>
    </article>
  );
}

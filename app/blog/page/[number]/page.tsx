import { notFound } from "next/navigation";
// const
import PostConst from "../../../../constants/PostConst";
import SeoConst from "../../../../constants/SeoConst";
import ProfileConst from "../../../../constants/ProfileConst";
// type
import type { Metadata } from "next";
// service
import PostService from "../../../../services/PostService";
// component
import PostList from "../../../../components/molecules/postList/PostList";
import Pagination from "../../../../components/molecules/pagination/Pagination";

export const dynamic = "force-static";
export const revalidate = 60;

interface ListPageProps {
  params: {
    number: string;
  };
}

export async function generateMetadata({
  params,
}: ListPageProps): Promise<Metadata> {
  const currentPage = parseInt(params.number);
  const [postList, total] = await PostService.getList({
    page: currentPage,
  });

  if (!postList) {
    return {
      title: "ページが見つかりません",
      description: "お探しのページは見つかりませんでした。",
    };
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / PostConst.sizePerPage);

  const blogTitle = isFirstPage ? `Blog` : `Blog - Page ${currentPage}`;
  const title = `${blogTitle} | ${SeoConst.myName}`;
  const pageDescription = isFirstPage ? "" : `の${currentPage}ページ目`;
  const description = `ブログ記事一覧${pageDescription}です。${SeoConst.blogPageDescription}`;
  const blogSlug = `/blog`;
  const slug = isFirstPage ? blogSlug : `${blogSlug}/page/${currentPage}`;

  const prevNextLinks: { rel: string; url: string }[] = [];

  if (!isFirstPage) {
    prevNextLinks.push({
      rel: "prev",
      url: `${SeoConst.domain}${blogSlug}/page/${currentPage - 1}`,
    });
  }

  if (!isLastPage) {
    prevNextLinks.push({
      rel: "next",
      url: `${SeoConst.domain}${blogSlug}/page/${currentPage + 1}`,
    });
  }

  return {
    title: blogTitle,
    description: description,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      title: title,
      description: description,
      siteName: SeoConst.defaultTitle,
      url: slug,
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
      title: title,
      description: description,
      creator: SeoConst.twitterId,
      site: SeoConst.twitterId,
      images: [SeoConst.defaultOgp.url],
    },
    alternates: {
      canonical: slug,
    },
    icons: {
      icon: SeoConst.icon,
      shortcut: SeoConst.icon,
      apple: SeoConst.appleIcon,
      other: prevNextLinks,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const Blog = async ({ params }: ListPageProps) => {
  const currentPage = parseInt(params.number);
  const [postList, total] = await PostService.getList({
    page: currentPage,
  });

  if (!postList) {
    notFound();
    return null; // 実際には返されないが、TypeScriptの型エラーを防ぐため
  }

  const isFirstPage = currentPage === 1;

  const blogTitle = isFirstPage ? `Blog` : `Blog - Page ${currentPage}`;
  const title = `${blogTitle} | ${SeoConst.myName}`;
  const pageDescription = isFirstPage ? "" : `の${currentPage}ページ目`;
  const description = `ブログ記事一覧${pageDescription}です。${SeoConst.blogPageDescription}`;
  const blogSlug = `${SeoConst.domain}/blog`;
  const slug = isFirstPage ? blogSlug : `${blogSlug}/page/${currentPage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    mainEntityOfPage: slug,
    headline: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: SeoConst.defaultOgp.url,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SeoConst.domain,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: blogTitle,
          item: slug,
        },
      ],
    },
    author: {
      "@type": "Person",
      name: SeoConst.myName,
      url: SeoConst.domain,
      image: SeoConst.defaultOgp.url,
      sameAs: [
        ProfileConst.socialLinks[0].href,
        ProfileConst.socialLinks[1].href,
        ProfileConst.socialLinks[2].href,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: SeoConst.myName,
      logo: {
        "@type": "ImageObject",
        url: SeoConst.icon,
      },
    },
  };

  return (
    <div className="flex flex-col flex-nowrap w-main mx-auto p-4 sm:p-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-center sm:text-left font-bold text-gray-600 mb-6 sm:mb-9">
        Blog
      </h1>
      {postList!.map((post) => {
        return (
          <div
            className="opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]"
            key={post.id}
          >
            <PostList post={post} />
          </div>
        );
      })}
      <Pagination
        total={total}
        sizePerPage={PostConst.sizePerPage}
        currentPage={currentPage}
        path="/blog/page"
      />
    </div>
  );
};

export default Blog;

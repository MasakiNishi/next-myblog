// const
import PostConst from "../../../constants/PostConst";
import SeoConst from "../../../constants/SeoConst";
import ProfileConst from "../../../constants/ProfileConst";
// service
import PostService from "../../../services/PostService";
// component
import PostList from "../../../components/molecules/postList/PostList";
import Pagination from "../../../components/molecules/pagination/Pagination";
// type
import PostListType from "../../../types/PostListType";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SearchPageProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const queryParam = searchParams.query || "";
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const [postList, total]: [PostListType[], number] = await PostService.getList(
    {
      page: currentPage,
      search: queryParam,
    }
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / PostConst.sizePerPage);

  const searchTitle = isFirstPage
    ? `Blog - "${queryParam}"`
    : `Blog - "${queryParam}" - Page ${currentPage}`;
  const title = `${searchTitle} | ${SeoConst.myName}`;
  const pageDescription = isFirstPage ? "" : `の${currentPage}ページ目`;
  const description = `検索クエリ "${queryParam}" に対する記事の検索結果一覧${pageDescription}です。${SeoConst.blogPageDescription}`;
  const searchSlug = `/blog/search`;
  const slug = `${searchSlug}?query=${queryParam}&page=${currentPage}`;

  const prevNextLinks: { rel: string; url: string }[] = [];

  if (currentPage > 1) {
    prevNextLinks.push({
      rel: "prev",
      url: `${SeoConst.domain}${searchSlug}?query=${queryParam}&page=${
        currentPage - 1
      }`,
    });
  }

  if (!isLastPage) {
    prevNextLinks.push({
      rel: "next",
      url: `${SeoConst.domain}${searchSlug}?query=${queryParam}&page=${
        currentPage + 1
      }`,
    });
  }

  return {
    title: searchTitle,
    description: description,
    openGraph: {
      title: title,
      description: description,
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
      title: title,
      description: description,
      images: [SeoConst.defaultOgp.url],
    },
    icons: {
      other: prevNextLinks,
    },
    robots: {
      index: false,
      follow: true,
      nocache: false,
      googleBot: {
        index: false,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const Search = async ({ searchParams }: SearchPageProps) => {
  const queryParam = searchParams.query || "";
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const [postList, total]: [PostListType[], number] = await PostService.getList(
    {
      page: currentPage,
      search: queryParam,
    }
  );

  const isFirstPage = currentPage === 1;

  const searchTitle = isFirstPage
    ? `Blog - "${queryParam}"`
    : `Blog - "${queryParam}" - Page ${currentPage}`;
  const title = `${searchTitle} | ${SeoConst.myName}`;
  const pageDescription = isFirstPage ? "" : `の${currentPage}ページ目`;
  const description = `検索クエリ "${queryParam}" に対する記事の検索結果一覧${pageDescription}です。${SeoConst.blogPageDescription}`;
  const blogSlug = `${SeoConst.domain}/blog`;
  const searchSlug = `${blogSlug}/search`;
  const slug = `${searchSlug}?query=${queryParam}&page=${currentPage}`;

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
          name: "Blog",
          item: blogSlug,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: searchTitle,
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
        {`Blog - "${queryParam}"`}
      </h1>
      {queryParam === "" ? (
        <p>検索キーワードを入力してください。</p>
      ) : postList.length === 0 ? (
        <p>
          記事が見つかりませんでした。別の検索キーワードを入力してください。
        </p>
      ) : (
        <>
          {postList.map((post) => (
            <div
              className="opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]"
              key={post.id}
            >
              <PostList post={post} />
            </div>
          ))}
          {postList.length > 0 && (
            <Pagination
              total={total}
              sizePerPage={PostConst.sizePerPage}
              currentPage={currentPage}
              path="/blog/search"
              query={queryParam}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Search;

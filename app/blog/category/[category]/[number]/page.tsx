import { notFound } from "next/navigation";
// constant
import PostConst from "../../../../../constants/PostConst";
import SeoConst from "../../../../../constants/SeoConst";
import ProfileConst from "../../../../../constants/ProfileConst";
// type
import type { Metadata } from "next";
// service
import PostService from "../../../../../services/PostService";
// component
import PostList from "../../../../../components/molecules/postList/PostList";
import Pagination from "../../../../../components/molecules/pagination/Pagination";

interface CategoryPageProps {
  params: {
    category: string;
    number: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = params.category;
  const categoryId = await PostService.getCategoryIdBySlug({
    slug: category,
  });

  const currentPage = parseInt(params.number);
  const [postList, total] = await PostService.getList({
    page: currentPage,
    categoryId,
  });

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  if (!postList) {
    return {
      title: "ページが見つかりません",
      description: "お探しのページは見つかりませんでした。",
    };
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / PostConst.sizePerPage);

  const categoryTitle = isFirstPage
    ? `Blog - ${categoryName}`
    : `Blog - ${categoryName} - Page ${currentPage}`;
  const title = `${categoryTitle} | ${SeoConst.myName}`;
  const pageDescription = isFirstPage ? "" : `の${currentPage}ページ目`;
  const description = `${categoryName}カテゴリーのブログ記事一覧${pageDescription}です。${SeoConst.blogPageDescription}`;
  const categorySlug = `/blog/category/${category}`;
  const slug = isFirstPage ? categorySlug : `${categorySlug}/${currentPage}`;

  const prevNextLinks: { rel: string; url: string }[] = [];

  if (!isFirstPage) {
    prevNextLinks.push({
      rel: "prev",
      url: `${SeoConst.domain}/${categorySlug}/${currentPage - 1}`,
    });
  }

  if (!isLastPage) {
    prevNextLinks.push({
      rel: "next",
      url: `${SeoConst.domain}/${categorySlug}/${currentPage + 1}`,
    });
  }

  return {
    title: categoryTitle,
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
    alternates: {
      canonical: slug,
    },
    icons: {
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

const Blog = async ({ params }: CategoryPageProps) => {
  const category = params.category;
  const categoryId = await PostService.getCategoryIdBySlug({ slug: category });

  const currentPage = parseInt(params.number);
  const [postList, total] = await PostService.getList({
    page: currentPage,
    categoryId,
  });

  if (!postList) {
    notFound();
    return null; // 実際には返されないが、TypeScriptの型エラーを防ぐため
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  const isFirstPage = currentPage === 1;

  const categoryTitle = isFirstPage
    ? `Blog - ${categoryName}`
    : `Blog - ${categoryName} - Page ${currentPage}`;
  const title = `${categoryTitle} | ${SeoConst.myName}`;
  const pageDescription = isFirstPage ? "" : `の${currentPage}ページ目`;
  const description = `${categoryName}カテゴリーのブログ記事一覧${pageDescription}です。${SeoConst.blogPageDescription}`;
  const blogSlug = `${SeoConst.domain}/blog`;
  const categorySlug = `${blogSlug}/category/${category}`;
  const slug = isFirstPage ? categorySlug : `${categorySlug}/${currentPage}`;

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
          name: categoryTitle,
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
        Blog - {categoryName}
      </h1>
      {postList!.map((post) => {
        return (
          <div key={post.id}>
            <PostList post={post} />
          </div>
        );
      })}
      <Pagination
        total={total}
        sizePerPage={PostConst.sizePerPage}
        currentPage={currentPage}
        path={`/blog/category/${category}`}
      />
    </div>
  );
};

export default Blog;

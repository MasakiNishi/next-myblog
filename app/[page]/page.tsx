import { notFound } from "next/navigation";
// const
import SeoConst from "../../constants/SeoConst";
import ProfileConst from "../../constants/ProfileConst";
// type
import PageType from "../../types/PageType";
import type { Metadata } from "next";
// service
import PageService from "../../services/PageService";
// component
import PageTitle from "../../components/atoms/common/text/Title";
import PageFeatureImage from "../../components/atoms/common/image/FeatureImage";
import Content from "../../components/atoms/common/text/Content";
import TwitterWidgets from "../../components/atoms/common/js/TwitterWidgets";

export const dynamic = "force-static";
export const revalidate = 60;

interface PageProps {
  params: {
    page: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page: PageType | null = await PageService.getOne({ id: params.page });

  if (!page) {
    return {
      title: "ページが見つかりません",
      description: "お探しのページは見つかりませんでした。",
    };
  }

  const isHome = params.page === "home";

  const title = `${page.title} | ${SeoConst.myName}`;
  const image = page.featuredImage?.ogp
    ? page.featuredImage.ogp
    : SeoConst.defaultOgp.url;
  const imageAlt = page.featuredImage?.alt
    ? page.featuredImage.alt
    : "Ogp Image";
  const slug = isHome ? SeoConst.domain : page.slug;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: title,
      description: page.description,
      url: slug,
      images: [
        {
          url: image,
          width: SeoConst.defaultOgp.width,
          height: SeoConst.defaultOgp.height,
          alt: imageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      title: title,
      description: page.description,
      images: [image],
    },
    alternates: {
      canonical: slug,
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

const Page = async ({ params }: PageProps) => {
  const page: PageType | null = await PageService.getOne({ id: params.page });

  if (!page) {
    notFound();
    return null; // 実際には返されないが、TypeScriptの型エラーを防ぐため
  }

  const isHome = params.page === "home";

  const pageSlug = `${SeoConst.domain}/${page.slug}`;
  const title = `${page.title} | ${SeoConst.defaultTitle}`;
  const image = page.featuredImage?.ogp
    ? page.featuredImage.ogp
    : SeoConst.defaultOgp.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isHome ? "WebSite" : "WebPage",
    ...(isHome ? {} : { mainEntityOfPage: pageSlug }),
    headline: title,
    description: page.description,
    image: {
      "@type": "ImageObject",
      url: image,
    },
    ...(isHome
      ? {}
      : {
          datePublished: page.date,
          dateModified: page.modifiedDate,
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
                name: page.title,
                item: pageSlug,
              },
            ],
          },
        }),
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
    <article className="w-main mx-auto max-w-[50em] p-4 sm:p-14">
      <TwitterWidgets />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mt-4 sm:mt-0 mb-7">
        <PageTitle>{page.title}</PageTitle>
      </div>
      <div className="opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
        {page.featuredImage && (
          <PageFeatureImage
            featuredImage={page.featuredImage}
            className="mb-7 -mx-4 sm:-mx-14 flex justify-center"
          />
        )}
        <Content content={page.content} />
      </div>
    </article>
  );
};

export default Page;

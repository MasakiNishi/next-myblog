import { notFound } from "next/navigation";
// constant
import SeoConst from "../../../constants/SeoConst";
import ProfileConst from "../../../constants/ProfileConst";
// type
import PostType from "../../../types/PostType";
import type { Metadata } from "next";
// service
import PostService from "../../../services/PostService";
// component
import PostFeatureImage from "../../../components/atoms/common/image/FeatureImage";
import PostCategory from "../../../components/atoms/post/text/PostCategory";
import PostDate from "../../../components/atoms/post/text/PostDate";
import PostTitle from "../../../components/atoms/common/text/Title";
import PostSubTitle from "../../../components/atoms/post/text/PostSubTitle";
import PostProfile from "../../../components/molecules/post/PostProfile";
import PostShare from "../../../components/molecules/post/PostShare";
import FollowSocialIcons from "../../../components/molecules/common/FollowSocialIcons";
import Content from "../../../components/atoms/common/text/Content";
import TwitterWidgets from "../../../components/atoms/common/js/TwitterWidgets";

export const dynamic = "force-static";
export const revalidate = 60;

interface PostPageProps {
  params: {
    post: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post: PostType | null = await PostService.getOne({ id: params.post });

  if (!post) {
    return {
      title: "ページが見つかりません",
      description: "お探しのページは見つかりませんでした。",
    };
  }

  const title = `${post.title} | ${SeoConst.myName}`;
  const url = `/blog/${post.slug}`;
  const image = post.featuredImage?.ogp
    ? post.featuredImage.ogp
    : SeoConst.defaultOgp.url;
  const imageAlt = post.featuredImage?.alt
    ? post.featuredImage.alt
    : "Ogp Image";

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      title: title,
      description: post.description,
      siteName: SeoConst.defaultTitle,
      url: url,
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
      card: "summary_large_image",
      title: title,
      description: post.description,
      creator: SeoConst.twitterId,
      site: SeoConst.twitterId,
      images: [image],
    },
    alternates: {
      canonical: url,
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

const PostPage = async ({ params }: PostPageProps) => {
  const post: PostType | null = await PostService.getOne({ id: params.post });

  if (!post) {
    notFound();
    return null; // 実際には返されないが、TypeScriptの型エラーを防ぐため
  }

  const blogSlug = `${SeoConst.domain}/blog`;
  const postSlug = `${blogSlug}/${post.slug}`;
  const title = `${post.title} | ${SeoConst.defaultTitle}`;
  const image = post.featuredImage?.ogp
    ? post.featuredImage.ogp
    : SeoConst.defaultOgp.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: postSlug,
    headline: title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: image,
    },
    datePublished: post.date,
    dateModified: post.modifiedDate,
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
          name: post.title,
          item: postSlug,
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
    <article className="w-main mx-auto max-w-[50em] p-4 sm:p-14">
      <TwitterWidgets />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-4 text-sm opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
        <PostCategory href={`/blog/category/${post.category.slug}`}>
          {post.category.name}
        </PostCategory>
      </div>
      <PostTitle>{post.title}</PostTitle>
      <div className="opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
        <PostSubTitle>{post.subTitle}</PostSubTitle>
        <div className="flex mt-5 mb-7 text-sm">
          <PostDate dateTime={post.date.split("T")[0]}>
            投稿日: {post.date.split("T")[0]}
          </PostDate>
          <PostDate dateTime={post.date.split("T")[0]}>
            更新日: {post.modifiedDate.split("T")[0]}
          </PostDate>
        </div>
        {post.featuredImage && (
          <PostFeatureImage
            featuredImage={post.featuredImage}
            className="mb-7 -mx-4 sm:-mx-14 flex justify-center"
          />
        )}
        <Content content={post.content} />
      </div>
      <PostShare slug={postSlug} title={post.title} />
      <div className="text-center mt-8 mb-5">
        <p className="text-lg sm:text-xl lg:text-xl text-gray-600 mt-8 mb-5">
          フォローする
        </p>
        <FollowSocialIcons />
      </div>
      <div>
        <PostProfile />
      </div>
    </article>
  );
};

export default PostPage;

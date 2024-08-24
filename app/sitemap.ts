import { MetadataRoute } from "next";
// constant
import SeoConst from "../constants/SeoConst";
import PostConst from "../constants/PostConst";
// service
import PostService from "../services/PostService";
import SitemapService from "../services/SitemapService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = SeoConst.domain;
  const blogSlug = `${domain}/blog`;
  const blogPaginationSlug = `${domain}/blog/page`;
  const blogCategorySlug = `${domain}/blog/category`;

  // 固定ページのURLを生成
  const pageSlugList = await SitemapService.getPageSlugList();

  const pageUrls = pageSlugList
    .filter(({ slug }) => slug !== "home")
    .map(({ slug, modifiedDate }) => {
      const dateObj = new Date(modifiedDate);
      return {
        url: `${domain}/${slug}`,
        lastModified: dateObj.toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });

  // 記事ページのURLを生成
  const [postSlugList, postTotal] = await SitemapService.getPostSlugList({
    page: 1,
  });
  const blogPostUrls = postSlugList.map(({ slug, modifiedDate }) => {
    const dateObj = new Date(modifiedDate);
    return {
      url: `${blogSlug}/${slug}`,
      lastModified: dateObj.toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    };
  });

  // 記事一覧のページネーションリンクを生成
  const totalPostPages = Math.ceil(postTotal / PostConst.sizePerPage);
  const blogPaginationUrls = Array.from({ length: totalPostPages }, (_, i) => ({
    url: i === 0 ? `${blogSlug}` : `${blogPaginationSlug}/${i + 1}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // カテゴリーページのページネーションリンクを生成
  const categoryList = (await PostService.getCategoryList()) ?? [];
  const categoryPageUrls = [];
  for (const category of categoryList) {
    const categoryId = await PostService.getCategoryIdBySlug({
      slug: category.slug,
    });
    const [, categoryPostTotal] = await SitemapService.getPostSlugList({
      page: 1,
      categoryId,
    });
    const totalCategoryPages = Math.ceil(
      categoryPostTotal / PostConst.sizePerPage
    );

    for (let i = 0; i < totalCategoryPages; i++) {
      categoryPageUrls.push({
        url:
          i === 0
            ? `${blogCategorySlug}/${category.slug}`
            : `${blogCategorySlug}/${category.slug}/${i + 1}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    }
  }

  return [
    {
      url: domain,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...pageUrls,
    ...blogPaginationUrls,
    ...categoryPageUrls,
    ...blogPostUrls,
  ];
}

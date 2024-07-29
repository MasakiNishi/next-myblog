// type
import PageType from "../types/PageType";
// repository
import RepositoryFactory from "../repositories/RepositoryFactory";

class PageService {
  // slugから固定ページ単体を取得
  static async getOne({ id }: { id: string }): Promise<PageType | null> {
    try {
      const res = await RepositoryFactory.page.getOne({ id });
      const data = res.data.data.page;

      const featuredImage =
        data.featuredImage && data.featuredImage.node
          ? {
              url: data.featuredImage.node.sourceUrl,
              alt: data.featuredImage.node.altText,
            }
          : null;

      const page: PageType = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        date: data.date,
        modifiedDate: data.modified,
        content: data.content,
        description: data.description.description,
        featuredImage: featuredImage,
      };
      return page;
    } catch {
      return null;
    }
  }
}

export default PageService;

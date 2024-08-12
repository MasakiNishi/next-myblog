// constant
import SitemapConst from "../constants/SitemapConst";
// type
import SlugType from "../types/SlugType";
import OffsetPaginationType from "../types/OffsetPaginationType";
// repository
import RepositoryFactory from "../repositories/RepositoryFactory";

class SitemapService {
  // 記事のスラッグ一覧を取得
  static async getPostSlugList({
    page,
    categoryId,
  }: {
    page: number;
    categoryId?: number;
  }): Promise<[SlugType[], number]> {
    try {
      const offsetPagination = this._makeOffsetPaginationFromPage(page);
      const res = await RepositoryFactory.sitemap.getAllPostSlug({
        offsetPagination: offsetPagination,
        categoryId: categoryId,
      });
      const postSlugList = res.data.data.posts.edges.map((data: any) => {
        const postSlug: SlugType = {
          slug: data.node.slug,
          modifiedDate: data.node.modified,
        };
        return postSlug;
      });
      const total = res.data.data.posts.pageInfo.offsetPagination.total;
      return [postSlugList, total];
    } catch {
      return [[], 0];
    }
  }

  // 固定ページのスラッグ一覧を取得
  static async getPageSlugList(): Promise<SlugType[]> {
    try {
      const res = await RepositoryFactory.sitemap.getAllPageSlug();
      const pageSlugList = res.data.data.pages.edges.map((data: any) => {
        const pageSlug: SlugType = {
          slug: data.node.slug,
          modifiedDate: data.node.modified,
        };
        return pageSlug;
      });
      return pageSlugList;
    } catch {
      return [];
    }
  }

  // ページネーションの設定
  private static _makeOffsetPaginationFromPage(
    page: number
  ): OffsetPaginationType {
    return {
      offset: (page - 1) * SitemapConst.sizePerPage,
      size: SitemapConst.sizePerPage,
    };
  }
}

export default SitemapService;

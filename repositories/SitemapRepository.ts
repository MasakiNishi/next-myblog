// constant
import { WpGraphQlSitemapConst } from "../constants/WpGraphQlConst";
// type
import OffsetPaginationType from "../types/OffsetPaginationType";
// repository
import Repository from "./Repository";

class SitemapRepository {
  // 記事のスラッグ一覧取得
  static getAllPostSlug({
    offsetPagination,
    categoryId,
  }: {
    offsetPagination: OffsetPaginationType;
    categoryId?: number;
  }) {
    if (categoryId) {
      return Repository(WpGraphQlSitemapConst.allPostSlugByCategory, {
        variables: { offsetPagination, categoryId },
      }).getWp();
    }
    return Repository(WpGraphQlSitemapConst.allPostSlug, {
      variables: { offsetPagination },
    }).getWp();
  }

  // 固定ページのスラッグ一覧取得
  static getAllPageSlug() {
    return Repository(WpGraphQlSitemapConst.allPageSlug).getWp();
  }
}

export default SitemapRepository;

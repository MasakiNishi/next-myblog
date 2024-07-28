// repository
import Repository from "./Repository";
// type
import OffsetPaginationType from "../types/OffsetPaginationType";
// constant
import { WpGraphQlPostConst } from "../constants/WpGraphQlConst";

class PostRepository {
  // 記事一覧
  static getList({
    offsetPagination,
    categoryId,
  }: {
    offsetPagination: OffsetPaginationType;
    categoryId?: number;
  }) {
    if (categoryId) {
      return Repository(WpGraphQlPostConst.postListByCategory, {
        variables: { offsetPagination, categoryId },
      }).getWp();
    }
    return Repository(WpGraphQlPostConst.postList, {
      variables: { offsetPagination },
    }).getWp();
  }

  // slugから記事単体を取得
  static getOne({ id }: { id: string }) {
    return Repository(WpGraphQlPostConst.onePost, {
      variables: { id },
    }).getWp();
  }

  // スラッグからカテゴリーIDを取得する
  static getCategoryIdBySlug({ slug }: { slug: string }) {
    return Repository(WpGraphQlPostConst.categoryIdBySlug, {
      variables: { id: slug },
    }).getWp();
  }

  // カテゴリー一覧を取得
  static getCategoryList() {
    return Repository(WpGraphQlPostConst.categoryList).getWp();
  }

  // 記事総数を取得
  static getPostTotal() {
    return Repository(WpGraphQlPostConst.postTotal).getWp();
  }
}

export default PostRepository;

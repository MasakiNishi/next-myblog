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
    search,
  }: {
    offsetPagination: OffsetPaginationType;
    categoryId?: number;
    search?: string;
  }) {
    if (categoryId) {
      return Repository(WpGraphQlPostConst.postListByCategory, {
        variables: { offsetPagination, categoryId },
      }).getWp();
    } else if (search) {
      return Repository(WpGraphQlPostConst.searchPostList, {
        variables: { offsetPagination, search },
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
}

export default PostRepository;

// repository
import Repository from "./Repository";
// type
import OffsetPaginationType from "../types/OffsetPaginationType";
// constant
import { WpGraphQlPostConst } from "../constants/WpGraphQlConst";

class PostRepository {
  // 記事一覧
  static async getList({
    offsetPagination,
    categoryId,
    search,
  }: {
    offsetPagination: OffsetPaginationType;
    categoryId?: number;
    search?: string;
  }) {
    if (categoryId) {
      return (
        await Repository(WpGraphQlPostConst.postListByCategory, {
          variables: { offsetPagination, categoryId },
        })
      ).getWp();
    } else if (search) {
      return (
        await Repository(WpGraphQlPostConst.searchPostList, {
          variables: { offsetPagination, search },
        })
      ).getWp();
    }
    return (
      await Repository(WpGraphQlPostConst.postList, {
        variables: { offsetPagination },
      })
    ).getWp();
  }

  // slugから記事単体を取得
  static async getOne({ id }: { id: string }) {
    return (
      await Repository(WpGraphQlPostConst.onePost, {
        variables: { id },
      })
    ).getWp();
  }

  // スラッグからカテゴリーIDを取得する
  static async getCategoryIdBySlug({ slug }: { slug: string }) {
    return (
      await Repository(WpGraphQlPostConst.categoryIdBySlug, {
        variables: { id: slug },
      })
    ).getWp();
  }

  // カテゴリー一覧を取得
  static async getCategoryList() {
    return (await Repository(WpGraphQlPostConst.categoryList)).getWp();
  }
}

export default PostRepository;

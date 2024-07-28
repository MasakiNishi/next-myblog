// repository
import Repository from "./Repository";
// constant
import { WpGraphQlPostConst } from "../constants/WpGraphQlConst";

class PostRepository {
  // 記事一覧
  static getList({ categoryId }: { categoryId?: number }) {
    if (categoryId) {
      return Repository(WpGraphQlPostConst.postListByCategory, {
        variables: { categoryId },
      }).getWp();
    }
    return Repository(WpGraphQlPostConst.postList).getWp();
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

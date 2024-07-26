// repository
import Repository from "./Repository";
// constant
import { WpGraphQlPostConst } from "../constants/WpGraphQlConst";

class PostRepository {
  // 記事一覧
  static getList() {
    return Repository(WpGraphQlPostConst.postList).getWp();
  }

  // slugから記事単体を取得
  static getOne({ id }: { id: string }) {
    return Repository(WpGraphQlPostConst.onePost, {
      variables: { id },
    }).getWp();
  }
}

export default PostRepository;

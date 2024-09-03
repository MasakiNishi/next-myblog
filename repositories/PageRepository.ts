// repository
import Repository from "./Repository";
// constant
import { WpGraphQlPageConst } from "../constants/WpGraphQlConst";

class PageRepository {
  // slugから固定ページ単体を取得
  static async getOne({ id }: { id: string }) {
    return (
      await Repository(WpGraphQlPageConst.onePage, {
        variables: { id },
      })
    ).getWp();
  }
}

export default PageRepository;

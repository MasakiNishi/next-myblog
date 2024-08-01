// repository
import Repository from "./Repository";
// constant
import { WpGraphQlProfileConst } from "../constants/WpGraphQlConst";

class ProfileRepository {
  // ユーザープロフィールを取得
  static getUser({ id }: { id: string }) {
    return Repository(WpGraphQlProfileConst.userProfile, {
      variables: { id },
    }).getWp();
  }
}

export default ProfileRepository;

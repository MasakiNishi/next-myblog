// repository
import Repository from "./Repository";
// constant
import { WpGraphQlProfileConst } from "../constants/WpGraphQlConst";

class ProfileRepository {
  // ユーザープロフィールを取得
  static async getUser({ id }: { id: string }) {
    return (
      await Repository(WpGraphQlProfileConst.userProfile, {
        variables: { id },
      })
    ).getWp();
  }
}

export default ProfileRepository;

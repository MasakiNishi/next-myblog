// type
import ProfileType from "../types/ProfileType";
// repository
import RepositoryFactory from "../repositories/RepositoryFactory";

class ProfileService {
  // ユーザープロフィールを取得
  static async getProfile({ id }: { id: string }): Promise<ProfileType | null> {
    try {
      const res = await RepositoryFactory.profile.getUser({ id });
      const data = res.data.data.user;

      const user: ProfileType = {
        id: data.id,
        image: data.avatar.url,
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: data.name,
        description: data.description,
      };
      return user;
    } catch {
      return null;
    }
  }
}

export default ProfileService;

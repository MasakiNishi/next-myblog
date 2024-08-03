// service
import ProfileService from "../../../services/ProfileService";
// constant
import ProfileConst from "../../../constants/ProfileConst";
// type
import ProfileType from "../../../types/ProfileType";
// component
import Link from "next/link";
import Avatar from "../../atoms/common/image/Avatar";
import ProfileName from "../../atoms/common/text/ProfileName";
import ProfileText from "../../atoms/common/text/ProfileText";

const PostProfile = async () => {
  const profile: ProfileType | null = await ProfileService.getProfile({
    id: ProfileConst.id,
  });

  const profileImage = profile?.image
    ? profile.image
    : ProfileConst.profileImage;

  const profileName =
    profile?.firstName && profile?.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : ProfileConst.profileName;

  const profileDescription = profile?.description
    ? profile.description
    : ProfileConst.profileDescription;

  return (
    <div className="flex flex-row items-center mt-12 py-12 border-t border-b border-t-customGray border-b-customGray">
      <Avatar
        imageSrc={profileImage}
        className="w-9 h-9 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-customGray relative m-3 ml-0 sm:m-4 flex-shrink-0"
      />
      <div>
        <ProfileName
          name={profileName}
          className="font-bold text-gray-600 mb-2"
        />
        <ProfileText description={profileDescription} className="mb-2" />
        <span>
          → <Link href="/about">詳細プロフィール</Link>
        </span>
      </div>
    </div>
  );
};

export default PostProfile;

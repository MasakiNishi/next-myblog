// component
import Link from "next/link";
import Avatar from "../../atoms/common/image/Avatar";
import ProfileName from "../../atoms/common/text/ProfileName";
import ProfileText from "../../atoms/common/text/ProfileText";

const PostProfile = () => {
  return (
    <div className="flex flex-row items-center mt-12 py-12 border-t border-b border-t-customGray border-b-customGray">
      <Avatar className="mx-4 flex-shrink-0" />
      <div>
        <ProfileName className="font-bold text-gray-600 mb-2" />
        <ProfileText className="mb-2" />
        <span>
          → <Link href="/about">詳細プロフィール</Link>
        </span>
      </div>
    </div>
  );
};

export default PostProfile;

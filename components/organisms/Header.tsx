// service
import ProfileService from "../../services/ProfileService";
// constant
import ProfileConst from "../../constants/ProfileConst";
// type
import ProfileType from "../../types/ProfileType";
// component
import HeaderTitle from "../molecules/header/HeaderTitle";
import HeaderMenu from "../molecules/header/HeaderMenu";
import HeaderSocialIcons from "../molecules/header/HeaderSocialIcons";
import ProfileText from "../atoms/common/text/ProfileText";

const Header = async () => {
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

  const profileJobTitle = profile?.jobTitle
    ? profile?.jobTitle
    : ProfileConst.profileJobTitle;

  const profileDescription = profile?.description
    ? profile.description
    : ProfileConst.profileDescription;

  return (
    <header className="px-10 pt-7 pb-0 w-[320px] h-full fixed left-0 top-0 bottom-0 bg-white flex flex-col justify-between after:content-[''] after:absolute after:top-[20px] after:right-0 after:bottom-[20px] after:w-[1px] after:bg-customGray">
      <div>
        <HeaderTitle
          title={profileName}
          subtitle={profileJobTitle}
          avatarSrc={profileImage}
        />
        <ProfileText
          description={profileDescription}
          className="text-sm font-light text-center mt-4 mb-5"
        />
        <HeaderMenu />
      </div>
      <div className="mt-auto mb-4">
        <p className="mb-2 font-light text-center tracking-widest">
          Follow Me:
        </p>
        <HeaderSocialIcons />
      </div>
    </header>
  );
};

export default Header;

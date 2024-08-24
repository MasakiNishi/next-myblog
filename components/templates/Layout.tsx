// service
import ProfileService from "../../services/ProfileService";
// constant
import ProfileConst from "../../constants/ProfileConst";
// type
import ProfileType from "../../types/ProfileType";
// component
import { ReactNode } from "react";
import Header from "../organisms/Header";
import MobileHeader from "../organisms/MobileHeader";
import Footer from "../organisms/Footer";
import ActionsBar from "../organisms/ActionsBar";

const Layout = async ({ children }: { children: ReactNode }) => {
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
    ? profile.jobTitle
    : ProfileConst.profileJobTitle;

  const profileDescription = profile?.description
    ? profile.description
    : ProfileConst.profileDescription;

  return (
    <div className="flex flex-col min-h-screen scrollbar-custom">
      <Header
        title={profileName}
        subTitle={profileJobTitle}
        avatarSrc={profileImage}
        description={profileDescription}
        className="hidden lg:flex"
      />
      <MobileHeader
        title={profileName}
        subTitle={profileJobTitle}
        avatarSrc={profileImage}
        className="fixed lg:hidden"
      />
      <main
        id="top"
        className="flex-grow lg:ml-[320px] scroll-mt-[60px] bg-white"
      >
        {children}
      </main>
      <Footer className="lg:ml-[320px]" />
      <ActionsBar />
    </div>
  );
};

export default Layout;

import HeaderTitle from "../molecules/header/HeaderTitle";
import HeaderMenu from "../molecules/header/HeaderMenu";
import HeaderSocialIcons from "../molecules/header/HeaderSocialIcons";
import ProfileText from "../atoms/common/text/ProfileText";

// temp hard-coded data

const title = "Masaki Nishi";
const subtitle = "ソフトウェアエンジニア";

const socialLinks = [
  { href: "https://x.com", iconSrc: "/images/sns/twitter.svg", title: "X" },
  {
    href: "https://youtube.com",
    iconSrc: "/images/sns/youtube.svg",
    title: "YouTube",
  },
  {
    href: "https://instagram.com",
    iconSrc: "/images/sns/instagram.svg",
    title: "Instagram",
  },
];

const Header = () => {
  return (
    <header className="px-10 pt-7 pb-0 w-[320px] h-full fixed left-0 top-0 bottom-0 bg-white flex flex-col justify-between after:content-[''] after:absolute after:top-[20px] after:right-0 after:bottom-[20px] after:w-[1px] after:bg-customGray">
      <div>
        <HeaderTitle title={title} subtitle={subtitle} />
        <ProfileText className="text-sm font-light text-center mt-4 mb-5" />
        <HeaderMenu />
      </div>
      <div className="mt-auto mb-4">
        <p className="mb-2 font-light text-center tracking-widest">
          Follow Me:
        </p>
        <HeaderSocialIcons socialLinks={socialLinks} />
      </div>
    </header>
  );
};

export default Header;

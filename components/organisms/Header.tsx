// component
import HeaderTitle from "../molecules/header/HeaderTitle";
import HeaderMenu from "../molecules/header/HeaderMenu";
import HeaderSocialIcons from "../molecules/header/HeaderSocialIcons";
import ProfileText from "../atoms/common/text/ProfileText";

const Header = ({
  title,
  subTitle,
  avatarSrc,
  description,
  className = "",
}: {
  title: string;
  subTitle: string;
  avatarSrc: string;
  description: string;
  className?: string;
}) => {
  return (
    <header
      className={`z-20 w-[75%] max-w-[320px] px-10 pt-7 pb-0 h-full fixed left-0 top-0 bottom-0 bg-white flex-col justify-between after:content-[''] after:absolute after:top-[20px] after:right-0 after:bottom-[20px] after:w-[1px] after:bg-customGray ${className}`}
    >
      <div>
        <HeaderTitle
          title={title}
          subTitle={subTitle}
          avatarSrc={avatarSrc}
          className="flex flex-col items-center space-y-2"
          avatarClassName="w-16 h-16 rounded-full overflow-hidden border border-customGray relative"
          titleClassName="mt-4 text-2xl font-light text-gray-600 leading-5"
          subTitleClassName="text-xs text-gray-500"
        />
        <ProfileText
          description={description}
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

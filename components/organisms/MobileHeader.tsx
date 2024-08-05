import HeaderTitle from "../molecules/header/HeaderTitle";
import MobileHeaderMenu from "../molecules/mobileHeader/MobileHeaderMenu";

const MobileHeader = ({
  title,
  subTitle,
  avatarSrc,
  className = "",
}: {
  title: string;
  subTitle: string;
  avatarSrc: string;
  className?: string;
}) => {
  return (
    <header
      className={`z-10 top-0 left-0 w-full h-[60px] py-3 px-3 bg-white after:content-[''] after:absolute after:bottom-0 after:left-[1rem] after:right-[1rem] after:h-[1px] after:bg-customGray ${className}`}
    >
      <div className="flex justify-between items-center w-full">
        <HeaderTitle
          title={title}
          subTitle={subTitle}
          avatarSrc={avatarSrc}
          className="flex flex-row space-x-2 px-2"
          avatarClassName="w-9 h-9 rounded-full overflow-hidden border border-customGray relative"
          titleClassName="mt-[3px] text-lg font-light text-gray-600 leading-4"
          subTitleClassName="text-[.6em] text-gray-600 font-normal"
        />
        <MobileHeaderMenu />
      </div>
    </header>
  );
};

export default MobileHeader;

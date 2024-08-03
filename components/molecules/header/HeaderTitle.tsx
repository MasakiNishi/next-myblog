// component
import Link from "next/link";
import Avatar from "../../atoms/common/image/Avatar";
import HeaderTitleText from "../../atoms/header/text/HeaderTitleText";

const HeaderTitle = ({
  title,
  subTitle,
  avatarSrc,
  className,
  avatarClassName,
  titleClassName,
  subTitleClassName,
}: {
  title: string;
  subTitle: string;
  avatarSrc: string;
  className?: string;
  avatarClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}) => {
  return (
    <Link href="/" className={`${className}`}>
      <Avatar imageSrc={avatarSrc} className={`${avatarClassName}`} />
      <HeaderTitleText
        title={title}
        subTitle={subTitle}
        titleClassName={titleClassName}
        subTitleClassName={subTitleClassName}
      />
    </Link>
  );
};

export default HeaderTitle;

// component
import Link from "next/link";
import HeaderAvatar from "../../atoms/header/image/HeaderAvatar";
import HeaderTextTitle from "../../atoms/header/text/HeaderTitleText";

const HeaderTitle = ({
  avatarSrc,
  avatarAlt,
  title,
  subtitle,
}: {
  avatarSrc: string;
  avatarAlt: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <Link href="/" className="flex flex-col items-center space-y-2">
      <HeaderAvatar src={avatarSrc} alt={avatarAlt} />
      <HeaderTextTitle title={title} subtitle={subtitle} />
    </Link>
  );
};

export default HeaderTitle;

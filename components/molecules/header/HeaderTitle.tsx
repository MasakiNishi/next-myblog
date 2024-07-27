// component
import Link from "next/link";
import Avatar from "../../atoms/common/image/Avatar";
import HeaderTextTitle from "../../atoms/header/text/HeaderTitleText";

const HeaderTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Link href="/" className="flex flex-col items-center space-y-2">
      <Avatar />
      <HeaderTextTitle title={title} subtitle={subtitle} />
    </Link>
  );
};

export default HeaderTitle;

// component
import Link from "next/link";

const HeaderMenuLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="text-base font-light hover:text-gray-800">
      {children}
    </Link>
  );
};

export default HeaderMenuLink;

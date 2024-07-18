// component
import { ReactNode } from "react";
import Link from "next/link";

const PostListCategory = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="font-light text-sm text-gray-800 mr-2 hover:text-linkColor"
    >
      {children}
    </Link>
  );
};

export default PostListCategory;

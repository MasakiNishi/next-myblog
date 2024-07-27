// component
import { ReactNode } from "react";
import Link from "next/link";

const PostCategory = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href} className="mr-3">
      {children}
    </Link>
  );
};

export default PostCategory;

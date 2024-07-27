// component
import { ReactNode } from "react";

const PostCategory = ({
  dateTime,
  children,
}: {
  dateTime: string;
  children: ReactNode;
}) => {
  return (
    <time dateTime={dateTime} className="mr-3 text-gray-600">
      {children}
    </time>
  );
};

export default PostCategory;

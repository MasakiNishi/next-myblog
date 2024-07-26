// component
import { ReactNode } from "react";

const PostListDate = ({ children }: { children: ReactNode }) => {
  return <span className="text-sm font-light text-gray-800">{children}</span>;
};

export default PostListDate;

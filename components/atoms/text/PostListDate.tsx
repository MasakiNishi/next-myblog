import { ReactNode } from "react";

const PostListDate = ({ children }: { children: ReactNode }) => {
  return (
    <span className="text-gray-500 font-light inline-block">{children}</span>
  );
};

export default PostListDate;

// component
import { ReactNode } from "react";

const PostListTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-xl font-bold text-gray-600 group-hover/title:text-linkColor">
      {children}
    </h2>
  );
};

export default PostListTitle;

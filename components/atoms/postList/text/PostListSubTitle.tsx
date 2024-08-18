// component
import { ReactNode } from "react";

const PostListSubTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="font-light text-lg text-gray-800 group-hover/title:text-linkColor">
      {children}
    </h3>
  );
};

export default PostListSubTitle;

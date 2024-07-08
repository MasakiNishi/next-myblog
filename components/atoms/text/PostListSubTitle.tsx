import { ReactNode } from "react";

const PostListSubTitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="font-bold text-lg">{children}</h3>;
};

export default PostListSubTitle;

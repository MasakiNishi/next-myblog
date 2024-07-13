import { ReactNode } from "react";

const PostListTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="font-bold text-lg">{children}</h2>;
};

export default PostListTitle;

// component
import { ReactNode } from "react";

const PostTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="font-bold text-gray-600 mb-5">{children}</h1>;
};

export default PostTitle;

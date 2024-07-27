// component
import { ReactNode } from "react";

const PostSubTitle = ({ children }: { children: ReactNode }) => {
  return <p className="font-light text-xl text-gray-600">{children}</p>;
};

export default PostSubTitle;

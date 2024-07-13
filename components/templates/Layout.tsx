// component
import { ReactNode } from "react";
import Header from "../organisms/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Header />
      <main className="ml-[340px] p-4 w-full">{children}</main>
    </div>
  );
};

export default Layout;

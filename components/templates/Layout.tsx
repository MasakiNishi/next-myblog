// component
import { ReactNode } from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow ml-[320px] p-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

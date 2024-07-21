// component
import { ReactNode } from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import ActionBar from "../organisms/ActionsBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen scrollbar-custom">
      <Header />
      <main id="top" className="flex-grow ml-[320px] mr-[60px] p-10">
        {children}
      </main>
      <Footer />
      <ActionBar categories={["careers", "life"]} />
    </div>
  );
};

export default Layout;

import { LayoutType } from "@/types";

import MainNav from "../organisms/MainNav";
import NewsLetter from "../organisms/NewsLetter";
import Footer from "../organisms/Footer";

const MainLayout = ({ children }: LayoutType) => {
  return (
    <div className="min-h-screen w-full relative">
      <MainNav />
      <main>{children}</main>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default MainLayout;

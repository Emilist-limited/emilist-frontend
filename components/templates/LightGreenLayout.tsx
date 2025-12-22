import { ReactNode } from "react";

const LightGreenLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[rgb(240,253,245)] flex-1 w-full">
      <main className="sm:py-28 py-14 min-h-screen padding-ctn">
        {children}
      </main>
    </div>
  );
};

export default LightGreenLayout;

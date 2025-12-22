import DashboardHeader from "../molecules/DashboardHeader";
import DashboardCardWrapper from "../organisms/DashboardCardWrapper";
import DashboardNavbar from "../organisms/DashboardNavbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full relative">
      <DashboardNavbar />
      <section className="sm:pt-28 pt-14 bg-[#F0FDF5] w-full min-h-screen">
        <div className=" padding-ctn">
          <div className="grid grid-cols-11 gap-4 py-10 max-sm:pt-4">
            <div className="lg:col-span-8 col-span-11  w-full flex flex-col gap-4 ">
              <DashboardHeader />
              <div className="lg:hidden max-lg:col-span-11 w-full">
                <DashboardCardWrapper />
              </div>
              {children}
            </div>
            <div className="col-span-3 w-full max-lg:hidden">
              <DashboardCardWrapper />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;

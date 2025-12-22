import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import ReportSidebar from "./ReportSidebar";
import LightGreenLayout from "@/components/templates/LightGreenLayout";
import ReportContent from "./ReportContent";

const ReportWrapper = () => {
  return (
    <div className="relative">
      <DashboardNavbar showNavLinks={false} />
      <ReportSidebar />
      <LightGreenLayout>
        <div className="flex">
          <div className="w-72  min-w-72 max-xl:hidden" />
          <ReportContent />
        </div>
      </LightGreenLayout>
    </div>
  );
};

export default ReportWrapper;

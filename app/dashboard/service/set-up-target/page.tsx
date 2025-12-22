import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import SetUpTargetWrapper from "@/features/report/components/SetUpTargetWrapper";

const page = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <SetUpTargetWrapper />
    </div>
  );
};

export default page;

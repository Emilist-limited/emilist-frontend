import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import PlannedMaintenanceForm from "@/features/jobs/components/forms/PlannedMaintenanceForm";

const page = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <PlannedMaintenanceForm />
    </div>
  );
};

export default page;

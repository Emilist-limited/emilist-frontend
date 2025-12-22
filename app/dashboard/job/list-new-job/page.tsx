import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import NewJobForm from "@/features/jobs/components/forms/NewJobForm";

const ListNewJob = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <NewJobForm />
    </div>
  );
};

export default ListNewJob;

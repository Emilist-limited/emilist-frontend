import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import UserRecurringJobsWrapper from "@/features/jobs/components/UserRecurringJobsWrapper";

const page = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <UserRecurringJobsWrapper />
    </div>
  );
};

export default page;

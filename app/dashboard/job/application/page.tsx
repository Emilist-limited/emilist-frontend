import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import UserAppliedJobsWrapper from "@/features/jobs/components/UserAppliedJobsWrapper";

const UserAppliedJobsPage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <UserAppliedJobsWrapper />
    </div>
  );
};

export default UserAppliedJobsPage;

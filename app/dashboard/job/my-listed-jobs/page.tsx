import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import CurrentUserLisetdJobWrapper from "@/features/jobs/components/CurrentUserLisetdJobWrapper";

const UserListedJobsPage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <CurrentUserLisetdJobWrapper />
    </div>
  );
};

export default UserListedJobsPage;

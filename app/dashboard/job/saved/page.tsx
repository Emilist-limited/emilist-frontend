import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import UserSavedJobsWrapper from "@/features/jobs/components/UserSavedJobsWrapper";

const UserSavedJobsPage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <UserSavedJobsWrapper />
    </div>
  );
};

export default UserSavedJobsPage;

import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import UserProfileWrapper from "@/features/user/components/UserProfileWrapper";

const page = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <UserProfileWrapper />
    </div>
  );
};

export default page;

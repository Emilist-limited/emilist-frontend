import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import UserListedMaterialWrapper from "@/features/materials/components/UserListedMaterialWrapper";

const UserListedMaterialPage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <UserListedMaterialWrapper />
    </div>
  );
};

export default UserListedMaterialPage;

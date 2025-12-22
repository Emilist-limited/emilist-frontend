import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import UserSavedMaterials from "@/features/materials/components/UserSavedMaterials";

const page = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <UserSavedMaterials />
    </div>
  );
};

export default page;

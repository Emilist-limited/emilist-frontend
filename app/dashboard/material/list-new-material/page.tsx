import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import NewMaterialForm from "@/features/materials/components/forms/NewMaterialForm";

const page = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <NewMaterialForm />
    </div>
  );
};

export default page;

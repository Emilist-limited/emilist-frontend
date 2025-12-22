import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import EditMaterialInfoForm from "@/features/materials/components/forms/EditMaterialInfoForm";

const page = ({ params }: { params: { materialId: string } }) => {
  const materialId = params?.materialId;
  return (
    <div className="relative">
      <DashboardNavbar />
      <EditMaterialInfoForm materialId={materialId} />
    </div>
  );
};

export default page;

import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import MaterialInfoWrapper from "@/features/materials/components/MaterialInfoWrapper";

const page = ({ params }: { params: { materialId: string } }) => {
  const materialId = params?.materialId;

  return (
    <div className="relative">
      <DashboardNavbar />
      <MaterialInfoWrapper materialId={materialId} />
    </div>
  );
};

export default page;

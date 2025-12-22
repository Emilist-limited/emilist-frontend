import MainLayout from "@/components/templates/MainLayout";
import PublicMaterialInfoWrapper from "@/features/materials/components/PublicMaterialInfoWrapper";

interface PageParams {
  materialId: string;
}

const MaterialInfoPage = ({ params }: { params: PageParams }) => {
  const materialId = params?.materialId;

  return (
    <MainLayout>
      <PublicMaterialInfoWrapper materialId={materialId} />
    </MainLayout>
  );
};

export default MaterialInfoPage;

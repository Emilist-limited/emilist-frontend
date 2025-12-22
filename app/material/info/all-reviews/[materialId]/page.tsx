import MainLayout from "@/components/templates/MainLayout";
import MaterialReviewWrapper from "@/features/materials/components/MaterialReviewWrapper";

interface PageParams {
  materialId: string;
}

const AllReviewsForMaterialPage = ({ params }: { params: PageParams }) => {
  const materialId = params?.materialId;

  return (
    <MainLayout>
      <MaterialReviewWrapper materialId={materialId} />
    </MainLayout>
  );
};

export default AllReviewsForMaterialPage;

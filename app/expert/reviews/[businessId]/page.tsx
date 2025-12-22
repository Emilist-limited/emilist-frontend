import MainLayout from "@/components/templates/MainLayout";
import BusinessReviewWrapper from "@/features/services/components/BusinessReviewWrapper";

interface PageParams {
  businessId: string;
}

const ReviewServicePage = ({ params }: { params: PageParams }) => {
  const businessId = params?.businessId;

  return (
    <MainLayout>
      <BusinessReviewWrapper businessId={businessId} />
    </MainLayout>
  );
};

export default ReviewServicePage;

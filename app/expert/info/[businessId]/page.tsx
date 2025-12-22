import MainLayout from "@/components/templates/MainLayout";
import PublicExpertInfoWrapper from "@/components/organisms/PublicExpertInfoWrapper";

interface PageParams {
  businessId: string;
}

const BusinessInfo = ({ params }: { params: PageParams }) => {
  const businessId = params?.businessId;

  return (
    <MainLayout>
      <PublicExpertInfoWrapper businessId={businessId} />
    </MainLayout>
  );
};

export default BusinessInfo;

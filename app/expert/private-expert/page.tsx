import PrivateExpertHeroBanner from "@/components/molecules/PrivateExpertHeroBanner";
import PrivateExpertOptions from "@/components/organisms/PrivateExpertOptions";
import MainLayout from "@/components/templates/MainLayout";

const PrivateExpertPage = () => {
  return (
    <MainLayout>
      <PrivateExpertHeroBanner />
      <PrivateExpertOptions />
    </MainLayout>
  );
};

export default PrivateExpertPage;

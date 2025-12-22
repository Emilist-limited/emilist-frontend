import AboutUsBanner from "@/components/organisms/AboutUsBanner";
import AboutUsWrapper from "@/components/organisms/AboutUsWrapper";
import MainLayout from "@/components/templates/MainLayout";
import MobileAppSection from "@/components/organisms/MobileAppSection";

const AbooutUs = () => {
  return (
    <MainLayout>
      <AboutUsBanner />
      <AboutUsWrapper />
      <MobileAppSection />
    </MainLayout>
  );
};

export default AbooutUs;

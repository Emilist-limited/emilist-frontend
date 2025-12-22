import HeroSection from "@/components/organisms/HeroSection";
import HomeFeatureLinks from "@/components/organisms/HomeFeatureLinks";
import MobileAppSection from "@/components/organisms/MobileAppSection";
import PopularExperts from "@/components/organisms/PopularExperts";
import PopularJobs from "@/components/organisms/PopularJobs";
import PopularMaterials from "@/components/organisms/PopularMaterials";
import PrivateExpertSection from "@/components/organisms/PrivateExpertSection";
import MainLayout from "@/components/templates/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <HomeFeatureLinks />
      <PopularExperts />
      <PopularMaterials bgColor="bg-[#F7F7F7]" />
      <PopularJobs />
      <PrivateExpertSection />
      <MobileAppSection />
    </MainLayout>
  );
}

"use client";

import dynamic from "next/dynamic";

import { useToast } from "@/lib/hooks/useToast";
import { useRegisterService } from "@/features/services/hooks/useRegisterService";

import RegisterServiceScreenOne from "../molecules/RegisterServiceScreenOne";
import RegistrationGuide from "../molecules/RegistrationGuide";

const RegisterServiceScreenTwo = dynamic(
  () => import("../molecules/RegisterServiceScreenTwo")
);
const RegisterServiceScreenThree = dynamic(
  () => import("../molecules/RegisterServiceScreenThree")
);
const RegisterServiceScreenFour = dynamic(
  () => import("../molecules/RegisterServiceScreenFour")
);
const RegisterServiceScreenFive = dynamic(
  () => import("../molecules/RegisterServiceScreenFive")
);
const RegisterServiceScreenSix = dynamic(
  () => import("../molecules/RegisterServiceScreenSix")
);
const RegisterServiceScreenSeven = dynamic(
  () => import("../molecules/RegisterServiceScreenSeven")
);
const RegisterServiceScreenEight = dynamic(
  () => import("../molecules/RegisterServiceScreenEight")
);

const ServiceRegistrationFormWrapper = () => {
  const { showToast } = useToast();

  const {
    services,
    setServices,
    expertInfo,
    handleChange,
    selectedCountry,
    setSelectedCountry,
    selectedLanguage,
    setSelectedLanguage,
    setProfileImage,
    fetchProfileImage,
    setFetchedProfileImage,
    businessCountry,
    setBusinessCountry,
    businessImages,
    setBusinessImages,
    certification,
    setCertification,
    membership,
    setMembership,
    insurance,
    setInsurance,
    coverageArea,
    setCoverageArea,
    isSubmitting,
    handleSubmit,
    currentScreen,
    nextScreen,
    prevScreen,
  } = useRegisterService();

  return (
    <div className="flex">
      <div className="w-[500px] max-lg:hidden" />
      <div className="flex-1 w-full overflow-x-hidden">
        {currentScreen === 1 && (
          <div className="flex flex-col max-lg:pt-14">
            <div className="w-full lg:hidden h-full">
              <RegistrationGuide />
            </div>

            <RegisterServiceScreenOne
              services={services}
              setServices={setServices}
              nextScreen={nextScreen}
              showToast={showToast}
            />
          </div>
        )}
        {currentScreen === 2 && (
          <RegisterServiceScreenTwo
            expertInfo={expertInfo}
            handleChange={handleChange}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showToast={showToast}
          />
        )}
        {currentScreen === 3 && (
          <RegisterServiceScreenThree
            setProfileImage={setProfileImage}
            fetchProfileImage={fetchProfileImage}
            setFetchedProfileImage={setFetchedProfileImage}
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showToast={showToast}
          />
        )}
        {currentScreen === 4 && (
          <RegisterServiceScreenFour
            expertInfo={expertInfo}
            handleChange={handleChange}
            businessCountry={businessCountry}
            setBusinessCountry={setBusinessCountry}
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showToast={showToast}
          />
        )}
        {currentScreen === 5 && (
          <RegisterServiceScreenFive
            expertInfo={expertInfo}
            handleChange={handleChange}
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showToast={showToast}
            businessImages={businessImages}
            setBusinessImages={setBusinessImages}
          />
        )}
        {currentScreen === 6 && (
          <RegisterServiceScreenSix
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showToast={showToast}
            certification={certification}
            setCertification={setCertification}
            membership={membership}
            setMembership={setMembership}
          />
        )}
        {currentScreen === 7 && (
          <RegisterServiceScreenSeven
            nextScreen={nextScreen}
            prevScreen={prevScreen}
            showToast={showToast}
            insurance={insurance}
            setInsurance={setInsurance}
          />
        )}
        {currentScreen === 8 && (
          <RegisterServiceScreenEight
            coverageArea={coverageArea}
            setCoverageArea={setCoverageArea}
            prevScreen={prevScreen}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceRegistrationFormWrapper;

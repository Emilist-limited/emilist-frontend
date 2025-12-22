"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";

import { useToast } from "@/lib/hooks/useToast";
import { useEditService } from "../hooks/useEditService";
import { useDeleteBusinessImage } from "../hooks/useDeleteBusinessImage";

import RegistrationGuide from "@/components/molecules/RegistrationGuide";
import RegisterServiceScreenOne from "@/components/molecules/RegisterServiceScreenOne";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import PageLoader from "@/components/atoms/PageLoader";

const RegisterServiceScreenTwo = dynamic(
  () => import("@/components/molecules/RegisterServiceScreenTwo")
);
const RegisterServiceScreenThree = dynamic(
  () => import("@/components/molecules/RegisterServiceScreenThree")
);
const RegisterServiceScreenFour = dynamic(
  () => import("@/components/molecules/RegisterServiceScreenFour")
);
const RegisterServiceScreenFive = dynamic(
  () => import("@/components/molecules/RegisterServiceScreenFive")
);
const RegisterServiceScreenSix = dynamic(
  () => import("@/components/molecules/RegisterServiceScreenSix")
);
const RegisterServiceScreenSeven = dynamic(
  () => import("@/components/molecules/RegisterServiceScreenSeven")
);
const RegisterServiceScreenEight = dynamic(
  () => import("@/components/molecules/RegisterServiceScreenEight")
);

const EditServiceWrapper = ({ serviceId }: { serviceId: string }) => {
  const { showToast } = useToast();
  const { handleDeleteFetchedBusinessImage, isLoading } =
    useDeleteBusinessImage();
  const {
    handleEditBusiness,
    currentScreen,
    nextScreen,
    prevScreen,
    isSubmitting,
    loading,
    services,
    setServices,
    businessCountry,
    setBusinessCountry,
    membership,
    certification,
    setCertification,
    setMembership,
    insurance,
    setInsurance,
    coverageArea,
    setCoverageArea,
    expertInfo,
    handleChange,
    selectedCountry,
    setSelectedCountry,
    selectedLanguage,
    setSelectedLanguage,
    setProfileImage,
    fetchProfileImage,
    setFetchedProfileImage,
    businessImages,
    setBusinessImages,
    fetchedBusinessFile,
    getServiceInfo,
  } = useEditService(serviceId);

  const onDeleteFetchedBusinessImage = useCallback(
    (imgId: string) => {
      handleDeleteFetchedBusinessImage(serviceId, imgId, () => {
        getServiceInfo();
      });
    },
    [serviceId, getServiceInfo]
  );

  return (
    <div className="flex">
      {isLoading && <WhiteBgLoader />}
      <div className="w-[500px] max-lg:hidden" />
      {loading ? (
        <div className="">
          <div className="w-[500px] max-lg:hidden"></div>
          <PageLoader height="h-[80vh]" />
        </div>
      ) : (
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
                title="Edit"
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
              nextScreen={nextScreen}
              prevScreen={prevScreen}
              fetchProfileImage={fetchProfileImage}
              setFetchedProfileImage={setFetchedProfileImage}
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
              fetchedBusinessFile={fetchedBusinessFile}
              onDeleteFetchedBusinessImage={onDeleteFetchedBusinessImage}
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
              serviceId={serviceId}
            />
          )}
          {currentScreen === 7 && (
            <RegisterServiceScreenSeven
              nextScreen={nextScreen}
              prevScreen={prevScreen}
              showToast={showToast}
              insurance={insurance}
              setInsurance={setInsurance}
              serviceId={serviceId}
            />
          )}
          {currentScreen === 8 && (
            <RegisterServiceScreenEight
              coverageArea={coverageArea}
              setCoverageArea={setCoverageArea}
              prevScreen={prevScreen}
              isSubmitting={isSubmitting}
              handleSubmit={handleEditBusiness}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EditServiceWrapper;

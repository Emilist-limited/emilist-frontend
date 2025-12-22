import { memo } from "react";

import { FetchedBusinessImageType } from "@/features/services/types";
import { RegisterExpertInfoType, ShowToastFunction } from "@/types";
import { validateBusinessImageAndDescription } from "@/features/services/helpers/validateFields";

import AddBusinessImage from "./AddBusinessImage";
import FormTextarea from "./FormTextarea";
import NavigationButtons from "./NavigationButtons";
import RegisterServiceTitle from "../atoms/RegisterServiceTitle";
import RegisterServiceDescription from "../atoms/RegisterServiceDescription";

interface RegisterServiceScreenFiveProps {
  expertInfo: RegisterExpertInfoType;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  showToast: ShowToastFunction;
  businessImages: File[];
  setBusinessImages: (image: File[] | ((prevImages: File[]) => File[])) => void;
  fetchedBusinessFile?: FetchedBusinessImageType[];
  onDeleteFetchedBusinessImage?: (imgId: string) => void;
}

const RegisterServiceScreenFive = memo(
  ({
    expertInfo,
    handleChange,
    nextScreen,
    prevScreen,
    showToast,
    businessImages,
    setBusinessImages,
    fetchedBusinessFile,
    onDeleteFetchedBusinessImage,
  }: RegisterServiceScreenFiveProps) => {
    const handleProceed = () => {
      const isbizImgAndDescription = validateBusinessImageAndDescription({
        businessDescription: expertInfo?.businessDescription,
        businessImages,
        fetchedBusinessFile,
        showToast,
      });

      if (!isbizImgAndDescription) {
        return;
      }
      nextScreen();
    };

    return (
      <div
        id="business-description"
        className="w-full pt-24 pb-14 space-y-4 sm:px-10 px-4"
      >
        <RegisterServiceTitle title="Write a brief business description" />
        <RegisterServiceDescription>
          Supply a brief, vivid description of your service offering here.
        </RegisterServiceDescription>
        <div className="max-w-xl">
          <FormTextarea
            label="Business Description"
            name="businessDescription"
            id="businessDescription"
            value={expertInfo?.businessDescription}
            onChange={handleChange}
            rows={8}
          />
        </div>
        <AddBusinessImage
          businessImages={businessImages}
          setBusinessImages={setBusinessImages}
          showToast={showToast}
          fetchedBusinessFile={fetchedBusinessFile}
          onDeleteFetchedBusinessImage={onDeleteFetchedBusinessImage}
        />
        <NavigationButtons
          prevHref="#business-profile"
          nextHref="#certificate-membership"
          onNext={handleProceed}
          onPrev={prevScreen}
        />
      </div>
    );
  }
);

export default RegisterServiceScreenFive;

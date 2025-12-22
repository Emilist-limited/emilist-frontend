import { Dispatch, SetStateAction } from "react";

import { RegisterExpertInfoType, ShowToastFunction } from "@/types";
import { validateProfileInfo } from "@/features/services/helpers/validateFields";

import NavigationButtons from "./NavigationButtons";
import RegisterServiceTitle from "../atoms/RegisterServiceTitle";
import RegisterServiceDescription from "../atoms/RegisterServiceDescription";
import RegisterServiceExpertForm from "./RegisterServiceExpertForm";

interface RegisterServiceScreenTwoProps {
  expertInfo: RegisterExpertInfoType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedLanguage: string[];
  setSelectedLanguage: Dispatch<SetStateAction<string[]>>;
  nextScreen: () => void;
  prevScreen: () => void;
  showToast: ShowToastFunction;
}

const RegisterServiceScreenTwo = ({
  expertInfo,
  handleChange,
  selectedCountry,
  setSelectedCountry,
  selectedLanguage,
  setSelectedLanguage,
  nextScreen,
  prevScreen,
  showToast,
}: RegisterServiceScreenTwoProps) => {
  const handleProceed = () => {
    const isProfileValid = validateProfileInfo({
      expertInfo,
      selectedLanguage,
      selectedCountry,
      showToast,
    });
    if (!isProfileValid) {
      return;
    }
    nextScreen();
  };

  return (
    <div
      id="expert-profile"
      className="w-full pt-24 pb-14 space-y-4 sm:px-10 px-4 max-w-4xl h-fit"
    >
      <RegisterServiceTitle title="Lets get to know you" />
      <RegisterServiceDescription>
        Fill out the business or service profile information below
      </RegisterServiceDescription>
      <RegisterServiceExpertForm
        expertInfo={expertInfo}
        handleChange={handleChange}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <NavigationButtons
        prevHref="#new-expert"
        nextHref="#expert-profile-pic"
        onNext={handleProceed}
        onPrev={prevScreen}
      />
    </div>
  );
};

export default RegisterServiceScreenTwo;

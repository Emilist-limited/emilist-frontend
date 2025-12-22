import { Dispatch, SetStateAction } from "react";

import GuideDescription from "../atoms/GuideDescription";
import Label from "../atoms/Label";
import NavigationButtons from "./NavigationButtons";
import RegisterServiceDescription from "../atoms/RegisterServiceDescription";
import RegisterServiceTitle from "../atoms/RegisterServiceTitle";
import MultiSelectDropdown from "./MultiSelectDropdown";

import { serviceList } from "@/lib/constants";
import { ShowToastFunction } from "@/types";

interface RegisterServiceScreenOneProps {
  services: string[];
  setServices: Dispatch<SetStateAction<string[]>>;
  nextScreen: () => void;
  showToast: ShowToastFunction;
  title?: string;
}

const RegisterServiceScreenOne = ({
  services,
  setServices,
  nextScreen,
  showToast,
  title = "Create",
}: RegisterServiceScreenOneProps) => {
  const handleProceed = () => {
    if (services?.length < 1) {
      showToast({
        message: "Please select at least one service.",
        type: "error",
        duration: 8000,
      });
      return;
    }
    nextScreen();
  };

  return (
    <div
      id="new-expert"
      className="max-w-[550px] mx-10 pt-28 max-sm:mx-4 space-y-4 h-screen"
    >
      <RegisterServiceTitle title={`${title} Expert Service Account`} />
      <RegisterServiceDescription>
        EmiList employers and customers want to hire your services. Tell the
        world what you do and where they can find you by filling out the form
        and providing the necessary information and documents.
      </RegisterServiceDescription>
      <div className="flex flex-col sm:gap-8 gap-5">
        <div className="space-y-1">
          <Label htmlFor="serviceList"> Select your services</Label>
          <GuideDescription>
            You can select more than one service
          </GuideDescription>
          <MultiSelectDropdown
            selectedOptions={services}
            setSelectedOptions={setServices}
            options={serviceList}
            placeholder="Select a line of work"
            customPlaceholder="Specify line of work"
          />
        </div>
        <NavigationButtons nextHref="#expert-profile" onNext={handleProceed} />
      </div>
    </div>
  );
};

export default RegisterServiceScreenOne;

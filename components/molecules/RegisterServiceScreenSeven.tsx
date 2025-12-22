import NavigationButtons from "./NavigationButtons";
import RegisterServiceTitle from "../atoms/RegisterServiceTitle";
import RegisterServiceDescription from "../atoms/RegisterServiceDescription";
import UploadBuinsessInsurance from "./UploadBuinsessInsurance";

import { ShowToastFunction } from "@/types";
import { Insurance } from "@/features/services/types";
import { validateInsurances } from "@/features/services/helpers/validateFields";

interface RegisterServiceScreenSevenProps {
  nextScreen: () => void;
  prevScreen: () => void;
  showToast: ShowToastFunction;
  insurance: Insurance[];
  setInsurance: React.Dispatch<React.SetStateAction<Insurance[]>>;
  serviceId?: string;
}

const RegisterServiceScreenSeven = ({
  prevScreen,
  nextScreen,
  insurance,
  setInsurance,
  showToast,
  serviceId,
}: RegisterServiceScreenSevenProps) => {
  const handleProceed = () => {
    const isInsuranceValid = validateInsurances({
      items: insurance,
      showToast,
    });

    if (!isInsuranceValid) {
      return;
    }

    nextScreen();
  };

  return (
    <div id="insurance" className="w-full pt-24 pb-14 space-y-4 sm:px-10 px-4">
      <RegisterServiceTitle title="Add Insurance" />
      <RegisterServiceDescription>
        Enter insurance information here
      </RegisterServiceDescription>
      <UploadBuinsessInsurance
        insurance={insurance}
        setInsurance={setInsurance}
        serviceId={serviceId}
      />
      <NavigationButtons
        prevHref="#certificate-membership"
        nextHref="#area-coverage"
        onNext={handleProceed}
        onPrev={prevScreen}
      />
    </div>
  );
};

export default RegisterServiceScreenSeven;

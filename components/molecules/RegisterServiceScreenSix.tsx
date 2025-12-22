import { Certificate, Membership } from "@/features/services/types";
import { ShowToastFunction } from "@/types";

import RegisterServiceTitle from "../atoms/RegisterServiceTitle";
import RegisterServiceDescription from "../atoms/RegisterServiceDescription";
import NavigationButtons from "./NavigationButtons";
import UploadBusinessCertificate from "./UploadBusinessCertificate";
import UploadBusinessMembership from "./UploadBusinessMembership";
import {
  validateCertificates,
  validateMemberships,
} from "@/features/services/helpers/validateFields";

interface RegisterServiceScreenSixProps {
  nextScreen: () => void;
  prevScreen: () => void;
  serviceId?: string;
  showToast: ShowToastFunction;
  certification: Certificate[];
  setCertification: React.Dispatch<React.SetStateAction<Certificate[]>>;
  membership: Membership[];
  setMembership: React.Dispatch<React.SetStateAction<Membership[]>>;
}

const RegisterServiceScreenSix = ({
  nextScreen,
  prevScreen,
  certification,
  setCertification,
  showToast,
  membership,
  setMembership,
  serviceId,
}: RegisterServiceScreenSixProps) => {
  const handleProceed = () => {
    const isCertValid = validateCertificates({
      items: certification,
      showToast,
    });

    const isMemberValid = validateMemberships({
      items: membership,
      showToast,
    });

    if (!isCertValid || !isMemberValid) {
      return;
    }

    nextScreen();
  };

  return (
    <div
      id="certificate-membership"
      className="w-full pt-24 pb-14 space-y-4 sm:px-10 px-4"
    >
      <RegisterServiceTitle title="Certificate and Membership" />
      <RegisterServiceDescription>
        Upload business and professional membership certification profiles
      </RegisterServiceDescription>
      <UploadBusinessCertificate
        certification={certification}
        setCertification={setCertification}
        serviceId={serviceId}
        showToast={showToast}
      />
      <UploadBusinessMembership
        serviceId={serviceId}
        membership={membership}
        setMembership={setMembership}
        showToast={showToast}
      />
      <NavigationButtons
        prevHref="#business-description"
        nextHref="#insurance"
        onNext={handleProceed}
        onPrev={prevScreen}
      />
    </div>
  );
};

export default RegisterServiceScreenSix;

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

import CustomButton from "@/components/atoms/CustomButton";
import CustomModal from "@/components/atoms/CustomModal";
import Label from "@/components/atoms/Label";

import { ROUTES } from "@/lib/constants/routes";
import { AuthContext } from "@/lib/context/AuthState";
import { useToast } from "@/lib/hooks/useToast";
import DirectJobActionButtons from "@/features/jobs/components/DirectJobActionButtons";

interface AcceptDirectJobModalProps {
  isOpen: boolean;
  onCancel: () => void;
  applicationId: string;
  onAcceptJob: (
    applicationId: string,
    status: string,
    businessId?: string
  ) => void;
}
const AcceptDirectJobModal = ({
  isOpen,
  onCancel,
  onAcceptJob,
  applicationId,
}: AcceptDirectJobModalProps) => {
  const { showToast } = useToast();
  const { currentUser } = useContext(AuthContext);
  const [service, setService] = useState("");

  const acceptJob = () => {
    if (currentUser?.businesses.length === 0) {
      showToast({
        message: "Please add a business to proceed",
        type: "error",
      });
      return;
    }
    if (!service) {
      showToast({
        message: "Please select a business",
        type: "error",
      });
      return;
    }
    onAcceptJob(applicationId, "accepted", service);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onCancel}>
      <div className="w-full px-6 max-sm:px-1 py-3">
        <h2 className="text-lg font-bold pb-5">Job Application</h2>
        <div className="flex items-start flex-col gap-4 pt-6">
          <div className="w-full space-y-1">
            <Label htmlFor="service">
              Select business you want to apply with
            </Label>
            <div className="expert-reg-input-div">
              <select
                className="min-w-full w-full max-w-full rounded-lg h-10 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1"
                id="service"
                name="service"
                value={service}
                style={{ fontSize: "16px" }}
                onChange={(e) => setService(e.target.value)}
              >
                {currentUser?.businesses?.length > 0 ? (
                  <option defaultValue="">Select business</option>
                ) : (
                  <option defaultValue="">No business registered</option>
                )}
                {currentUser?.businesses?.map(
                  (business: any, index: number) => (
                    <option key={index} value={business?._id}>
                      {business?.businessName}
                    </option>
                  )
                )}
              </select>
            </div>
            <Link href={ROUTES?.JOIN_EXPERT} className="flex-c gap-1">
              <Image
                src="/icons/add.svg"
                alt="logo"
                width={20}
                height={20}
                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
              />
              <span className="text-primary-green max-sm:text-sm">
                Add New Business
              </span>
            </Link>
          </div>
          <DirectJobActionButtons
            onAccept={acceptJob}
            onReject={() => onAcceptJob(applicationId, "rejected")}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default AcceptDirectJobModal;
